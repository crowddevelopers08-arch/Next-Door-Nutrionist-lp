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

const EDGE_GAP = 8;

export function FertilityHeroVideo() {
  const holderRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showPlay, setShowPlay] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Free position of the floating mini-player. `null` = default bottom-right anchor.
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  const clamp = (x: number, y: number) => {
    const card = cardRef.current;
    const w = card?.offsetWidth ?? 0;
    const h = card?.offsetHeight ?? 0;
    return {
      x: Math.min(Math.max(x, EDGE_GAP), window.innerWidth - w - EDGE_GAP),
      y: Math.min(Math.max(y, EDGE_GAP), window.innerHeight - h - EDGE_GAP),
    };
  };

  const startDrag = (e: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    dragRef.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    setPos({ x: rect.left, y: rect.top });
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    if (!d) return;
    setPos(clamp(e.clientX - d.dx, e.clientY - d.dy));
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Keep the player on screen when the viewport changes.
  const positioned = pos !== null;
  useEffect(() => {
    if (!positioned) return;
    const onResize = () => setPos((p) => (p ? clamp(p.x, p.y) : p));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [positioned]);

  // Show a floating mini-player once the hero video scrolls out of view.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFloating(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const showFloating = floating && !dismissed && !modalOpen;

  return (
    <>
      <div id="video" ref={boxRef} className="relative mt-9 w-full max-w-[760px] scroll-mt-28">
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

      {/* Floating mini-player — appears when the hero video scrolls out of view */}
      {showFloating && (
        <div
          ref={cardRef}
          className={`pop-in fixed z-40 w-[220px] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:w-[280px] ${
            pos ? '' : 'bottom-4 right-4 sm:bottom-6 sm:right-6'
          } ${dragging ? 'select-none' : ''}`}
          style={pos ? { left: pos.x, top: pos.y } : undefined}
        >
          {/* Drag handle */}
          <button
            type="button"
            onPointerDown={startDrag}
            onPointerMove={onDragMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            aria-label="Drag video player"
            className={`absolute left-1.5 top-1.5 z-20 flex h-7 w-7 touch-none items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75 ${
              dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">drag_indicator</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Close video"
            className="absolute right-1.5 top-1.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label="Watch the full video"
            className="group relative block aspect-video w-full bg-black"
          >
            <iframe
              className="pointer-events-none absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_VIDEO_ID}&playsinline=1&modestbranding=1&rel=0&showinfo=0`}
              title="Fertility nutrition video preview"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-[#0B1F17]/35 transition-colors group-hover:bg-[#0B1F17]/45">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md">
                <span
                  className="material-symbols-outlined text-[24px] text-[#0B4A35]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  play_arrow
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex w-full items-center justify-center gap-1.5 bg-[#0B4A35] py-2 font-outfit text-[11.5px] font-semibold text-white sm:text-[12px]"
          >
            Watch the Full Video
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      )}

      <FertilityLeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
