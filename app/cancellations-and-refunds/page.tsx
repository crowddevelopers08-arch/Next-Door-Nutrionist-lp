import Link from 'next/link';

export const metadata = {
  title: 'Cancellations & Refunds | Hormone Nutrition Clinic',
  description: 'Fees, payment terms, no-refund and non-transfer policy, program validity, and rescheduling rules for Hormone Nutrition Clinic (ALPHI Health Private Limited).',
};

export default function CancellationsAndRefundsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#0B4A35]/10 bg-[#faf9f7f2] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-[80px] md:py-5">
          <Link href="/">
            <img
              alt="Hormone Nutrition Clinic Logo"
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
              Cancellations &amp; Refunds
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#2B2B2B]/50">
              Last updated: 17 October 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-[0.75rem] border border-[#0B4A35]/10 bg-white p-6 md:p-8">
            <p className="text-[15px] leading-[1.8] text-[#2B2B2B]/70">
              At <span className="font-semibold text-[#2B2B2B]">Hormone Nutrition Clinic (ALPHI Health Private Limited)</span>, every consultation slot is reserved exclusively for you and every plan is prepared individually. This policy explains our fees, payment terms, no-refund and non-transfer policy, program validity, and rescheduling rules. Please read it carefully before making a payment.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="1. Fees and Payments">
              <p>
                All fees for consultations, programs, packages, memberships, subscriptions, and related services are communicated at the time of booking or enrolment.
              </p>
              <p>Full payment may be required prior to commencement of services.</p>
              <p>
                Hormone Nutrition Clinic reserves the right to modify pricing, fees, promotions, and service offerings at any time without prior notice.
              </p>
              <p>Applicable taxes shall be charged where required by law.</p>
            </PolicySection>

            <PolicySection title="2. No Refund & Non-Transfer Policy">
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

            <PolicySection title="3. Program Validity and Expiry">
              <p>
                All consultations, sessions, coaching calls, support services, memberships, and program benefits must be utilised within the validity period communicated at enrolment.
              </p>
              <p>
                Any unused services remaining after the applicable program period shall automatically expire and shall not be eligible for:
              </p>
              <ul>
                <li>Refund</li>
                <li>Transfer</li>
                <li>Extension</li>
                <li>Credit</li>
                <li>Cash redemption</li>
              </ul>
              <p>unless expressly approved in writing by Hormone Nutrition Clinic.</p>
            </PolicySection>

            <PolicySection title="4. Cancellation and Rescheduling">
              <p>
                Clients are encouraged to provide at least <strong>24 hours’ notice</strong> for appointment rescheduling requests.
              </p>
              <p>
                Missed appointments, no-shows, or late arrivals may result in forfeiture of the consultation session.
              </p>
              <p>Hormone Nutrition Clinic reserves the right to reschedule appointments due to:</p>
              <ul>
                <li>Operational requirements</li>
                <li>Emergencies</li>
                <li>Technical issues</li>
                <li>Staff availability</li>
                <li>Circumstances beyond reasonable control</li>
              </ul>
            </PolicySection>

            <PolicySection title="5. Chargeback and Payment Disputes">
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

            <PolicySection title="6. Related Policies">
              <p>
                This policy should be read together with our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>, <Link href="/shipping-policy">Shipping &amp; Delivery Policy</Link>, and <Link href="/privacy-policy">Privacy Policy</Link>. We may update this policy from time to time; the version in effect at the time of your purchase applies to that purchase.
              </p>
            </PolicySection>

            <PolicySection title="7. Contact Us">
              <p>For any questions about cancellations or refunds, please reach out to us:</p>
              <div className="mt-4 space-y-2 rounded-[0.5rem] bg-[#0B4A35]/5 p-5 text-[14px]">
                <p className="font-semibold text-[#2B2B2B]">Hormone Nutrition Clinic (ALPHI Health Private Limited)</p>
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
          © 2026 Hormone Nutrition Clinic (ALPHI Health Private Limited). All rights reserved.
        </p>
      </footer>
    </main>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="!mt-6 font-outfit text-[16px] font-semibold text-[#2B2B2B] md:text-[17px]">
      {children}
    </h3>
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
