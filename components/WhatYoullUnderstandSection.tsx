import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const insights = [
  { num: '01', text: 'What may be blocking your progress',               icon: '/icons/insight-block.svg'     },
  { num: '02', text: 'Which food habits need correction',                icon: '/icons/insight-food.svg'      },
  { num: '03', text: 'How your lifestyle is affecting your health goal', icon: '/icons/insight-lifestyle.svg' },
  { num: '04', text: 'What type of nutrition plan suits your body',      icon: '/icons/insight-plan.svg'      },
  { num: '05', text: 'How your plan will be tracked and updated',        icon: '/icons/insight-track.svg'     },
  { num: '06', text: 'What realistic progress should look like for you', icon: '/icons/insight-progress.svg'  },
];

export function WhatYoullUnderstandSection() {
  return (
    <section className="bg-[#FDFBF8] px-4 py-10 sm:px-6 md:px-[60px] md:py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">

          {/* ── Left: sticky headline ── */}
          <AnimateOnScroll
            animation="fade-right"
            className="lg:sticky lg:top-24 lg:w-[36%] lg:self-start xl:w-[34%]"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/30 bg-[#F4E0CD]/60 px-3 py-1">
              <span
                className="material-symbols-outlined text-[12px] text-[#0B4A35]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                lightbulb
              </span>
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">
                After Your Consultation
              </span>
            </span>

            <h2 className="mt-4 font-outfit text-[22px] font-extrabold leading-[1.2] text-[#2B2B2B] sm:text-[24px] lg:text-[22px] xl:text-[26px] 2xl:text-[30px]">
              What You'll Understand After Your{' '}
              <span className="text-[#0B4A35]">First Consultation</span>
            </h2>
          </AnimateOnScroll>

          {/* ── Right: numbered row list + CTA ── */}
          <div className="flex-1">
            <div>
              {insights.map((item, i) => (
                <div key={i}>
                  <AnimateOnScroll animation="fade-left" delay={i * 70}>
                    <div className="group flex items-center gap-4 rounded-xl px-2 py-4 transition-colors hover:bg-[#F4E0CD]/30 md:gap-5 md:py-5">

                      {/* Salmon number */}
                      <span className="w-8 shrink-0 font-outfit text-[11px] font-black tracking-[0.2em] text-[#FF92A5]">
                        {item.num}
                      </span>

                      {/* Vertical celadon bar */}
                      <div className="h-7 w-px shrink-0 rounded-full bg-[#B7D29B]" />

                      {/* Insight text */}
                      <p className="flex-1 font-outfit text-[13px] font-semibold leading-[1.55] text-[#2B2B2B] sm:text-[14px] lg:text-[13px] xl:text-[14px]">
                        {item.text}
                      </p>

                      {/* SVG icon chip */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4E0CD] transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={item.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                      </div>
                    </div>
                  </AnimateOnScroll>

                  {/* Row divider (skip after last) */}
                  {i < insights.length - 1 && (
                    <div className="mx-2 h-px bg-[#B7D29B]/30" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <AnimateOnScroll animation="fade-up" delay={520} className="mt-8 md:mt-9">
              <a
                href="#consultation"
                className="font-outfit inline-flex items-center gap-2 rounded-full bg-[#0B4A35] px-7 py-3.5 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:text-[14px] md:px-9 lg:text-[15px]"
              >
                Book My First Consultation
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </span>
              </a>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
