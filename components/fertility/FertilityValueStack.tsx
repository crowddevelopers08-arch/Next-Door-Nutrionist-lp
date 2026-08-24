import {
  fertilityOfferPrice,
  fertilityTotalValue,
  fertilityValueItems,
} from '@/components/fertility/fertilityContent';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const savings = fertilityTotalValue - fertilityOfferPrice;
const savingsPercent = Math.round((savings / fertilityTotalValue) * 100);

interface Props {
  className?: string;
}

/**
 * The ₹199 offer stack — one compact package card: what is included,
 * what it is worth, and the price after the discount.
 * Shared by the fertility landing page and the checkout page.
 */
export function FertilityValueStack({ className = '' }: Props) {
  // h-fit/self-start keep the card hugging its content when a parent grid row
  // would otherwise stretch it (the checkout page's taller order form).
  return (
    <div
      className={`h-fit self-start overflow-hidden rounded-[20px] bg-white shadow-[0_16px_44px_rgba(11,74,53,0.12)] ring-1 ring-[#0B4A35]/12 ${className}`}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 border-b border-[#0B4A35]/10 bg-[#FFF5F0] px-5 py-4 sm:px-6 sm:py-5">
        <div className="text-left">
          <p className="font-outfit text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#D6497E]">
            Complete Package
          </p>
          <h3 className="font-outfit mt-1 text-[19px] font-extrabold leading-tight text-[#0B4A35] sm:text-[22px]">
            Everything Included in Your Plan
          </h3>
        </div>
        <span className="font-outfit shrink-0 rounded-full bg-[#0B4A35] px-3 py-1.5 text-[11.5px] font-bold text-[#F0C97D]">
          {fertilityValueItems.length} items
        </span>
      </div>

      {/* ── Inclusions ────────────────────────────────────────────────────── */}
      <ul className="px-5 py-1 sm:px-6">
        {fertilityValueItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 border-b border-[#0B4A35]/8 py-3.5 last:border-0 sm:gap-3.5 sm:py-4"
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

            <span className="font-outfit shrink-0 text-[13.5px] font-bold tabular-nums text-[#2B2B2B]/45 line-through sm:text-[15px]">
              {money(item.price)}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Price bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 bg-[#0B4A35] px-5 py-5 sm:px-6 sm:py-6">
        <div className="text-left">
          <p className="font-outfit text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/50">
            Total value
          </p>
          <p className="font-outfit mt-0.5 text-[19px] font-bold tabular-nums text-white/50 line-through decoration-[#FF92A5] sm:text-[21px]">
            {money(fertilityTotalValue)}
          </p>
          <span className="font-outfit mt-2 inline-block rounded-full bg-[#FF92A5] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#1A1A1A]">
            Save {money(savings)} · {savingsPercent}% off
          </span>
        </div>

        <div className="text-right">
          <p className="font-outfit text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#F0C97D]">
            You pay today
          </p>
          <p className="font-outfit mt-1 text-[46px] font-extrabold leading-none tabular-nums text-white sm:text-[54px]">
            {money(fertilityOfferPrice)}
          </p>
          <p className="font-outfit mt-1.5 text-[12px] text-white/55 sm:text-[13px]">
            One-time payment
          </p>
        </div>
      </div>

      {/* ── Urgency strip ─────────────────────────────────────────────────── */}
      <p className="font-outfit bg-[#083A2A] py-3 text-center text-[12.5px] font-semibold tracking-[0.02em] text-[#F0C97D] sm:text-[13.5px]">
        Sign up before the early bird offer expires
      </p>
    </div>
  );
}
