import Link from 'next/link';

export const metadata = {
  title: 'Cancellations & Refunds | Next Door Nutritionist',
  description: 'Our policy on cancelling or rescheduling consultations and programs with Next Door Nutritionist, and how refunds are handled.',
};

export default function CancellationsAndRefundsPage() {
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
              Cancellations &amp; Refunds
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#2B2B2B]/50">
              Last updated: 11 August 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-[0.75rem] border border-[#0B4A35]/10 bg-white p-6 md:p-8">
            <p className="text-[15px] leading-[1.8] text-[#2B2B2B]/70">
              At <span className="font-semibold text-[#2B2B2B]">Next Door Nutritionist</span>, every consultation slot is reserved exclusively for you and every plan is prepared individually. This policy explains when you can cancel or reschedule, and how refunds are handled. Please read it before making a payment.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="1. Rescheduling a Consultation">
              <ul>
                <li>You may reschedule your consultation <strong>free of charge</strong> if you inform us at least <strong>24 hours</strong> before the scheduled slot.</li>
                <li>Each booking may be rescheduled <strong>once</strong>. Further changes are subject to availability and may be treated as a fresh booking.</li>
                <li>Rescheduling requests must be sent by phone, WhatsApp, or email to the contact details listed below.</li>
                <li>Requests made less than 24 hours before the slot are accommodated at our discretion, subject to availability.</li>
              </ul>
            </PolicySection>

            <PolicySection title="2. Cancelling a Consultation">
              <ul>
                <li><strong>More than 48 hours before the slot:</strong> Full refund of the consultation fee, less any payment gateway charges.</li>
                <li><strong>Between 24 and 48 hours before the slot:</strong> 50% of the consultation fee is refundable, or the full amount may be adjusted against a future booking.</li>
                <li><strong>Less than 24 hours before the slot:</strong> No refund, as the slot is held for you and cannot be reallocated.</li>
                <li><strong>No-show without prior notice:</strong> No refund and the session is treated as completed.</li>
              </ul>
            </PolicySection>

            <PolicySection title="3. Programs & Packages">
              <ul>
                <li>Multi-session programs and packages are <strong>non-refundable once the program has commenced</strong> — that is, once the first consultation has taken place or the personalised plan has been shared.</li>
                <li>If you cancel <strong>before</strong> the first consultation and before any plan has been prepared, the amount paid is refundable less payment gateway charges and any administrative costs already incurred.</li>
                <li>Package fees are for the complete program. Discontinuing midway, or not using all included sessions within the program duration, does not entitle you to a partial refund.</li>
                <li>Unused sessions expire at the end of the program duration and cannot be carried forward, unless we agree otherwise in writing.</li>
              </ul>
            </PolicySection>

            <PolicySection title="4. Digital Plans & Materials">
              <p>
                Personalised nutrition plans, guides, recipes, and other digital material are prepared specifically for you. Once a plan or digital material has been shared with you, <strong>it is non-refundable</strong>, as it cannot be returned or reused.
              </p>
            </PolicySection>

            <PolicySection title="5. Cancellations by Us">
              <p>
                If we need to cancel a session due to illness, an emergency, or any other unforeseen circumstance, we will offer you:
              </p>
              <ul>
                <li>The earliest alternative slot at no additional cost, or</li>
                <li>A <strong>full refund</strong> of the amount paid for that session, if you prefer.</li>
              </ul>
              <p>
                If we determine that your requirement falls outside our scope of practice and decline to proceed, the amount paid will be refunded in full.
              </p>
            </PolicySection>

            <PolicySection title="6. Duplicate & Failed Payments">
              <p>
                If you have been charged twice for the same booking, or an amount was debited without the booking being confirmed, please contact us with the transaction details. Verified duplicate or failed-transaction amounts are refunded in full.
              </p>
            </PolicySection>

            <PolicySection title="7. No Refund for Results">
              <p>
                Nutrition outcomes depend heavily on individual adherence, medical history, and biological factors. We do not offer refunds on the basis of results not being achieved, or because a client chose not to follow the plan. We are, however, always willing to review your plan and adjust it during your program.
              </p>
            </PolicySection>

            <PolicySection title="8. How to Request a Refund">
              <p>To request a cancellation or refund, contact us with:</p>
              <ul>
                <li>Your full name and registered phone number</li>
                <li>Date and time of the booking</li>
                <li>Payment reference or transaction ID</li>
                <li>Reason for the cancellation request</li>
              </ul>
              <p>
                Send this to <a href="mailto:hormonenutritionclinic@gmail.com">hormonenutritionclinic@gmail.com</a> or call <a href="tel:+919867642689">+91 98676 42689</a>.
              </p>
            </PolicySection>

            <PolicySection title="9. Refund Processing Time">
              <ul>
                <li>Refund requests are reviewed and confirmed within <strong>3–5 working days</strong> of receipt.</li>
                <li>Approved refunds are processed to the <strong>original payment method</strong> and typically reflect within <strong>7–10 working days</strong>, depending on your bank or card issuer.</li>
                <li>Payment gateway charges, where applicable, are non-refundable.</li>
                <li>Refunds cannot be issued in cash or to a different account than the one used for payment.</li>
              </ul>
            </PolicySection>

            <PolicySection title="10. Related Policies">
              <p>
                This policy should be read together with our <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>, <Link href="/shipping-policy">Shipping &amp; Delivery Policy</Link>, and <Link href="/privacy-policy">Privacy Policy</Link>. We may update this policy from time to time; the version in effect at the time of your purchase applies to that purchase.
              </p>
            </PolicySection>

            <PolicySection title="11. Contact Us">
              <p>For any questions about cancellations or refunds, please reach out to us:</p>
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
