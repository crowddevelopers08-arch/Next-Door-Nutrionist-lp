'use client';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { useState, useRef, useEffect, useCallback } from 'react';
import { WaveText } from '@/components/WaveText';

const videos = [
  {
    url: 'https://res.cloudinary.com/djzexkvyv/video/upload/v1779340499/Chennai_cilent_1_hl2fzf.mp4',
    title: 'Chennai Client Testimonial 1',
  },
  {
    url: 'https://res.cloudinary.com/djzexkvyv/video/upload/v1779340496/Chennai_cilent_2_ny4y6g.mp4',
    title: 'Chennai Client Testimonial 2',
  },
  {
    url: 'https://res.cloudinary.com/djzexkvyv/video/upload/v1779340498/Tiruppur_Feedback_Video_is8xg1.mp4',
    title: 'Tiruppur Client Feedback',
  },
  {
    url: 'https://res.cloudinary.com/djzexkvyv/video/upload/v1779340497/Tiruppur_Happy_Customer_Video_x6l6wk.mp4',
    title: 'Tiruppur Happy Customer',
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % videos.length);
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const prev = () => { setCurrent(c => (c - 1 + videos.length) % videos.length); startTimer(); };
  const next = () => { setCurrent(c => (c + 1) % videos.length); startTimer(); };

  return (
    <section id="testimonials" className="px-4 py-10 sm:px-6 md:px-[80px] md:py-14 lg:py-20 xl:py-24">
      <AnimateOnScroll animation="fade-down" className="mx-auto mb-8 max-w-[1280px] text-center md:mb-10 lg:mb-14">
        <h2 className="font-display text-[28px] font-medium leading-[1.2] text-[#1a1c1b] sm:text-[32px] md:text-[40px] lg:text-[48px]">
          Hear from our Real Clients
        </h2>
        <div className="mt-3 flex justify-center gap-1 md:mt-4 md:gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="material-symbols-outlined text-[20px] text-[#492e3b] md:text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>
              star
            </span>
          ))}
        </div>
      </AnimateOnScroll>

      {/* Mobile carousel — hidden on md+ */}
      <div
        className="mx-auto mb-8 max-w-[1280px] md:hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchStartX.current === null) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
          touchStartX.current = null;
        }}
      >
        <div className="relative mx-auto w-[320px] overflow-hidden rounded-[0.5rem] bg-black shadow-lg" style={{ height: '560px' }}>
          <video
            key={videos[current].url}
            src={videos[current].url}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="btn-icon flex h-8 w-8 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] hover:bg-[#492e3b] hover:text-white"
            aria-label="Previous"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <div className="flex gap-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); startTimer(); }}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#492e3b]' : 'w-2 bg-[#c9b2ba]'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="btn-icon flex h-8 w-8 items-center justify-center rounded-full border border-[#492e3b] text-[#492e3b] hover:bg-[#492e3b] hover:text-white"
            aria-label="Next"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Desktop grid — hidden on mobile */}
      <AnimateOnScroll animation="fade-up" delay={150} className="mx-auto mb-8 hidden max-w-[1280px] gap-5 md:mb-10 md:grid md:grid-cols-2 md:gap-8 lg:mb-14 xl:grid-cols-4">
        {videos.map((video, i) => (
          <div key={i} className="relative overflow-hidden rounded-[0.5rem] bg-black shadow-lg" style={{ height: '560px' }}>
            <video
              src={video.url}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-up" delay={300} className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <a href="#consultation" className="btn-primary w-full rounded-[0.5rem] bg-[#492e3b] px-10 py-4 text-center text-[12px] font-semibold tracking-[0.08em] text-white shadow-md sm:w-auto">
          <WaveText>BOOK YOUR APPOINTMENT</WaveText>
        </a>
        <a href="https://wa.me/919867642689" target="_blank" rel="noopener noreferrer" className="btn-primary flex w-full items-center justify-center gap-2 rounded-[0.5rem] bg-[#25D366] px-10 py-4 text-[12px] font-semibold tracking-[0.08em] text-white sm:w-auto">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <WaveText>WhatsApp Us</WaveText>
        </a>
      </AnimateOnScroll>
    </section>
  );
}
