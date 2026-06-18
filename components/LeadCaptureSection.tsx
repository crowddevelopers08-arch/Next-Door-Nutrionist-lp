import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const PAIN_POINTS = [
  { icon: 'battery_2_bar', pre: 'You follow a diet for a few days, then feel ',  highlight: 'tired or restricted.', post: '' },
  { icon: 'autorenew',     pre: 'Your weight keeps ',                             highlight: 'coming back.',          post: '' },
  { icon: 'female',        pre: 'PCOS symptoms feel ',                            highlight: 'difficult to manage.',  post: '' },
  { icon: 'bloodtype',     pre: 'Sugar levels ',                                  highlight: 'fluctuate',             post: ' despite food changes.' },
  { icon: 'favorite',      pre: 'Fertility or IVF/IUI preparation feels ',        highlight: 'confusing.',            post: '' },
  { icon: 'restaurant',    pre: 'You do not know what to eat, when to eat, or ',  highlight: 'what to avoid.',        post: '' },
];

export function LeadCaptureSection() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-[#F4E0CD] px-4 py-6 sm:px-6 md:px-[60px] md:py-8 lg:py-10"
    >
      <AnimateOnScroll
        animation="fade-up"
        className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-7 md:grid-cols-[5fr_4fr] lg:gap-12"
      >
        {/* ── Left column ── */}
        <div className="flex min-w-0 flex-col gap-3 font-outfit md:gap-4">

          {/* Badge */}
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#0B4A35]/30 bg-white/80 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
            <span className="text-[11px] font-medium text-[#2B2B2B] sm:text-[12px]">
              Struggling with your nutrition journey?
            </span>
          </span>

          {/* Heading */}
          <h2 className="text-[18px] font-extrabold leading-[1.15] text-[#2B2B2B] sm:text-[20px] md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]">
            Tried Diets Before,
            <br />
            But Still Not Seeing
            <br />
            <span className="text-[#FF92A5]">Real Progress?</span>
          </h2>

          {/* Mobile image — between heading and cards */}
          <div className="block md:hidden">
            <img
              src="/5860e808-f33b-43b5-937e-9246b4faa57a.png"
              alt="Nutritionist"
              className="mx-auto h-[260px] w-auto object-contain"
            />
          </div>

          {/* Pain point cards — marquee */}
          <div className="overflow-hidden">
            <div className="marquee-track flex gap-2.5" style={{ width: 'max-content' }}>
              {[...PAIN_POINTS, ...PAIN_POINTS].map((pt, i) => (
                <div key={i} className="flex w-[170px] shrink-0 flex-col gap-1.5 rounded-xl bg-white p-2.5 shadow-sm sm:w-[190px]">
                  <span className="material-symbols-outlined text-[16px] text-[#0B4A35]">{pt.icon}</span>
                  <p className="text-[11px] leading-[1.5] text-[#2B2B2B] sm:text-[12px]">
                    {pt.pre}
                    <strong className="font-semibold text-[#FF92A5]">{pt.highlight}</strong>
                    {pt.post}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote box */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#0B4A35]/25 bg-white/60 px-4 py-2.5">
            <span className="shrink-0 text-[#B7D29B] text-[16px]">🌿</span>
            <p className="text-[11px] font-medium leading-[1.7] text-[#2B2B2B] sm:text-[12px]">
              That is why your nutrition plan should{' '}
              <strong className="font-semibold text-[#0B4A35]">start with YOU,</strong>
              {' '}not with a ready-made chart.
            </p>
            <span className="shrink-0 text-[#B7D29B] text-[16px]">🌿</span>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0B4A35] py-3 text-[13px] font-semibold text-white transition hover:bg-[#093c2a] sm:text-[14px] lg:text-[15px]"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            Talk to a Nutritionist Today
          </a>
        </div>

        {/* ── Right column ── */}
        <div className="hidden md:flex md:items-center md:justify-center">
          <img
            src="/5860e808-f33b-43b5-937e-9246b4faa57a.png"
            alt="Nutritionist"
            className="h-[520px] w-auto object-contain"
          />
        </div>
      </AnimateOnScroll>
    </section>
  );
}
