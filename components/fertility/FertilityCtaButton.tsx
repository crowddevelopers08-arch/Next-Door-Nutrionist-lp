import Link from 'next/link';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
}

/** A CTA that navigates to the ₹199 watch/checkout page. */
export function FertilityCtaButton({
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
}: Props) {
  return (
    <Link href="/fertility/watch" className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
