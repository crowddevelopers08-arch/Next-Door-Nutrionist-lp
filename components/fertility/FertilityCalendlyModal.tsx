'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CALENDLY_EMBED_URL =
  'https://calendly.com/ayesha-s-nextdoornutritionist/call-discovery-fertility?primary_color=106d2d&hide_event_type_details=1&hide_gdpr_banner=1';

export function FertilityCalendlyModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

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

      <iframe
        src={CALENDLY_EMBED_URL}
        title="Schedule time with me"
        className="h-screen w-screen border-0"
      />
    </div>,
    document.body
  );
}
