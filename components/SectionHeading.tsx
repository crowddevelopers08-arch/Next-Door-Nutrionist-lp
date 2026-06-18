interface Props {
  title: string;
  script?: string;
  as?: 'h1' | 'h2' | 'h3';
}

function AngelIcon() {
  return (
    <svg width="54" height="44" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Halo */}
      <ellipse cx="27" cy="5" rx="5" ry="3.8" stroke="#492e3b" strokeWidth="1" fill="none" />
      {/* Body */}
      <line x1="27" y1="8.5" x2="27" y2="31" stroke="#492e3b" strokeWidth="1" strokeLinecap="round" />
      {/* Left wing upper */}
      <path d="M25.5 13 Q17 7 5 10 Q1 12 0 16" stroke="#492e3b" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Left wing lower */}
      <path d="M24.5 18 Q15 15 3 19 Q0 21 0 25" stroke="#492e3b" strokeWidth="0.75" fill="none" strokeLinecap="round" />
      {/* Right wing upper */}
      <path d="M28.5 13 Q37 7 49 10 Q53 12 54 16" stroke="#492e3b" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Right wing lower */}
      <path d="M29.5 18 Q39 15 51 19 Q54 21 54 25" stroke="#492e3b" strokeWidth="0.75" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <path d="M22 22 Q25 24.5 27 22 Q29 24.5 32 22" stroke="#492e3b" strokeWidth="0.9" fill="none" />
      {/* Skirt */}
      <path d="M24 28 L21 42 M27 29.5 L27 42 M30 28 L33 42" stroke="#492e3b" strokeWidth="0.75" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ScriptDivider() {
  return (
    <div className="flex items-center gap-1">
      <div className="h-px w-10 rounded-full bg-[#492e3b80] sm:w-14" />
      <div className="h-px w-3 rounded-full bg-[#492e3b40]" />
    </div>
  );
}

export function SectionHeading({ title, script, as: Tag = 'h2' }: Props) {
  return (
    <div className="text-center">
      {/* Angel ornament with side rules */}
      <div className="mb-4 flex items-center justify-center gap-4">
        <div className="h-px flex-1 max-w-[90px] rounded-full bg-[#492e3b33] sm:max-w-[130px]" />
        <AngelIcon />
        <div className="h-px flex-1 max-w-[90px] rounded-full bg-[#492e3b33] sm:max-w-[130px]" />
      </div>

      {/* Main heading */}
      <Tag className="font-display text-[26px] font-medium leading-[1.2] text-[#492e3b] sm:text-[32px] md:text-[40px] lg:text-[48px]">
        {title}
      </Tag>

      {/* Script subtitle with decorative side lines */}
      {script && (
        <div className="mt-2 flex items-center justify-center gap-3 md:mt-3">
          <ScriptDivider />
          <span className="font-script text-[30px] text-[#492e3b] sm:text-[34px] md:text-[38px]">
            {script}
          </span>
          <div className="flex items-center gap-1">
            <div className="h-px w-3 rounded-full bg-[#492e3b40]" />
            <div className="h-px w-10 rounded-full bg-[#492e3b80] sm:w-14" />
          </div>
        </div>
      )}
    </div>
  );
}
