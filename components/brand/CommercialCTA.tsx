import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CommercialCTAProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
}

export default function CommercialCTA({
  title = "你的 AI 项目卡在 Demo、POC 或预算桌前？",
  body = "我可以帮你梳理客户价值地图、POC 成功指标、CFO 可理解的 ROI 叙事和大客户推进路径。",
  primaryLabel = "REQUEST BRIEFING",
  primaryHref,
  secondaryLabel = "VIEW DOSSIERS",
  secondaryHref = "/portfolio",
  onPrimaryClick,
}: CommercialCTAProps) {
  const primaryClass = "btn-primary justify-center";

  return (
    <section className="signal-panel rounded-3xl p-6 md:p-10">
      <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-4 text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">NEXT COMMAND</div>
          <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--fg-2)]">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          {onPrimaryClick ? (
            <button type="button" onClick={onPrimaryClick} className={primaryClass}>{primaryLabel}<ArrowRight className="h-4 w-4" /></button>
          ) : primaryHref ? (
            <Link href={primaryHref} className={primaryClass}>{primaryLabel}<ArrowRight className="h-4 w-4" /></Link>
          ) : null}
          <Link href={secondaryHref} className="btn-secondary justify-center">{secondaryLabel}</Link>
        </div>
      </div>
    </section>
  );
}
