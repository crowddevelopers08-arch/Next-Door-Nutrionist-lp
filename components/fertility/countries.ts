// Country data + timezone helpers for the fertility WhatsApp / consultation forms.
// The clinic operates 10:00 AM – 7:00 PM IST (Asia/Kolkata). For international
// visitors we show the equivalent slots in *their* country's local time.

export interface Country {
  iso: string; // ISO 3166-1 alpha-2
  name: string;
  dial: string; // dial code without the leading "+"
  tz: string; // representative IANA timezone
}

// India first (clinic's home market), then Gulf, then the rest.
export const COUNTRIES: Country[] = [
  { iso: 'IN', name: 'India', dial: '91', tz: 'Asia/Kolkata' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '971', tz: 'Asia/Dubai' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966', tz: 'Asia/Riyadh' },
  { iso: 'QA', name: 'Qatar', dial: '974', tz: 'Asia/Qatar' },
  { iso: 'KW', name: 'Kuwait', dial: '965', tz: 'Asia/Kuwait' },
  { iso: 'OM', name: 'Oman', dial: '968', tz: 'Asia/Muscat' },
  { iso: 'BH', name: 'Bahrain', dial: '973', tz: 'Asia/Bahrain' },
  { iso: 'US', name: 'United States', dial: '1', tz: 'America/New_York' },
  { iso: 'CA', name: 'Canada', dial: '1', tz: 'America/Toronto' },
  { iso: 'GB', name: 'United Kingdom', dial: '44', tz: 'Europe/London' },
  { iso: 'AU', name: 'Australia', dial: '61', tz: 'Australia/Sydney' },
  { iso: 'NZ', name: 'New Zealand', dial: '64', tz: 'Pacific/Auckland' },
  { iso: 'SG', name: 'Singapore', dial: '65', tz: 'Asia/Singapore' },
  { iso: 'MY', name: 'Malaysia', dial: '60', tz: 'Asia/Kuala_Lumpur' },
  { iso: 'HK', name: 'Hong Kong', dial: '852', tz: 'Asia/Hong_Kong' },
  { iso: 'DE', name: 'Germany', dial: '49', tz: 'Europe/Berlin' },
  { iso: 'FR', name: 'France', dial: '33', tz: 'Europe/Paris' },
  { iso: 'NL', name: 'Netherlands', dial: '31', tz: 'Europe/Amsterdam' },
  { iso: 'IE', name: 'Ireland', dial: '353', tz: 'Europe/Dublin' },
  { iso: 'IT', name: 'Italy', dial: '39', tz: 'Europe/Rome' },
  { iso: 'ES', name: 'Spain', dial: '34', tz: 'Europe/Madrid' },
  { iso: 'CH', name: 'Switzerland', dial: '41', tz: 'Europe/Zurich' },
  { iso: 'SE', name: 'Sweden', dial: '46', tz: 'Europe/Stockholm' },
  { iso: 'NO', name: 'Norway', dial: '47', tz: 'Europe/Oslo' },
  { iso: 'ZA', name: 'South Africa', dial: '27', tz: 'Africa/Johannesburg' },
  { iso: 'NG', name: 'Nigeria', dial: '234', tz: 'Africa/Lagos' },
  { iso: 'KE', name: 'Kenya', dial: '254', tz: 'Africa/Nairobi' },
  { iso: 'JP', name: 'Japan', dial: '81', tz: 'Asia/Tokyo' },
  { iso: 'CN', name: 'China', dial: '86', tz: 'Asia/Shanghai' },
  { iso: 'BD', name: 'Bangladesh', dial: '880', tz: 'Asia/Dhaka' },
  { iso: 'LK', name: 'Sri Lanka', dial: '94', tz: 'Asia/Colombo' },
  { iso: 'NP', name: 'Nepal', dial: '977', tz: 'Asia/Kathmandu' },
  { iso: 'PK', name: 'Pakistan', dial: '92', tz: 'Asia/Karachi' },
  { iso: 'PH', name: 'Philippines', dial: '63', tz: 'Asia/Manila' },
  { iso: 'ID', name: 'Indonesia', dial: '62', tz: 'Asia/Jakarta' },
  { iso: 'TH', name: 'Thailand', dial: '66', tz: 'Asia/Bangkok' },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

// Turn "IN" into the 🇮🇳 flag emoji (regional indicator pair).
export const isoToFlag = (iso: string) =>
  iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

// Best-effort default from the visitor's own timezone; falls back to India.
export function detectCountry(): Country {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = COUNTRIES.find((c) => c.tz === tz);
    if (match) return match;
  } catch {
    /* ignore */
  }
  return DEFAULT_COUNTRY;
}

// ── Time-slot localization ────────────────────────────────────────────────────
// Clinic hours are defined in IST. IST is a fixed UTC+5:30 offset (no DST).
const IST_OFFSET_MIN = 330;
const CLINIC_START_MIN = 10 * 60; // 10:00 AM IST
const CLINIC_END_MIN = 19 * 60; // 7:00 PM IST

export interface Slot {
  ist: string; // canonical clinic time, e.g. "10:00 AM – 10:30 AM"
  local: string; // visitor-local time, e.g. "12:30 PM – 1:00 PM"
  dayOffset: number; // -1 / 0 / +1 relative to the chosen clinic date
}

// IST wall-clock (date + minutes-since-midnight) → absolute instant.
function istWallToInstant(dateStr: string, mins: number): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  const utcMs =
    Date.UTC(y, m - 1, d, Math.floor(mins / 60), mins % 60) - IST_OFFSET_MIN * 60000;
  return new Date(utcMs);
}

function istLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function timeInTz(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function ymdInTz(date: Date, tz: string): string {
  // en-CA yields "YYYY-MM-DD"
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function dayDiff(baseYmd: string, otherYmd: string): number {
  const a = Date.parse(`${baseYmd}T00:00:00Z`);
  const b = Date.parse(`${otherYmd}T00:00:00Z`);
  return Math.round((b - a) / 86400000);
}

// Short timezone label for the chosen date, e.g. "GST", "EDT", "IST".
export function tzShortLabel(dateStr: string, tz: string): string {
  const base = dateStr || new Date().toISOString().split('T')[0];
  const instant = istWallToInstant(base, CLINIC_START_MIN);
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: 'numeric',
      timeZoneName: 'short',
    }).formatToParts(instant);
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}

// All clinic slots converted to the visitor's local time for the chosen date.
export function buildSlots(dateStr: string, tz: string): Slot[] {
  const base = dateStr || new Date().toISOString().split('T')[0];
  const slots: Slot[] = [];
  for (let mins = CLINIC_START_MIN; mins < CLINIC_END_MIN; mins += 30) {
    const start = istWallToInstant(base, mins);
    const end = istWallToInstant(base, mins + 30);
    slots.push({
      ist: `${istLabel(mins)} – ${istLabel(mins + 30)}`,
      local: `${timeInTz(start, tz)} – ${timeInTz(end, tz)}`,
      dayOffset: dayDiff(base, ymdInTz(start, tz)),
    });
  }
  return slots;
}
