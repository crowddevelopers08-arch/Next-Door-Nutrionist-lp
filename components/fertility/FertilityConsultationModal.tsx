'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { fertilityHealthGoals } from '@/components/fertility/fertilityContent';

interface Props {
  open: boolean;
  onClose: () => void;
}

// 30-minute consultation slots, 10:00 AM to 7:00 PM
const fmt = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
};

const TIME_SLOTS = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let mins = 10 * 60; mins < 19 * 60; mins += 30) {
    const label = `${fmt(mins)} – ${fmt(mins + 30)}`;
    slots.push({ value: label, label });
  }
  return slots;
})();

export function FertilityConsultationModal({ open, onClose }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slotOpen, setSlotOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Prefill name / phone captured in Stage 1
  useEffect(() => {
    if (!open) return;
    try {
      const raw = sessionStorage.getItem('fertilityLead');
      if (raw) {
        const saved = JSON.parse(raw);
        setName(saved.name || '');
        setPhone(saved.phone || '');
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

  if (!open || !mounted) return null;

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) return setError('Please enter your name.');
    const cleanPhone = phone.replace(/\D/g, '').replace(/^91/, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone))
      return setError('Please enter a valid 10-digit mobile number.');
    if (!concern) return setError('Please select your concern.');
    if (location.trim().length < 2) return setError('Please enter your location.');
    if (!date) return setError('Please select a preferred date.');
    if (!time) return setError('Please select a preferred time.');

    setSubmitting(true);
    try {
      const res = await fetch('/api/fertility-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: 'stage2',
          name: name.trim(),
          phone: cleanPhone,
          concern,
          location: location.trim(),
          date,
          time,
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

            <label className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Phone Number</span>
              <div className="mt-1.5 flex items-center overflow-hidden rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] focus-within:border-[#0B4A35]">
                <span className="px-3 font-outfit text-[14px] text-[#2B2B2B]/60">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="w-full bg-transparent py-3 pr-4 font-outfit text-[14px] text-[#1A1A1A] outline-none"
                />
              </div>
            </label>

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

            <label className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Preferred Date</span>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-3 py-3 font-outfit text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#0B4A35]"
              />
            </label>

            <div className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Preferred Time</span>
              <button
                type="button"
                onClick={() => setSlotOpen(true)}
                className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] outline-none transition-colors focus:border-[#0B4A35]"
              >
                <span className={time ? 'text-[#1A1A1A]' : 'text-[#2B2B2B]/50'}>
                  {time || 'Select a time slot'}
                </span>
                <span className="material-symbols-outlined text-[20px] text-[#0B4A35]">schedule</span>
              </button>
            </div>
          </div>

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
              <h4 className="font-outfit text-[16px] font-extrabold text-white">Choose a Time Slot</h4>
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
              {TIME_SLOTS.map((slot) => {
                const selected = time === slot.value;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => {
                      setTime(slot.value);
                      setSlotOpen(false);
                    }}
                    className={`rounded-xl border px-2 py-2.5 font-outfit text-[12.5px] font-semibold transition-colors ${
                      selected
                        ? 'border-[#0B4A35] bg-[#0B4A35] text-white'
                        : 'border-[#0B4A35]/15 bg-[#fffaf7] text-[#2B2B2B] hover:border-[#0B4A35]/40'
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
