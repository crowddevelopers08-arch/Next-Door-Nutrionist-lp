import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export function ConsultationCtaSection() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-up">
          <div className="overflow-hidden rounded-[2rem] bg-[#F4E0CD] flex flex-col md:flex-row md:items-stretch">

            <div className="relative w-full flex-shrink-0 md:w-[46%]">
              <Image
                src="/ctanextdoorcp.png"
                alt="Nutritionist consulting a patient with a personalized nutrition plan"
                width={720}
                height={500}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>

            <div className="flex flex-1 flex-col justify-center px-6 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12">
              <AnimateOnScroll animation="fade-left" delay={100}>
                <h2 className="font-outfit text-[18px] font-bold leading-[1.18] text-[#0B4A35] sm:text-[20px] md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]">
                  Ready to Stop Guessing and Start Eating According to Your Body's Needs?
                </h2>

                <p className="mt-3 font-outfit text-[12px] leading-[1.8] text-[#2B2B2B]/70 sm:text-[13px] md:mt-4 md:text-[13px] lg:text-[14px] xl:text-[14px]">
                  Book a consultation with Next Door Nutritionist and get a personalized nutrition plan built around your reports, lifestyle, health condition, food preferences, and goals.
                </p>

                <div className="mt-5 md:mt-6">
                  <a
                    href="#consultation"
                    className="font-outfit inline-flex items-center gap-2 rounded-3xl bg-[#0B4A35] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:text-[14px] md:px-7 lg:text-[15px]"
                  >Book Your Nutrition Consultation Now
                    
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </AnimateOnScroll>
            </div>

          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
