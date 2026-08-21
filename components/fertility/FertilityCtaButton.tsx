import Link from 'next/link';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/** A CTA that navigates to the ₹199 watch/checkout page. */
export function FertilityCtaButton({ className, children, onClick }: Props) {
  return (
    <Link href="/fertility/watch" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
