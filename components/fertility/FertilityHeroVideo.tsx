'use client';

import { useEffect, useRef, useState } from 'react';
import { FertilityLeadModal } from '@/components/fertility/FertilityLeadModal';

const YT_VIDEO_ID = 'UWZ_QQNKmes';
const TEASER_SECONDS = 3;

// Load the YouTube IFrame API script once, shared across instances.
let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  const w = window as unknown as { YT?: { Player?: unknown }; onYouTubeIframeAPIReady?: () => void };
  if (w.YT && w.YT.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export function FertilityHeroVideo() {
  const holderRef = useRef<HTMLDivElement>(null);
  const [showPlay, setShowPlay] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let player: { pauseVideo: () => void; mute: () => void; playVideo: () => void; destroy: () => void } | null = null;
    let teaserTimer: ReturnType<typeof setTimeout> | null = null;
    let scheduled = false;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !holderRef.current) return;
      const YT = (window as unknown as { YT: any }).YT;

      player = new YT.Player(holderRef.current, {
        videoId: YT_VIDEO_ID,
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          showinfo: 0,
        },
        events: {
          onReady: (e: { target: { mute: () => void; playVideo: () => void } }) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: { data: number; target: { pauseVideo: () => void } }) => {
            // 1 === playing
            if (e.data === 1 && !scheduled) {
              scheduled = true;
              teaserTimer = setTimeout(() => {
                e.target.pauseVideo();
                setShowPlay(true);
              }, TEASER_SECONDS * 1000);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (teaserTimer) clearTimeout(teaserTimer);
      try {
        player?.destroy();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <>
      <div id="video" className="relative mt-9 w-full max-w-[760px] scroll-mt-28">
        {/* Glow frame */}
        <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-r from-[#FF92A5]/30 via-[#C9A24B]/25 to-[#0B4A35]/25 blur-2xl glow-pulse" />

        <div className="relative w-full overflow-hidden rounded-[24px] border border-white/70 bg-white p-1.5 shadow-[0_30px_80px_rgba(11,74,53,0.22)]">
          <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-black">
            {/* YT API replaces this div with the player iframe */}
            <div ref={holderRef} className="absolute inset-0 h-full w-full" />

            {/* Play button — pops up after the 3s teaser and opens the lead form */}
            {showPlay && (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                aria-label="Play the full video"
                className="absolute inset-0 z-10 flex items-center justify-center bg-[#0B1F17]/45 transition-colors hover:bg-[#0B1F17]/55"
              >
                <span className="pop-in relative flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-[88px] sm:w-[88px]">
                  <span className="play-ring absolute inset-0 rounded-full border-2 border-white/80" />
                  <span
                    className="material-symbols-outlined text-[38px] text-[#0B4A35] sm:text-[46px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    play_arrow
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <FertilityLeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
