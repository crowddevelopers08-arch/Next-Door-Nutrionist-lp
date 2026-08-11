import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Next Door Nutritionist',
  description: 'The terms and conditions governing your use of the Next Door Nutritionist website, consultations, and nutrition programs.',
};

export default function TermsAndConditionsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#2B2B2B]/50">
              Last updated: 11 August 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-[0.75rem] border border-[#0B4A35]/10 bg-white p-6 md:p-8">
            <p className="text-[15px] leading-[1.8] text-[#2B2B2B]/70">
              Welcome to <span className="font-semibold text-[#2B2B2B]">Next Door Nutritionist</span>. These Terms &amp; Conditions govern your access to and use of our website, consultations, nutrition programs, and related services. By using our website or booking a consultation, you agree to be bound by these terms. If you do not agree, please do not use our services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="1. Definitions">
              <ul>
                <li><strong>&ldquo;We&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;</strong> refers to Next Door Nutritionist (Hormone Nutrition Clinic).</li>
                <li><strong>&ldquo;You&rdquo;, &ldquo;client&rdquo;, &ldquo;user&rdquo;</strong> refers to any person accessing our website or availing our services.</li>
                <li><strong>&ldquo;Services&rdquo;</strong> refers to nutrition consultations, personalised diet plans, hormonal health programs, follow-up support, and any digital or downloadable material we provide.</li>
              </ul>
            </PolicySection>

            <PolicySection title="2. Eligibility">
              <p>
                Our services are intended for individuals aged 18 years and above. If services are availed for a minor, a parent or legal guardian must provide consent and remain responsible for all obligations under these terms.
              </p>
              <p>
                By using our services, you confirm that the information you provide is accurate, current, and complete, and that you will keep it updated.
              </p>
            </PolicySection>

            <PolicySection title="3. Nature of Our Services — Important Health Disclaimer">
              <p>
                Next Door Nutritionist provides <strong>nutrition and lifestyle guidance only</strong>. Our services are educational and supportive in nature and are <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>.
              </p>
              <ul>
                <li>We do not diagnose medical conditions, prescribe medication, or provide emergency medical care.</li>
                <li>You should always consult your physician or a qualified healthcare provider before making changes to your diet, supplements, exercise, or medication.</li>
                <li>Never disregard or delay seeking medical advice because of something you have read on our website or heard during a consultation.</li>
                <li>If you are pregnant, nursing, managing a chronic condition, or taking prescription medication, you must disclose this to us and to your treating doctor.</li>
              </ul>
              <p>
                Individual results vary. We make no guarantee of any specific health, weight, hormonal, or fertility outcome. Testimonials and case studies shown on our website reflect individual experiences and are not a promise of similar results.
              </p>
            </PolicySection>

            <PolicySection title="4. Bookings & Appointments">
              <ul>
                <li>Consultations are confirmed only after successful payment and receipt of a confirmation via call, email, or WhatsApp.</li>
                <li>Please join or arrive on time. Sessions begin and end at the scheduled time; late arrival may reduce your session duration.</li>
                <li>Rescheduling requests must be made at least <strong>24 hours</strong> before the scheduled slot, subject to availability.</li>
                <li>We reserve the right to reschedule a session due to unforeseen circumstances, illness, or emergencies, and will offer you the earliest alternative slot.</li>
              </ul>
            </PolicySection>

            <PolicySection title="5. Client Responsibilities">
              <p>To get the best outcome from our programs, you agree to:</p>
              <ul>
                <li>Disclose complete and accurate medical history, current medication, allergies, and existing health conditions.</li>
                <li>Follow the plan as reasonably advised and communicate any difficulty, discomfort, or adverse reaction promptly.</li>
                <li>Use the plans and materials for your personal use only.</li>
                <li>Treat our team with respect and courtesy during all interactions.</li>
              </ul>
              <p>
                You remain solely responsible for your own health decisions and for how you apply the guidance provided.
              </p>
            </PolicySection>

            <PolicySection title="6. Fees & Payments">
              <ul>
                <li>All fees are displayed in Indian Rupees (INR) and are payable in advance unless otherwise agreed in writing.</li>
                <li>Payments are processed through secure third-party payment gateways. We do not store your card or banking details.</li>
                <li>Program fees are for the duration and inclusions specified at the time of purchase. Additional sessions or services will be charged separately.</li>
                <li>We reserve the right to revise our pricing at any time. Price changes will not affect programs already paid for.</li>
              </ul>
              <p>
                Please refer to our <Link href="/cancellations-and-refunds">Cancellations &amp; Refunds Policy</Link> for details on refunds, and our <Link href="/shipping-policy">Shipping &amp; Delivery Policy</Link> for how plans and materials are delivered.
              </p>
            </PolicySection>

            <PolicySection title="7. Intellectual Property">
              <p>
                All content on this website and within our programs — including diet plans, recipes, guides, worksheets, videos, text, graphics, logos, and branding — is the intellectual property of Next Door Nutritionist and is protected under applicable copyright and trademark laws.
              </p>
              <ul>
                <li>Materials are licensed to you for personal, non-commercial use only.</li>
                <li>You may not copy, reproduce, resell, distribute, publish, or share our plans or materials with any third party.</li>
                <li>Unauthorised use may result in termination of services without refund and legal action.</li>
              </ul>
            </PolicySection>

            <PolicySection title="8. Confidentiality & Privacy">
              <p>
                We treat your health and personal information as confidential. Our handling of your data is described in detail in our <Link href="/privacy-policy">Privacy Policy</Link>, which forms part of these Terms.
              </p>
            </PolicySection>

            <PolicySection title="9. Communication & Consent">
              <p>
                By sharing your contact details, you consent to receive calls, SMS, WhatsApp messages, and emails from us relating to your consultation, plan, reminders, and follow-ups. Promotional communication is sent only where permitted, and you may opt out at any time by contacting us.
              </p>
            </PolicySection>

            <PolicySection title="10. Acceptable Use of the Website">
              <p>You agree not to:</p>
              <ul>
                <li>Use the website for any unlawful, fraudulent, or harmful purpose.</li>
                <li>Attempt to gain unauthorised access to our systems, accounts, or data.</li>
                <li>Introduce viruses, malicious code, or automated scraping tools.</li>
                <li>Post or transmit content that is defamatory, obscene, or infringes the rights of others.</li>
              </ul>
              <p>
                We may suspend or terminate your access to our website or services if we reasonably believe you have breached these terms.
              </p>
            </PolicySection>

            <PolicySection title="11. Third-Party Links & Services">
              <p>
                Our website may contain links to third-party websites, tools, or payment providers. We do not control and are not responsible for their content, policies, or practices. Your use of those services is at your own risk and subject to their terms.
              </p>
            </PolicySection>

            <PolicySection title="12. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Next Door Nutritionist, its team, and affiliates shall not be liable for any indirect, incidental, or consequential loss arising from your use of our website or services, including any health outcome resulting from your application of the guidance provided.
              </p>
              <p>
                Our total liability in any circumstance shall not exceed the amount you have actually paid to us for the specific service giving rise to the claim.
              </p>
              <p>
                Nothing in these terms limits liability that cannot be excluded under applicable law.
              </p>
            </PolicySection>

            <PolicySection title="13. Indemnity">
              <p>
                You agree to indemnify and hold harmless Next Door Nutritionist against any claims, damages, or expenses arising from your breach of these terms, misuse of our materials, or failure to disclose relevant medical information.
              </p>
            </PolicySection>

            <PolicySection title="14. Termination">
              <p>
                We reserve the right to decline or discontinue services at our discretion — for example, where a client&rsquo;s needs fall outside our scope of practice, where required medical information is withheld, or where our team is treated abusively. Where we discontinue services, any applicable refund will be handled as per our <Link href="/cancellations-and-refunds">Cancellations &amp; Refunds Policy</Link>.
              </p>
            </PolicySection>

            <PolicySection title="15. Changes to These Terms">
              <p>
                We may update these Terms &amp; Conditions from time to time. The revised version will be posted on this page with an updated date. Continued use of our website or services after changes are posted constitutes your acceptance of the updated terms.
              </p>
            </PolicySection>

            <PolicySection title="16. Governing Law & Jurisdiction">
              <p>
                These Terms are governed by the laws of India. Any dispute arising out of or relating to these Terms or our services shall be subject to the exclusive jurisdiction of the courts at Hyderabad, Telangana.
              </p>
            </PolicySection>

            <PolicySection title="17. Contact Us">
              <p>For any questions regarding these Terms &amp; Conditions, please reach out to us:</p>
              <div className="mt-4 space-y-2 rounded-[0.5rem] bg-[#0B4A35]/5 p-5 text-[14px]">
                <p className="font-semibold text-[#2B2B2B]">Next Door Nutritionist</p>
                <p className="text-[#2B2B2B]/70">3rd Floor, Westend Mall, 301-A, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
                <p>
                  <a href="tel:+919867642689" className="text-[#0B4A35] hover:underline">+91 98676 42689</a>
                </p>
                <p>
                  <a href="mailto:hormonenutritionclinic@gmail.com" className="text-[#0B4A35] hover:underline">hormonenutritionclinic@gmail.com</a>
                </p>
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
