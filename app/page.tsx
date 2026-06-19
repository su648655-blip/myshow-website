"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, TrendingUp, Building2, Brain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";
import ContactModal from "@/components/ContactModal";

const tickerItems = [
  "ENTERPRISE AI SOLUTIONS",
  "•",
  "FORTUNE 500 EXPERIENCE",
  "•",
  "¥800M+ ARR DRIVEN",
  "•",
  "12 INDUSTRIES SERVED",
  "•",
  "AI STRATEGY ADVISORY",
  "•",
];

export default function Home() {
  const { data } = useSiteData();
  const { profile } = data;
  const publishedProjects = data.projects.filter((p) => p.status === "published");
  const publishedPosts = data.posts.filter((p) => p.status === "published");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative">
      {/* ============ Hero ============ */}
      <section className="relative min-h-screen flex items-center bg-grid overflow-hidden">
        <div className="aurora aurora-cyan" style={{ width: 700, height: 700, top: "-10%", left: "-15%" }} />
        <div className="aurora aurora-blue" style={{ width: 500, height: 500, bottom: "5%", right: "-10%" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 w-full pt-16 md:pt-24">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass">
              <span className="status-dot" />
              <span className="text-mono text-[10px] md:text-[11px] tracking-wider text-[var(--fg-2)]">
                {profile.statusText}
              </span>
            </div>
          </motion.div>

          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-mono text-[10px] md:text-xs tracking-wider text-[var(--fg-3)] mb-4 md:mb-6"
          >
            // {profile.tagline} · {profile.location.toUpperCase()}
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-mega mb-3 md:mb-4"
          >
            <span className="block">{profile.name}</span>
            <span className="block text-gradient text-glow text-3xl sm:text-5xl md:text-mega">{profile.headline}</span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-xl text-[var(--fg-2)] max-w-3xl mb-8 md:mb-12 leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-16 md:mb-20"
          >
            <Link href="/portfolio" className="btn-primary justify-center">
              查看案例
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setContactOpen(true)} className="btn-secondary justify-center">
              预约咨询
            </button>
          </motion.div>

          {/* 数据指标 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 md:pt-12 border-t border-[var(--border)]"
          >
            {[
              { value: "¥800M+", label: "ARR DRIVEN" },
              { value: "8+", label: "YEARS IN AI" },
              { value: "50+", label: "ENTERPRISE DEALS" },
              { value: "12", label: "INDUSTRIES" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="metric-number text-2xl md:text-4xl mb-1 text-[var(--fg)]">{stat.value}</div>
                <div className="text-mono text-[9px] md:text-[10px] tracking-widest text-[var(--fg-4)]">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="hidden md:flex absolute bottom-8 right-10 items-center gap-2 text-mono text-xs text-[var(--fg-4)] tracking-wider"
          >
            <span>SCROLL</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4 text-[var(--primary)]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ Ticker ============ */}
      <div className="ticker">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>{item.includes("¥") || item.includes("FORTUNE") || item.includes("AI") ? <strong>{item}</strong> : item}</span>
          ))}
        </div>
        <div className="ticker-track" aria-hidden>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>{item.includes("¥") || item.includes("FORTUNE") || item.includes("AI") ? <strong>{item}</strong> : item}</span>
          ))}
        </div>
      </div>

      {/* ============ Capabilities ============ */}
      <section className="relative py-20 md:py-32 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-mono text-xs text-[var(--fg-3)] mb-4">// 01 / EXPERTISE</div>
            <h2 className="text-display mb-16 max-w-3xl">
              帮助企业从 <span className="text-gradient">AI 概念验证</span> 走向 <span className="text-gradient">规模化落地</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Enterprise Sales",
                desc: "深耕金融、政企、制造、零售四大行业。从 Discovery 到 POC 到签约，端到端管理 7 位数 ARR 项目。",
                metric: "¥800M+ ARR",
              },
              {
                icon: Brain,
                title: "AI 战略咨询",
                desc: "为客户高管设计 AI 战略路线图。把模型能力翻译为可衡量的业务价值，让 CEO 看得懂、CFO 算得清。",
                metric: "20+ Strategic",
              },
              {
                icon: TrendingUp,
                title: "团队增长",
                desc: "从 0 到 1 搭建华东 AI 销售团队。带过 4 个国家、12 名直接下属，三年配额达成率均超过 130%。",
                metric: "12 People Team",
              },
            ].map((cap, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="surface p-8 h-full">
                  <div className="w-10 h-10 mb-6 rounded-lg bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center">
                    <cap.icon className="w-5 h-5 text-[var(--primary-bright)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                  <p className="text-[var(--fg-3)] leading-relaxed mb-6 text-sm">{cap.desc}</p>
                  <div className="text-mono text-xs text-[var(--primary-bright)] tracking-wider">
                    {cap.metric}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Featured Cases ============ */}
      <section className="relative py-20 md:py-32 px-4 sm:px-10 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-mono text-xs text-[var(--fg-3)] mb-4">// 02 / CASE STUDIES</div>
                <h2 className="text-display max-w-2xl">
                  代表性<span className="text-gradient">大客户项目</span>
                </h2>
              </div>
              <Link href="/portfolio" className="btn-secondary">
                全部案例 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {publishedProjects.slice(0, 4).map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.08}>
                <Link href={`/portfolio#${project.slug}`}>
                  <div className="surface-interactive p-8 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-mono text-xs text-[var(--fg-4)] tracking-wider">
                        CASE / {String(index + 1).padStart(2, "0")}
                      </div>
                      <ArrowRight className="w-4 h-4 text-[var(--fg-4)] transition-all group-hover:translate-x-1" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[var(--fg-3)] text-sm leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {project.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-6 border-t border-[var(--border)]">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-mono text-base font-bold text-[var(--primary-bright)] mb-1">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-[var(--fg-4)] tracking-wider uppercase">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-mono text-xs text-[var(--fg-4)]">
                      <span>{project.timeline}</span>
                      <span>{project.role}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Insights ============ */}
      <section className="relative py-20 md:py-32 px-4 sm:px-10 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
              <div>
                <div className="text-mono text-xs text-[var(--fg-3)] mb-4">// 03 / INSIGHTS</div>
                <h2 className="text-display">
                  洞察<span className="text-gradient">与方法论</span>
                </h2>
              </div>
              <Link href="/blog" className="btn-secondary">
                全部文章 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="space-y-2">
            {publishedPosts.slice(0, 3).map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.08}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group flex flex-col md:flex-row md:items-center gap-4 px-6 py-8 border-b border-[var(--border)] hover:bg-[var(--bg-1)] transition-colors -mx-6">
                    <div className="text-mono text-xs text-[var(--fg-4)] md:w-24 flex-shrink-0">
                      {post.publishedAt}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold flex-1 group-hover:text-[var(--primary-bright)] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-mono text-xs text-[var(--fg-4)]">{post.readTime}</span>
                      <ArrowRight className="w-4 h-4 text-[var(--fg-4)] transition-all group-hover:translate-x-1 group-hover:text-[var(--primary-bright)]" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-24 md:py-40 px-4 sm:px-10 overflow-hidden border-t border-[var(--border)]">
        <div className="aurora aurora-cyan" style={{ width: 600, height: 600, top: "10%", left: "20%" }} />

        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-6">// 04 / GET IN TOUCH</div>
            <h2 className="text-display mb-8">
              开启你的<span className="text-gradient">AI 业务增长</span>
            </h2>
            <p className="text-lg text-[var(--fg-3)] mb-12 max-w-2xl mx-auto leading-relaxed">
              一次 30 分钟的对话，可能改变贵司未来 3 年的 AI 路线。
            </p>
            <Link href={`mailto:${profile.email}`} className="btn-primary">
              <Sparkles className="w-4 h-4" />
              发送邮件
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact Modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
