'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';

const navLinks = [
  { label: 'Who Is This For', href: '#who-is-this-for' },
  { label: 'Process', href: '#process' },
  { label: 'About Clinic', href: '#about-clinic' },
  { label: 'FAQ', href: '#faq' },
];

export function FertilityHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#0B4A3520] bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="absolute inset-x-0 bottom-0 h-px gold-hairline opacity-60" />
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 md:px-[80px] md:py-4">
        <a href="/fertility" className="flex-shrink-0">
          <Image
            src="https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy"
            alt="Hormone Nutrition Clinic"
            width={200}
            height={60}
            className="h-[48px] w-auto object-contain md:h-[56px]"
            priority
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-outfit relative py-1 text-[13px] font-semibold tracking-[0.04em] text-[#444] transition-colors duration-200 hover:text-[#0B4A35]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <FertilityCtaButton className="btn-primary font-outfit hidden rounded-full bg-[#0B4A35] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm sm:inline-flex md:px-7 md:py-3 md:text-[14px]">
            Book Your Initial Discovery Call
          </FertilityCtaButton>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#0B4A35] transition-colors hover:bg-[#0B4A3510] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#0B4A3515] bg-white px-4 pb-5 pt-3 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-outfit block rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#333] transition-colors hover:bg-[#0B4A3508] hover:text-[#0B4A35]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <FertilityCtaButton
              className="font-outfit mt-3 inline-flex justify-center rounded-full bg-[#0B4A35] px-5 py-2.5 text-[14px] font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Book Your Initial Discovery Call
            </FertilityCtaButton>
          </div>
        </div>
      )}
    </header>
  );
}
