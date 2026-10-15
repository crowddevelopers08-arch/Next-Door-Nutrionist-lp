import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Next Door Nutritionist',
  description: 'The terms and conditions governing your use of the Hormone Nutrition Clinic (ALPHI Health Private Limited) website, consultations, and nutrition programs.',
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
              Last updated: 19 June 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-[0.75rem] border border-[#0B4A35]/10 bg-white p-6 md:p-8">
            <p className="text-[15px] leading-[1.8] text-[#2B2B2B]/70">
              Welcome to <span className="font-semibold text-[#2B2B2B]">Hormone Nutrition Clinic (ALPHI Health Private Limited)</span>. These Terms &amp; Conditions govern your access to and use of our website, consultations, nutrition programs, coaching services, digital content, communications, and related services. By accessing our website, booking a consultation, enrolling in a program, making a payment, or using any of our services, you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="1. About Us">
              <p>
                Hormone Nutrition Clinic is a healthcare and wellness clinic operated by ALPHI Health Private Limited, providing nutrition counselling, hormone health support, lifestyle guidance, wellness coaching, educational resources, and related services to clients in India and internationally.
              </p>
            </PolicySection>

            <PolicySection title="2. Acceptance of Terms">
              <p>By using our website or services, you confirm that:</p>
              <ul>
                <li>You are legally capable of entering into a binding agreement.</li>
                <li>You have read and understood these Terms &amp; Conditions.</li>
                <li>You agree to comply with all applicable laws and regulations.</li>
                <li>All information provided by you is accurate, complete, and current.</li>
              </ul>
              <p>If you do not agree with these Terms &amp; Conditions, please do not use our services.</p>
            </PolicySection>

            <PolicySection title="3. Eligibility">
              <p>Our services are intended for individuals aged 18 years and above.</p>
              <p>
                Where services are provided to a minor, participation must be initiated and supervised by a parent or legal guardian who agrees to these Terms on the minor&rsquo;s behalf.
              </p>
            </PolicySection>

            <PolicySection title="4. Services">
              <p>Hormone Nutrition Clinic may provide:</p>
              <ul>
                <li>Clinical nutrition consultations</li>
                <li>Hormone health nutrition support</li>
                <li>PCOS and fertility nutrition support</li>
                <li>Weight management programs</li>
                <li>Lifestyle and wellness coaching</li>
                <li>Educational resources and digital content</li>
                <li>Follow-up consultations and support</li>
                <li>Online and in-person services</li>
              </ul>
              <p>We reserve the right to modify, suspend, discontinue, or update any service without prior notice.</p>
            </PolicySection>

            <PolicySection title="5. No Medical Advice">
              <p>
                The information, recommendations, meal plans, educational materials, coaching, and guidance provided by Hormone Nutrition Clinic are intended solely for nutrition, wellness, educational, and lifestyle purposes.
              </p>
              <p>Our services:</p>
              <ul>
                <li>Do not constitute medical advice.</li>
                <li>Do not establish a doctor-patient relationship.</li>
                <li>Do not replace medical diagnosis or treatment.</li>
                <li>Are not intended for emergency medical situations.</li>
              </ul>
              <p>
                Clients should consult their physician or qualified healthcare provider regarding any medical condition, diagnosis, medication, treatment, or healthcare decision.
              </p>
            </PolicySection>

            <PolicySection title="6. Client Responsibilities">
              <p>Clients agree to:</p>
              <ul>
                <li>Provide accurate and complete health information.</li>
                <li>Disclose relevant medical conditions, allergies, medications, and treatments.</li>
                <li>Inform us of any significant changes in health status.</li>
                <li>Follow recommendations at their own discretion.</li>
                <li>Seek appropriate medical advice when required.</li>
              </ul>
              <p>
                Hormone Nutrition Clinic shall not be responsible for outcomes resulting from inaccurate, incomplete, misleading, or omitted information provided by clients.
              </p>
            </PolicySection>

            <PolicySection title="7. Results Disclaimer">
              <p>Nutrition and lifestyle outcomes vary significantly between individuals. Results depend on numerous factors including:</p>
              <ul>
                <li>Existing health conditions</li>
                <li>Hormonal status</li>
                <li>Medical history</li>
                <li>Genetics</li>
                <li>Lifestyle habits</li>
                <li>Medication use</li>
                <li>Adherence to recommendations</li>
              </ul>
              <p>Hormone Nutrition Clinic makes no guarantees regarding:</p>
              <ul>
                <li>Weight loss or weight gain</li>
                <li>Hormonal balance</li>
                <li>Fertility outcomes</li>
                <li>Symptom improvement</li>
                <li>Disease prevention</li>
                <li>Disease management</li>
                <li>Any specific health outcome</li>
              </ul>
              <p>Individual results will vary.</p>
            </PolicySection>

            <PolicySection title="8. Appointments and Consultations">
              <p>Appointments may be conducted:</p>
              <ul>
                <li>Online</li>
                <li>By telephone</li>
                <li>Through video conferencing platforms</li>
                <li>In person, where available</li>
              </ul>
              <p>
                Clients are responsible for ensuring they have suitable internet access, devices, and communication facilities required for virtual consultations.
              </p>
              <p>Consultation durations are approximate and may vary based on individual requirements.</p>
            </PolicySection>

            <PolicySection title="9. Teleconsultation Disclaimer">
              <p>Clients acknowledge that online consultations may be affected by:</p>
              <ul>
                <li>Internet connectivity issues</li>
                <li>Technical failures</li>
                <li>Platform outages</li>
                <li>Device malfunctions</li>
                <li>Software interruptions</li>
                <li>Circumstances beyond the Clinic&rsquo;s reasonable control</li>
              </ul>
              <p>Hormone Nutrition Clinic shall not be liable for interruptions or delays caused by such technical issues.</p>
            </PolicySection>

            <PolicySection title="10. Fees and Payments">
              <p>
                All fees for consultations, programs, packages, memberships, subscriptions, and related services are communicated at the time of booking or enrolment.
              </p>
              <p>Full payment may be required prior to commencement of services.</p>
              <p>
                Hormone Nutrition Clinic reserves the right to modify pricing, fees, promotions, and service offerings at any time without prior notice.
              </p>
              <p>Applicable taxes shall be charged where required by law.</p>
            </PolicySection>

            <PolicySection title="11. No Refund & Non-Transfer Policy">
              <SubHeading>Important Payment Terms</SubHeading>
              <p>
                Kindly note that payments made for any consultation, package, membership, subscription, program, coaching service, assessment, or related offering are <strong>strictly non-refundable and non-transferable</strong>.
              </p>
              <p>By making a payment, you expressly acknowledge and agree that:</p>

              <SubHeading>No Refunds</SubHeading>
              <p>All payments are final.</p>
              <p>No refunds, full or partial, shall be provided for any reason, including but not limited to:</p>
              <ul>
                <li>Change of mind</li>
                <li>Dissatisfaction with progress or results</li>
                <li>Failure to follow recommendations</li>
                <li>Scheduling conflicts</li>
                <li>Relocation</li>
                <li>Personal circumstances</li>
                <li>Medical conditions</li>
                <li>Failure to attend consultations</li>
                <li>Partial utilisation of services</li>
                <li>Non-utilisation of services</li>
                <li>Travel commitments</li>
                <li>Family emergencies</li>
                <li>Work commitments</li>
                <li>Change in financial circumstances</li>
              </ul>

              <SubHeading>No Transfers</SubHeading>
              <p>Purchased services:</p>
              <ul>
                <li>Cannot be transferred to another individual.</li>
                <li>Cannot be assigned to family members, friends, or third parties.</li>
                <li>Cannot be exchanged for alternative programs or services.</li>
                <li>Cannot be redeemed for cash, credit, or future value.</li>
              </ul>

              <SubHeading>No Credits</SubHeading>
              <p>
                Unused consultations, sessions, coaching calls, support periods, memberships, packages, or program benefits shall not be eligible for:
              </p>
              <ul>
                <li>Refunds</li>
                <li>Credits</li>
                <li>Extensions</li>
                <li>Transfers</li>
                <li>Cash redemption</li>
              </ul>

              <SubHeading>Limited Exception</SubHeading>
              <p>In exceptional circumstances involving:</p>
              <ul>
                <li>Duplicate payments;</li>
                <li>Payment processing errors; or</li>
                <li>Situations where Hormone Nutrition Clinic is unable to provide the purchased service;</li>
              </ul>
              <p>the Clinic may, at its sole discretion, determine an appropriate resolution.</p>
            </PolicySection>

            <PolicySection title="12. Program Validity and Expiry">
              <p>
                All consultations, sessions, coaching calls, support services, memberships, and program benefits must be utilised within the validity period communicated at enrolment.
              </p>
              <p>Any unused services remaining after the applicable program period shall automatically expire and shall not be eligible for:</p>
              <ul>
                <li>Refund</li>
                <li>Transfer</li>
                <li>Extension</li>
                <li>Credit</li>
                <li>Cash redemption</li>
              </ul>
              <p>unless expressly approved in writing by Hormone Nutrition Clinic.</p>
            </PolicySection>

            <PolicySection title="13. Cancellation and Rescheduling">
              <p>Clients are encouraged to provide at least 24 hours&rsquo; notice for appointment rescheduling requests.</p>
              <p>Missed appointments, no-shows, or late arrivals may result in forfeiture of the consultation session.</p>
              <p>Hormone Nutrition Clinic reserves the right to reschedule appointments due to:</p>
              <ul>
                <li>Operational requirements</li>
                <li>Emergencies</li>
                <li>Technical issues</li>
                <li>Staff availability</li>
                <li>Circumstances beyond reasonable control</li>
              </ul>
            </PolicySection>

            <PolicySection title="14. Communication Consent">
              <p>By submitting your contact information, you consent to receiving communications from Hormone Nutrition Clinic through:</p>
              <ul>
                <li>Email</li>
                <li>Phone calls</li>
                <li>SMS</li>
                <li>WhatsApp</li>
                <li>Other communication channels reasonably required for service delivery</li>
              </ul>
              <p>Such communications may include:</p>
              <ul>
                <li>Appointment reminders</li>
                <li>Consultation follow-ups</li>
                <li>Service updates</li>
                <li>Administrative notices</li>
                <li>Program-related communications</li>
              </ul>
              <p>You may opt out of marketing communications at any time.</p>
            </PolicySection>

            <PolicySection title="15. Client Conduct">
              <p>
                Hormone Nutrition Clinic is committed to maintaining a professional, respectful, and safe environment for clients and staff.
              </p>
              <p>The Clinic reserves the right to suspend or terminate services immediately, without refund, where a client engages in:</p>
              <ul>
                <li>Abusive behaviour</li>
                <li>Harassment</li>
                <li>Threatening conduct</li>
                <li>Discrimination</li>
                <li>Offensive language</li>
                <li>Inappropriate communications</li>
                <li>Any conduct that negatively impacts staff, consultants, contractors, or other clients</li>
              </ul>
              <p>Termination under this clause shall not create any entitlement to refund, transfer, extension, or compensation.</p>
            </PolicySection>

            <PolicySection title="16. Chargeback and Payment Disputes">
              <p>
                Clients agree to contact Hormone Nutrition Clinic directly to resolve concerns before initiating a chargeback, payment dispute, reversal, or claim with a bank, payment processor, or credit card provider.
              </p>
              <p>
                Where services have been delivered in accordance with these Terms, initiating a chargeback may be considered a breach of these Terms &amp; Conditions.
              </p>
              <p>
                The Clinic reserves the right to provide these Terms, payment records, attendance records, and service records to financial institutions in response to any payment dispute.
              </p>
            </PolicySection>

            <PolicySection title="17. Intellectual Property">
              <p>All content provided through our website, programs, consultations, and communications, including but not limited to:</p>
              <ul>
                <li>Logos</li>
                <li>Branding</li>
                <li>Meal plans</li>
                <li>Nutrition guides</li>
                <li>Educational materials</li>
                <li>Videos</li>
                <li>Graphics</li>
                <li>Articles</li>
                <li>Downloads</li>
                <li>Program content</li>
              </ul>
              <p>remains the exclusive property of Hormone Nutrition Clinic (ALPHI Health Private Limited).</p>
              <p>No content may be copied, reproduced, distributed, published, modified, sold, shared, or exploited without prior written permission.</p>
            </PolicySection>

            <PolicySection title="18. Acceptable Use">
              <p>Users agree not to:</p>
              <ul>
                <li>Use the website unlawfully.</li>
                <li>Attempt unauthorised access to systems.</li>
                <li>Upload malicious software.</li>
                <li>Interfere with website functionality.</li>
                <li>Misrepresent their identity.</li>
                <li>Engage in fraudulent or abusive conduct.</li>
              </ul>
              <p>We reserve the right to suspend or terminate access for violations of these Terms.</p>
            </PolicySection>

            <PolicySection title="19. Third-Party Services">
              <p>
                Our website and services may utilise or link to third-party platforms including payment processors, scheduling systems, analytics providers, communication tools, and social media platforms.
              </p>
              <p>We are not responsible for the availability, security, content, or privacy practices of third-party services.</p>
              <p>Use of third-party services is subject to their respective terms and policies.</p>
            </PolicySection>

            <PolicySection title="20. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Hormone Nutrition Clinic (ALPHI Health Private Limited), its directors, officers, employees, consultants, nutritionists, contractors, affiliates, and representatives shall not be liable for:
              </p>
              <ul>
                <li>Indirect damages</li>
                <li>Consequential damages</li>
                <li>Incidental damages</li>
                <li>Loss of profits</li>
                <li>Loss of revenue</li>
                <li>Loss of data</li>
                <li>Business interruption</li>
                <li>Health outcomes</li>
                <li>Decisions made based on information provided through our services</li>
              </ul>
              <p>Your use of our services is entirely at your own risk.</p>
            </PolicySection>

            <PolicySection title="21. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless Hormone Nutrition Clinic (ALPHI Health Private Limited), its directors, employees, consultants, affiliates, and representatives from any claims, liabilities, damages, losses, costs, or expenses arising from:
              </p>
              <ul>
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Information provided by you</li>
                <li>Your breach of applicable laws or regulations</li>
              </ul>
            </PolicySection>

            <PolicySection title="22. Privacy">
              <p>Your use of our services is also governed by our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
              <p>
                By using our website and services, you consent to the collection, use, and processing of information as described in our Privacy Policy.
              </p>
            </PolicySection>

            <PolicySection title="23. Force Majeure">
              <p>
                Hormone Nutrition Clinic shall not be liable for delays or failure to perform obligations due to events beyond its reasonable control, including but not limited to:
              </p>
              <ul>
                <li>Natural disasters</li>
                <li>Government actions</li>
                <li>Internet outages</li>
                <li>Power failures</li>
                <li>Pandemics</li>
                <li>Civil unrest</li>
                <li>War</li>
                <li>Technical failures</li>
                <li>Cybersecurity incidents</li>
              </ul>
            </PolicySection>

            <PolicySection title="24. Changes to These Terms">
              <p>We reserve the right to amend or update these Terms &amp; Conditions at any time.</p>
              <p>Updated versions will be posted on this page with a revised effective date.</p>
              <p>Continued use of our services following publication of updated Terms constitutes acceptance of those changes.</p>
            </PolicySection>

            <PolicySection title="25. Governing Law and Jurisdiction">
              <p>These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of India.</p>
              <p>
                Any dispute arising out of or relating to these Terms or the use of our services shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.
              </p>
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-2 font-outfit text-[16px] font-semibold text-[#2B2B2B] md:text-[17px]">
      {children}
    </h3>
  );
}
