import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const programs = [
  {
    id: 1,
    title: 'Fertility Nutrition',
    description: 'Nutrition support for women and couples preparing their body for better reproductive health, hormonal balance, and pregnancy readiness.',
    cardBg: '#ffffff',
    iconBg: '#B7D29B',
    badgeBg: '#0B4A35',
    titleColor: '#0B4A35',
    image: '/icon1.png',
    imageAlt: 'Fertility nutrition icon',
  },
  {
    id: 2,
    title: 'PCOS / PCOD Nutrition',
    description: 'Personalized plans to support weight, cravings, cycle health, insulin resistance, energy levels, and sustainable lifestyle correction.',
    cardBg: '#F4E0CD',
    iconBg: '#0B4A35',
    badgeBg: '#FF92A5',
    titleColor: '#0B4A35',
    image: '/icon2.png',
    imageAlt: 'PCOS nutrition icon',
  },
  {
    id: 3,
    title: 'IVF / IUI Preparation',
    description: 'Pre-treatment nutrition guidance to help you prepare your body before assisted reproductive procedures.',
    cardBg: '#ffffff',
    iconBg: '#B7D29B',
    badgeBg: '#0B4A35',
    titleColor: '#0B4A35',
    image: '/icon3.png',
    imageAlt: 'IVF preparation icon',
  },
  {
    id: 4,
    title: 'Diabetes Management',
    description: 'Food and lifestyle plans designed to support better sugar control, balanced meals, and long-term habit correction.',
    cardBg: '#F4E0CD',
    iconBg: '#0B4A35',
    badgeBg: '#FF92A5',
    titleColor: '#0B4A35',
    image: '/icon4.png',
    imageAlt: 'Diabetes management icon',
  },
  {
    id: 5,
    title: 'Weight Management',
    description: 'Practical nutrition plans for people who want to lose weight without crash diets, extreme restrictions, or short-term shortcuts.',
    cardBg: '#ffffff',
    iconBg: '#B7D29B',
    badgeBg: '#0B4A35',
    titleColor: '#0B4A35',
    image: '/icon5.png',
    imageAlt: 'Weight management icon',
  },
] as const;

type Program = (typeof programs)[number];

function ProgramCard({ program }: { program: Program }) {
  const { id, title, description, cardBg, iconBg, badgeBg, titleColor, image, imageAlt } = program;
  return (
    <div
      className="flex items-center gap-4 rounded-2xl border border-[#0B4A35]/10 p-4 shadow-sm md:gap-5 md:p-5"
      style={{ backgroundColor: cardBg }}
    >
      <div
        className="flex h-[64px] w-[64px] flex-shrink-0 items-center justify-center rounded-full md:h-[72px] md:w-[72px]"
        style={{ backgroundColor: iconBg }}
      >
        <Image src={image} alt={imageAlt} width={44} height={44} className="h-[40px] w-[40px] object-contain md:h-[46px] md:w-[46px]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <div
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-outfit text-[10px] font-bold leading-none text-white"
            style={{ backgroundColor: badgeBg }}
          >
            {id}
          </div>
          <h3
            className="font-outfit text-[13px] font-bold leading-snug sm:text-[14px] md:text-[14px] lg:text-[15px] xl:text-[16px]"
            style={{ color: titleColor }}
          >
            {title}
          </h3>
        </div>
        <p className="font-outfit text-[11px] leading-[1.7] text-[#2B2B2B]/70 sm:text-[12px] md:text-[12px] lg:text-[13px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ProgramsSection() {
  const firstFour = programs.slice(0, 4) as unknown as Program[];
  const lastCard = programs[4] as Program;

  return (
    <section className="bg-white px-4 py-8 sm:px-6 md:px-[60px] md:py-10 lg:py-12">
      <AnimateOnScroll animation="fade-down" className="mx-auto mb-6 max-w-[1280px] text-center md:mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0B4A35]/30 bg-[#F4E0CD]/60 px-3 py-1">
          <span className="material-symbols-outlined text-[12px] text-[#0B4A35]" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
          <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">Programs We Offer</span>
        </span>
        <h2 className="mt-3 font-outfit text-[18px] font-bold leading-[1.2] text-[#2B2B2B] sm:text-[20px] md:text-[22px] md:leading-[1.1] lg:text-[26px] xl:text-[30px] 2xl:text-[34px]">
          Find the Right Program
          <br />
          <span className="text-[#0B4A35]">for Your Health Goal</span>
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll animation="fade-in" delay={150} className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
          {firstFour.map((program) => (
            <AnimateOnScroll key={program.id} animation="fade-up" delay={program.id * 60}>
              <ProgramCard program={program} />
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-3 flex justify-center md:mt-4">
          <div className="w-full sm:w-[calc(50%-6px)]">
            <AnimateOnScroll animation="fade-up" delay={5 * 60}>
              <ProgramCard program={lastCard} />
            </AnimateOnScroll>
          </div>
        </div>
        <div className="mt-6 flex justify-center md:mt-8">
          <a
            href="#consultation"
            className="font-outfit flex items-center gap-2 rounded-full bg-[#0B4A35] px-7 py-3 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#093c2a] sm:text-[14px] md:px-9 lg:text-[15px]"
          >
            Find the Right Program for Me
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
