'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const VIDEO_ID = 'Ap2X2yaWhUY';

/**
 * Hero offer block: the full guidance video followed by the ₹199 CTA that
 * carries the visitor to the checkout page (/fertility/watch).
 */
export function FertilityVideoOffer() {
  // Autoplays muted on load; the poster is only used if autoplay is blocked
  // and the visitor pauses/reloads into the idle state.
  const [playing, setPlaying] = useState(true);

  // Shows a spinner on the CTA while the checkout page loads, so a slow
  // connection doesn't look like a dead button.
  const [navigating, setNavigating] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleCtaClick = () => {
    setNavigating(true);
    // Safety net: if the navigation never completes, give the button back.
    resetTimer.current = setTimeout(() => setNavigating(false), 12000);
  };

  return (
    <div id="video" className="w-full scroll-mt-28">
      {/* Video */}
      <div className="relative mx-auto w-full max-w-[820px]">
        <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-r from-[#FF92A5]/30 via-[#C9A24B]/25 to-[#0B4A35]/25 blur-2xl glow-pulse" />
        <div className="relative w-full overflow-hidden rounded-[24px] border border-white/70 bg-white p-1.5 shadow-[0_30px_80px_rgba(11,74,53,0.22)]">
          {playing ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0`}
                title="Fertility clinical nutrition guidance video"
                allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the video"
              className="group relative block aspect-video w-full overflow-hidden rounded-[18px] bg-black"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="Fertility clinical nutrition guidance video"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-[#0B1F17]/40 transition-colors group-hover:bg-[#0B1F17]/50">
                <span className="pop-in relative flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-[88px] sm:w-[88px]">
                  <span className="play-ring absolute inset-0 rounded-full border-2 border-white/80" />
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

      {/* Offer CTA → checkout page */}
      <div className="mt-10 text-center">
        <Link
          href="/fertility/watch"
          onClick={handleCtaClick}
          aria-busy={navigating}
          className={`btn-primary font-outfit inline-flex items-center justify-center gap-2 rounded-full bg-[#0B4A35] px-9 py-4 text-[14px] font-semibold text-white shadow-lg transition-colors hover:bg-[#0A3D2D] sm:text-[15px] ${
            navigating ? 'pointer-events-none opacity-80' : ''
          }`}
        >
          {navigating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Opening secure checkout…
            </>
          ) : (
            <>
              Book a 1:1 Discovery Call with Our Experts for Just ₹199
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </Link>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/payicons.png"
          alt="Secure payment via Razorpay. Pick your slot right after."
          className="mx-auto mt-3 h-auto w-full max-w-[520px]"
        />
        <p className="font-outfit mt-2 flex items-center justify-center gap-1.5 text-[12px] text-[#2B2B2B]/55">
          <span className="material-symbols-outlined text-[15px] text-[#0B4A35]">lock</span>
          Secure payment via Razorpay · Pick your slot right after
        </p>
      </div>
    </div>
  );
}
