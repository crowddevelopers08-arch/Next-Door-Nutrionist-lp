import {
  fertilityOfferPrice,
  fertilityTotalValue,
  fertilityValueItems,
} from '@/components/fertility/fertilityContent';

const LOGO = 'https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

interface Props {
  className?: string;
}

/**
 * The ₹199 offer stack — everything included, its total value, and the price.
 * Shared by the fertility landing page and the checkout page.
 */
export function FertilityValueStack({ className = '' }: Props) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO}
        alt="Hormone Nutrition Clinic"
        className="h-[74px] w-auto object-contain sm:h-[86px]"
      />

      <ul className="mt-7 w-full">
        {fertilityValueItems.map((item) => (
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
        Total Value {money(fertilityTotalValue)}
      </p>
      <p className="mt-1.5 font-outfit text-[14px] text-[#2B2B2B]/70 sm:text-[15px]">
        Sign up before early bird offer expires
      </p>
      <p className="mt-3 font-outfit text-[54px] font-extrabold leading-none text-[#0B4A35] sm:text-[64px]">
        {money(fertilityOfferPrice)}
      </p>
    </div>
  );
}
