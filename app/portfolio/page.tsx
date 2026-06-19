"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";

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
    <div className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-4 sm:px-10 bg-grid min-h-screen">
      <div className="aurora aurora-cyan" style={{ width: 600, height: 600, top: "10%", right: "-15%" }} />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 md:mb-20">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-4">// CASE STUDIES</div>
            <h1 className="text-mega mb-4 md:mb-6">
              <span className="text-gradient">大客户</span>
              <br />
              AI 项目案例
            </h1>
            <p className="text-base md:text-lg text-[var(--fg-2)] max-w-2xl leading-relaxed">
              选取过去三年中最具代表性的企业 AI 落地案例。每个项目都包含可量化的业务成果。
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center gap-2 flex-wrap mb-8 md:mb-12 pb-4 md:pb-6 border-b border-[var(--border)] overflow-x-auto no-scrollbar">
            <Filter className="w-4 h-4 text-[var(--fg-3)] mr-2" />
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-md text-mono text-xs tracking-wider uppercase transition-all ${
                selectedTag === null
                  ? "bg-[var(--primary)] text-[var(--bg)]"
                  : "text-[var(--fg-3)] hover:text-[var(--fg)] hover:bg-[var(--bg-2)]"
              }`}
            >
              全部 ({projects.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-md text-mono text-xs tracking-wider uppercase transition-all ${
                  selectedTag === tag
                    ? "bg-[var(--primary)] text-[var(--bg)]"
                    : "text-[var(--fg-3)] hover:text-[var(--fg)] hover:bg-[var(--bg-2)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                id={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <div className="surface-interactive p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <div className="text-mono text-xs text-[var(--fg-4)] tracking-wider mb-2 md:mb-3">
                      CASE / {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="text-mono text-xs text-[var(--primary-bright)]">
                      {project.timeline}
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-base text-[var(--fg-2)] leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 border-t border-[var(--border)]">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="metric-number text-2xl text-[var(--primary-bright)] mb-1">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-[var(--fg-4)] tracking-wider uppercase">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-3 md:text-right space-y-3">
                    <div>
                      <div className="text-mono text-[10px] text-[var(--fg-4)] uppercase mb-1">role</div>
                      <div className="font-semibold text-sm">{project.role}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 transition-all group-hover:translate-x-1 md:ml-auto text-[var(--fg-4)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--fg-3)]">
            没有找到匹配的项目。
          </div>
        )}
      </div>
    </div>
  );
}
