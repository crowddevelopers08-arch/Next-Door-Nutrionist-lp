import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Delivery Policy | Next Door Nutritionist',
  description: 'How Next Door Nutritionist delivers consultations, personalised nutrition plans, and digital materials to clients.',
};

export default function ShippingPolicyPage() {
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
              Shipping &amp; Delivery Policy
            </h1>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#2B2B2B]/50">
              Last updated: 11 August 2026
            </p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-[0.75rem] border border-[#0B4A35]/10 bg-white p-6 md:p-8">
            <p className="text-[15px] leading-[1.8] text-[#2B2B2B]/70">
              <span className="font-semibold text-[#2B2B2B]">Next Door Nutritionist</span> provides health and nutrition <span className="font-semibold text-[#2B2B2B]">services</span> — consultations, personalised nutrition plans, and digital guidance material. We do <span className="font-semibold text-[#2B2B2B]">not sell or ship any physical products</span>. This policy explains how and when your services and materials are delivered to you.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 md:space-y-10">

            <PolicySection title="1. No Physical Shipping">
              <p>
                We do not sell supplements, food products, kits, or any other physical goods. Consequently, there are no shipping charges, courier partners, tracking numbers, or delivery addresses involved in any purchase made with us.
              </p>
              <p>
                All our offerings are delivered <strong>digitally or in person at our clinic</strong>, as described below.
              </p>
            </PolicySection>

            <PolicySection title="2. How Services Are Delivered">
              <ul>
                <li><strong>Online Consultations:</strong> Conducted over a video call or phone call at your scheduled time. The joining link or call details are shared with you in advance via WhatsApp or email.</li>
                <li><strong>In-Clinic Consultations:</strong> Conducted at our clinic in Jubilee Hills, Hyderabad, at your confirmed appointment slot.</li>
                <li><strong>Personalised Nutrition Plans:</strong> Delivered as a digital document (PDF) via email or WhatsApp to the contact details you provide.</li>
                <li><strong>Guides, Recipes & Support Material:</strong> Shared digitally as part of your program.</li>
                <li><strong>Follow-Up Support:</strong> Provided over WhatsApp, phone, or scheduled follow-up calls, as per the inclusions of your program.</li>
              </ul>
            </PolicySection>

            <PolicySection title="3. Delivery Timelines">
              <ul>
                <li><strong>Booking confirmation:</strong> Sent within <strong>24 hours</strong> of successful payment.</li>
                <li><strong>Consultation:</strong> Held at the date and time confirmed with you at the time of booking.</li>
                <li><strong>Personalised plan:</strong> Shared within <strong>3–5 working days</strong> after your consultation and after we receive all required information, reports, and test results from you.</li>
                <li><strong>Program material:</strong> Shared at the start of the program or in stages, as per the program structure explained to you.</li>
              </ul>
              <p>
                Timelines may extend if required medical reports, questionnaires, or dietary details are pending from your side, or during public holidays and unforeseen circumstances. We will keep you informed in such cases.
              </p>
            </PolicySection>

            <PolicySection title="4. Accuracy of Your Contact Details">
              <p>
                Plans and materials are delivered to the email address and phone number provided by you at the time of booking. Please ensure these are accurate and active.
              </p>
              <p>
                We are not responsible for non-delivery caused by incorrect contact details, a full inbox, spam or promotional filtering, or an inactive WhatsApp number. If you have not received your plan within the stated timeline, please check your spam folder and then contact us.
              </p>
            </PolicySection>

            <PolicySection title="5. Delivery Charges">
              <p>
                There are <strong>no delivery, shipping, or handling charges</strong> of any kind. The fee you pay covers the consultation and program inclusions only, as described at the time of purchase.
              </p>
            </PolicySection>

            <PolicySection title="6. Service Area">
              <p>
                Online consultations and digital plans are available to clients across India and internationally. In-clinic consultations are available only at our Hyderabad location. Consultations are conducted in accordance with applicable Indian regulations.
              </p>
            </PolicySection>

            <PolicySection title="7. Missed or Undelivered Sessions">
              <p>
                If a scheduled session could not take place due to a technical issue or an error on our side, we will reschedule it at the earliest mutually convenient time at no extra cost. Sessions missed without prior notice are treated as per our <Link href="/cancellations-and-refunds">Cancellations &amp; Refunds Policy</Link>.
              </p>
            </PolicySection>

            <PolicySection title="8. Contact Us">
              <p>If you have any questions about delivery of your consultation or plan, please reach out to us:</p>
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
