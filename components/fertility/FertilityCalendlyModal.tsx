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

// Fallback path only: Calendly also accepts name/email as query params.
function iframeUrl(prefill?: CalendlyPrefill) {
  const url = new URL(CALENDLY_URL);
  if (prefill?.name) url.searchParams.set('name', prefill.name);
  if (prefill?.email) url.searchParams.set('email', prefill.email);
  return url.toString();
}

export function FertilityCalendlyModal({ open, onClose, prefill }: Props) {
  const [mounted, setMounted] = useState(false);
  // Start on the official widget; drop to a plain iframe if it can't init.
  const [mode, setMode] = useState<'widget' | 'iframe'>('widget');
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

  useEffect(() => {
    if (!open || !mounted || mode !== 'widget') return;

    let cancelled = false;

    loadCalendlyWidget()
      .then(() => {
        const parent = containerRef.current;
        if (cancelled || !parent) return;

        // Guard the method itself, not just the namespace — a partially
        // initialised Calendly object is exactly what the data-url crash left
        // behind, and it is truthy.
        if (typeof window.Calendly?.initInlineWidget !== 'function') {
          throw new Error('Calendly widget unavailable');
        }

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
        // The client has already paid by this point — always show a calendar.
        if (!cancelled) setMode('iframe');
      });

    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [open, mounted, mode, prefill]);

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

      {mode === 'widget' ? (
        // No `calendly-inline-widget` class here on purpose. widget.js auto-scans
        // for that class on load and reads the URL off `data-url`; with no such
        // attribute it throws before `window.Calendly` is fully assigned, which
        // leaves the modal blank. We init manually instead.
        <div ref={containerRef} className="h-full w-full" style={{ minWidth: 320 }} />
      ) : (
        <iframe
          src={iframeUrl(prefill)}
          title="Select a Date & Time - Calendly"
          className="h-full w-full border-0"
        />
      )}
    </div>,
    document.body
  );
}
