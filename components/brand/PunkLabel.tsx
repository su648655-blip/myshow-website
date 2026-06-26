interface PunkLabelProps {
  children: React.ReactNode;
  tone?: "acid" | "violet" | "yellow" | "blue";
  className?: string;
}

const toneClass = {
  acid: "border-[var(--border-acid)] bg-[rgba(182,255,0,0.1)] text-[var(--primary-bright)]",
  violet: "border-[rgba(124,58,237,0.55)] bg-[rgba(124,58,237,0.16)] text-[#cbb6ff]",
  yellow: "border-[rgba(255,228,94,0.6)] bg-[rgba(255,228,94,0.12)] text-[var(--yellow)]",
  blue: "border-[rgba(56,189,248,0.55)] bg-[rgba(56,189,248,0.12)] text-[var(--blue)]",
};

export default function PunkLabel({ children, tone = "acid", className = "" }: PunkLabelProps) {
  return <span className={`punk-label ${toneClass[tone]} ${className}`}>{children}</span>;
}
