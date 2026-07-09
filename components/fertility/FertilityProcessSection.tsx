import type { IconType } from 'react-icons';
import {
  FaPhoneVolume,
  FaClipboardCheck,
  FaStethoscope,
  FaUtensils,
  FaHandsHelping,
  FaCalendarCheck,
  FaChartLine,
} from 'react-icons/fa';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';
import { fertilityProcessSteps } from '@/components/fertility/fertilityContent';

// Soft pastel background + matching accent for the icon, one per step
const stepStyles: { bg: string; accent: string; Icon: IconType }[] = [
  { bg: '#FCE7F1', accent: '#D6497E', Icon: FaPhoneVolume },
  { bg: '#FBEFD9', accent: '#C79030', Icon: FaClipboardCheck },
  { bg: '#FCE1E4', accent: '#D45A66', Icon: FaStethoscope },
  { bg: '#E4EEF8', accent: '#3E77B0', Icon: FaUtensils },
  { bg: '#E6F4DE', accent: '#5A9A3E', Icon: FaHandsHelping },
  { bg: '#FBE7CE', accent: '#C77F32', Icon: FaCalendarCheck },
  { bg: '#DBF2F3', accent: '#3AA0A6', Icon: FaChartLine },
];

export function FertilityProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 bg-gradient-to-b from-[#F4E0CD] to-[#F0D6BE] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="relative mx-auto max-w-[980px]">
        <AnimateOnScroll animation="fade-down" className="mx-auto max-w-[840px] text-center">
          <h2 className="font-outfit text-[26px] font-extrabold leading-[1.2] text-[#1A1A1A] sm:text-[30px] md:text-[36px]">
            How Your Nutrition Journey Works
          </h2>
        </AnimateOnScroll>

        {/* Sticky stacking cards — each step slides up and stacks over the previous one */}
        <div className="mt-12">
          {fertilityProcessSteps.map((step, index) => {
            const { bg, accent, Icon } = stepStyles[index % stepStyles.length];
            return (
              <div
                key={step.title}
                className="sticky pb-5"
                style={{ top: `${96 + index * 26}px` }}
              >
                <div
                  className="group flex items-center gap-5 rounded-[22px] border border-white/60 px-6 py-6 shadow-[0_16px_40px_rgba(11,74,53,0.16)] transition-transform duration-300 sm:gap-7 sm:px-8"
                  style={{ backgroundColor: bg }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/70 text-[15px] font-extrabold shadow-sm sm:h-14 sm:w-14 sm:text-[17px]"
                    style={{ color: accent }}
                  >
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-outfit text-[18px] font-extrabold leading-[1.3] text-[#1A1A1A] sm:text-[20px]">
                      {step.title}:
                    </h3>
                    <p className="mt-2 font-outfit text-[14px] leading-[1.75] text-[#2B2B2B]/80 sm:text-[15px]">
                      {step.description}
                    </p>
                  </div>

                  {/* Themed icon on the right */}
                  <div
                    className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:flex sm:h-20 sm:w-20"
                    style={{ color: accent }}
                  >
                    <Icon className="text-[28px] sm:text-[34px]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <AnimateOnScroll animation="fade-up" className="mt-10 flex justify-center">
          <FertilityCtaButton className="btn-primary font-outfit rounded-full bg-[#0B4A35] px-9 py-4 text-[13px] font-semibold text-white shadow-lg sm:text-[14px]">
            Book Your Initial Discovery Call
          </FertilityCtaButton>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
