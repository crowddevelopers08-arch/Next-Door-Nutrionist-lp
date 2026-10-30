import { FertilityCtaButton } from '@/components/fertility/FertilityCtaButton';
import {
  fertilityOfferPrice,
  fertilityTotalValue,
  fertilityValueItems,
} from '@/components/fertility/fertilityContent';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const savings = fertilityTotalValue - fertilityOfferPrice;

const ctaTitle = 'Book my seat now';
const ctaSub = 'Secure checkout · 1 min';

const ctaClassName =
  'pay-cta font-outfit flex w-full shrink-0 items-center justify-between gap-3 rounded-[14px] bg-[#F0C97D] px-4 py-2.5 shadow-[0_12px_28px_rgba(240,201,125,0.26)] sm:w-auto sm:min-w-[330px] sm:gap-4 sm:px-5';

interface Props {
  className?: string;
  /**
   * Where the price CTA goes. Defaults to the ₹199 checkout page; the checkout
   * page itself passes an in-page anchor to its order form.
   */
  ctaHref?: string;
}

/** Three chevrons that march to the right, one after the other. */
function MarchingArrows() {
  return (
    <span
      className="pay-cta-arrows flex shrink-0 items-center -space-x-1 sm:-space-x-1.5"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="pay-cta-arrow h-[18px] w-[18px] sm:h-5 sm:w-5"
          fill="none"
        >
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

/** The ₹199 chip plus its two lines of copy — shared by the CTA and the
 *  static checkout-page version so both read as the same gold price block. */
function PriceBadge({ title, sub }: { title: string; sub: string }) {
  return (
    <>
      <span className="relative z-[2] flex shrink-0 items-center rounded-[10px] bg-[#0B4A35] px-2.5 py-1.5 text-[24px] font-extrabold leading-none tabular-nums text-[#F0C97D] sm:text-[26px]">
        {money(fertilityOfferPrice)}
      </span>

      <span className="relative z-[2] text-left">
        <span className="block whitespace-nowrap text-[15px] font-extrabold leading-tight tracking-[0.01em] text-[#0B4A35] sm:text-[16.5px]">
          {title}
        </span>
        <span className="block whitespace-nowrap text-[11px] font-semibold text-[#0B4A35]/60 sm:text-[11.5px]">
          {sub}
        </span>
      </span>
    </>
  );
}

/**
 * The ₹199 offer stack — one compact package card: what is included,
 * what it is worth, and the price after the discount.
 * Shared by the fertility landing page and the checkout page.
 */
export function FertilityValueStack({ className = '', ctaHref }: Props) {
  const ctaLabel = `${ctaTitle} for ${money(fertilityOfferPrice)} — secure checkout`;
  const ctaBody = (
    <>
      <PriceBadge title={ctaTitle} sub={ctaSub} />

      <span className="relative z-[2] flex shrink-0 items-center text-[#0B4A35]">
        <MarchingArrows />
      </span>
    </>
  );

  // h-fit/self-start keep the card hugging its content when a parent grid row
  // would otherwise stretch it (the checkout page's taller order form).
  return (
    <div
      className={`h-fit self-start overflow-hidden rounded-[20px] bg-white shadow-[0_16px_44px_rgba(11,74,53,0.12)] ring-1 ring-[#0B4A35]/12 ${className}`}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-[#0B4A35]/10 bg-[#FFF5F0] px-5 py-3.5 sm:px-6 sm:py-4">
        <div className="text-left">
          <p className="font-outfit text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-[#D6497E]">
            Your plan
          </p>
          <h3 className="font-outfit mt-0.5 text-[18px] font-extrabold leading-tight text-[#0B4A35] sm:text-[20px]">
            Everything you get
          </h3>
        </div>
        <span className="font-outfit shrink-0 rounded-full bg-[#0B4A35] px-3 py-1 text-[11.5px] font-bold text-[#F0C97D]">
          {fertilityValueItems.length} items
        </span>
      </div>

      {/* ── Inclusions ────────────────────────────────────────────────────── */}
      <ul className="px-5 py-1 sm:px-6">
        {fertilityValueItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 border-b border-[#0B4A35]/8 py-2.5 last:border-0 sm:gap-3.5 sm:py-3"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-[18px] w-[18px] shrink-0 text-[#0B4A35]"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4.5 10.5L8 14L15.5 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="font-outfit min-w-0 flex-1 text-left text-[14.5px] font-semibold leading-[1.4] text-[#1A1A1A] sm:text-[16px]">
              {item.label}
            </span>

            <span className="font-outfit shrink-0 text-[13.5px] font-bold tabular-nums text-[#2B2B2B]/45 sm:text-[15px]">
              {money(item.price)}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Price bar ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 bg-[#0B4A35] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5">
        <p className="font-outfit flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[14px] bg-white/[0.07] px-4 py-2.5 text-left ring-1 ring-inset ring-white/12">
          <span className="flex items-baseline gap-2.5">
            <span className="whitespace-nowrap text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-white/50">
              Total value
            </span>
            <s className="value-strike whitespace-nowrap text-[24px] font-bold tabular-nums text-white/60 sm:text-[26px]">
              {money(fertilityTotalValue)}
            </s>
          </span>

          <span className="badge-sweep relative shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-[#FF92A5] px-3 py-1 text-[12px] font-extrabold text-[#1A1A1A] shadow-[0_6px_16px_rgba(255,146,165,0.35)] sm:text-[12.5px]">
            Save {money(savings)}
          </span>
        </p>

        {ctaHref ? (
          <a href={ctaHref} className={ctaClassName} aria-label={ctaLabel}>
            {ctaBody}
          </a>
        ) : (
          <FertilityCtaButton className={ctaClassName} aria-label={ctaLabel}>
            {ctaBody}
          </FertilityCtaButton>
        )}
      </div>

      {/* ── Urgency strip ─────────────────────────────────────────────────── */}
      <p className="font-outfit bg-[#083A2A] py-2.5 text-center text-[12px] font-semibold tracking-[0.02em] text-[#F0C97D] sm:text-[13px]">
        Early bird price {money(fertilityOfferPrice)} — offer ends soon
      </p>
      <p className="font-outfit flex items-center justify-center gap-1.5 bg-[#FFF5F0] px-4 py-2.5 text-center text-[12px] font-semibold text-[#0B4A35] sm:text-[13px]">
        <span className="material-symbols-outlined text-[16px]">info</span>
        This {money(fertilityOfferPrice)} will be adjusted in the package you choose.
      </p>
    </div>
  );
}
