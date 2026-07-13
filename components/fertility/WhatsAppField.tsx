'use client';

import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { COUNTRIES, Country } from '@/components/fertility/countries';

// Real flag images (render everywhere, unlike emoji flags on Windows).
function Flag({ iso, className = '' }: { iso: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${iso.toLowerCase()}.svg`}
      alt={`${iso} flag`}
      loading="lazy"
      width={20}
      height={15}
      className={`inline-block h-[14px] w-[20px] shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.06)] ${className}`}
    />
  );
}

interface Props {
  country: Country;
  onCountry: (c: Country) => void;
  value: string; // digits only
  onValue: (v: string) => void;
  label?: string;
}

export function WhatsAppField({
  country,
  onCountry,
  value,
  onValue,
  label = 'WhatsApp Number',
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const digits = q.replace(/\D/g, '');
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (digits !== '' && c.dial.includes(digits)) ||
        c.iso.toLowerCase() === q
    );
  }, [query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <label className="block">
      <span className="font-outfit text-[12px] font-semibold text-[#2B2B2B]">{label}</span>
      <div className="mt-1.5 flex items-center overflow-hidden rounded-xl border border-[#0B4A35]/15 bg-[#fffaf7] focus-within:border-[#0B4A35]">
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Select country"
          className="flex shrink-0 items-center gap-1 py-3 pl-3 pr-2 font-outfit text-[14px] text-[#2B2B2B] transition-colors hover:bg-[#0B4A35]/5"
        >
          <Flag iso={country.iso} />
          <span className="text-[#2B2B2B]/80">+{country.dial}</span>
          <span className="material-symbols-outlined text-[16px] text-[#0B4A35]/70">
            expand_more
          </span>
        </button>

        <span className="h-5 w-px bg-[#0B4A35]/15" />

        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={(e) => onValue(e.target.value.replace(/\D/g, '').slice(0, 14))}
          placeholder="WhatsApp number"
          className="w-full bg-transparent px-3 py-3 font-outfit text-[14px] text-[#1A1A1A] outline-none"
        />
      </div>

      {/* Country picker popup — centered, matches the date / time pickers */}
      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <div
              className="fade-in-backdrop fixed inset-0 bg-[#0B1F17]/60 backdrop-blur-sm"
              onClick={close}
            />
            <div className="pop-in relative flex max-h-[80vh] w-full max-w-[420px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(11,74,53,0.35)]">
              <div className="flex items-center justify-between bg-[#0B4A35] px-5 py-4">
                <h4 className="font-outfit text-[16px] font-extrabold text-white">Select Country</h4>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="border-b border-[#0B4A35]/10 p-3">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country or code…"
                  className="w-full rounded-lg border border-[#0B4A35]/15 bg-[#fffaf7] px-3 py-2.5 font-outfit text-[13px] text-[#1A1A1A] outline-none focus:border-[#0B4A35]"
                />
              </div>

              <ul className="overflow-y-auto py-1">
                {filtered.map((c) => {
                  const selected = c.iso === country.iso && c.dial === country.dial;
                  return (
                    <li key={`${c.iso}-${c.dial}`}>
                      <button
                        type="button"
                        onClick={() => {
                          onCountry(c);
                          close();
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left font-outfit text-[13.5px] transition-colors ${
                          selected
                            ? 'bg-[#0B4A35]/8 font-semibold text-[#0B4A35]'
                            : 'text-[#2B2B2B] hover:bg-[#0B4A35]/5'
                        }`}
                      >
                        <Flag iso={c.iso} />
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="tabular-nums text-[#2B2B2B]/55">+{c.dial}</span>
                      </button>
                    </li>
                  );
                })}
                {filtered.length === 0 && (
                  <li className="px-4 py-4 text-center font-outfit text-[12.5px] text-[#2B2B2B]/50">
                    No matches
                  </li>
                )}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </label>
  );
}
