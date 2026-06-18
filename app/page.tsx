import { AboutSection } from '@/components/AboutSection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { ConsultationCtaSection } from '@/components/ConsultationCtaSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { FounderSection } from '@/components/FounderSection';
import { WhyChooseSection } from '@/components/WhyChooseSection';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { ProgramsSection } from '@/components/ProgramsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { TreatmentsSection } from '@/components/TreatmentsSection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-[70px] md:mt-20">
        <HeroSection />
        <LeadCaptureSection />
        <TreatmentsSection />
        <ProgramsSection />
        <HowItWorksSection />
           <WhyChooseSection />
        <AboutSection />
        <FounderSection />
        {/* <BeforeAfterSection />
        <TestimonialsSection /> */}
     
        <ConsultationCtaSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
