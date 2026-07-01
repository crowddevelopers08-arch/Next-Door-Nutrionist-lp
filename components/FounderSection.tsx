import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const specializations = [
  'Hormonal Health', 'PCOS / PCOD Management', 'Fertility Nutrition',
  'IVF / IUI Preparation', 'Diabetes Management', 'Weight Management',
];

const methodology = [
  { num: '1', label: 'Personalized Nutrition' },
  { num: '2', label: 'Lifestyle Correction' },
  { num: '3', label: 'Supplement Guidance' },
  { num: '4', label: 'Dedicated Monitoring & Support' },
];

const languages = ['English', 'Hindi', 'Telugu', 'Marathi', 'Kannada'];

const stats = [
  { value: '4,500+', label: 'Clients Served' },
  { value: '45+',    label: 'Countries Reached' },
];

const helpsWith = [
  'Irregular periods', 'PCOS & PCOD', 'Fertility challenges',
  'Unexplained infertility', 'Weight management', 'Blood sugar imbalances',
];

export function FounderSection() {
  return (
    <section id="doctor" className="bg-white px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-[40%_60%] md:gap-10 lg:gap-12">

          {/* LEFT — photo + quote (hidden on mobile; shown inline inside right col instead) */}
          <AnimateOnScroll animation="fade-right" className="hidden md:block">
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/dr.png"
                  alt="Anusha Rodrigues – Founder & Clinical Nutritionist, Hormone Nutrition Clinic"
                  width={500}
                  height={560}
                  className="h-auto w-full object-cover object-top"
                  priority
                />
              </div>
              <div className="rounded-2xl bg-[#0B4A35] px-5 py-4">
                <svg className="mb-2 h-6 w-6 text-[#B7D29B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-2.74.315-.784.57-1.29.76-1.516.32-.36.46-.62.42-.78-.04-.15-.24-.23-.6-.23-.58 0-1.14.275-1.68.825-.54.55-1.02 1.26-1.44 2.13-.42.875-.68 1.76-.78 2.65-.1.89-.02 1.72.24 2.5.26.775.69 1.41 1.3 1.91.61.5 1.38.75 2.31.75.83 0 1.52-.22 2.07-.66.55-.44.82-1.02.82-1.74zm8.47 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.69-1.327-.817-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-2.74.315-.784.57-1.29.76-1.516.32-.36.46-.62.42-.78-.04-.15-.24-.23-.6-.23-.58 0-1.14.275-1.68.825-.54.55-1.02 1.26-1.44 2.13-.42.875-.68 1.76-.78 2.65-.1.89-.02 1.72.24 2.5.26.775.69 1.41 1.3 1.91.61.5 1.38.75 2.31.75.83 0 1.52-.22 2.07-.66.55-.44.82-1.02.82-1.74z" />
                </svg>
                <p className="font-outfit text-[12px] font-medium italic leading-[1.7] text-[#B7D29B] sm:text-[13px]">
                  Most women don't need a diet chart. They need to understand what their body is asking for.
                </p>
                <p className="mt-2 font-outfit text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF92A5]">
                  — Anusha Rodrigues
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* RIGHT — content */}
          <AnimateOnScroll animation="fade-left" delay={100}>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/20 bg-white px-3 py-1">
                <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
                <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">Meet Your Expert</span>
              </span>

              <h2 className="mt-3 font-outfit text-[22px] font-extrabold leading-[1.1] text-[#2B2B2B] sm:text-[26px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
                Anusha Rodrigues
              </h2>

              <p className="mt-1.5 font-outfit text-[13px] font-semibold text-[#0B4A35] sm:text-[14px]">
                Founder &amp; Clinical Nutritionist
              </p>
              <p className="font-outfit text-[11px] text-[#2B2B2B]/60 sm:text-[12px]">
                Hormone Nutrition Clinic · formerly Next Door Nutritionist
              </p>

              <div className="my-4 h-px bg-[#0B4A35]/10" />

              {/* Mobile-only photo — between name/title and stats */}
              <div className="mb-4 overflow-hidden rounded-3xl md:hidden">
                <Image
                  src="/dr.png"
                  alt="Anusha Rodrigues – Founder & Clinical Nutritionist"
                  width={500}
                  height={560}
                  className="h-auto w-full object-cover object-top"
                />
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-2.5">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-[#0B4A35] px-4 py-3 text-center">
                    <p className="font-outfit text-[20px] font-extrabold text-white sm:text-[22px] md:text-[24px]">{s.value}</p>
                    <p className="font-outfit text-[11px] font-medium text-[#B7D29B] sm:text-[12px]">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* ── Combined infinite marquee: Specializations + Methodology ── */}
              {/* Specializations — infinite marquee */}
              <div className="mb-4">
                <p className="mb-2 font-outfit text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2B2B] sm:text-[11px]">Specializes In</p>
                <div className="overflow-hidden">
                  <div
                    className="marquee-track flex items-center gap-2"
                    style={{ width: 'max-content', animationDuration: '20s' }}
                  >
                    {[...specializations, ...specializations].map((s, i) => (
                      <span
                        key={i}
                        className="shrink-0 rounded-full border border-[#0B4A35]/15 bg-[#B7D29B]/15 px-3 py-1 font-outfit text-[11px] font-medium text-[#0B4A35] sm:text-[12px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Methodology — infinite marquee */}
              <div className="mb-4">
                <p className="mb-2 font-outfit text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2B2B] sm:text-[11px]">Her Root-Cause Approach</p>
                <div className="overflow-hidden">
                  <div
                    className="marquee-track flex items-center gap-2"
                    style={{ width: 'max-content', animationDuration: '18s' }}
                  >
                    {[...methodology, ...methodology].map((m, i) => (
                      <div
                        key={i}
                        className="flex shrink-0 items-center gap-2 rounded-xl bg-[#F4E0CD] px-3 py-2"
                      >
                        <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[#0B4A35] font-outfit text-[9px] font-bold text-white">
                          {m.num}
                        </span>
                        <span className="font-outfit text-[11px] font-medium leading-[1.3] text-[#2B2B2B] sm:text-[12px]">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Helps with */}
              <div className="mb-4">
                <p className="mb-2 font-outfit text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2B2B] sm:text-[11px]">Helps Women With</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {helpsWith.map((h) => (
                    <span key={h} className="flex items-center gap-1 font-outfit text-[11px] text-[#2B2B2B] sm:text-[12px]">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF92A5]" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-5">
                <p className="mb-1 font-outfit text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2B2B] sm:text-[11px]">Speaks</p>
                <p className="font-outfit text-[11px] text-[#2B2B2B]/70 sm:text-[12px]">{languages.join(' · ')}</p>
              </div>

              <a
                href="#consultation"
                className="font-outfit inline-flex items-center gap-2 rounded-full bg-[#0B4A35] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:text-[14px] md:px-8"
              >
                Book Your Consultation
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>

            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
