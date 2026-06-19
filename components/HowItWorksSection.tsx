import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const C = {
  pineTeal: '#0B4A35',
  celadon:  '#B7D29B',
  salmon:   '#FF92A5',
  almond:   '#F4E0CD',
  graphite: '#2B2B2B',
};

const steps = [
  { num: '01', title: ['Health & Lifestyle', 'Assessment'],    desc: 'We understand your health condition, routine, food habits, reports, symptoms, and goals.', img: '/one1.png',  bg: C.graphite  },
  { num: '02', title: ['Personalized Plan', 'Creation'],       desc: "Your nutrition plan is created based on your body's needs — not a fixed template.",           img: '/two2.png', bg: C.pineTeal  },
  { num: '03', title: ['Daily Food', 'Tracking'],              desc: 'You share meal photos so your nutritionist can guide you better.',                             img: '/pro3.png', bg: C.celadon   },
  { num: '04', title: ['Regular', 'Updates'],                  desc: 'Your plan is reviewed and updated regularly based on your progress.',                          img: '/four4.png',bg: C.salmon    },
  { num: '05', title: ['Continuous', 'Support'],               desc: 'You receive follow-ups, accountability, and guidance to stay consistent.',                     img: '/five5.png',bg: C.pineTeal  },
] as const;

function ConnectorArrows() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
      <defs>
        <marker id="ah" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 9 3.5, 0 7" fill={C.salmon} />
        </marker>
      </defs>
      <circle cx="172" cy="100" r="5" fill={C.salmon} />
      <path d="M 172,100 C 183,162 217,162 228,100" stroke={C.salmon} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
      <circle cx="372" cy="100" r="5" fill={C.salmon} />
      <path d="M 372,100 C 383,38 417,38 428,100"   stroke={C.salmon} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
      <circle cx="572" cy="100" r="5" fill={C.salmon} />
      <path d="M 572,100 C 583,162 617,162 628,100" stroke={C.salmon} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
      <circle cx="772" cy="100" r="5" fill={C.salmon} />
      <path d="M 772,100 C 783,38 817,38 828,100"   stroke={C.salmon} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
    </svg>
  );
}

function ConnectorLine({ above }: { above: boolean }) {
  return (
    <div className={`flex flex-col items-center ${above ? 'mt-2' : 'mb-2'}`}>
      {above ? (
        <>
          <div className="h-5 w-px" style={{ backgroundColor: C.celadon }} />
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: C.salmon }} />
        </>
      ) : (
        <>
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: C.salmon }} />
          <div className="h-5 w-px" style={{ backgroundColor: C.celadon }} />
        </>
      )}
    </div>
  );
}

function StepText({ step, above }: { step: typeof steps[number]; above: boolean }) {
  return (
    <div className={`flex flex-col items-center text-center ${above ? 'justify-end' : 'justify-start'}`}>
      <span className="font-outfit text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.pineTeal }}>
        STEP {step.num}
      </span>
      <h3 className="mt-0.5 font-outfit text-[12px] font-bold leading-[1.35] lg:text-[13px]" style={{ color: C.graphite }}>
        {step.title[0]}<br />{step.title[1]}
      </h3>
      <p className="mt-1.5 max-w-[150px] font-outfit text-[10px] leading-[1.65] text-[#2B2B2B]/70 lg:text-[11px]">
        {step.desc}
      </p>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="process" className="px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto max-w-[1280px]">

        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <h2
            className="font-outfit text-[18px] font-extrabold leading-[1.2] sm:text-[20px] md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]"
            style={{ color: C.graphite }}
          >
            How Your Nutrition{' '}
            <span style={{ color: C.pineTeal }}>Plan Works</span>
          </h2>
        </AnimateOnScroll>

        {/* Desktop layout */}
        <div className="hidden lg:block">
          <AnimateOnScroll animation="fade-down">
            <div className="grid grid-cols-5">
              <StepText step={steps[0]} above />
              <div />
              <StepText step={steps[2]} above />
              <div />
              <StepText step={steps[4]} above />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={80}>
            <div className="relative grid grid-cols-5 items-center">
              {steps.map((step) => (
                <div key={step.num} className="flex justify-center py-2">
                  <div
                    className="flex h-[100px] w-[100px] items-center justify-center rounded-full shadow-xl xl:h-[110px] xl:w-[110px]"
                    style={{ backgroundColor: step.bg }}
                  >
                    <Image
                      src={step.img}
                      alt={`${step.title[0]} ${step.title[1]}`}
                      width={68}
                      height={68}
                      className="h-[64px] w-[64px] object-contain xl:h-[72px] xl:w-[72px]"
                    />
                  </div>
                </div>
              ))}
              <ConnectorArrows />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-down" delay={80}>
            <div className="grid grid-cols-5">
              <div />
              <StepText step={steps[1]} above={false} />
              <div />
              <StepText step={steps[3]} above={false} />
              <div />
            </div>
          </AnimateOnScroll>
        </div>

        {/* Mobile / tablet layout */}
        <div className="space-y-4 lg:hidden">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.num} animation="fade-up" delay={i * 70}>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-full shadow-lg sm:h-[64px] sm:w-[64px]"
                  style={{ backgroundColor: step.bg }}
                >
                  <Image
                    src={step.img}
                    alt={`${step.title[0]} ${step.title[1]}`}
                    width={40}
                    height={40}
                    className="h-[36px] w-[36px] object-contain sm:h-[42px] sm:w-[42px]"
                  />
                </div>
                <div className="pt-1">
                  <span className="font-outfit text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.pineTeal }}>
                    STEP {step.num}
                  </span>
                  <h3 className="mt-0.5 font-outfit text-[13px] font-bold leading-[1.3]" style={{ color: C.graphite }}>
                    {step.title[0]} {step.title[1]}
                  </h3>
                  <p className="mt-1 font-outfit text-[11px] leading-[1.65] text-[#2B2B2B]/70 sm:text-[12px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
