'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  images: string[];
}

/** Pixels per second the wall drifts on its own. */
const SCROLL_SPEED = 34;
/** How long auto-scroll stays paused after an arrow click. */
const RESUME_DELAY = 1400;

/**
 * Auto-scrolling wall of client screenshots with prev/next arrows and a
 * click-to-zoom lightbox. The list is rendered twice so the drift can loop
 * seamlessly by resetting scrollLeft at the halfway mark.
 */
export function FertilityTestimonialWall({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const pause = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    pausedRef.current = false;
  }, []);

  // Continuous drift, paused on hover/touch, while a card is zoomed, or when
  // the visitor prefers reduced motion.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const delta = now - last;
      last = now;

      if (!pausedRef.current && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += (delta / 1000) * SCROLL_SPEED;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, []);

  /** Step the wall one card left or right, briefly holding the auto-scroll. */
  const nudge = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;

    pause();

    const card = el.firstElementChild as HTMLElement | null;
    const gap = 16;
    const distance = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    const half = el.scrollWidth / 2;

    // Jump a lap so the arrows never run out of runway at either end.
    if (direction === -1 && el.scrollLeft < distance) el.scrollLeft += half;
    else if (direction === 1 && el.scrollLeft > half) el.scrollLeft -= half;

    el.scrollBy({ left: direction * distance, behavior: 'smooth' });

    resumeRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  }, [pause]);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  // Lock the page, hold the drift, and wire keyboard controls while zoomed.
  useEffect(() => {
    if (lightboxIndex === null) return;

    pause();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      resume();
    };
  }, [lightboxIndex, pause, resume, showPrev, showNext]);

  return (
    <>
      <div
        className="relative mt-12 max-[470px]:mt-8"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        <div
          ref={trackRef}
          className="scrollbar-hide overflow-x-auto overscroll-x-contain"
        >
          <div className="flex w-max gap-4">
            {[...images, ...images].map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i % images.length)}
                aria-label="View this client message full size"
                className="group w-[210px] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF92A5] sm:w-[240px]"
              >
                <Image
                  src={src}
                  alt="Client testimonial message"
                  width={260}
                  height={457}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 210px, 240px"
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous testimonials"
          className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0B4A35]/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0B4A35] sm:left-3 sm:h-12 sm:w-12"
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[24px]">chevron_left</span>
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next testimonials"
          className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0B4A35]/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#0B4A35] sm:right-3 sm:h-12 sm:w-12"
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[24px]">chevron_right</span>
        </button>
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Client testimonial"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous testimonial"
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>

          <Image
            src={images[lightboxIndex]}
            alt="Client testimonial message"
            width={900}
            height={1580}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-[86vh] w-auto max-w-[86vw] rounded-2xl object-contain shadow-2xl sm:max-w-[520px]"
            sizes="(max-width: 640px) 86vw, 520px"
            priority
          />

          <p className="font-outfit absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] text-white/80">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
