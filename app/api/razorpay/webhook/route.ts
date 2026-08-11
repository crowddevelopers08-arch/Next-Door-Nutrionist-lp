export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Razorpay calls this endpoint server-to-server after a payment settles. It is
// the reliable half of the flow: the browser callback in FertilityWatchClient
// can be lost if the client closes the tab mid-payment, but this still fires,
// so a paid consultation always reaches Sheets and TeleCRM.

interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  email?: string;
  contact?: string;
  created_at?: number;
  notes?: Record<string, string>;
}

function signatureMatches(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function rupees(paise: number) {
  return (paise / 100).toFixed(2);
}

function payerName(payment: RazorpayPayment) {
  return payment.notes?.name?.trim() || 'Razorpay customer';
}

// ── Google Sheets ────────────────────────────────────────────────────────────
async function appendToGoogleSheet(payment: RazorpayPayment, event: string) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!endpoint) throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not set');

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    form: 'fertility online consultation payment',
    stage: 'payment',
    name: payerName(payment),
    phone: payment.contact || '',
    email: payment.email || '',
    country: 'India',
    concern: 'Fertility – paid online consultation',
    amount: `${payment.currency} ${rupees(payment.amount)}`,
    paymentId: payment.id,
    orderId: payment.order_id,
    paymentStatus: event === 'payment.captured' ? 'Paid' : 'Failed',
    method: payment.method || '',
    source: payment.notes?.source || 'fertility/watch',
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || `Google Sheets responded with ${res.status}`);
  try { return text ? JSON.parse(text) : { success: true }; }
  catch { return { success: true }; }
}

// ── TeleCRM ──────────────────────────────────────────────────────────────────
async function sendToTeleCRM(payment: RazorpayPayment, event: string) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error('TELECRM_API_URL is not set');

  const paid = event === 'payment.captured';
  const amount = `INR ${rupees(payment.amount)}`;

  const createdOn = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const payload = {
    fields: {
      Id: '',
      name: payerName(payment),
      email: payment.email || '',
      phone: (payment.contact || '').replace(/^\+/, ''),
      city_1: '',
      preferredtime: '',
      preferreddate: '',
      message: paid
        ? `Paid online fertility consultation – ${amount} (Payment ${payment.id})`
        : `Failed payment for online fertility consultation – ${amount} (Payment ${payment.id})`,
      select_the_procedure: 'Fertility – Online Consultation',
      Country: 'India',
      LeadID: '',
      CreatedOn: createdOn,
      'Lead Stage': paid ? 'Stage 3 - Paid Consultation' : 'Stage 2 - Payment Failed',
      'Lead Status': 'new',
      'Lead Request Type': 'online-consultation-payment',
      PageName: 'fertility online consultation payment',
      State: '',
      Age: '',
    },
    actions: [
      { type: 'SYSTEM_NOTE', text: `Payment status: ${paid ? 'Captured' : 'Failed'}` },
      { type: 'SYSTEM_NOTE', text: `Amount: ${amount}` },
      { type: 'SYSTEM_NOTE', text: `Razorpay Payment ID: ${payment.id}` },
      { type: 'SYSTEM_NOTE', text: `Razorpay Order ID: ${payment.order_id}` },
      { type: 'SYSTEM_NOTE', text: `Method: ${payment.method || 'Not specified'}` },
      { type: 'SYSTEM_NOTE', text: `Lead Source: ${payment.notes?.source || 'fertility/watch'}` },
    ],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'next-door-nutritionist-website',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status === 204) return { status: 'success' };

    const text = await res.text();
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      throw new Error('TeleCRM returned an HTML response — check the API URL');
    }

    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json.message || `TeleCRM HTTP ${res.status}`);
    return json;
  } catch (err) {
    clearTimeout(timeout);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Razorpay webhook] RAZORPAY_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 });
  }

  const signature = req.headers.get('x-razorpay-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  // The signature is computed over the exact bytes Razorpay sent, so the raw
  // text must be read before any JSON parsing.
  const rawBody = await req.text();

  if (!signatureMatches(rawBody, signature, secret)) {
    console.error('[Razorpay webhook] Signature mismatch — request rejected');
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  let body: { event?: string; payload?: { payment?: { entity?: RazorpayPayment } } };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const event = body.event || '';
  const payment = body.payload?.payment?.entity;

  // Anything we don't act on is acknowledged with 200 so Razorpay stops retrying.
  if (event !== 'payment.captured' && event !== 'payment.failed') {
    return NextResponse.json({ received: true, ignored: event }, { status: 200 });
  }
  if (!payment?.id) {
    return NextResponse.json({ received: true, ignored: 'no payment entity' }, { status: 200 });
  }

  const [sheetResult, crmResult] = await Promise.allSettled([
    appendToGoogleSheet(payment, event),
    sendToTeleCRM(payment, event),
  ]);

  if (sheetResult.status === 'rejected') {
    console.error('[Razorpay webhook Sheets] Error:', sheetResult.reason?.message);
  }
  if (crmResult.status === 'rejected') {
    console.error('[Razorpay webhook TeleCRM] Error:', crmResult.reason?.message);
  }

  // Always 200 on a verified event. Returning an error would make Razorpay
  // retry and duplicate the row that did succeed.
  return NextResponse.json(
    {
      received: true,
      event,
      paymentId: payment.id,
      sheet: sheetResult.status === 'fulfilled' ? 'ok' : 'failed',
      crm: crmResult.status === 'fulfilled' ? 'ok' : 'failed',
    },
    { status: 200 }
  );
}
