'use client';

import { useCallback, useEffect, useState } from 'react';
import { FertilityCalendlyModal } from '@/components/fertility/FertilityCalendlyModal';
import { WhatsAppField } from '@/components/fertility/WhatsAppField';
import {
  COUNTRIES,
  Country,
  DEFAULT_COUNTRY,
  detectCountry,
} from '@/components/fertility/countries';
import {
  loadRazorpayCheckout,
  type RazorpayFailureResponse,
  type RazorpaySuccessResponse,
} from '@/components/fertility/razorpay';

const LOGO = 'https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy';
const PRICE = 199;

// Value stack shown on the left. Prices are indicative "value" figures only —
// the amount actually charged is decided server-side in /api/razorpay/create-order.
const VALUE_ITEMS: { label: string; price: number }[] = [
  { label: '1:1 Fertility Nutrition Consultation', price: 1500 },
  { label: 'Fertility Blood Report & Deficiency Checklist', price: 200 },
  { label: 'PCOS/Irregular Period Nutrition Guide', price: 200 },
  { label: 'International Grocery Shopping Guide', price: 200 },
  { label: 'Supplement Questions Checklist for Your Doctor', price: 300 },
  { label: 'Stress, Sleep & Lifestyle Fertility Checklist', price: 300 },
  { label: 'Fertility-Friendly Indian Recipes for NRIs', price: 300 },
  { label: 'Myo-Inositol Recommendation for US', price: 500 },
];
const TOTAL_VALUE = VALUE_ITEMS.reduce((sum, item) => sum + item.price, 0);

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;
const money2 = (value: number) =>
  `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type Prefill = { name?: string; email?: string };
type StoredLead = {
  name?: string;
  phone?: string;
  dialCode?: string;
  country?: string;
  iso?: string;
};

export function FertilityWatchClient() {
  const [modalOpen, setModalOpen] = useState(false);

  // Checkout fields — prefilled from the lead we already captured, when present.
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [storedLead, setStoredLead] = useState<StoredLead>({});

  // Payment flow: idle → starting (creating order) → verifying (post-payment)
  const [stage, setStage] = useState<'idle' | 'starting' | 'verifying'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<Prefill>({});
  // Once paid, the client can reopen the calendar without paying again.
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setCountry(detectCountry());

    try {
      const raw = sessionStorage.getItem('fertilityLead');
      if (!raw) return;

      const saved = JSON.parse(raw) as StoredLead;
      const savedName = typeof saved.name === 'string' ? saved.name : '';
      const savedPhone = typeof saved.phone === 'string' ? saved.phone : '';

      setStoredLead({
        name: savedName,
        phone: savedPhone,
        dialCode: typeof saved.dialCode === 'string' ? saved.dialCode : '',
        country: typeof saved.country === 'string' ? saved.country : '',
        iso: typeof saved.iso === 'string' ? saved.iso : '',
      });
      setName(savedName);
      setPhone(savedPhone);
      const savedCountry = COUNTRIES.find(
        (c) => c.iso === saved.iso && c.dial === saved.dialCode
      );
      if (savedCountry) setCountry(savedCountry);
    } catch {
      // Ignore invalid session data — the visitor can simply type their details.
    }
  }, []);

  const openCalendar = useCallback(() => {
    setError(null);
    setModalOpen(true);
  }, []);

  /** Saves the lead before payment so an abandoned checkout still reaches the CRM. */
  const captureLead = useCallback(
    async (cleanName: string, digits: string, selected: Country) => {
      const alreadySaved =
        storedLead.name?.trim() === cleanName && storedLead.phone === digits;
      if (alreadySaved) return;

      const payload = {
        name: cleanName,
        phone: digits,
        dialCode: selected.dial,
        country: selected.name,
        iso: selected.iso,
      };

      try {
        await fetch('/api/fertility-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stage: 'stage1',
            ...payload,
            pageUrl: window.location.href,
          }),
        });
        sessionStorage.setItem('fertilityLead', JSON.stringify(payload));
        setStoredLead(payload);
      } catch {
        // Never block the payment on lead logging.
      }
    },
    [storedLead]
  );

  const handlePayment = useCallback(async () => {
    if (paid) {
      openCalendar();
      return;
    }

    setError(null);

    const cleanName = name.trim();
    const digits = phone.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (country.iso === 'IN') {
      if (!/^[6-9]\d{9}$/.test(digits)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
    } else if (digits.length < 6 || digits.length > 14) {
      setError('Please enter a valid phone number.');
      return;
    }

    setStage('starting');

    try {
      await captureLead(cleanName, digits, country);
      await loadRazorpayCheckout();

      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageUrl: window.location.href,
          name: cleanName,
          phone: digits,
          dialCode: country.dial,
          country: country.name,
          iso: country.iso,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order?.error || 'Could not start the payment.');

      if (!window.Razorpay) throw new Error('Could not load the payment window.');

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'Next Door Nutritionist',
        description: 'Online Fertility Consultation',
        image: LOGO,
        prefill: {
          name: cleanName,
          contact: `${country.dial || '91'}${digits}`,
        },
        theme: { color: '#0B4A35' },
        handler: async (response: RazorpaySuccessResponse) => {
          setStage('verifying');
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const result = await verifyRes.json();

            if (!verifyRes.ok || !result.verified) {
              throw new Error(result?.error || 'We could not verify your payment.');
            }

            setPrefill({ name: result.prefill?.name || cleanName, email: result.prefill?.email });
            setPaid(true);
            setStage('idle');
            setModalOpen(true);
          } catch (err) {
            setStage('idle');
            setError(
              err instanceof Error
                ? `${err.message} If you were charged, please call us and we'll confirm your slot.`
                : 'Something went wrong. Please call us and we will confirm your slot.'
            );
          }
        },
        modal: {
          ondismiss: () => setStage('idle'),
        },
      });

      checkout.on('payment.failed', (response: RazorpayFailureResponse) => {
        setStage('idle');
        setError(response?.error?.description || 'Payment failed. Please try again.');
      });

      checkout.open();
      // Checkout is now on screen — release the button's loading state.
      setStage('idle');
    } catch (err) {
      setStage('idle');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }, [paid, openCalendar, captureLead, name, phone, country]);

  return (
    <section className="relative overflow-hidden bg-[#FFF5F0] px-4 py-10 sm:px-6 md:px-10 md:py-14">
      {/* Decorative glows, matching the landing page */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/18 blur-[120px] blob-float" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[#0B4A35]/12 blur-[120px] blob-float-2" />

      <h1 className="relative text-center font-outfit text-[18px] font-extrabold leading-[1.35] text-[#0B4A35] sm:text-[21px] md:text-[24px]">
        You&rsquo;re One Step Away from Transforming Your Life!
      </h1>

      <div className="relative mx-auto mt-8 grid max-w-[1080px] gap-10 lg:grid-cols-2 lg:gap-12">
        {/* ── Left: value stack ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO}
            alt="Hormone Nutrition Clinic"
            className="h-[74px] w-auto object-contain sm:h-[86px]"
          />

          <ul className="mt-7 w-full">
            {VALUE_ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-4 border-b border-[#0B4A35]/15 py-3.5 text-left"
              >
                <span className="font-outfit text-[14px] font-bold leading-[1.45] text-[#1A1A1A] sm:text-[15.5px]">
                  {item.label}
                </span>
                <span className="font-outfit shrink-0 text-[15px] font-bold text-[#D6497E] sm:text-[16.5px]">
                  {money(item.price)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 font-outfit text-[26px] font-extrabold uppercase tracking-[0.01em] text-[#D6497E] sm:text-[31px]">
            Total Value {money(TOTAL_VALUE)}
          </p>
          <p className="mt-1.5 font-outfit text-[14px] text-[#2B2B2B]/70 sm:text-[15px]">
            Sign up before early bird offer expires
          </p>
          <p className="mt-3 font-outfit text-[54px] font-extrabold leading-none text-[#0B4A35] sm:text-[64px]">
            {money(PRICE)}
          </p>
        </div>

        {/* ── Right: order form ─────────────────────────────────────────── */}
        <div className="h-fit rounded-[20px] border border-[#0B4A35]/20 bg-white p-5 shadow-[0_20px_60px_rgba(11,74,53,0.10)] sm:p-6 lg:self-center">
          <h2 className="font-outfit text-[15px] font-bold text-[#0B4A35]">Customer information</h2>

          <div className="mt-4">
            <label className="block">
              <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">Your Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                className="mt-1.5 w-full rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3 font-outfit text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#0B4A35]"
              />
            </label>
          </div>

          <div className="mt-4">
            <WhatsAppField
              country={country}
              onCountry={setCountry}
              value={phone}
              onValue={setPhone}
            />
          </div>

          {/* Payment method */}
          <h2 className="mt-7 font-outfit text-[15px] font-bold text-[#0B4A35]">Payment</h2>
          <div className="mt-3 rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] px-4 py-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-outfit text-[12.5px] text-[#1A1A1A]">
                Credit Card/Debit Card/NetBanking
              </span>
              <span className="font-outfit flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0B4A35]">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Pay by Razorpay
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/payicons.png"
              alt="RuPay, Visa, UPI, Maestro, PhonePe and Paytm accepted"
              className="mt-3 h-auto w-full max-w-[360px]"
            />
            <p className="font-outfit mt-3 text-[11.5px] leading-[1.6] text-[#2B2B2B]/70">
              Pay securely by Credit or Debit card or Internet Banking through Razorpay.
            </p>
          </div>

          <p className="font-outfit mt-4 text-[11.5px] leading-[1.7] text-[#2B2B2B]/65">
            Your personal data will be used to process your order, support your experience
            throughout this website, and for other purposes described in our{' '}
            <a href="/fertility/privacy-policy" className="text-[#0B4A35] underline">
              privacy policy
            </a>
            .
          </p>

          {error && (
            <p
              role="alert"
              className="font-outfit mt-4 rounded-xl border border-[#FF92A5]/40 bg-[#FF92A5]/10 px-4 py-3 text-[12.5px] leading-[1.6] text-[#8A2B3E]"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handlePayment}
            disabled={stage !== 'idle'}
            className="btn-primary font-outfit mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#0B4A35] px-6 py-4 text-[14px] font-semibold text-white shadow-lg transition-colors hover:bg-[#0A3D2D] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {stage === 'starting' ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Opening secure payment…
              </>
            ) : paid ? (
              <>
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Choose Your Slot
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">lock</span>
                Place Order {money2(PRICE)}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Post-payment verification — blocks interaction so the client doesn't
          navigate away or pay twice while we confirm with Razorpay. */}
      {stage === 'verifying' && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-4 bg-[#FFF5F0]/95 px-6 text-center backdrop-blur-sm">
          <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#0B4A35]/25 border-t-[#0B4A35]" />
          <p className="font-outfit text-[15px] font-semibold text-[#1A1A1A]">
            Confirming your payment…
          </p>
          <p className="font-outfit text-[13px] text-[#2B2B2B]/60">
            Please don&rsquo;t close this window.
          </p>
        </div>
      )}

      <FertilityCalendlyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        prefill={prefill}
      />
    </section>
  );
}
