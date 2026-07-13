'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { fertilityHealthGoals } from '@/components/fertility/fertilityContent';
import { WhatsAppField } from '@/components/fertility/WhatsAppField';
import {
  buildSlots,
  COUNTRIES,
  Country,
  DEFAULT_COUNTRY,
  detectCountry,
  Slot,
  tzShortLabel,
} from '@/components/fertility/countries';

interface Props {
  open: boolean;
  onClose: () => void;
}

const dayOffsetLabel = (o: number) =>
  o > 0 ? ` (+${o}d)` : o < 0 ? ` (${o}d)` : '';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const toYmd = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;

const ymdToDate = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const prettyDate = (s: string) =>
  s
    ? ymdToDate(s).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

export function FertilityConsultationModal({ open, onClose }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [concern, setConcern] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState<Date>(() => new Date());
  const [slot, setSlot] = useState<Slot | null>(null);
  const [slotOpen, setSlotOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCountry(detectCountry());
  }, []);

  // Prefill name / phone / country captured in Stage 1
  useEffect(() => {
    if (!open) return;
    try {
      const raw = sessionStorage.getItem('fertilityLead');
      if (raw) {
        const saved = JSON.parse(raw);
        setName(saved.name || '');
        setPhone(saved.phone || '');
        if (saved.iso) {
          const c = COUNTRIES.find((x) => x.iso === saved.iso);
          if (c) setCountry(c);
        }
      }
    } catch {
      /* ignore */
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const today = new Date().toISOString().split('T')[0];

  // Clinic hours (10 AM – 7 PM IST) shown in the visitor's local time.
  const slots = useMemo(
    () => buildSlots(date || today, country.tz),
    [date, country.tz, today]
  );
  const tzLabel = useMemo(
    () => tzShortLabel(date || today, country.tz),
    [date, country.tz, today]
  );

  // A previously chosen slot no longer matches once the date / country changes.
  useEffect(() => {
    setSlot(null);
  }, [date, country.tz]);

  if (!open || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) return setError('Please enter your name.');
    const digits = phone.replace(/\D/g, '');
    if (country.iso === 'IN') {
      if (!/^[6-9]\d{9}$/.test(digits))
        return setError('Please enter a valid 10-digit WhatsApp number.');
    } else if (digits.length < 6 || digits.length > 14) {
      return setError('Please enter a valid WhatsApp number.');
    }
    if (!concern) return setError('Please select your concern.');
    if (location.trim().length < 2) return setError('Please enter your location.');
    if (!date) return setError('Please select a preferred date.');
    if (!slot) return setError('Please select a preferred time.');

    setSubmitting(true);
    try {
      const res = await fetch('/api/fertility-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: 'stage2',
          name: name.trim(),
          phone: digits,
          dialCode: country.dial,
          country: country.name,
          iso: country.iso,
          concern,
          location: location.trim(),
          date,
          time: `${slot.local}${tzLabel ? ` ${tzLabel}` : ''}${dayOffsetLabel(slot.dayOffset)}`,
          timeIST: slot.ist,
          timezone: country.tz,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitting(false);
        return setError(data.error || 'Something went wrong. Please try again.');
      }
      router.push('/fertility/thank-you');
    } catch {
      setSubmitting(false);
      setError('Network error. Please try again.');
    }
  };

  const isIndia = country.iso === 'IN';

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      <div
        className="fade-in-backdrop fixed inset-0 bg-[#0B1F17]/60 backdrop-blur-sm"
        onClick={submitting ? undefined : onClose}
      />

      <div className="pop-in relative my-auto w-full max-w-[560px] overflow-hidden rounded-[26px] bg-white shadow-[0_30px_90px_rgba(11,74,53,0.35)]">
        <div className="relative bg-[#0B4A35] px-6 py-6 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1.4px)',
              backgroundSize: '18px 18px',
            }}
          />
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <h3 className="relative font-outfit text-[20px] font-extrabold text-white">
            Book Your Online Consultation
          </h3>
          <p className="relative mt-1 font-outfit text-[12.5px] text-[#B7D29B]">
            Pick a slot that works for you — we&apos;ll confirm your consultation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Your Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1.5 w-full rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#0B4A35]"
              />
            </label>

            <WhatsAppField
              country={country}
              onCountry={setCountry}
              value={phone}
              onValue={setPhone}
            />

            <label className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Your Concern</span>
              <select
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#0B4A35]"
              >
                <option value="">Select your concern</option>
                {fertilityHealthGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city"
                className="mt-1.5 w-full rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#0B4A35]"
              />
            </label>

            <div className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Preferred Date</span>
              <button
                type="button"
                onClick={() => {
                  setViewMonth(date ? ymdToDate(date) : new Date());
                  setDateOpen(true);
                }}
                className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] outline-none transition-colors focus:border-[#0B4A35]"
              >
                <span className={date ? 'text-[#1A1A1A]' : 'text-[#2B2B2B]/50'}>
                  {date ? prettyDate(date) : 'Select a date'}
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#0B4A35]">
                  calendar_month
                </span>
              </button>
            </div>

            <div className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">
                Preferred Time{tzLabel && !isIndia ? ` (${tzLabel})` : ''}
              </span>
              <button
                type="button"
                onClick={() => setSlotOpen(true)}
                className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] outline-none transition-colors focus:border-[#0B4A35]"
              >
                <span className={slot ? 'text-[#1A1A1A]' : 'text-[#2B2B2B]/50'}>
                  {slot
                    ? `${slot.local}${dayOffsetLabel(slot.dayOffset)}`
                    : 'Select a time slot'}
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#0B4A35]">schedule</span>
              </button>
            </div>
          </div>

          {!isIndia && (
            <p className="mt-3 font-outfit text-[11.5px] leading-[1.6] text-[#2B2B2B]/55">
              Times are shown in your local time{tzLabel ? ` (${tzLabel})` : ''}, matched to
              our clinic hours (10:00 AM – 7:00 PM IST).
            </p>
          )}

          {error && (
            <p className="mt-3 font-outfit text-[12.5px] font-medium text-[#D6497E]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary font-outfit mt-5 flex w-full items-center justify-center rounded-full bg-[#0B4A35] px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg disabled:opacity-70"
          >
            {submitting ? 'Booking…' : 'Confirm My Consultation'}
          </button>
        </form>
      </div>

      {/* Time slot picker popup */}
      {slotOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="fade-in-backdrop fixed inset-0 bg-[#0B1F17]/60 backdrop-blur-sm"
            onClick={() => setSlotOpen(false)}
          />
          <div className="pop-in relative flex max-h-[80vh] w-full max-w-[440px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(11,74,53,0.35)]">
            <div className="flex items-center justify-between bg-[#0B4A35] px-5 py-4">
              <div className="text-left">
                <h4 className="font-outfit text-[16px] font-extrabold text-white">Choose a Time Slot</h4>
                {!isIndia && (
                  <p className="font-outfit text-[11px] text-[#B7D29B]">
                    Your local time{tzLabel ? ` · ${tzLabel}` : ''}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSlotOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto p-4">
              {slots.map((s) => {
                const selected = slot?.ist === s.ist;
                return (
                  <button
                    key={s.ist}
                    type="button"
                    onClick={() => {
                      setSlot(s);
                      setSlotOpen(false);
                    }}
                    className={`rounded-xl border px-2 py-2.5 font-outfit text-[12.5px] font-semibold transition-colors ${
                      selected
                        ? 'border-[#0B4A35] bg-[#0B4A35] text-white'
                        : 'border-[#0B4A35]/15 bg-[#fffaf7] text-[#2B2B2B] hover:border-[#0B4A35]/40'
                    }`}
                  >
                    {s.local}
                    {s.dayOffset !== 0 && (
                      <span className={selected ? 'text-white/70' : 'text-[#2B2B2B]/45'}>
                        {dayOffsetLabel(s.dayOffset)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Date picker popup */}
      {dateOpen && (() => {
        const todayDate = ymdToDate(today);
        const y = viewMonth.getFullYear();
        const mo = viewMonth.getMonth();
        const startPad = new Date(y, mo, 1).getDay();
        const daysInMonth = new Date(y, mo + 1, 0).getDate();
        const cells: (Date | null)[] = [];
        for (let i = 0; i < startPad; i++) cells.push(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, mo, d));
        const prevDisabled = y === todayDate.getFullYear() && mo === todayDate.getMonth();

        return (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="fade-in-backdrop fixed inset-0 bg-[#0B1F17]/60 backdrop-blur-sm"
              onClick={() => setDateOpen(false)}
            />
            <div className="pop-in relative flex max-h-[80vh] w-full max-w-[440px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(11,74,53,0.35)]">
              <div className="flex items-center justify-between bg-[#0B4A35] px-5 py-4">
                <h4 className="font-outfit text-[16px] font-extrabold text-white">Choose a Date</h4>
                <button
                  type="button"
                  onClick={() => setDateOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-4">
                {/* Month navigation */}
                <div className="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={prevDisabled}
                    onClick={() => setViewMonth(new Date(y, mo - 1, 1))}
                    aria-label="Previous month"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#0B4A35] transition-colors hover:bg-[#0B4A35]/8 disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <span className="font-outfit text-[14px] font-bold text-[#1A1A1A]">
                    {MONTHS[mo]} {y}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMonth(new Date(y, mo + 1, 1))}
                    aria-label="Next month"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#0B4A35] transition-colors hover:bg-[#0B4A35]/8"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>

                {/* Weekday header */}
                <div className="grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((w) => (
                    <div
                      key={w}
                      className="py-1 text-center font-outfit text-[11px] font-semibold text-[#2B2B2B]/45"
                    >
                      {w}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {cells.map((cell, i) => {
                    if (!cell) return <div key={`pad-${i}`} />;
                    const ymd = toYmd(cell);
                    const disabled = cell < todayDate;
                    const selected = ymd === date;
                    return (
                      <button
                        key={ymd}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setDate(ymd);
                          setDateOpen(false);
                        }}
                        className={`flex aspect-square items-center justify-center rounded-full font-outfit text-[13px] font-semibold transition-colors ${
                          selected
                            ? 'bg-[#0B4A35] text-white'
                            : disabled
                            ? 'text-[#2B2B2B]/25'
                            : 'text-[#2B2B2B] hover:bg-[#0B4A35]/10'
                        }`}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>,
    document.body
  );
}
