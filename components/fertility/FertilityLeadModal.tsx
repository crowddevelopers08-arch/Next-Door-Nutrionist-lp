'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fertilityHealthGoals } from '@/components/fertility/fertilityContent';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function FertilityLeadModal({ open, onClose }: Props) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) return setError('Please enter your name.');
    const cleanPhone = phone.replace(/\D/g, '').replace(/^91/, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone))
      return setError('Please enter a valid 10-digit mobile number.');
    if (!concern) return setError('Please select your concern.');

    setSubmitting(true);
    try {
      const res = await fetch('/api/fertility-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: 'stage1',
          name: name.trim(),
          phone: cleanPhone,
          concern,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitting(false);
        return setError(data.error || 'Something went wrong. Please try again.');
      }

      // Persist for Stage 2 prefill on the watch page
      sessionStorage.setItem(
        'fertilityLead',
        JSON.stringify({ name: name.trim(), phone: cleanPhone, concern })
      );

      router.push('/fertility/watch');
    } catch {
      setSubmitting(false);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fade-in-backdrop absolute inset-0 bg-[#0B1F17]/60 backdrop-blur-sm"
        onClick={submitting ? undefined : onClose}
      />

      {/* Card */}
      <div className="pop-in relative w-full max-w-[440px] overflow-hidden rounded-[26px] bg-white shadow-[0_30px_90px_rgba(11,74,53,0.35)]">
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
            Watch the Full Video
          </h3>
          <p className="relative mt-1 font-outfit text-[12.5px] text-[#B7D29B]">
            Enter your details to unlock the complete guidance video.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
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

          <label className="mt-4 block">
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

          <label className="mt-4 block">
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

          {error && (
            <p className="mt-3 font-outfit text-[12.5px] font-medium text-[#D6497E]">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary font-outfit mt-5 flex w-full items-center justify-center rounded-full bg-[#0B4A35] px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg disabled:opacity-70"
          >
            {submitting ? 'Submitting…' : 'Watch the Full Video'}
          </button>

          <p className="mt-3 text-center font-outfit text-[11px] text-[#2B2B2B]/50">
            Your details are safe with us and never shared.
          </p>
        </form>
      </div>
    </div>
  );
}
