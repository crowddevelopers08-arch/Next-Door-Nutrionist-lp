import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';
import { fertilityTrustItems } from '@/components/fertility/fertilityContent';

export function FertilityAboutSection() {
  return (
    <section id="about-clinic" className="scroll-mt-24 bg-[#fffaf7] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-[40%_60%] md:gap-10 lg:gap-12">

          {/* LEFT — photo + quote (hidden on mobile; shown inline inside right col instead) */}
          <AnimateOnScroll animation="fade-right" className="hidden md:block">
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(11,74,53,0.14)]">
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
                  Most women don&apos;t need a diet chart. They need to understand what their body is asking for.
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
                <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0B4A35] sm:text-[11px]">About The Clinic</span>
              </span>

              <h2 className="mt-3 font-outfit text-[24px] font-extrabold leading-[1.14] text-[#1A1A1A] sm:text-[28px] md:text-[32px] lg:text-[36px]">
                Helped 4500+ Women Prepare Their Bodies Better.{' '}
                <span className="premium-shine">Now, It Could Be Your Turn</span>
              </h2>

              <p className="mt-2 font-outfit text-[13px] font-semibold text-[#0B4A35] sm:text-[14px]">
                Founded by Anusha Rodrigues
              </p>
              <p className="font-outfit text-[11px] text-[#2B2B2B]/60 sm:text-[12px]">
                Hormone Nutrition Clinic · formerly Next Door Nutritionist
              </p>

              <div className="my-4 h-px bg-[#0B4A35]/10" />

              {/* Mobile-only photo — between name/title and content */}
              <div className="mb-4 overflow-hidden rounded-3xl md:hidden">
                <Image
                  src="/dr.png"
                  alt="Anusha Rodrigues – Founder & Clinical Nutritionist"
                  width={500}
                  height={560}
                  className="h-auto w-full object-cover object-top"
                />
              </div>

              <div className="space-y-3.5 font-outfit text-[13.5px] leading-[1.85] text-[#2B2B2B]/78 sm:text-[15px]">
                <p>
                  At Hormone Nutrition Clinic, we believe women need more than reports, medicines, and random diet charts. They need the right understanding of their body, hormones, lifestyle, and nutrition.
                </p>
                <p>
                  We support women dealing with PMOS/PCOS, Low AMH, Endometriosis, unexplained infertility, IVF/IUI preparation, natural pregnancy planning, pre-pregnancy nutrition, and post-pregnancy recovery through personalized clinical nutrition and lifestyle guidance.
                </p>
                <p>
                  Founded by <span className="font-semibold text-[#0B4A35]">Anusha Rodrigues</span>, MSc in Clinical Nutrition &amp; Dietetics. The brand is backed by 10+ years of clinical practice and has supported 4,500+ clients across 45+ countries.
                </p>
              </div>

              {/* Trust items */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                {fertilityTrustItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[#0B4A35]/15 bg-[#B7D29B]/15 px-3.5 py-1.5 font-outfit text-[11px] font-semibold text-[#0B4A35] sm:text-[12px]"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF92A5]" />
                    {item}
                  </span>
                ))}
              </div>

              <FertilityCtaButton className="btn-primary font-outfit mt-6 inline-flex items-center gap-2 rounded-full bg-[#0B4A35] px-6 py-3.5 text-[13px] font-semibold text-white shadow-md sm:text-[14px] md:px-8">
                Get Expert Nutrition Guidance
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </FertilityCtaButton>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
