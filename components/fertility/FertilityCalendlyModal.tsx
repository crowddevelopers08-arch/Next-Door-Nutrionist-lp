'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { loadCalendlyWidget, type CalendlyPrefill } from '@/components/fertility/calendly';

interface Props {
  open: boolean;
  onClose: () => void;
  prefill?: CalendlyPrefill;
}

const CALENDLY_URL =
  'https://calendly.com/ayesha-s-nextdoornutritionist/call-discovery-fertility?hide_event_type_details=1&hide_gdpr_banner=1';

export function FertilityCalendlyModal({ open, onClose, prefill }: Props) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Mount the inline widget once the modal is on screen. Prefill goes through
  // Calendly's own API rather than query params, which is what it officially
  // supports for the inline embed.
  useEffect(() => {
    if (!open || !mounted) return;

    let cancelled = false;
    setFailed(false);

    loadCalendlyWidget()
      .then(() => {
        const parent = containerRef.current;
        if (cancelled || !parent || !window.Calendly) return;
        parent.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: parent,
          prefill: {
            ...(prefill?.name ? { name: prefill.name } : {}),
            ...(prefill?.email ? { email: prefill.email } : {}),
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      // Tear the widget down so reopening builds a clean one.
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [open, mounted, prefill]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2B2B2B] shadow-sm transition-colors hover:bg-[#f4f4f4]"
      >
        <span className="material-symbols-outlined text-[22px]">close</span>
      </button>

      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="material-symbols-outlined text-[34px] text-[#0B4A35]">event_busy</span>
          <p className="font-outfit text-[15px] font-semibold text-[#1A1A1A]">
            The booking calendar didn&rsquo;t load.
          </p>
          <p className="font-outfit text-[13px] text-[#2B2B2B]/60">
            Your payment went through. Please call us and we&rsquo;ll confirm your slot.
          </p>
          <a
            href="tel:+919867642689"
            className="font-outfit mt-1 inline-flex items-center gap-2 rounded-full bg-[#0B4A35] px-6 py-3 text-[13px] font-semibold text-white"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            +91 98676 42689
          </a>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="calendly-inline-widget h-full w-full"
          style={{ minWidth: 320 }}
        />
      )}
    </div>,
    document.body
  );
}
