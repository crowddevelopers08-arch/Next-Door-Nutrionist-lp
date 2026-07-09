import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export function FertilityTestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B4A35] via-[#0d5238] to-[#083b2a] px-4 py-14 sm:px-6 md:px-[60px] md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/20 blur-[120px] blob-float" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-[340px] w-[340px] rounded-full bg-[#C9A24B]/20 blur-[120px] blob-float-2" />

      <div className="relative mx-auto max-w-[980px] text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="font-outfit text-[28px] font-extrabold leading-[1.2] text-white sm:text-[32px] md:text-[40px]">
            Real Women. <span className="premium-shine">Real Journeys.</span>
          </h2>
          <a
            href="tel:+919959027830"
            className="btn-primary font-outfit mt-8 inline-flex rounded-full bg-[#FF92A5] px-8 py-4 text-[13px] font-semibold text-[#1A1A1A] shadow-lg sm:text-[14px]"
          >
            Book Your Initial Discovery Call
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
