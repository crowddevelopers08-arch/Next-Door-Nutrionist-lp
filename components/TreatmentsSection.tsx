import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const PILLARS = [
  {
    num: '01',
    image: '/Screenshot%202026-06-17%20184719.png',
    iconImage: '/Screenshot%202026-06-17%20184827.png',
    titleLine1: 'Personalized',
    titleLine2: 'Nutrition',
    desc: 'Meal plans based on your health condition, reports, lifestyle, food preferences, daily routine, and goals.',
  },
  {
    num: '02',
    image: '/Screenshot%202026-06-17%20184734.png',
    iconImage: '/Screenshot%202026-06-17%20184836.png',
    titleLine1: 'Lifestyle',
    titleLine2: 'Correction',
    desc: 'We guide you beyond food — covering movement, sleep, sunlight exposure, stress control, and daily routine correction.',
  },
  {
    num: '03',
    image: '/Screenshot%202026-06-17%20184749.png',
    iconImage: '/Screenshot%202026-06-17%20184848.png',
    titleLine1: 'Targeted',
    titleLine2: 'Supplement Support',
    desc: "Supplements are suggested only when needed, based on your body's requirements and health markers.",
  },
  {
    num: '04',
    image: '/Screenshot%202026-06-17%20184808.png',
    iconImage: '/Screenshot%202026-06-17%20184912.png',
    titleLine1: 'Dedicated',
    titleLine2: 'Monitoring & Support',
    desc: 'Get guidance from an assigned nutritionist, daily meal photo tracking, regular follow-ups, and progress monitoring.',
  },
];


export function TreatmentsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12">

      <img src="/decor-salad.png" alt="" aria-hidden className="pointer-events-none absolute -left-4 top-0 w-[140px] select-none sm:w-[180px]" />
      <img src="/decor-glass.png" alt="" aria-hidden className="pointer-events-none absolute -right-4 top-0 w-[110px] select-none sm:w-[150px]" />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(circle, #0B4A35 1.5px, transparent 1.5px)', backgroundSize: '14px 14px' }}
      />

      <AnimateOnScroll animation="fade-up" className="relative z-[1] mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center md:mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/30 bg-[#F4E0CD]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">Our 4-Pillar Approach</span>
          </span>
          <h2 className="font-outfit text-[18px] font-extrabold leading-[1.15] text-[#2B2B2B] sm:text-[20px] md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]">
            Our 4-Pillar
            <br />
            <span className="text-[#FF92A5]">Root-Cause Nutrition Method</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <AnimateOnScroll key={p.num} animation="fade-up">
              <div className="relative rounded-2xl bg-white shadow-sm border border-[#0B4A35]/10">
                <div className="overflow-hidden rounded-t-2xl">
                  <img src={p.image} alt={`${p.titleLine1} ${p.titleLine2}`} className="h-[240px] w-full object-cover sm:h-[170px]" />
                </div>
                <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#0B4A35] text-[11px] font-bold leading-none text-white shadow">
                  {p.num}
                </div>
                <div className="absolute left-1/2 top-[240px] -translate-x-1/2 -translate-y-1/2 sm:top-[170px]">
                  <img src={p.iconImage} alt="" aria-hidden className="h-[52px] w-[52px] object-contain" />
                </div>
                <div className="px-4 pb-5 pt-8 text-center">
                  <h3 className="font-outfit mb-2 text-[13px] font-bold leading-[1.4] text-[#0B4A35] sm:text-[14px] md:text-[14px] lg:text-[15px] xl:text-[16px]">
                    {p.titleLine1}<br />{p.titleLine2}
                  </h3>
                  <p className="font-outfit text-[11px] leading-[1.75] text-[#2B2B2B]/70 sm:text-[12px] md:text-[12px] lg:text-[13px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-center md:mt-8">
          <a
            href="#consultation"
            className="font-outfit flex items-center gap-2 rounded-full bg-[#0B4A35] px-8 py-3 text-[13px] font-semibold text-white shadow-lg transition hover:bg-[#093c2a] sm:text-[14px] md:px-10 lg:text-[15px]"
          >
            <span className="material-symbols-outlined text-[15px] opacity-80" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
            Start My Personalized Nutrition Plan
            <span className="material-symbols-outlined text-[15px] opacity-80" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
          </a>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
