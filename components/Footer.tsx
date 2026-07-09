import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const programs = [
  { label: 'Fertility Nutrition',       href: '#programs' },
  { label: 'PCOS / PCOD Nutrition',     href: '#programs' },
  { label: 'IVF / IUI Preparation',     href: '#programs' },
  { label: 'Diabetes Management',       href: '#programs' },
  { label: 'Weight Management',         href: '#programs' },
];

const quickLinks = [
  { label: 'About Us',       href: '#about' },
  { label: 'How It Works',   href: '#process' },
  { label: 'Our Doctor',     href: '#doctor' },
  { label: 'FAQ',            href: '#faq' },
  { label: 'Book Consultation', href: '#consultation' },
];

export function Footer() {
  return (
    <footer className="bg-[#0B4A35]">

      {/* ── Main grid ── */}
      <AnimateOnScroll
        animation="fade-up"
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 md:grid-cols-4 md:gap-10 md:px-[60px] md:py-10"
      >

        {/* Brand column */}
        <div className="space-y-5 sm:col-span-2 md:col-span-1">
          <Image
            src="https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy"
            alt="Hormone Nutrition Clinic"
            width={180}
            height={60}
            className="h-[60px] w-auto object-contain brightness-0 invert"
          />
          <p className="font-outfit max-w-[260px] text-[14px] leading-[1.75] text-[#B7D29B]">
            Personalized nutrition for PCOS, Fertility, Diabetes &amp; Weight Management — built around your body, not a template.
          </p>

          {/* Social icons */}
          <div className="flex flex-col gap-3 pt-1">
            {/* Instagram — Next Door Nutritionist */}
            <a
              href="https://www.instagram.com/nextdoornutritionist/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Next Door Nutritionist on Instagram"
              className="flex items-center gap-2.5 text-[#B7D29B] transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B7D29B40] transition-colors hover:border-[#B7D29B] hover:bg-[#B7D29B20]">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="font-outfit text-[12px] font-medium">@nextdoornutritionist</span>
            </a>

            {/* Instagram — Hormone Nutrition Clinic */}
            <a
              href="https://www.instagram.com/hormonenutritionclinic/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hormone Nutrition Clinic on Instagram"
              className="flex items-center gap-2.5 text-[#B7D29B] transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B7D29B40] transition-colors hover:border-[#B7D29B] hover:bg-[#B7D29B20]">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="font-outfit text-[12px] font-medium">@hormonenutritionclinic</span>
            </a>
          </div>
        </div>

        {/* Programs */}
        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Our Programs
          </h4>
          <ul className="space-y-3">
            {programs.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-outfit flex items-center gap-2 text-[13.5px] leading-[1.5] text-[#B7D29B] transition-colors hover:text-white"
                >
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FF92A5]" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-outfit flex items-center gap-2 text-[13.5px] leading-[1.5] text-[#B7D29B] transition-colors hover:text-white"
                >
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FF92A5]" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Contact Us
          </h4>
          <div className="space-y-4">
            <a
              href="mailto:hormonenutritionclinic@gmail.com"
              className="group flex items-start gap-3"
            >
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#FF92A5]">mail</span>
              <span className="font-outfit text-[13.5px] leading-[1.6] text-[#B7D29B] transition-colors group-hover:text-white">
                hormonenutritionclinic@gmail.com
              </span>
            </a>
            <a href="tel:+919867642689" className="group flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-[#FF92A5]">call</span>
              <span className="font-outfit text-[14px] font-semibold text-white transition-colors group-hover:text-[#B7D29B]">
                +91 98676 42689
              </span>
            </a>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#FF92A5]">location_on</span>
              <span className="font-outfit text-[13.5px] leading-[1.6] text-[#B7D29B]">
                3rd Floor, Westend Mall,<br />301-A, Road No. 36, Jubilee Hills,<br />Hyderabad, Telangana 500033
              </span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#consultation"
            className="font-outfit mt-2 inline-flex items-center gap-2 rounded-full bg-[#FF92A5] px-5 py-2.5 text-[13px] font-semibold text-[#2B2B2B] shadow-sm transition-colors hover:bg-[#ff7a90]"
          >
            Book Consultation
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

      </AnimateOnScroll>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#ffffff15]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 md:px-[60px]">
          <p className="font-outfit text-[12px] text-[#B7D29B80]">
            © 2026 Next Door Nutritionist. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B7D29B60] transition-colors hover:text-[#B7D29B]" href="/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
