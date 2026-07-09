import type { Metadata } from 'next';
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
                href="tel:+919959027830"
                className="btn-outline font-outfit inline-flex items-center justify-center gap-2 rounded-full border border-[#0B4A35]/25 bg-white/80 px-8 py-4 text-[13px] font-semibold text-[#0B4A35] shadow-sm backdrop-blur-sm hover:bg-white sm:text-[14px]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <FertilityFooter />
    </>
  );
}
