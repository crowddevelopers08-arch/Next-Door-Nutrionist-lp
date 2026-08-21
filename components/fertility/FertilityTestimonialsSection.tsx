import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';
import { FertilityTestimonialWall } from '@/components/fertility/FertilityTestimonialWall';

const testimonialImages = [
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678539/IMG_4391_bstek3.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678539/IMG_4392_ymmo41.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678539/IMG_4394_of7gjl.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678539/IMG_4395_yjfhtj.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678540/IMG_4396_pfe4c0.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678541/IMG_6113_cplc9u.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678540/IMG_6114_cejmyp.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678540/IMG_6116_a5lkal.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678541/IMG_6117_wmhftp.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678541/IMG_7174_oilxmy.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678542/IMG_7176_rii8rm.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678542/IMG_7177_hyjuab.jpg',
  'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1783678542/IMG_7179_l4h79b.jpg',
];

interface Props {
  /** Hidden on the checkout page, where the CTA would point back to itself. */
  showCta?: boolean;
}

export function FertilityTestimonialsSection({ showCta = true }: Props = {}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B4A35] via-[#0d5238] to-[#083b2a] px-4 py-14 sm:px-6 md:px-[60px] md:py-20 max-[470px]:py-10">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/20 blur-[120px] blob-float" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-[340px] w-[340px] rounded-full bg-[#C9A24B]/20 blur-[120px] blob-float-2" />

      <div className="relative mx-auto max-w-[980px] text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="font-outfit text-[28px] font-extrabold leading-[1.2] text-white sm:text-[32px] md:text-[40px]">
            Real Women. <span className="premium-shine">Real Journeys.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-outfit text-[14px] leading-[1.85] text-[#CDE3D4] sm:text-[15px]">
            Real messages from women who prepared their bodies, balanced their hormones, and welcomed their good news.
          </p>
        </AnimateOnScroll>
      </div>

      {/* Auto-scrolling wall of client screenshots — hover to pause, click to zoom */}
      <FertilityTestimonialWall images={testimonialImages} />

      {showCta && (
        <div className="relative mt-12 text-center">
          <FertilityCtaButton className="btn-primary font-outfit inline-flex rounded-full bg-[#FF92A5] px-8 py-4 text-[13px] font-semibold text-[#1A1A1A] shadow-lg sm:text-[14px]">
            Start Your Journey with an Expert Call for ₹199
          </FertilityCtaButton>
        </div>
      )}
    </section>
  );
}
