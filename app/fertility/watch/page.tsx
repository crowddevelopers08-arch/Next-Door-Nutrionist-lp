import type { Metadata } from 'next';
import { FertilityHeader } from '@/components/fertility/FertilityHeader';
import { FertilityFooter } from '@/components/fertility/FertilityFooter';
import { FertilityWatchClient } from '@/components/fertility/FertilityWatchClient';

export const metadata: Metadata = {
  title: 'Watch the Full Video | Fertility Clinical Nutrition | Next Door Nutritionist',
  description:
    'Watch the complete fertility clinical nutrition guidance video and book your online consultation.',
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
