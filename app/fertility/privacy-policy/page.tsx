import type { Metadata } from 'next';
import { FertilityHeader } from '@/components/fertility/FertilityHeader';
import { FertilityFooter } from '@/components/fertility/FertilityFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fertility Clinical Nutrition | Next Door Nutritionist',
  description:
    'Privacy Policy for the Hormone Nutrition Clinic fertility clinical nutrition program.',
};

const sections = [
  {
    heading: '1. Information We Collect',
    body: 'When you book a discovery call or enrol in our fertility clinical nutrition program, we may collect your name, contact details, health concern, clinical reports, lifestyle information, and food habits that you choose to share with us.',
  },
  {
    heading: '2. How We Use Your Information',
    body: 'Your information is used solely to understand your fertility journey, prepare your personalised nutrition plan, provide ongoing support, and communicate with you about your consultation and program.',
  },
  {
    heading: '3. Medical & Clinical Confidentiality',
    body: 'Any clinical reports, symptoms, and health details you share are treated as confidential and reviewed only by your dedicated clinical nutritionist. We do not share your health information with third parties for marketing purposes.',
  },
  {
    heading: '4. Data Storage & Security',
    body: 'We take reasonable measures to protect your personal and health information against unauthorised access, loss, or misuse. Your data is retained only for as long as needed to support your program and comply with applicable requirements.',
  },
  {
    heading: '5. Sharing of Information',
    body: 'We do not sell or rent your personal information. Information may be shared only with our internal clinical team, or where required by law.',
  },
  {
    heading: '6. Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal information at any time by contacting us using the details below.',
  },
  {
    heading: '7. Contact Us',
    body: 'For any questions about this Privacy Policy or how your information is handled, reach us at hormonenutritionclinic@gmail.com or +91 99590 27830.',
  },
];

export default function FertilityPrivacyPolicyPage() {
  return (
    <>
      <FertilityHeader />
      <main className="mt-[70px] md:mt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF4EE] via-[#FFFCFA] to-[#F1F8F3] px-4 py-14 sm:px-6 md:px-[60px] md:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/20 blur-[110px] blob-float" />
          <div className="pointer-events-none absolute -right-20 top-10 h-[380px] w-[380px] rounded-full bg-[#0B4A35]/12 blur-[120px] blob-float-2" />
          <div className="relative mx-auto max-w-[860px] text-center">
            <h1 className="font-outfit text-[30px] font-extrabold leading-[1.14] text-[#1A1A1A] sm:text-[36px] md:text-[44px]">
              Privacy <span className="premium-shine">Policy</span>
            </h1>
            <p className="mt-4 font-outfit text-[14px] leading-[1.85] text-[#2B2B2B]/70 sm:text-[15px]">
              Your privacy and clinical confidentiality matter to us. Here&apos;s how we handle the information you share on your fertility journey.
            </p>
          </div>
        </section>

        <section className="bg-[#fffaf7] px-4 py-12 sm:px-6 md:px-[60px] md:py-16">
          <div className="mx-auto max-w-[860px] space-y-5">
            {sections.map((item) => (
              <div
                key={item.heading}
                className="rounded-[24px] border border-[#EFE4DA] bg-white p-6 shadow-[0_10px_30px_rgba(11,74,53,0.06)] sm:p-8"
              >
                <h2 className="font-outfit text-[18px] font-bold leading-[1.35] text-[#0B4A35] sm:text-[20px]">
                  {item.heading}
                </h2>
                <p className="mt-3 font-outfit text-[14px] leading-[1.9] text-[#2B2B2B]/78 sm:text-[15px]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <FertilityFooter />
    </>
  );
}
