"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";
import ContactModal from "@/components/ContactModal";
import HeroSignalBackground from "@/components/brand/HeroSignalBackground";
import SignalStrip from "@/components/brand/SignalStrip";
import SignalPanel from "@/components/brand/SignalPanel";
import DossierCard from "@/components/brand/DossierCard";
import NoteRow from "@/components/brand/NoteRow";
import CommercialCTA from "@/components/brand/CommercialCTA";
import PunkLabel from "@/components/brand/PunkLabel";

const signalItems = ["DISCOVERY", "POC DESIGN", "ROI TRANSLATION", "CFO BUY-IN", "SCALE", "ENTERPRISE AI"];

const proofSignals = [
  { value: "¥800M+", label: "ARR DRIVEN", body: "从 POC 到规模化采购，推动亿元级 AI 项目商业闭环。" },
  { value: "50+", label: "ENTERPRISE DEALS", body: "覆盖金融、政企、制造、零售等复杂采购场景。" },
  { value: "12", label: "INDUSTRIES", body: "把行业痛点转译成可采购、可验证的 AI 价值。" },
  { value: "8Y", label: "AI COMMERCIALIZATION", body: "长期处在技术、预算和组织共识的交界面。" },
];

const operatingModel = [
  { step: "01", title: "DISCOVERY", body: "把客户模糊需求转成可量化业务问题，先判断这个场景值不值得卖。" },
  { step: "02", title: "VALUE MAP", body: "把模型能力映射到成本、效率、收入指标，让价值进入预算语言。" },
  { step: "03", title: "POC DESIGN", body: "让技术验证变成业务验证，用可衡量结果定义成功。" },
  { step: "04", title: "CFO BUY-IN", body: "把方案翻译成 CFO 能算账、CEO 能判断的 ROI 叙事。" },
  { step: "05", title: "SCALE", body: "从试点推进到集团级规模化采购，完成商业闭环。" },
];

export default function Home() {
  const { data } = useSiteData();
  const { profile } = data;
  const publishedProjects = data.projects.filter((p) => p.status === "published");
  const publishedPosts = data.posts.filter((p) => p.status === "published");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative signal-bg">
      <section className="relative min-h-screen overflow-hidden px-4 pt-28 pb-16 sm:px-10 md:pt-36">
        <HeroSignalBackground />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 flex flex-wrap gap-2"
            >
              <PunkLabel>AI COMMERCIALIZATION</PunkLabel>
              <PunkLabel tone="violet">BOARDROOM TRANSLATOR</PunkLabel>
              <PunkLabel tone="yellow">ROI-FIRST</PunkLabel>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="text-mega max-w-5xl"
            >
              AI 销售不是卖工具。
              <span className="block text-gradient">是翻译确定性。</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-7 max-w-3xl text-lg leading-8 text-[var(--fg-2)] md:text-xl"
            >
              {profile.name} / {profile.title}。{profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <button onClick={() => setContactOpen(true)} className="btn-primary justify-center">
                预约 AI 商业化诊断 <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/portfolio" className="btn-secondary justify-center">
                查看大客户战绩
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            <SignalPanel
              eyebrow="LIVE SIGNALS"
              title="Deal Intelligence Board"
              rows={[
                { label: "Stage", value: "POC → SCALE" },
                { label: "Buyer", value: "CEO / CFO / CIO" },
                { label: "Value Map", value: "READY" },
                { label: "ARR Impact", value: "¥800M+" },
                { label: "Industry", value: "BANK / GOV / MFG / RETAIL" },
                { label: "Status", value: profile.statusText },
              ]}
              footer={<div className="text-mono text-[10px] uppercase tracking-[0.2em] text-[var(--primary-bright)]">ROI VERIFIED / COMMERCIALIZATION ONLINE</div>}
            />
          </motion.div>
        </div>
      </section>

      <SignalStrip items={signalItems} />

      <section className="px-4 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {proofSignals.map((signal, index) => (
              <ScrollReveal key={signal.label} delay={index * 0.06}>
                <div className="surface h-full p-6">
                  <div className="metric-number text-4xl text-[var(--primary-bright)] md:text-5xl">{signal.value}</div>
                  <div className="mt-3 text-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-4)]">{signal.label}</div>
                  <p className="mt-4 text-sm leading-6 text-[var(--fg-2)]">{signal.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-12 max-w-4xl">
              <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">OPERATING MODEL</div>
              <h2 className="mt-4 text-display">The AI Deal Operating Model</h2>
              <p className="mt-5 text-lg leading-8 text-[var(--fg-2)]">一套把 AI 从演示推进到预算、采购和规模化落地的商业化路径。</p>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {operatingModel.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.06}>
                <div className="surface grid gap-5 p-5 md:grid-cols-[120px_260px_1fr] md:items-center md:p-7">
                  <div className="text-mono text-5xl font-black text-[var(--primary-bright)]">{item.step}</div>
                  <div className="text-mono text-sm font-black uppercase tracking-[0.24em] text-[var(--fg)]">{item.title}</div>
                  <p className="text-base leading-7 text-[var(--fg-2)]">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">DEAL DOSSIERS</div>
              <h2 className="mt-4 text-display">复杂企业 AI 项目的成交样本。</h2>
            </div>
            <Link href="/portfolio" className="btn-secondary">VIEW ALL DOSSIERS <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {publishedProjects.slice(0, 4).map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.06}>
                <DossierCard project={project} index={index} compact href={`/portfolio#${project.slug}`} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">FIELD NOTES</div>
            <h2 className="mt-4 text-display">只记录 AI 如何被企业真正买单。</h2>
          </div>
          {publishedPosts.slice(0, 2).map((post, index) => (
            <NoteRow key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <CommercialCTA onPrimaryClick={() => setContactOpen(true)} />
        </div>
      </section>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
