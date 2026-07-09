import type { Metadata } from 'next';
import { FertilityAboutSection } from '@/components/fertility/FertilityAboutSection';
import { FertilityFaqSection } from '@/components/fertility/FertilityFaqSection';
import { FertilityFinalCtaSection } from '@/components/fertility/FertilityFinalCtaSection';
import { FertilityFooter } from '@/components/fertility/FertilityFooter';
import { FertilityHeader } from '@/components/fertility/FertilityHeader';
import { FertilityHeroSection } from '@/components/fertility/FertilityHeroSection';
import { FertilityProcessSection } from '@/components/fertility/FertilityProcessSection';
import { FertilityTestimonialsSection } from '@/components/fertility/FertilityTestimonialsSection';
import { FertilityWhoItsForSection } from '@/components/fertility/FertilityWhoItsForSection';

export const metadata: Metadata = {
  title: 'Fertility Clinical Nutrition | Next Door Nutritionist',
  description:
    'Personalised clinical nutrition for fertility, conception, IVF/IUI preparation, and healthier pregnancy planning in Hyderabad.',
};

export default function FertilityPage() {
  return (
    <>
      <FertilityHeader />
      <main className="mt-[70px] md:mt-20">
        <FertilityHeroSection />
        <FertilityWhoItsForSection />
        <FertilityProcessSection />
        <FertilityAboutSection />
        <FertilityTestimonialsSection />
        <FertilityFaqSection />
        <FertilityFinalCtaSection />
      </main>
      <FertilityFooter />
    </>
  );
}
