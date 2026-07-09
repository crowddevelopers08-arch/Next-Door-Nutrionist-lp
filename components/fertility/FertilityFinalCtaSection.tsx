import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';

export function FertilityFinalCtaSection() {
  return (
    <section id="consultation" className="bg-[#fffaf7] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[980px]">
        <AnimateOnScroll
          animation="scale-in"
          className="relative overflow-hidden rounded-[36px] bg-[#0B4A35] px-6 py-14 text-center shadow-[0_28px_80px_rgba(11,74,53,0.3)] sm:px-10 md:py-20"
        >
          {/* Dot grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1.4px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Decorative outlined rings */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full border border-[#C9A24B]/20" />
          <div className="pointer-events-none absolute -bottom-16 -right-12 h-52 w-52 rounded-full border border-[#C9A24B]/15" />

          {/* Soft accent glows */}
          <div className="pointer-events-none absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#FF92A5]/15 blur-[90px] blob-float" />
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#C9A24B]/15 blur-[90px] blob-float-2" />

          {/* Floating accent dots */}
          <div className="pointer-events-none absolute left-[14%] top-[22%] h-2 w-2 rounded-full bg-[#F0C97D] glow-pulse" />
          <div className="pointer-events-none absolute right-[16%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#FF92A5] glow-pulse" />
          <div className="pointer-events-none absolute bottom-[24%] left-[22%] h-1.5 w-1.5 rounded-full bg-[#FF92A5]/80 glow-pulse" />

          <div className="relative">

            <h2 className="font-outfit text-[27px] font-extrabold leading-[1.2] text-white sm:text-[32px] md:text-[40px]">
              Ready to Prepare Your Body for the{' '}
              <span className="premium-shine">Next Step in Your Fertility Journey?</span>
            </h2>

            <FertilityCtaButton className="btn-primary font-outfit mt-8 inline-flex rounded-full bg-[#FF92A5] px-9 py-4 text-[13px] font-semibold text-[#1A1A1A] shadow-lg sm:text-[14px]">
              Book Your Initial Discovery Call
            </FertilityCtaButton>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
