import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

type Bullet = { icon: string; node: React.ReactNode };

const bullets: Bullet[] = [
  {
    icon: 'person',
    node: 'At Next Door Nutritionist, we believe women are often over-medicated and under-educated about their bodies.',
  },
  {
    icon: 'eco',
    node: 'Our mission is to help women understand their hormones, manage symptoms better, and build healthier cycles through nutrition, lifestyle correction, and expert guidance.',
  },
  {
    icon: 'school',
    node: (
      <>
        Founded by Anusha Rodrigues, MSc in Clinical Nutrition &amp; Dietetics from Maharaja Sayajirao
        University of Baroda and MBA from Indian School of Business, the brand is backed by{' '}
        <strong className="font-bold text-[#0B4A35]">10+ years</strong> of clinical practice and has
        supported <strong className="font-bold text-[#0B4A35]">4,000+ clients</strong> across{' '}
        <strong className="font-bold text-[#0B4A35]">45+ countries</strong>.
      </>
    ),
  },
  {
    icon: 'favorite',
    node: 'But the real expertise came from sitting across hundreds of women who were exhausted, unheard, and stuck in a cycle of pills, powders, and temporary fixes.',
  },
  {
    icon: 'group',
    node: "What started during COVID as a solo consultancy soon grew into a globally trusted clinical practice. With Deepak joining, the vision expanded from one nutritionist's mission into a full team-led practice.",
  },
  {
    icon: 'language',
    node: (
      <>
        Today, Next Door Nutritionist is a roadmap for women across{' '}
        <strong className="font-bold text-[#0B4A35]">45+ countries</strong>, supported by a team of{' '}
        <strong className="font-bold text-[#0B4A35]">20+ expert nutritionists</strong> carrying forward one clear mission:
      </>
    ),
  },
];

function BulletRow({ bullet, isLast }: { bullet: Bullet; isLast: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-shrink-0 flex-col items-center" style={{ width: 30 }}>
        <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#B7D29B]/30">
          <span className="material-symbols-outlined text-[14px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 0, "wght" 300' }}>
            {bullet.icon}
          </span>
        </div>
        {!isLast && (
          <div className="mt-1 flex-1 border-l border-dashed border-[#B7D29B]" style={{ minHeight: 12 }} />
        )}
      </div>
      <p className="mb-4 font-outfit text-[12px] leading-[1.75] text-[#2B2B2B]/75 sm:text-[13px] md:text-[13px] lg:text-[14px] xl:text-[14px]">
        {bullet.node}
      </p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#F4E0CD] px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-[54%_46%] md:gap-10 lg:gap-12">

          <AnimateOnScroll animation="fade-right">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/30 bg-white/80 px-3 py-1">
              <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">About Us</span>
            </span>

            <h2 className="mb-5 mt-3 font-outfit text-[18px] font-extrabold leading-[1.15] text-[#0B4A35] sm:text-[20px] md:text-[22px] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]">
              Built on a Simple Mission:
              <br />
              <span className="text-[#FF92A5]">Periods Without Pills</span>
            </h2>

            {/* Mobile-only image — between heading and bullets */}
            <div className="mb-5 overflow-hidden rounded-3xl md:hidden">
              <Image
                src="https://res.cloudinary.com/du6mjguvb/image/upload/about_yle5vx"
                alt="Anusha Rodrigues – Next Door Nutritionist"
                width={400}
                height={400}
                className="h-auto w-full object-cover object-top"
              />
            </div>

            <div>
              {bullets.map((b, i) => (
                <BulletRow key={b.icon + i} bullet={b} isLast={i === bullets.length - 1} />
              ))}
            </div>

            <div className="mt-5">
              <a
                href="#consultation"
                className="font-outfit inline-flex items-center gap-2 rounded-3xl bg-[#0B4A35] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:text-[14px] lg:text-[15px]"
              >
                Get Expert Nutrition Guidance
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" delay={120} className="hidden md:block">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://res.cloudinary.com/du6mjguvb/image/upload/about_yle5vx"
                  alt="Anusha Rodrigues – Next Door Nutritionist"
                  width={400}
                  height={640}
                  className="h-auto w-full object-cover object-top"
                  priority
                />
              </div>
              <div className="flex justify-center">
                <div className="flex w-fit items-center gap-3 rounded-2xl bg-[#B7D29B] px-4 py-3 md:px-5 md:py-4">
                  <div className="flex h-[48px] w-[48px] flex-shrink-0 overflow-hidden rounded-full bg-[#0B4A35]">
                    <Image src="https://res.cloudinary.com/du6mjguvb/image/upload/women_d794r2" alt="Next Door Nutritionist" width={48} height={48} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-outfit text-[11px] leading-[1.5] text-[#2B2B2B] sm:text-[12px] lg:text-[13px]">
                      Helping women move closer to
                    </p>
                    <p className="font-outfit text-[15px] font-bold italic leading-[1.3] text-[#0b4a35] sm:text-[16px] lg:text-[18px]">
                      periods without pills
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
