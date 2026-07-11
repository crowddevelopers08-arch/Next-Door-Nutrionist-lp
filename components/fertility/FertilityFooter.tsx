import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';

const CLINIC_MAP_EMBED =
  'https://www.google.com/maps?q=Hormone+Nutrition+Clinic,+3rd+Floor,+Westend+Mall,+301-A,+Road+No.+36,+Aditya+Enclave,+Venkatagiri,+Jubilee+Hills,+Hyderabad,+Telangana+500033&z=16&output=embed';

const CLINIC_MAP_LINK =
  'https://www.google.com/maps/dir/?api=1&destination=17.4355492,78.4023337&travelmode=driving';

const quickLinks = [
  { label: 'Who Is This For', href: '#who-is-this-for' },
  { label: 'Process', href: '#process' },
  { label: 'About Clinic', href: '#about-clinic' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Book Your Initial Discovery Call', href: '' },
];

const instagramAccounts = [
  { handle: '@hormonenutritionclinic', href: 'https://www.instagram.com/hormonenutritionclinic/' },
  { handle: '@nextdoornutritionist', href: 'https://www.instagram.com/nextdoornutritionist/' },
];

function InstagramLink({ handle, href }: { handle: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${handle} on Instagram`}
      className="group flex items-center gap-2"
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#B7D29B40] transition-colors group-hover:border-[#B7D29B] group-hover:bg-[#B7D29B20]">
        <svg className="h-[16px] w-[16px] fill-[#FF92A5]" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </span>
      <span className="font-outfit text-[12.5px] text-[#B7D29B] transition-colors group-hover:text-white">
        {handle}
      </span>
    </a>
  );
}

export function FertilityFooter() {
  return (
    <footer className="bg-[#0B4A35]">
      <AnimateOnScroll
        animation="fade-up"
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 md:grid-cols-3 md:gap-10 md:px-[60px] md:py-10"
      >
        <div className="space-y-5">
          <Image
            src="https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy"
            alt="Hormone Nutrition Clinic"
            width={180}
            height={60}
            className="h-[60px] w-auto object-contain brightness-0 invert"
          />
          <p className="font-outfit max-w-[280px] text-[14px] leading-[1.75] text-[#B7D29B]">
            Personalized clinical nutrition and lifestyle guidance for fertility, conception, and healthier pregnancy preparation.
          </p>

          <div className="flex flex-col gap-3">
            {instagramAccounts.map((account) => (
              <InstagramLink key={account.handle} {...account} />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((item) =>
              item.href ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-outfit flex items-center gap-2 text-[13.5px] leading-[1.5] text-[#B7D29B] transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FF92A5]" />
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <FertilityCtaButton className="font-outfit flex items-center gap-2 text-left text-[13.5px] leading-[1.5] text-[#B7D29B] transition-colors hover:text-white">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#FF92A5]" />
                    {item.label}
                  </FertilityCtaButton>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Contact Us
          </h4>
          <div className="space-y-4">
            <a href="tel:+919867642689" className="group flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-[#FF92A5]">call</span>
              <span className="font-outfit text-[14px] font-semibold text-white transition-colors group-hover:text-[#B7D29B]">
                +91 98676 42689
              </span>
            </a>
            <div className="overflow-hidden rounded-2xl border border-[#B7D29B40]">
              <iframe
                src={CLINIC_MAP_EMBED}
                title="Hormone Nutrition Clinic location"
                className="block h-[180px] w-full border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              href={CLINIC_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-[#FF92A5]">directions</span>
              <span className="font-outfit text-[13px] text-[#B7D29B] underline-offset-4 transition-colors group-hover:text-white group-hover:underline">
                Get Directions
              </span>
            </a>
          </div>
        </div>
      </AnimateOnScroll>

      <div className="border-t border-[#ffffff15]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 md:px-[60px]">
          <p className="font-outfit text-[12px] text-[#B7D29B80]">
            &copy; 2026 Next Door Nutritionist. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              className="font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B7D29B60] transition-colors hover:text-[#B7D29B]"
              href="/fertility/privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
