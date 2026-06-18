'use client';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const results = [
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346399/Eye1_nuatbd.png',
    alt: 'Before and after pigmentation treatment result',
    imageClassName: 'object-cover object-center',
    width: 1600,
    height: 1600,
  },
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346399/Eye2_qj1s4e.png',
    alt: 'Before and after skin brightening treatment result',
    imageClassName: 'object-cover object-center',
    width: 1254,
    height: 1254,
  },
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346400/Eye3_jca6ik.png',
    alt: 'Before and after acne scar treatment side profile result',
    imageClassName: 'object-cover object-[center_38%]',
    width: 1122,
    height: 1348,
  },
  {
    src: 'https://res.cloudinary.com/djzexkvyv/image/upload/v1779346400/Eye4_ck61bm.png',
    alt: 'Before and after acne scar smoothing side profile result',
    imageClassName: 'object-cover object-[center_42%]',
    width: 1086,
    height: 1397,
  },
];

export function BeforeAfterSection() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % results.length);
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const prev = () => { setCurrent(c => (c - 1 + results.length) % results.length); startTimer(); };
  const next = () => { setCurrent(c => (c + 1) % results.length); startTimer(); };

  return (
    <section id="showcase" className="bg-[#f4f3f1] px-4 py-10 sm:px-6 md:px-[80px] md:py-14 lg:py-20 xl:py-24">
      {/* ── Content ── */}
      <AnimateOnScroll animation="fade-down" className="mx-auto mb-8 max-w-[1280px] text-center md:mb-10 lg:mb-14">
        <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#492e3b]">
          You can be next
        </span>
        <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.2] text-[#1a1c1b] sm:text-[32px] md:text-[48px] md:font-semibold md:leading-[1.1] md:tracking-[-0.02em] lg:text-[64px]">
          Get Best Skin Treatments in Chennai
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-in" delay={150} className="mx-auto max-w-[1400px]">
        <div
          className="md:hidden"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - event.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
              diff > 0 ? next() : prev();
            }
            touchStartX.current = null;
          }}
        >
          <div className="overflow-hidden rounded-[0.75rem] bg-white shadow-xl">
            <div className="relative h-[320px] w-full overflow-hidden">
              <Image
                src={results[current].src}
                alt={results[current].alt}
                fill
                quality={100}
                sizes="100vw"
                className={results[current].imageClassName}
              />
            </div>
            <div className="px-3 py-3 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#492e3b]">
                Result {current + 1}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="btn-icon flex h-8 w-8 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] hover:bg-[#492e3b] hover:text-white"
              aria-label="Previous result"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="flex gap-2">
              {results.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrent(index); startTimer(); }}
                  className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'w-6 bg-[#492e3b]' : 'w-2 bg-[#c9b2ba]'}`}
                  aria-label={`Show result ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="btn-icon flex h-8 w-8 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] hover:bg-[#492e3b] hover:text-white"
              aria-label="Next result"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="hidden grid-cols-4 gap-4 md:grid md:gap-4 lg:gap-6">
          {results.map((result, index) => (
            <div key={result.src} className="overflow-hidden rounded-[0.75rem] bg-white shadow-xl">
              <div className="relative h-[250px] w-full overflow-hidden lg:h-[270px] xl:h-[290px]">
                <Image
                  src={result.src}
                  alt={result.alt}
                  fill
                  quality={100}
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 24vw, 100vw"
                  className={result.imageClassName}
                  priority={index < 2}
                />
              </div>
              <div className="px-3 py-3 text-center">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#492e3b]">
                  Result {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
