import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityValueStack } from '@/components/fertility/FertilityValueStack';

/** Landing-page section wrapper around the shared ₹199 offer stack. */
export function FertilityValueStackSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFF5F0] px-4 py-14 sm:px-6 md:px-[60px] md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/18 blur-[120px] blob-float" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[#0B4A35]/12 blur-[120px] blob-float-2" />

      <div className="relative mx-auto max-w-[620px]">
        <AnimateOnScroll animation="fade-up">
          <FertilityValueStack />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
