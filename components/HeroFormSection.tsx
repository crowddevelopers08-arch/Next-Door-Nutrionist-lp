'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const TRUST_ITEMS = [
  '4,500+ Clients Served',
  'Clients Across 45+ Countries',
  'Personalized Plans Updated Regularly',
];

const HEALTH_GOALS = [
  'Weight Management',
  'PCOS / PCOD',
  'Diabetes Control',
  'Fertility Nutrition',
  'IVF / IUI Preparation',
  'General Wellness',
];

export function HeroFormSection() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', phone: '', healthGoal: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    if (!form.phone.trim()) { setError('Please enter your phone number.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          location: form.location,
          healthGoal: form.healthGoal,
          pageUrl: 'Next Door Nutritionist – Hero Form',
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); return; }
      router.push('/thank-you');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="consultation" className="overflow-hidden bg-gradient-to-br from-[#FFF0EB] via-[#FFFCFA] to-[#F4FBF5] px-4 py-8 sm:px-6 sm:py-10 md:px-[60px] md:py-14 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_280px_320px] lg:items-stretch lg:gap-8 xl:grid-cols-[1fr_310px_360px] xl:gap-10">

          {/* ── LEFT ── */}
          <AnimateOnScroll animation="fade-right" className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center">

            {/* Eyebrow badge */}
            <div className="mb-4 inline-flex max-w-[300px] items-center gap-2 rounded-full border border-[#FF92A5]/40 bg-[#FF92A5]/[0.08] px-3.5 py-1.5 sm:max-w-none">
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#FF92A5]" />
              <span className="font-outfit text-[10px] font-semibold leading-[1.4] text-[#2B2B2B] sm:text-[12px]">
                Personalized Nutrition for PCOS, Fertility, Diabetes &amp; Weight Management
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-outfit text-[24px] font-extrabold leading-[1.18] text-[#1A1A1A] sm:text-[28px] md:text-[34px] lg:text-[30px] xl:text-[36px] 2xl:text-[42px]">
              Your Body Doesn't Need Another{' '}
              <span className="text-[#FF92A5]">Template Diet.</span>
              <br />
              It Needs a Plan Built{' '}
              <span className="text-[#0B4A35]">Around You.</span>
            </h1>

            {/* Mobile-only arch image — between heading and paragraph */}
            <div className="mt-6 block w-full lg:hidden">
              <div className="relative mx-auto w-[220px] sm:w-[260px]">
                <div
                  className="absolute inset-0 -m-6 rounded-full blur-3xl"
                  style={{ backgroundColor: '#F4E0CD', opacity: 0.55 }}
                />
                <div className="relative h-[300px] w-full overflow-hidden rounded-t-[9999px] border-[3px] border-[#E8C5AE] bg-[#F4E0CD] sm:h-[360px]">
                  <Image
                    src="/bandoc.png"
                    alt="Next Door Nutritionist"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Paragraph */}
            <p className="mt-4 max-w-[480px] font-outfit text-[13px] leading-[1.8] text-[#2B2B2B]/65 sm:text-[14px] lg:max-w-none">
              At Next Door Nutritionist, we create nutrition plans based on your health condition, reports, lifestyle, food preferences, and goals — with regular support and tracking.
            </p>

            {/* CTA buttons — stacked on mobile, side-by-side from sm */}
            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#booking-form"
                className="font-outfit inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0B4A35] px-6 py-3.5 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:w-auto sm:text-[14px]"
              >
                Book Your Nutrition Consultation
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </span>
              </a>
              <a
                href="#programs"
                className="font-outfit inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0B4A35]/30 bg-white/70 px-6 py-3.5 text-[13px] font-semibold text-[#0B4A35] backdrop-blur-sm transition-colors hover:bg-white sm:w-auto sm:text-[14px]"
              >
                Explore Our Programs
              </a>
            </div>

            {/* Trust marquee */}
            <div className="mt-5 w-full max-w-full overflow-hidden lg:max-w-[520px]">
              <div className="marquee-track flex gap-3" style={{ width: 'max-content', animationDuration: '14s' }}>
                {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0B4A35]/[0.07] px-3 py-1.5 font-outfit text-[11px] font-semibold text-[#0B4A35] sm:text-[12px]"
                  >
                    <span
                      className="material-symbols-outlined text-[13px] text-[#B7D29B]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      check_circle
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── CENTER: arch image — desktop only ── */}
          <AnimateOnScroll animation="fade-up" delay={80} className="hidden lg:flex lg:items-end lg:justify-center">
            <div className="relative w-full">
              <div
                className="absolute inset-0 -m-8 rounded-full blur-3xl"
                style={{ backgroundColor: '#F4E0CD', opacity: 0.55 }}
              />
              <div className="relative h-[400px] w-full overflow-hidden rounded-t-[9999px] border-[3px] border-[#E8C5AE] bg-[#F4E0CD] xl:h-[440px]">
                <Image
                  src="/bandoc.png"
                  alt="Next Door Nutritionist"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* hidden anchor so mobile CTAs jump straight to the form card */}
          <span id="booking-form" className="sr-only" />

          {/* ── RIGHT: form card ── */}
          <AnimateOnScroll animation="fade-left" delay={140} className="flex flex-col justify-center">
            <div className="mx-auto w-full max-w-[480px] lg:mx-0 lg:max-w-none">
              <form onSubmit={handleSubmit} noValidate>
                <div className="rounded-[1.5rem] bg-[#0B4A35] p-5 sm:p-6 xl:p-7">

                  <h3 className="mb-4 text-center font-outfit text-[17px] font-extrabold leading-[1.25] text-white xl:text-[20px]">
                    Book Your Nutrition<br />Consultation
                  </h3>

                  <div className="flex flex-col gap-3">

                    {/* Full Name */}
                    <div>
                      <label className="mb-1.5 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="w-full rounded-full bg-white/[0.1] px-4 py-2.5 font-outfit text-[13px] text-white outline-none transition placeholder:text-white/30 focus:bg-white/[0.16]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                        Phone Number
                      </label>
                      <div className="flex items-center gap-1.5 rounded-full bg-white/[0.1] px-4 py-2.5 transition focus-within:bg-white/[0.16]">
                        <span className="shrink-0 font-outfit text-[13px] font-semibold text-white/50">+91</span>
                        <span className="shrink-0 text-white/20">|</span>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="10-digit number"
                          maxLength={10}
                          autoComplete="tel"
                          className="min-w-0 flex-1 bg-transparent font-outfit text-[13px] text-white outline-none placeholder:text-white/30"
                        />
                      </div>
                    </div>

                    {/* Health Goal */}
                    <div>
                      <label className="mb-1.5 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                        Health Goal
                      </label>
                      <div className="relative">
                        <select
                          name="healthGoal"
                          value={form.healthGoal}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-full bg-white/[0.1] px-4 py-2.5 font-outfit text-[13px] text-white/50 outline-none transition focus:bg-white/[0.16]"
                        >
                          <option value="" disabled className="text-[#2B2B2B]">Select health goal</option>
                          {HEALTH_GOALS.map(g => (
                            <option key={g} value={g} className="text-[#2B2B2B]">{g}</option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-white/35">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="mb-1.5 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-white/45">
                        Your Location / Area
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Enter your area or location"
                        autoComplete="address-level2"
                        className="w-full rounded-full bg-white/[0.1] px-4 py-2.5 font-outfit text-[13px] text-white outline-none transition placeholder:text-white/30 focus:bg-white/[0.16]"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-3 text-center font-outfit text-[11px] font-semibold text-[#FF92A5]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-5 w-full rounded-full bg-[#FF92A5] py-3.5 font-outfit text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#f07a93] disabled:opacity-70"
                  >
                    {loading ? 'Submitting…' : 'Book Your Consultation'}
                  </button>
                </div>
              </form>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
