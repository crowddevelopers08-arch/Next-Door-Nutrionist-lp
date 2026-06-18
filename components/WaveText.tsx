'use client';

export function WaveText({ children }: { children: string }) {
  const chars = children.split('');
  const N = chars.length;
  const charMs = 55;
  const holdMs = 1000;
  const gapMs = 400;
  const totalMs = N * charMs + holdMs + gapMs;

  // Stable CSS id from text content
  const id = children.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 16);

  // Generate one keyframe per character — pure CSS, zero JS after mount
  const css = chars.map((_, i) => {
    const appearPct = +((i * charMs / totalMs) * 100).toFixed(2);
    const hidePct   = +(((N * charMs + holdMs) / totalMs) * 100).toFixed(2);
    return (
      `@keyframes wt_${id}_${i}{` +
      `0%,${appearPct}%{opacity:0}` +
      `${(appearPct + 0.01).toFixed(2)}%,${hidePct}%{opacity:1}` +
      `${(hidePct + 0.01).toFixed(2)}%,100%{opacity:0}}`
    );
  }).join('');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {chars.map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            willChange: 'opacity',
            animation: `wt_${id}_${i} ${totalMs}ms linear infinite`,
          }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </>
  );
}
