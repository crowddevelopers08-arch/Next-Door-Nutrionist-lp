import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Next Door Nutritionist',
  description: 'Learn how Next Door Nutritionist collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#0B4A35]/10 bg-[#faf9f7f2] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-[80px] md:py-5">
          <Link href="/">
            <img
              alt="Next Door Nutritionist Logo"
              className="h-12 w-auto object-contain md:h-14"
              src="/HNC-LOGO-1.png"
            />
          </Link>
          <a
            href="tel:+919959027830"
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#2B2B2B]/50">
              Last updated: 18 May 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-[0.75rem] border border-[#0B4A35]/10 bg-white p-6 md:p-8">
            <p className="text-[15px] leading-[1.8] text-[#2B2B2B]/70">
              At <span className="font-semibold text-[#2B2B2B]">Next Door Nutritionist</span>, your privacy is of paramount importance to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="1. Information We Collect">
              <p>We may collect the following types of information:</p>
              <ul>
                <li><strong>Personal Identification Information:</strong> Name, phone number, email address, date of birth, and gender — provided voluntarily when you book a consultation or fill out a contact form.</li>
                <li><strong>Health Information:</strong> Hormonal health history, PCOS/fertility concerns, dietary habits, medical reports, and lifestyle details — collected to personalise your nutrition plan. This information is handled with the highest level of confidentiality.</li>
                <li><strong>Device & Usage Data:</strong> IP address, browser type, pages visited, time spent on pages — collected automatically through cookies and analytics tools.</li>
                <li><strong>Communication Records:</strong> Records of interactions with our team via phone, email, or WhatsApp, used to improve service quality.</li>
              </ul>
            </PolicySection>

            <PolicySection title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Schedule, confirm, and manage your consultations</li>
                <li>Personalise nutrition plans and lifestyle recommendations</li>
                <li>Send appointment reminders and follow-up care instructions</li>
                <li>Respond to your enquiries and provide nutritionist support</li>
                <li>Send promotional offers, updates, and newsletters (only with your consent)</li>
                <li>Improve our website, services, and user experience</li>
                <li>Comply with applicable legal and regulatory obligations</li>
              </ul>
            </PolicySection>

            <PolicySection title="3. How We Protect Your Information">
              <p>
                We implement reasonable administrative, technical, and organisational safeguards designed to protect your personal information.
              </p>
              <p>
                Health information is accessible only to authorised healthcare professionals and team members directly involved in providing your care and support.
              </p>
            </PolicySection>

            <PolicySection title="4. Sharing Your Information">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> Trusted third-party vendors (e.g., appointment management software, SMS/email platforms) who assist in operating our services, bound by confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or regulatory authority.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred — you will be notified before this occurs.</li>
              </ul>
            </PolicySection>

            <PolicySection title="5. Cookies & Tracking Technologies">
              <p>
                Our website uses cookies to enhance your browsing experience, analyse site traffic, and personalise content. Cookies are small files stored on your device. You can instruct your browser to refuse cookies, though this may limit some functionality of our website.
              </p>
              <p>We use:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function correctly.</li>
                <li><strong>Analytics Cookies:</strong> To understand how visitors interact with our website (e.g., Google Analytics).</li>
                <li><strong>Marketing Cookies:</strong> To serve relevant advertisements and track campaign effectiveness.</li>
              </ul>
            </PolicySection>

            <PolicySection title="6. Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time using the link in our emails or by contacting us directly.</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format.</li>
              </ul>
              <p>To exercise any of these rights, please contact us at <a href="mailto:hormonenutritionclinic@gmail.com" className="font-semibold text-[#0B4A35] hover:underline">hormonenutritionclinic@gmail.com</a>.</p>
            </PolicySection>

            <PolicySection title="7. Retention of Data">
              <p>
                We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Health records are retained in accordance with applicable medical record retention regulations. When data is no longer needed, it is securely deleted or anonymised.
              </p>
            </PolicySection>

            <PolicySection title="8. Third-Party Links">
              <p>
                Our website may contain links to third-party websites (e.g., Google Reviews, social media platforms). We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before sharing any personal information.
              </p>
            </PolicySection>

            <PolicySection title="9. Children's Privacy">
              <p>
                Our website and services are primarily intended for adults. If nutrition services are provided to minors, consent from a parent or legal guardian will be required.
              </p>
            </PolicySection>

            <PolicySection title="10. Refund Policy">
              <p>
                All consultation fees and program payments are generally non-refundable once services have been booked or commenced, except where required under applicable law.
              </p>
            </PolicySection>

            <PolicySection title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of our website or services after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </PolicySection>

            <PolicySection title="12. Contact Us">
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
              <div className="mt-4 space-y-2 rounded-[0.5rem] bg-[#0B4A35]/5 p-5 text-[14px]">
                <p className="font-semibold text-[#2B2B2B]">Next Door Nutritionist</p>
                <p className="text-[#2B2B2B]/70">3rd Floor, Westend Mall, 301-A, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033</p>
                <p>
                  <a href="tel:+919959027830" className="text-[#0B4A35] hover:underline">+91 99590 27830</a>
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
      <div className="space-y-3 text-[14px] leading-[1.8] text-[#2B2B2B]/70 md:text-[15px] [&_a]:font-semibold [&_a]:text-[#0B4A35] [&_strong]:font-semibold [&_strong]:text-[#2B2B2B] [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-[#0B4A35]">
        {children}
      </div>
    </div>
  );
}
