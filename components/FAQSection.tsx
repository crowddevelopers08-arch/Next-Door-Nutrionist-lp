'use client';
import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const faqItems = [
  { question: 'Is this only for weight loss?', answer: 'No. We support fertility, PCOS/PCOD, IVF/IUI preparation, diabetes management, and weight management.' },
  { question: 'Will I get a fixed diet chart?', answer: 'No. Your plan is personalized based on your reports, lifestyle, food preferences, and health goals.' },
  { question: 'How often will my plan be updated?', answer: 'Plans are updated regularly based on your progress, routine, and body response.' },
  { question: 'Do I need to stop all my favorite foods?', answer: 'Not necessarily. The goal is to create a practical plan that fits your lifestyle while improving your health habits.' },
  { question: 'Do you provide supplement guidance?', answer: 'Yes, supplement support is suggested only when needed and based on individual requirements.' },
  { question: 'Is this helpful for PCOS/PCOD?', answer: 'Yes, the program supports PCOS/PCOD through nutrition, lifestyle correction, habit changes, and regular monitoring.' },
  { question: 'Can this help before IVF/IUI?', answer: 'Yes, nutrition support can help you prepare your body better before IVF/IUI. It does not guarantee outcomes, but it can support better preparation and health management.' },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#F4E0CD] px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12">
      <div className="mx-auto max-w-3xl">

        <AnimateOnScroll animation="fade-down">
          <div className="mb-4 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/30 bg-white/80 px-3 py-1">
              <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">
                Frequently Asked Questions
              </span>
            </span>
          </div>

          <h2 className="mb-6 text-center font-outfit text-[18px] font-bold leading-[1.2] text-[#2B2B2B] sm:text-[20px] md:mb-8 md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]">
            Questions Before You Start?{' '}
            <span className="block text-[#0B4A35]">We've Answered Them</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={150}>
          <div className="space-y-0.5">
            {faqItems.map((item, index) => (
              <div key={item.question} className="border-b border-[#0B4A35]/20 py-2.5 md:py-3">
                <button
                  className="group flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-outfit text-[12px] font-semibold leading-[1.5] text-[#2B2B2B] transition-colors group-hover:text-[#0B4A35] sm:text-[13px] md:text-[13px] lg:text-[14px] xl:text-[15px]">
                    {item.question}
                  </span>
                  <span
                    className="material-symbols-outlined flex-shrink-0 text-[#0B4A35] transition-transform duration-300 text-[18px]"
                    style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    add
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-2 font-outfit text-[11px] leading-[1.75] text-[#2B2B2B]/80 sm:text-[12px] md:mt-3 md:text-[12px] lg:text-[13px] xl:text-[13px]">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={300} className="mt-7 flex justify-center md:mt-9">
          <a
            href="#consultation"
            className="font-outfit flex items-center gap-2 rounded-full bg-[#0B4A35] px-7 py-3 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:text-[14px] md:px-9 lg:text-[15px]"
          >
            Begin My Health Journey
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
