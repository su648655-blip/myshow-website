"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";
import SignalPanel from "@/components/brand/SignalPanel";
import DossierCard from "@/components/brand/DossierCard";
import CommercialCTA from "@/components/brand/CommercialCTA";

export default function PortfolioPage() {
  const { data } = useSiteData();
  const projects = data.projects;
  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))),
    [projects]
  );

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const published = projects.filter((p) => p.status === "published");
  const filtered = selectedTag ? published.filter((p) => p.tags.includes(selectedTag)) : published;

  return (
    <div className="relative signal-bg min-h-screen px-4 pt-24 pb-20 sm:px-10 md:pt-36 md:pb-32">
      <div className="aurora aurora-blue" style={{ width: 620, height: 620, top: "5%", right: "-18%" }} />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-[1fr_420px] md:items-end mb-12 md:mb-20">
            <div>
              <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-4 tracking-[0.24em]">DEAL DOSSIER ARCHIVE</div>
              <h1 className="text-mega mb-6">
                AI Deal Dossiers
                <span className="block text-gradient">成交样本库</span>
              </h1>
              <p className="text-base md:text-lg text-[var(--fg-2)] max-w-3xl leading-8">
                不是案例展示，是复杂企业 AI 项目的成交样本：从业务痛点识别、POC 设计、ROI 证明到规模化采购的关键路径。
              </p>
            </div>
            <SignalPanel
              eyebrow="COMMERCIAL IMPACT"
              rows={[
                { label: "Total ARR", value: "¥800M+" },
                { label: "Deals", value: "50+ Enterprise Deals" },
                { label: "Industries", value: "Bank / Gov / MFG / Retail" },
                { label: "Core Buyers", value: "CEO / CFO / CIO / BU Head" },
              ]}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-8 md:mb-12 border-y border-[var(--border)] py-4">
            <div className="mb-3 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg-4)]">
              <Filter className="w-4 h-4" /> FILTER BY SIGNAL
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedTag(null)}
                className={`shrink-0 px-3 py-2 rounded-md text-mono text-xs tracking-wider uppercase transition-all ${
                  selectedTag === null
                    ? "bg-[var(--primary)] text-[var(--bg)]"
                    : "border border-[var(--border)] text-[var(--fg-3)] hover:text-[var(--fg)] hover:border-[var(--border-acid)]"
                }`}
              >
                ALL ({published.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`shrink-0 px-3 py-2 rounded-md text-mono text-xs tracking-wider uppercase transition-all ${
                    selectedTag === tag
                      ? "bg-[var(--primary)] text-[var(--bg)]"
                      : "border border-[var(--border)] text-[var(--fg-3)] hover:text-[var(--fg)] hover:border-[var(--border-acid)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div layout className="grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <DossierCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--fg-3)]">
            没有找到匹配的项目。
          </div>
        )}

        <div className="mt-16 md:mt-24">
          <CommercialCTA
            title="你的 AI 项目卡在 POC 之后？"
            body="我可以帮你判断这个场景是否值得卖、POC 指标是否能说服 CFO、谁是真正的 economic buyer，以及如何从试点推进到规模化预算。"
            primaryHref={`mailto:${data.profile.email}`}
            primaryLabel="START DEAL REVIEW"
          />
        </div>
      </div>
    </div>
  );
}
