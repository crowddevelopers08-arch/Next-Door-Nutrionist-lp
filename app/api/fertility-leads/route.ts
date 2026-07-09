export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

type Stage = 'stage1' | 'stage2';

interface FertilityLeadInput {
  stage: Stage;
  formName: string;
  name: string;
  phone: string;
  concern?: string;
  date?: string;
  time?: string;
  pageUrl?: string;
}

const FORM_NAMES: Record<Stage, string> = {
  stage1: 'fertility lp leads',
  stage2: 'fertility online consultation lp leads',
};

function isValidIndianPhone(raw: string) {
  const cleaned = raw.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, '');
  return /^[6-9]\d{9}$/.test(cleaned);
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
    phone: data.phone.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, ''),
    concern: data.concern?.trim() || 'Not specified',
    date: data.date?.trim() || '',
    time: data.time?.trim() || '',
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
      phone: data.phone.replace(/\D/g, ''),
      city_1: '',
      preferredtime: data.time || '',
      preferreddate: data.date || '',
      message: isConsultation
        ? `Online fertility consultation booking – Concern: ${data.concern || 'Not specified'}`
        : `Fertility landing page enquiry – Concern: ${data.concern || 'Not specified'}`,
      select_the_procedure: data.concern || '',
      Country: 'India',
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
        ? [{ type: 'SYSTEM_NOTE', text: `Preferred Slot: ${data.date || '-'} ${data.time || ''}` }]
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

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const stage = (body.stage === 'stage2' ? 'stage2' : 'stage1') as Stage;
  const { name = '', phone = '', concern = '', date = '', time = '', pageUrl = '' } = body;

  if (!name.trim())
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!isValidName(name))
    return NextResponse.json({ error: 'Name should contain letters only.' }, { status: 400 });
  if (!isValidIndianPhone(phone))
    return NextResponse.json(
      { error: 'Please enter a valid 10-digit Indian mobile number.' },
      { status: 400 }
    );
  if (stage === 'stage2' && (!date.trim() || !time.trim()))
    return NextResponse.json(
      { error: 'Please pick a preferred date and time.' },
      { status: 400 }
    );

  const leadData: FertilityLeadInput = {
    stage,
    formName: FORM_NAMES[stage],
    name,
    phone,
    concern,
    date,
    time,
    pageUrl: pageUrl || undefined,
  };

  const [sheetResult, crmResult] = await Promise.allSettled([
    appendToGoogleSheet(leadData),
    sendToTeleCRM(leadData),
  ]);

  if (sheetResult.status === 'rejected') {
    console.error('[Fertility Sheets] Error:', sheetResult.reason?.message);
  }
  if (crmResult.status === 'rejected') {
    console.error('[Fertility TeleCRM] Error:', crmResult.reason?.message);
  }

  return NextResponse.json(
    {
      success: true,
      form: leadData.formName,
      sheet: sheetResult.status === 'fulfilled' ? 'ok' : 'failed',
      crm: crmResult.status === 'fulfilled' ? 'ok' : 'failed',
    },
    { status: 201 }
  );
}
