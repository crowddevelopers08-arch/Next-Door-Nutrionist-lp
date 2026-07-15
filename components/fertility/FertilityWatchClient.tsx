'use client';

import { useState } from 'react';
import { FertilityCalendlyModal } from '@/components/fertility/FertilityCalendlyModal';

export function FertilityWatchClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [playing, setPlaying] = useState(true);

  return (
    <section className="relative overflow-hidden bg-[#FFF5F0] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-12">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/18 blur-[120px] blob-float" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[#0B4A35]/12 blur-[120px] blob-float-2" />

      <div className="relative mx-auto max-w-[860px] text-center">
        <h1 className="font-outfit text-[26px] font-extrabold leading-[1.15] text-[#1A1A1A] sm:text-[32px] md:text-[38px]">
          Your Complete Fertility{' '}
          <span className="text-[#0B4A35] decoration-[6px] underline-offset-[6px]">
            Nutrition Guidance
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-[600px] font-outfit text-[14px] leading-[1.85] text-[#2B2B2B]/75 sm:text-[15px]">
          Watch the full video below, then book a one-on-one online consultation to get a plan built around your body.
        </p>

        {/* Full video */}
        <div className="relative mx-auto mt-9 w-full max-w-[820px]">
          <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-r from-[#FF92A5]/25 via-[#C9A24B]/20 to-[#0B4A35]/20 blur-2xl" />
          <div className="relative w-full overflow-hidden rounded-[24px] border border-white/70 bg-white p-1.5 shadow-[0_30px_80px_rgba(11,74,53,0.22)]">
            {playing ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/Ap2X2yaWhUY?autoplay=1&mute=1&playsinline=1&rel=0"
                  title="Complete fertility nutrition guidance video"
                  allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the full video"
                className="group relative block aspect-video w-full overflow-hidden rounded-[18px] bg-black"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://img.youtube.com/vi/Ap2X2yaWhUY/maxresdefault.jpg"
                  alt="Complete fertility nutrition guidance video"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-[#0B1F17]/35 transition-colors group-hover:bg-[#0B1F17]/45">
                  <span className="pop-in flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-[88px] sm:w-[88px]">
                    <span
                      className="material-symbols-outlined text-[38px] text-[#0B4A35] sm:text-[46px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      play_arrow
                    </span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Book online consultation */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-primary font-outfit inline-flex items-center justify-center gap-2 rounded-full bg-[#0B4A35] px-9 py-4 text-[14px] font-semibold text-white shadow-lg sm:text-[15px] hover:bg-[#0A3D2D] transition-colors"
          >
            Book an Online Consultation
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <FertilityCalendlyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
