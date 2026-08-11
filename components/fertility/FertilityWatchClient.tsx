'use client';

import { useCallback, useState } from 'react';
import { FertilityCalendlyModal } from '@/components/fertility/FertilityCalendlyModal';
import {
  loadRazorpayCheckout,
  type RazorpayFailureResponse,
  type RazorpaySuccessResponse,
} from '@/components/fertility/razorpay';

const LOGO = 'https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy';

type Prefill = { name?: string; email?: string };

export function FertilityWatchClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Payment flow: idle → starting (creating order) → verifying (post-payment)
  const [stage, setStage] = useState<'idle' | 'starting' | 'verifying'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<Prefill>({});
  // Once paid, the client can reopen the calendar without paying again.
  const [paid, setPaid] = useState(false);

  const openCalendar = useCallback(() => {
    setError(null);
    setModalOpen(true);
  }, []);

  const handlePayment = useCallback(async () => {
    if (paid) {
      openCalendar();
      return;
    }

    setError(null);
    setStage('starting');

    try {
      await loadRazorpayCheckout();

      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageUrl: window.location.href }),
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

            setPrefill({ name: result.prefill?.name, email: result.prefill?.email });
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
  }, [paid, openCalendar]);

  return (
    <section className="relative overflow-hidden bg-[#FFF5F0] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-12">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#FF92A5]/18 blur-[120px] blob-float" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-[#0B4A35]/12 blur-[120px] blob-float-2" />

      <div className="relative mx-auto max-w-[860px] text-center">
        <h1 className="font-outfit text-[26px] font-extrabold leading-[1.15] text-[#1A1A1A] sm:text-[32px] md:text-[38px]">
          Your Complete Fertility{' '}
          <span className="text-[#0B4A35] decoration-[6px] underline-offset-[6px]">
            Nutrition Guidance
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-[600px] font-outfit text-[14px] leading-[1.85] text-[#2B2B2B]/75 sm:text-[15px]">
          Watch the full video below, then book a one-on-one online consultation to get a plan built around your body.
        </p>

        {/* Full video */}
        <div className="relative mx-auto mt-9 w-full max-w-[820px]">
          <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-r from-[#FF92A5]/25 via-[#C9A24B]/20 to-[#0B4A35]/20 blur-2xl" />
          <div className="relative w-full overflow-hidden rounded-[24px] border border-white/70 bg-white p-1.5 shadow-[0_30px_80px_rgba(11,74,53,0.22)]">
            {playing ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/Ap2X2yaWhUY?autoplay=1&mute=1&playsinline=1&rel=0"
                  title="Complete fertility nutrition guidance video"
                  allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the full video"
                className="group relative block aspect-video w-full overflow-hidden rounded-[18px] bg-black"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://img.youtube.com/vi/Ap2X2yaWhUY/maxresdefault.jpg"
                  alt="Complete fertility nutrition guidance video"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-[#0B1F17]/35 transition-colors group-hover:bg-[#0B1F17]/45">
                  <span className="pop-in flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:h-[88px] sm:w-[88px]">
                    <span
                      className="material-symbols-outlined text-[38px] text-[#0B4A35] sm:text-[46px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      play_arrow
                    </span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Book online consultation */}
        <div className="mt-10">
          <button
            type="button"
            onClick={handlePayment}
            disabled={stage !== 'idle'}
            className="btn-primary font-outfit inline-flex items-center justify-center gap-2 rounded-full bg-[#0B4A35] px-9 py-4 text-[14px] font-semibold text-white shadow-lg transition-colors hover:bg-[#0A3D2D] disabled:cursor-not-allowed disabled:opacity-70 sm:text-[15px]"
          >
            {stage === 'starting' ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Opening secure payment…
              </>
            ) : paid ? (
              <>
                Choose Your Slot
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </>
            ) : (
              <>
                Book an Online Consultation
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>

          {!paid && (
            <p className="font-outfit mt-3 flex items-center justify-center gap-1.5 text-[12px] text-[#2B2B2B]/55">
              <span className="material-symbols-outlined text-[15px] text-[#0B4A35]">lock</span>
              Secure payment via Razorpay · Pick your slot right after
            </p>
          )}

          {error && (
            <p
              role="alert"
              className="font-outfit mx-auto mt-4 max-w-[440px] rounded-[10px] border border-[#FF92A5]/40 bg-[#FF92A5]/10 px-4 py-3 text-[13px] leading-[1.6] text-[#8A2B3E]"
            >
              {error}
            </p>
          )}
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
