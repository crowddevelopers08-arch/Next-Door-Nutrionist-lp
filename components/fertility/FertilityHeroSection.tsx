'use client';

import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityHeroVideo } from '@/components/fertility/FertilityHeroVideo';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';

export function FertilityHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F2DFD0] px-4 py-10 sm:px-6 sm:py-12 md:px-[60px] md:py-16 lg:py-12">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(11,74,53,0.08) 1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Soft top-to-bottom fade so the grid melts away */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#F2DFD0]/40 to-[#F2DFD0]" />

      {/* Decorative outlined rings */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full border border-[#0B4A35]/10" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border border-[#0B4A35]/10" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full border border-[#FF92A5]/20" />

      {/* Decorative aurora glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-[#FF92A5]/25 blur-[110px] blob-float" />
      <div className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#0B4A35]/12 blur-[120px] blob-float-2" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#C9A24B]/18 blur-[120px] blob-float" />

      {/* Floating accent dots */}
      <div className="pointer-events-none absolute left-[10%] top-[24%] h-2 w-2 rounded-full bg-[#C9A24B] glow-pulse" />
      <div className="pointer-events-none absolute right-[12%] top-[32%] h-1.5 w-1.5 rounded-full bg-[#FF92A5] glow-pulse" />
      <div className="pointer-events-none absolute bottom-[14%] left-[16%] h-1.5 w-1.5 rounded-full bg-[#0B4A35]/40 glow-pulse" />

      <div className="relative mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-up" className="flex flex-col items-center text-center">
          <div className="badge-sweep relative mb-6 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#C9A24B]/40 bg-white/70 px-5 py-2 shadow-[0_6px_20px_rgba(201,162,75,0.18)] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#FF92A5] glow-pulse" />
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B4A35] sm:text-[11px]">
              Personalised Clinical Nutrition for Fertility, Now in Hyderabad!
            </span>
          </div>

          <h1 className="font-outfit text-[30px] font-extrabold leading-[1.12] text-[#1A1A1A] sm:text-[36px] md:text-[44px] lg:text-[52px] max-w-4xl">
            Before You Spend Lakhs on Fertility Treatments,{' '}
            <span className="text-[#0B4A35] decoration-[6px] underline-offset-[6px]">
              Watch This Video First
            </span>
          </h1>

          <p className="mt-6 max-w-[720px] font-outfit text-[14px] leading-[1.9] text-[#2B2B2B]/75 sm:text-[15px] md:text-[16px]">
            We help women prepare their bodies before pregnancy begins, supporting fertility, conception, and a
            healthier pregnancy journey through clinical nutrition and lifestyle guidance
          </p>

          {/* Hero video with 3s teaser + play button that opens the lead form */}
          <FertilityHeroVideo />

          <div className="mt-9 flex w-full max-w-[720px] flex-col gap-3 sm:flex-row sm:justify-center">
            {/* <a
              href="#video"
              className="btn-primary font-outfit inline-flex items-center justify-center rounded-full bg-[#0B4A35] px-6 py-4 text-[13px] font-semibold text-white shadow-lg sm:text-[14px]"
            >
              Watch the Video Below Before You Start Your Next Fertility Plan
            </a> */}
            <FertilityCtaButton className="btn-outline font-outfit inline-flex items-center justify-center rounded-full border border-[#0B4A35]/25 bg-white/80 px-6 py-4 text-[13px] font-semibold text-[#0B4A35] shadow-sm backdrop-blur-sm hover:bg-white sm:text-[14px]">
              Book Your Initial Discovery Call
            </FertilityCtaButton>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
