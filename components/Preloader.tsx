'use client';
import { useEffect, useState } from 'react';

type Phase = 'loading' | 'exiting' | 'done';

export function Preloader() {
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      return;
    }
    const t1 = setTimeout(() => setPhase('exiting'), 2400);
    const t2 = setTimeout(() => setPhase('done'), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  const exiting = phase === 'exiting';
  const easing = 'cubic-bezier(0.76, 0, 0.24, 1)';

  return (
    <>
      {/* Top curtain */}
      <div
        className="fixed left-0 right-0 top-0 z-[200] h-[51vh] bg-[#1a1c1b] transition-transform duration-700"
        style={{ transform: exiting ? 'translateY(-101%)' : 'translateY(0)', transitionTimingFunction: easing }}
      />

      {/* Bottom curtain */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[200] h-[51vh] bg-[#1a1c1b] transition-transform duration-700"
        style={{ transform: exiting ? 'translateY(101%)' : 'translateY(0)', transitionTimingFunction: easing }}
      />

      {/* Subtle burgundy accent line (top) */}
      <div
        className="fixed left-0 right-0 top-0 z-[202] h-[2px] transition-transform duration-700"
        style={{
          background: 'linear-gradient(90deg, transparent, #492e3b, #d2c3c7, #492e3b, transparent)',
          transform: exiting ? 'translateY(-101%)' : 'translateY(0)',
          transitionTimingFunction: easing,
        }}
      />
      {/* Subtle accent line (bottom) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[202] h-[2px] transition-transform duration-700"
        style={{
          background: 'linear-gradient(90deg, transparent, #492e3b, #d2c3c7, #492e3b, transparent)',
          transform: exiting ? 'translateY(101%)' : 'translateY(0)',
          transitionTimingFunction: easing,
        }}
      />

      {/* Centre content */}
      <div
        className="pointer-events-none fixed inset-0 z-[201] flex flex-col items-center justify-center"
        style={{ opacity: exiting ? 0 : 1, transition: 'opacity 0.3s ease' }}
      >
        {/* Decorative ring behind logo */}
        <div className="preloader-logo-anim relative flex flex-col items-center gap-5">

          {/* Logo inside a light pill so it's visible on the dark curtain */}
          <div
            className="relative flex items-center justify-center rounded-2xl px-8 py-4"
            style={{ background: 'rgba(255,255,255,0.92)', boxShadow: '0 0 40px rgba(210,195,199,0.25)' }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDULIs-D-ozw3cg59e8NKcZgP0C881paksA5k47FsOo62Tk72Ypf-eio4E5T74wI_YC8dzsLzv-Y1aWbCFh3g9iyEDYkZn8_Ww13KuqSH7lh1Hk7vLV-N5V5M0dqMu5kq8LoOReSG7LdVN8YjETzcY6dIK_KcxI0sFMRUBPrlvdSq5rpnlQ0sSt-IMWysouG-pMsUyXi5kr3vzLc1Xmke-OS-mqw3BEzj-MBZBYtHmtag2yqU8P1U-scdpDtndb4nyImNF9Yo2NGKfo"
              alt="Next door nutrition"
              className="h-12 w-auto sm:h-14"
            />
          </div>

          {/* Thin rule */}
          <div
            className="preloader-tagline-anim h-px w-20 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(210,195,199,0.6), transparent)',
              animationDelay: '0.9s',
            }}
          />

          {/* Tagline */}
          <p
            className="preloader-tagline-anim font-body text-[10px] font-semibold uppercase text-white/50 sm:text-[11px]"
            style={{ letterSpacing: '0.4em', animationDelay: '1.05s' }}
          >
            Luxury Skin Care · Anna Nagar
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-12 h-[1.5px] w-32 overflow-hidden rounded-full bg-white/10 sm:mt-14 sm:w-40">
          <div className="preloader-bar-anim h-full rounded-full bg-gradient-to-r from-[#d2c3c7] to-[#492e3b]" />
        </div>
      </div>
    </>
  );
}
