import type { Metadata } from 'next';
import { FertilityHeader } from '@/components/fertility/FertilityHeader';
import { FertilityFooter } from '@/components/fertility/FertilityFooter';
import { FertilityWatchClient } from '@/components/fertility/FertilityWatchClient';

export const metadata: Metadata = {
  title: 'Checkout | Fertility Clinical Nutrition | Next Door Nutritionist',
  description:
    'Confirm your details and book your 1:1 fertility discovery call with our clinical nutrition experts for ₹199.',
};

export default function FertilityWatchPage() {
  return (
    <>
      <FertilityHeader />
      <main className="mt-[70px] md:mt-20">
        <FertilityWatchClient />
      </main>
      <FertilityFooter />
    </>
  );
}
