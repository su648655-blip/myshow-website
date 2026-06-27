import type { BackgroundIntensity } from "@/lib/store";

interface HeroSignalBackgroundProps {
  intensity?: BackgroundIntensity;
  scanLines?: boolean;
}

export default function HeroSignalBackground({ intensity = "medium", scanLines = true }: HeroSignalBackgroundProps) {
  return (
    <div className={`hero-signal-bg hero-signal-${intensity}`} aria-hidden="true">
      <div className="hero-signal-grid" />
      <div className="hero-orb hero-orb-acid" />
      <div className="hero-orb hero-orb-violet" />
      <div className="hero-orb hero-orb-blue" />
      {scanLines && (
        <>
          <div className="hero-scan hero-scan-one" />
          <div className="hero-scan hero-scan-two" />
        </>
      )}
    </div>
  );
}
