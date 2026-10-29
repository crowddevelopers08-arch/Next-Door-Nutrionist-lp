import type { Metadata } from 'next';
import Script from 'next/script';
import { FertilityHeader } from '@/components/fertility/FertilityHeader';
import { FertilityFooter } from '@/components/fertility/FertilityFooter';

export const metadata: Metadata = {
  title: 'Thank You | Fertility Clinical Nutrition | Next Door Nutritionist',
  description:
    'Thank you for booking your initial discovery call with Hormone Nutrition Clinic.',
};

export default function FertilityThankYouPage() {
  return (
    <>
      <FertilityHeader />
      <main className="mt-[70px] md:mt-20">
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-[#FFF4EE] via-[#FFFCFA] to-[#F1F8F3] px-4 py-16 sm:px-6 md:px-[60px] md:py-24">
          {/* Decorative aurora blobs */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-[#FF92A5]/25 blur-[110px] blob-float" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[#0B4A35]/15 blur-[120px] blob-float-2" />
          <div className="pointer-events-none absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-[#C9A24B]/15 blur-[120px] blob-float" />

          <div className="relative mx-auto max-w-[720px] text-center">
            <div className="relative mx-auto mb-7 inline-flex">
              <div className="pointer-events-none absolute -inset-3 rounded-full bg-[#0B4A35]/20 blur-xl glow-pulse" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#0B4A35] to-[#146347] text-white shadow-[0_12px_30px_rgba(11,74,53,0.3)] ring-4 ring-[#C9A24B]/30">
                <span className="material-symbols-outlined text-[40px]">check</span>
              </span>
            </div>


            <h1 className="font-outfit text-[30px] font-extrabold leading-[1.14] text-[#1A1A1A] sm:text-[36px] md:text-[44px]">
              Thank You! <span className="premium-shine">Your Request Is In.</span>
            </h1>

            <p className="mt-5 font-outfit text-[15px] leading-[1.9] text-[#2B2B2B]/75 sm:text-[16px]">
              We&apos;ve received your request for an initial discovery call. Our team will reach out to you shortly to understand your fertility journey and guide you on the next steps.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/fertility"
                className="btn-primary font-outfit inline-flex items-center justify-center rounded-full bg-[#0B4A35] px-8 py-4 text-[13px] font-semibold text-white shadow-lg sm:text-[14px]"
              >
                Back to Home
              </a>
              <a
                href="tel:+919867642689"
                className="btn-outline font-outfit inline-flex items-center justify-center gap-2 rounded-full border border-[#0B4A35]/25 bg-white/80 px-8 py-4 text-[13px] font-semibold text-[#0B4A35] shadow-sm backdrop-blur-sm hover:bg-white sm:text-[14px]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Us Now
              </a>
              <a
                href="https://wa.me/919867642689?text=Hi%2C%20I%20just%20booked%20a%20fertility%20discovery%20call%20and%20have%20a%20few%20questions."
                target="_blank"
                rel="noopener noreferrer"
                className="font-outfit inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-[13px] font-semibold text-white shadow-lg transition-opacity hover:opacity-90 sm:text-[14px]"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            <p className="mt-5 font-outfit text-[14px] text-[#2B2B2B]/70">
              <span className="font-semibold text-[#1A1A1A]">Have any doubts?</span> Reach us on WhatsApp at{' '}
              <a
                href="https://wa.me/919867642689"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#128C7E] underline-offset-2 hover:underline"
              >
                +91 98676 42689
              </a>
            </p>
          </div>
        </section>
      </main>
      <FertilityFooter />

      {/* Meta Pixel — Lead conversion */}
      <Script id="meta-lead-conversion-fertility" strategy="afterInteractive">
        {`
          if (typeof fbq === 'function') {
            fbq('track', 'Lead', { value: 1.0, currency: 'INR' });
          }
        `}
      </Script>
    </>
  );
}
