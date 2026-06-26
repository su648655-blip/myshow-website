"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Filter } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";
import NoteRow from "@/components/brand/NoteRow";
import CommercialCTA from "@/components/brand/CommercialCTA";
import PunkLabel from "@/components/brand/PunkLabel";

export default function BlogPage() {
  const { data } = useSiteData();
  const { posts, profile } = data;
  const publishedPosts = posts.filter((p) => p.status === "published");
  const featured = publishedPosts[0];
  const allTags = useMemo(() => Array.from(new Set(publishedPosts.flatMap((p) => p.tags))), [publishedPosts]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredPosts = selectedTag ? publishedPosts.filter((post) => post.tags.includes(selectedTag)) : publishedPosts;

  return (
    <div className="relative signal-bg min-h-screen px-4 pt-24 pb-20 sm:px-10 md:pt-36 md:pb-32">
      <div className="aurora aurora-blue" style={{ width: 540, height: 540, top: "6%", right: "4%" }} />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 md:mb-20 max-w-5xl">
            <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-4 tracking-[0.24em]">FIELD NOTES</div>
            <h1 className="text-mega mb-6">
              这里不记录 AI 新闻。
              <span className="block text-gradient">只记录 AI 如何被企业真正买单。</span>
            </h1>
            <p className="text-base md:text-lg text-[var(--fg-2)] max-w-3xl leading-8">
              关于 Discovery、POC、ROI、CFO Buy-in、企业采购链和 AI 大单推进的实战观察。
            </p>
          </div>
        </ScrollReveal>

        {featured && (
          <ScrollReveal>
            <Link href={`/blog/${featured.slug}`} className="block mb-12 md:mb-16">
              <article className="signal-panel rounded-3xl p-6 md:p-10 group">
                <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_220px] md:items-end">
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <PunkLabel>FEATURED THESIS</PunkLabel>
                      {featured.tags.slice(0, 2).map((tag) => <PunkLabel key={tag} tone="violet">{tag}</PunkLabel>)}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight group-hover:text-[var(--primary-bright)] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-[var(--fg-2)]">{featured.excerpt}</p>
                  </div>
                  <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)] md:text-right">
                    <div className="mb-3 flex items-center gap-1 md:justify-end"><Clock className="h-3 w-3" />{featured.readTime}</div>
                    <div>{featured.publishedAt}</div>
                    <div className="mt-6 inline-flex items-center gap-2 text-[var(--primary-bright)]">
                      READ FIELD NOTE <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="mb-8 border-y border-[var(--border)] py-4">
            <div className="mb-3 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg-4)]">
              <Filter className="w-4 h-4" /> TOPIC SIGNALS
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedTag(null)}
                className={`shrink-0 px-3 py-2 rounded-md text-mono text-xs tracking-wider uppercase transition-all ${
                  selectedTag === null ? "bg-[var(--primary)] text-[var(--bg)]" : "border border-[var(--border)] text-[var(--fg-3)] hover:text-[var(--fg)] hover:border-[var(--border-acid)]"
                }`}
              >
                ALL
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`shrink-0 px-3 py-2 rounded-md text-mono text-xs tracking-wider uppercase transition-all ${
                    selectedTag === tag ? "bg-[var(--primary)] text-[var(--bg)]" : "border border-[var(--border)] text-[var(--fg-3)] hover:text-[var(--fg)] hover:border-[var(--border-acid)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div>
          {filteredPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.06}>
              <NoteRow post={post} index={index} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 md:mt-24">
          <CommercialCTA
            title="如果你正在设计一个 AI 项目的 POC 指标，我们可以聊聊。"
            body="把技术验证改造成业务验证，是 AI 商业化能否进入预算桌的关键一步。"
            primaryHref={`mailto:${profile.email}`}
            primaryLabel="DISCUSS POC METRICS"
            secondaryLabel="VIEW DOSSIERS"
          />
        </div>
      </div>
    </div>
  );
}
