import Link from 'next/link';

interface Props {
  className?: string;
  children: React.ReactNode;
}

/** A CTA that navigates to the ₹199 watch/checkout page. */
export function FertilityCtaButton({ className, children }: Props) {
  return (
    <Link href="/fertility/watch" className={className}>
      {children}
    </Link>
  );
}
