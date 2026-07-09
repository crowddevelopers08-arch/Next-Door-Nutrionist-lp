'use client';

import { useState } from 'react';
import { FertilityLeadModal } from '@/components/fertility/FertilityLeadModal';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** A CTA that opens the Stage-1 lead form modal instead of navigating. */
export function FertilityCtaButton({ className, children, onClick }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick?.();
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </button>
      <FertilityLeadModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
