'use client';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { label: 'Programs',     href: '#programs' },
  { label: 'How It Works', href: '#process' },
  { label: 'About Us',     href: '#about' },
  { label: 'Our Doctor',   href: '#doctor' },
  { label: 'FAQ',          href: '#faq' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#0B4A3520] bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 md:px-[80px] md:py-4">

        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="/HNC-LOGO-1.png"
            alt="Hormone Nutrition Clinic"
            width={200}
            height={60}
            className="h-[48px] w-auto object-contain md:h-[56px]"
            priority
          />
        </a>

        {/* Desktop nav links */}
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

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#consultation"
            className="font-outfit hidden rounded-full bg-[#0B4A35] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#093c2a] sm:inline-flex md:px-7 md:py-3 md:text-[14px]"
          >
            Book Consultation
          </a>

          {/* Hamburger */}
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

      {/* Mobile dropdown */}
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
            <a
              href="#consultation"
              className="font-outfit mt-3 inline-flex justify-center rounded-full bg-[#0B4A35] px-5 py-2.5 text-[14px] font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
