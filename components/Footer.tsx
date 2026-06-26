"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";
import SignalStrip from "@/components/brand/SignalStrip";

export default function Footer() {
  const { data } = useSiteData();
  const { profile } = data;

  const channels = [
    { label: "WECHAT", value: profile.wechat },
    { label: "PHONE", value: profile.phone },
    { label: "EMAIL", value: profile.email },
  ];

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      <SignalStrip items={["END OF SIGNAL", "REQUEST BRIEFING", "ROI TRANSLATION", "POC TO SCALE"]} />
      <div className="aurora aurora-blue" style={{ width: 520, height: 520, bottom: "-45%", left: "4%" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-6">
            <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-4 tracking-[0.24em]">END OF SIGNAL</div>
            <h2 className="text-display mb-6 max-w-3xl">
              如果 AI 项目卡在 Demo、POC 或预算桌前，我们可以聊聊。
            </h2>
            <p className="text-[var(--fg-2)] leading-8 max-w-2xl">
              我可以帮你判断场景是否值得卖、POC 指标是否能说服 CFO、谁是真正的 economic buyer，以及如何从试点推进到规模化预算。
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-mono text-[10px] text-[var(--fg-4)] mb-4 tracking-[0.24em]">CHANNELS</div>
            <div className="space-y-3">
              {channels.map((channel) => (
                <div key={channel.label} className="grid grid-cols-[78px_1fr] gap-3 border-t border-[var(--border)] pt-3">
                  <span className="text-mono text-[10px] tracking-[0.18em] text-[var(--fg-4)]">{channel.label}</span>
                  <span className="text-sm font-semibold text-[var(--fg-2)] break-all">{channel.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:text-right">
            <div className="text-mono text-[10px] text-[var(--fg-4)] mb-4 tracking-[0.24em]">NEXT COMMAND</div>
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary w-full md:w-auto justify-center"
            >
              REQUEST BRIEFING
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link href="/admin" className="mt-6 inline-block text-mono text-[10px] tracking-[0.16em] text-[var(--fg-4)] hover:text-[var(--fg-2)]">
              ADMIN ACCESS
            </Link>
          </div>
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--fg-4)] text-mono">
          <p>© {new Date().getFullYear()} DENG.OS · AI COMMERCIALIZATION</p>
          <p>ENTERPRISE SALES / ROI TRANSLATION / DEAL INTELLIGENCE</p>
        </div>
      </div>
    </footer>
  );
}
