'use client';

import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';
import { fertilityFaqItems } from '@/components/fertility/fertilityContent';

export function FertilityFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const supportCard = (
    <div className="overflow-hidden rounded-2xl bg-[#0B4A35] px-5 py-5 shadow-[0_18px_45px_rgba(11,74,53,0.22)]">
      <p className="font-outfit text-[14px] font-bold text-white sm:text-[15px]">
        Still have questions?
      </p>
      <p className="mt-1.5 font-outfit text-[12px] leading-[1.7] text-[#B7D29B] sm:text-[13px]">
        Talk to our team on a quick discovery call and get clarity on your fertility journey.
      </p>
      <FertilityCtaButton className="btn-primary font-outfit mt-4 inline-flex items-center gap-2 rounded-full bg-[#FF92A5] px-5 py-2.5 text-[12px] font-semibold text-[#1A1A1A] shadow-md sm:text-[13px]">
        Book Your Initial Discovery Call
        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
      </FertilityCtaButton>
    </div>
  );

  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#F0D6BE] to-[#F4E0CD] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-20 top-10 h-[320px] w-[320px] rounded-full bg-white/30 blur-[120px] blob-float" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[40%_60%] md:gap-10 lg:gap-12">

          {/* LEFT — heading + support card */}
          <AnimateOnScroll animation="fade-right">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/20 bg-white px-3 py-1">
                <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>help</span>
                <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">Frequently Asked</span>
              </span>

              <h2 className="mt-3 font-outfit text-[24px] font-extrabold leading-[1.14] text-[#1A1A1A] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                Before You Begin, Here&apos;s What Most Women{' '}
                <span className="premium-shine">Ask Us</span>
              </h2>

              {/* Support card — desktop only (sits under the heading) */}
              <div className="mt-6 hidden md:block">{supportCard}</div>
            </div>
          </AnimateOnScroll>

          {/* RIGHT — accordion */}
          <AnimateOnScroll animation="fade-left" delay={100}>
            <div className="rounded-[28px] border border-white/70 bg-white/80 px-5 py-3 shadow-[0_20px_60px_rgba(11,74,53,0.1)] backdrop-blur-sm sm:px-7">
              {fertilityFaqItems.map((item, index) => (
                <div key={item.question} className="border-b border-[#0B4A35]/12 py-4 last:border-b-0">
                  <button
                    className="group flex w-full items-start justify-between gap-4 text-left"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-outfit text-[14px] font-semibold leading-[1.6] text-[#2B2B2B] transition-colors group-hover:text-[#0B4A35] sm:text-[15px]">
                      {index + 1}. {item.question}
                    </span>
                    <span
                      className="material-symbols-outlined flex-shrink-0 text-[#0B4A35] transition-transform duration-300"
                      style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      add
                    </span>
                  </button>

                  {openIndex === index && (
                    <p className="mt-3 font-outfit text-[13px] leading-[1.85] text-[#2B2B2B]/75 sm:text-[14px]">
                      {item.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Support card — mobile only (shows last, below the accordion) */}
          <AnimateOnScroll animation="fade-up" className="md:hidden">
            {supportCard}
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
