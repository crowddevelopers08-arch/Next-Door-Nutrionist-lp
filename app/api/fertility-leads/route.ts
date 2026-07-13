export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

type Stage = 'stage1' | 'stage2';

interface FertilityLeadInput {
  stage: Stage;
  formName: string;
  name: string;
  phone: string;
  dialCode?: string;
  country?: string;
  iso?: string;
  concern?: string;
  location?: string;
  date?: string;
  time?: string;
  timeIST?: string;
  timezone?: string;
  pageUrl?: string;
}

const FORM_NAMES: Record<Stage, string> = {
  stage1: 'fertility lp leads',
  stage2: 'fertility online consultation lp leads',
};

// India keeps the strict 10-digit check; every other country gets a generic
// international length check (6–14 national digits).
function isValidPhone(raw: string, iso?: string) {
  const digits = raw.replace(/\D/g, '');
  if (!iso || iso.toUpperCase() === 'IN') return /^[6-9]\d{9}$/.test(digits);
  return digits.length >= 6 && digits.length <= 14;
}

// Full E.164-style WhatsApp number, e.g. "+919876543210".
function fullNumber(data: FertilityLeadInput) {
  const dial = (data.dialCode || '91').replace(/\D/g, '');
  const digits = data.phone.replace(/\D/g, '');
  return `+${dial}${digits}`;
}

function isValidName(raw: string) {
  return raw.trim().length >= 2 && /^[a-zA-Z\s'.-]+$/.test(raw.trim());
}

// ── Google Sheets ────────────────────────────────────────────────────────────
async function appendToGoogleSheet(data: FertilityLeadInput) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!endpoint) throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not set');

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    form: data.formName,
    stage: data.stage,
    name: data.name.trim(),
    phone: fullNumber(data),
    country: data.country?.trim() || 'India',
    concern: data.concern?.trim() || 'Not specified',
    location: data.location?.trim() || '',
    date: data.date?.trim() || '',
    time: data.time?.trim() || '',
    timeIST: data.timeIST?.trim() || '',
    timezone: data.timezone?.trim() || 'Asia/Kolkata',
    source: data.pageUrl || data.formName,
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
async function sendToTeleCRM(data: FertilityLeadInput) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error('TELECRM_API_URL is not set');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const createdOn = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const isConsultation = data.stage === 'stage2';

  const payload = {
    fields: {
      Id: '',
      name: data.name.trim(),
      email: '',
      phone: fullNumber(data).replace(/^\+/, ''),
      city_1: data.location?.trim() || '',
      preferredtime: data.time || '',
      preferreddate: data.date || '',
      message: isConsultation
        ? `Online fertility consultation booking – Concern: ${data.concern || 'Not specified'}`
        : `Fertility landing page enquiry – Concern: ${data.concern || 'Not specified'}`,
      select_the_procedure: data.concern || '',
      Country: data.country?.trim() || 'India',
      LeadID: '',
      CreatedOn: createdOn,
      'Lead Stage': isConsultation ? 'Stage 2 - Online Consultation' : 'Stage 1 - Lead',
      'Lead Status': 'new',
      'Lead Request Type': isConsultation ? 'online-consultation' : 'fertility-enquiry',
      PageName: data.formName,
      State: '',
      Age: '',
    },
    actions: [
      { type: 'SYSTEM_NOTE', text: `Form: ${data.formName}` },
      { type: 'SYSTEM_NOTE', text: `Concern: ${data.concern || 'Not specified'}` },
      ...(isConsultation
        ? [
            { type: 'SYSTEM_NOTE', text: `Location: ${data.location || 'Not specified'}` },
            {
              type: 'SYSTEM_NOTE',
              text: `Preferred Slot: ${data.date || '-'} ${data.time || ''}${
                data.timeIST ? ` (Clinic ${data.timeIST} IST)` : ''
              }`,
            },
            {
              type: 'SYSTEM_NOTE',
              text: `Country: ${data.country || 'India'}${
                data.timezone ? ` · ${data.timezone}` : ''
              }`,
            },
          ]
        : []),
      { type: 'SYSTEM_NOTE', text: `Lead Source: ${data.pageUrl || data.formName}` },
    ],
  };

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

    if (res.status === 204) return { status: 'success', message: 'Lead created (204)' };

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

// ── Meta (Facebook) Conversions API ───────────────────────────────────────────
// Fires a server-side conversion event for every lead. Configure via env:
//   META_PIXEL_ID                – Pixel / Dataset ID from Events Manager
//   META_CONVERSIONS_API_TOKEN   – System User access token
//   META_TEST_EVENT_CODE         – (optional) TESTxxxx code while testing
interface MetaContext {
  ip?: string;
  ua?: string;
  fbp?: string;
  fbc?: string;
}

const sha256 = (v: string) =>
  crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

async function sendToMetaCAPI(data: FertilityLeadInput, ctx: MetaContext) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  // Not configured yet → skip quietly (don't log as an error).
  if (!pixelId || !token) return { skipped: true };

  // Stage 1 = a Lead; Stage 2 = booking a consultation (Schedule).
  const eventName = data.stage === 'stage2' ? 'Schedule' : 'Lead';

  const phoneDigits = fullNumber(data).replace(/^\+/, ''); // e.g. 919876543210
  const parts = data.name.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ');

  const user_data: Record<string, unknown> = { ph: [sha256(phoneDigits)] };
  if (firstName) user_data.fn = [sha256(firstName)];
  if (lastName) user_data.ln = [sha256(lastName)];
  if (data.iso) user_data.country = [sha256(data.iso)];
  if (ctx.ip) user_data.client_ip_address = ctx.ip;
  if (ctx.ua) user_data.client_user_agent = ctx.ua;
  if (ctx.fbp) user_data.fbp = ctx.fbp;
  if (ctx.fbc) user_data.fbc = ctx.fbc;

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: data.pageUrl || undefined,
    event_id: crypto.randomUUID(), // used for browser/server dedup if a Pixel also fires
    user_data,
    custom_data: {
      content_name: data.formName,
      content_category: 'fertility',
      ...(data.concern ? { content_ids: [data.concern] } : {}),
    },
  };

  const payload: Record<string, unknown> = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.error?.message || `Meta CAPI HTTP ${res.status}`);
    }
    return json;
  } catch (err) {
    clearTimeout(timeout);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const stage = (body.stage === 'stage2' ? 'stage2' : 'stage1') as Stage;
  const {
    name = '',
    phone = '',
    dialCode = '',
    country = '',
    iso = '',
    concern = '',
    location = '',
    date = '',
    time = '',
    timeIST = '',
    timezone = '',
    pageUrl = '',
  } = body;

  if (!name.trim())
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!isValidName(name))
    return NextResponse.json({ error: 'Name should contain letters only.' }, { status: 400 });
  if (!isValidPhone(phone, iso))
    return NextResponse.json(
      { error: 'Please enter a valid WhatsApp number.' },
      { status: 400 }
    );
  if (stage === 'stage2' && (!date.trim() || !time.trim()))
    return NextResponse.json(
      { error: 'Please pick a preferred date and time.' },
      { status: 400 }
    );
  if (stage === 'stage2' && !location.trim())
    return NextResponse.json({ error: 'Please enter your location.' }, { status: 400 });

  const leadData: FertilityLeadInput = {
    stage,
    formName: FORM_NAMES[stage],
    name,
    phone,
    dialCode: dialCode || '91',
    country: country || 'India',
    iso: iso || 'IN',
    concern,
    location,
    date,
    time,
    timeIST,
    timezone,
    pageUrl: pageUrl || undefined,
  };

  const metaCtx: MetaContext = {
    ip:
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      undefined,
    ua: req.headers.get('user-agent') || undefined,
    fbp: req.cookies.get('_fbp')?.value,
    fbc: req.cookies.get('_fbc')?.value,
  };

  const [sheetResult, crmResult, metaResult] = await Promise.allSettled([
    appendToGoogleSheet(leadData),
    sendToTeleCRM(leadData),
    sendToMetaCAPI(leadData, metaCtx),
  ]);

  if (sheetResult.status === 'rejected') {
    console.error('[Fertility Sheets] Error:', sheetResult.reason?.message);
  }
  if (crmResult.status === 'rejected') {
    console.error('[Fertility TeleCRM] Error:', crmResult.reason?.message);
  }
  if (metaResult.status === 'rejected') {
    console.error('[Fertility Meta CAPI] Error:', metaResult.reason?.message);
  }

  const metaStatus =
    metaResult.status !== 'fulfilled'
      ? 'failed'
      : (metaResult.value as { skipped?: boolean })?.skipped
      ? 'skipped'
      : 'ok';

  return NextResponse.json(
    {
      success: true,
      form: leadData.formName,
      sheet: sheetResult.status === 'fulfilled' ? 'ok' : 'failed',
      crm: crmResult.status === 'fulfilled' ? 'ok' : 'failed',
      meta: metaStatus,
    },
    { status: 201 }
  );
}
