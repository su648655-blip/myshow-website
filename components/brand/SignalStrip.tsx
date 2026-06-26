export default function SignalStrip({ items }: { items: string[] }) {
  const content = [...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden border-y border-[var(--border)] bg-[rgba(182,255,0,0.04)] py-3 text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">
      <div className="flex min-w-full animate-[ticker_34s_linear_infinite] gap-8 whitespace-nowrap px-4">
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[var(--fg-4)]">/</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
    </div>
  );
}
