const MOBILE_BANNER =
  '/fanmob.png';

const DESKTOP_BANNER =
  '/fan.png';

export function HeroSection() {
  return (
    <section id="services" className="w-full">
      {/* Mobile banner */}
      <img
        src={MOBILE_BANNER}
        alt="Hero banner"
        className="block w-full md:hidden"
      />
      {/* Desktop banner */}
      <img
        src={DESKTOP_BANNER}
        alt="Hero banner"
        className="hidden w-full object-cover object-top md:block md:max-h-[580px] lg:max-h-[640px] xl:max-h-[700px]"
      />
    </section>
  );
}
