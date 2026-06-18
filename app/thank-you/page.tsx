import Link from 'next/link';
import Script from 'next/script';

export const metadata = {
  title: 'Thank You | Le Thia Cares',
  description: 'Thank you for booking with Le Thia Cares. We will be in touch shortly.',
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-[#d2c3c74d] bg-[#faf9f7f2] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center px-4 py-4 sm:px-6 md:px-[80px] md:py-5">
          <Link href="/">
            <img
              alt="Le Thia Cares Logo"
              className="h-12 w-auto object-contain md:h-14"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDULIs-D-ozw3cg59e8NKcZgP0C881paksA5k47FsOo62Tk72Ypf-eio4E5T74wI_YC8dzsLzv-Y1aWbCFh3g9iyEDYkZn8_Ww13KuqSH7lh1Hk7vLV-N5V5M0dqMu5kq8LoOReSG7LdVN8YjETzcY6dIK_KcxI0sFMRUBPrlvdSq5rpnlQ0sSt-IMWysouG-pMsUyXi5kr3vzLc1Xmke-OS-mqw3BEzj-MBZBYtHmtag2yqU8P1U-scdpDtndb4nyImNF9Yo2NGKfo"
            />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-[80px] md:py-10 max-[470px]:py-6 lg:py-10">
        <div className="mx-auto w-full max-w-[640px] text-center">

          {/* Success icon */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#492e3b1a] md:h-24 md:w-24">
            <span
              className="material-symbols-outlined text-[44px] text-[#492e3b] md:text-[52px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-[32px] font-medium leading-[1.2] text-[#1a1c1b] sm:text-[40px] md:text-[52px]">
            You&rsquo;re All Set!
          </h1>
          <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#492e3b]">
            Appointment Request Received
          </p>

          {/* Divider */}
          <div className="mx-auto my-8 h-px w-16 bg-[#d2c3c7] md:my-10" />

          {/* Message */}
          <p className="text-[16px] leading-[1.8] text-[#4e4448] md:text-[18px]">
            Thank you for choosing <span className="font-semibold text-[#1a1c1b]">Le Thia Cares</span>. Our team will reach out to you within <span className="font-semibold text-[#1a1c1b]">30 minutes</span> to confirm your appointment and guide you through your personalised treatment plan.
          </p>

          {/* What's next */}
          <div className="mt-10 rounded-[1rem] border border-[#d2c3c74d] bg-white p-6 text-left shadow-sm md:mt-12 md:p-8">
            <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#492e3b]">
              What Happens Next
            </h2>
            <ul className="space-y-5">
              {[
                {
                  icon: 'phone_in_talk',
                  title: 'Confirmation Call',
                  desc: 'Our specialist will call you to confirm your preferred date and time.',
                },
                {
                  icon: 'assignment_ind',
                  title: 'Skin Consultation',
                  desc: 'A certified dermatologist will assess your skin and personalise your treatment.',
                },
                {
                  icon: 'spa',
                  title: 'Your Treatment',
                  desc: 'Experience US FDA-cleared aesthetic care in our luxury clinic environment.',
                },
              ].map(({ icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#492e3b1a]">
                    <span
                      className="material-symbols-outlined text-[20px] text-[#492e3b]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold leading-[1.4] text-[#1a1c1b] md:text-[15px]">{title}</p>
                    <p className="mt-0.5 text-[13px] leading-[1.6] text-[#4e4448] md:text-[14px]">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10">
            <a
              href="https://wa.me/919342471839"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-[0.5rem] bg-[#25D366] px-8 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-[0.5rem] border border-[#492e3b4d] px-8 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-[#492e3b] transition-all hover:bg-[#492e3b0d] sm:w-auto"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>

          {/* Contact nudge */}
          <p className="mt-10 text-[13px] text-[#4e444880]">
            Need immediate assistance?{' '}
            <a href="tel:+919342471839" className="font-semibold text-[#492e3b] hover:underline">
              Call us now
            </a>
          </p>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-[#d2c3c733] px-4 py-6 text-center sm:px-6 md:px-[80px]">
        <p className="text-[12px] italic text-[#4e444880]">
          © 2026 Le Thia Cares Medical Aesthetics. All rights reserved.
        </p>
      </footer>

      {/* Google Ads Conversion Event Script */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17425479208/HZA8CPiu6LQcEKjsjvVA',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>
    </main>
  );
}