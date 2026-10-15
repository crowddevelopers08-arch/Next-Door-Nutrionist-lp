import Link from 'next/link';

export const metadata = {
  title: 'Medical & Nutrition Disclaimer | Next Door Nutritionist',
  description: 'Medical and nutrition disclaimer for Hormone Nutrition Clinic (ALPHI Health Private Limited) consultations, programs, and content.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#0B4A35]/10 bg-[#faf9f7f2] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-[80px] md:py-5">
          <Link href="/">
            <img
              alt="Next Door Nutritionist Logo"
              className="h-12 w-auto object-contain md:h-14"
              src="https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy"
            />
          </Link>
          <a
            href="tel:+919867642689"
            className="inline-flex items-center gap-2 rounded-full bg-[#0B4A35] px-4 py-2 font-outfit text-[12px] font-semibold text-white transition-colors hover:bg-[#093c2a] sm:px-5 sm:py-2.5 sm:text-[13px]"
          >
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            Call Now
          </a>
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 px-4 py-10 sm:px-6 md:px-[80px] md:py-10 max-[470px]:py-6 lg:py-10">
        <div className="mx-auto max-w-[800px]">

          {/* Page title */}
          <div className="mb-10 md:mb-14">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B4A35]">Legal</p>
            <h1 className="font-outfit text-[32px] font-extrabold leading-[1.2] text-[#2B2B2B] sm:text-[40px] md:text-[52px]">
              Medical &amp; Nutrition Disclaimer
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#2B2B2B]/50">
              Last updated: 19 June 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="General Disclaimer">
              <p>
                The information provided by Hormone Nutrition Clinic (ALPHI Health Private Limited) through consultations, programs, website content, social media platforms, emails, downloadable resources, educational materials, and other communications is intended solely for educational, informational, nutrition, wellness, and lifestyle purposes.
              </p>
              <p>
                The information provided should not be considered medical advice, diagnosis, treatment, or healthcare services.
              </p>
            </PolicySection>

            <PolicySection title="Not a Substitute for Medical Care">
              <p>Our services are not intended to replace:</p>
              <ul>
                <li>Medical diagnosis</li>
                <li>Medical treatment</li>
                <li>Emergency care</li>
                <li>Prescription medication management</li>
                <li>Professional healthcare advice</li>
              </ul>
              <p>
                Always seek advice from your physician or qualified healthcare provider regarding any medical condition, symptoms, treatment decisions, medications, or health concerns.
              </p>
              <p>
                Never disregard professional medical advice because of information obtained from Hormone Nutrition Clinic.
              </p>
            </PolicySection>

            <PolicySection title="Emergency Situations">
              <p>
                If you believe you are experiencing a medical emergency, immediately contact your physician, local emergency services, or visit the nearest emergency medical facility.
              </p>
              <p>Do not rely on our services during a medical emergency.</p>
            </PolicySection>

            <PolicySection title="Individual Results May Vary">
              <p>Nutrition and lifestyle outcomes vary significantly among individuals. Results depend on numerous factors including:</p>
              <ul>
                <li>Health status</li>
                <li>Medical history</li>
                <li>Genetics</li>
                <li>Hormonal conditions</li>
                <li>Lifestyle habits</li>
                <li>Medication use</li>
                <li>Compliance with recommendations</li>
              </ul>
              <p>We do not guarantee any specific outcome, including:</p>
              <ul>
                <li>Weight loss</li>
                <li>Hormonal balance</li>
                <li>Fertility outcomes</li>
                <li>Symptom improvement</li>
                <li>Disease prevention</li>
                <li>Disease management</li>
              </ul>
            </PolicySection>

            <PolicySection title="Personal Responsibility">
              <p>By participating in our services, you acknowledge that:</p>
              <ul>
                <li>You are voluntarily participating in nutrition and wellness programs.</li>
                <li>You assume responsibility for decisions made based on the information provided.</li>
                <li>You understand that recommendations are educational and supportive in nature.</li>
                <li>You are responsible for consulting appropriate healthcare professionals regarding medical concerns.</li>
              </ul>
            </PolicySection>

            <PolicySection title="Medical Information Provided by Clients">
              <p>
                Clients are responsible for ensuring that all health information provided is accurate, complete, and up to date.
              </p>
              <p>
                Failure to disclose relevant health information may affect the suitability of recommendations provided.
              </p>
            </PolicySection>

            <PolicySection title="Third-Party Content">
              <p>
                Our website and communications may reference third-party articles, resources, products, research studies, or websites.
              </p>
              <p>Such references do not constitute endorsement, guarantee, or recommendation.</p>
              <p>We are not responsible for third-party content, products, services, or claims.</p>
            </PolicySection>

            <PolicySection title="Testimonials and Success Stories">
              <p>
                Testimonials, reviews, and success stories shared on our website or marketing materials represent individual experiences.
              </p>
              <p>They do not guarantee that future clients will achieve similar results. Individual outcomes vary.</p>
            </PolicySection>

            <PolicySection title="Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Hormone Nutrition Clinic, its directors, employees, consultants, nutritionists, contractors, and affiliates shall not be liable for any loss, injury, damage, or adverse outcome arising from:
              </p>
              <ul>
                <li>Reliance on information provided</li>
                <li>Use of our services</li>
                <li>Implementation of recommendations</li>
                <li>Failure to seek appropriate medical care</li>
              </ul>
              <p>Participation in our services is entirely voluntary and at the client&rsquo;s own risk.</p>
            </PolicySection>

            <PolicySection title="Contact Information">
              <div className="mt-4 space-y-2 rounded-[0.5rem] bg-[#0B4A35]/5 p-5 text-[14px]">
                <p className="font-semibold text-[#2B2B2B]">Hormone Nutrition Clinic (ALPHI Health Private Limited)</p>
                <p>
                  Phone:{' '}
                  <a href="https://wa.link/lsm4ln" className="text-[#0B4A35] hover:underline">+91 99590 27830</a>
                </p>
                <p className="text-[#2B2B2B]/70">Location: 3rd Floor, Westend Mall, 301-A, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
              </div>
            </PolicySection>

          </div>

          {/* Back link */}
          <div className="mt-12 border-t border-[#0B4A35]/10 pt-8 md:mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0B4A35] hover:underline"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-[#0B4A35]/10 px-4 py-6 text-center sm:px-6 md:px-[80px]">
        <p className="text-[12px] italic text-[#2B2B2B]/40">
          © 2026 Next Door Nutritionist. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-outfit text-[20px] font-bold leading-[1.3] text-[#2B2B2B] md:text-[22px]">
        {title}
      </h2>
      <div className="space-y-3 text-[14px] leading-[1.8] text-[#2B2B2B]/70 md:text-[15px] [&_a]:font-semibold [&_a]:text-[#0B4A35] [&_a]:hover:underline [&_strong]:font-semibold [&_strong]:text-[#2B2B2B] [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-[#0B4A35]">
        {children}
      </div>
    </div>
  );
}
