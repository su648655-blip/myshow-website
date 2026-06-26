"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";
import SignalPanel from "@/components/brand/SignalPanel";
import PunkLabel from "@/components/brand/PunkLabel";
import CommercialCTA from "@/components/brand/CommercialCTA";

const principles = [
  { id: "01", title: "Sell Outcomes, Not Features", body: "不要卖模型能力，卖客户能衡量的业务结果。" },
  { id: "02", title: "Make ROI Boardroom-Ready", body: "让 CFO 能算账，让 CEO 能判断战略价值。" },
  { id: "03", title: "Design POC as Business Proof", body: "POC 不只是技术验证，而是预算验证。" },
  { id: "04", title: "Build Internal Consensus", body: "AI 大单不是一个人买单，而是多个部门共同相信。" },
];

export default function AboutPage() {
  const { data } = useSiteData();
  const { profile, timeline, skills } = data;

  const skillsByCategory = useMemo(() => {
    const acc: Record<string, typeof skills> = {};
    skills.forEach((s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
    });
    return acc;
  }, [skills]);

  return (
    <div className="relative signal-bg min-h-screen px-4 pt-24 pb-20 sm:px-10 md:pt-36 md:pb-32">
      <div className="aurora aurora-cyan" style={{ width: 600, height: 600, top: "0%", left: "6%" }} />
      <div className="aurora aurora-blue" style={{ width: 520, height: 520, bottom: "20%", right: "0%" }} />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-[1fr_420px] md:items-end mb-16 md:mb-24">
            <div>
              <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-4 tracking-[0.24em]">OPERATOR PROFILE</div>
              <h1 className="text-mega mb-7 max-w-5xl">
                我负责把 AI 从 Demo 推向预算桌。
              </h1>
              <p className="text-lg leading-8 text-[var(--fg-2)] max-w-3xl">
                {profile.name}，{profile.title}。长期服务金融、政企、制造、零售客户，专注将模型能力转化为可采购、可验证、可规模化的业务结果。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <PunkLabel>BOARDROOM TRANSLATOR</PunkLabel>
                <PunkLabel tone="violet">ROI-FIRST SELLING</PunkLabel>
                <PunkLabel tone="yellow">AI DEAL OPERATOR</PunkLabel>
              </div>
            </div>
            <SignalPanel
              eyebrow="PROFILE ID"
              rows={[
                { label: "Name", value: profile.name },
                { label: "Role", value: profile.title },
                { label: "Base", value: profile.location },
                { label: "Focus", value: "Enterprise AI Commercialization" },
                { label: "Available", value: profile.statusText },
              ]}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16 md:mb-24 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="text-mono text-[10px] text-[var(--fg-4)] mb-3 tracking-[0.24em]">ORIGIN STORY</div>
              <h2 className="text-title">AI 销售的核心不是演示模型，而是重建客户的确定性。</h2>
            </div>
            <div className="md:col-span-8 space-y-5 text-lg leading-9 text-[var(--fg-2)]">
              <p>{profile.bio}</p>
              <p>
                企业面对 AI 时往往同时兴奋和焦虑：他们看见技术潜力，却很难判断预算、组织共识和 ROI 是否成立。我的工作，是把这些不确定性拆开，变成可以推进的商业路径。
              </p>
              <p>
                我相信 AI 销售不是卖工具，而是卖结果；不是堆功能，而是让 CEO、CFO、CIO 和业务负责人在同一张价值地图上达成共识。
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16 md:mb-24">
            <div className="mb-10">
              <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-4 tracking-[0.24em]">OPERATING PRINCIPLES</div>
              <h2 className="text-display">我的 AI 大单操盘原则。</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.id} className="surface p-6">
                  <div className="text-mono text-4xl font-black text-[var(--primary-bright)]">{principle.id}</div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight">{principle.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--fg-2)]">{principle.body}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16 md:mb-24">
            <div className="mb-10 text-mono text-[10px] text-[var(--fg-4)] tracking-[0.24em]">CAREER SIGNALS</div>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="surface grid grid-cols-1 gap-4 p-6 md:grid-cols-[120px_24px_1fr] md:items-start"
                >
                  <div className="text-mono text-lg font-black text-[var(--primary-bright)]">{item.year}</div>
                  <div className="hidden md:flex h-full justify-center pt-1">
                    <span className="h-3 w-3 rounded-full bg-[var(--acid)] shadow-[0_0_18px_var(--primary-glow)]" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">
                      {item.type === "education" ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                      {item.type === "education" ? "Education" : "Work"}
                    </div>
                    <h3 className="text-xl font-black mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--fg-2)] mb-2 font-semibold">{item.organization}</p>
                    <p className="text-sm text-[var(--fg-3)] leading-7">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16 md:mb-24">
            <div className="mb-10">
              <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-4 tracking-[0.24em]">CAPABILITY MATRIX</div>
              <h2 className="text-display">能力不是标签，是可复用的成交系统。</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {Object.entries(skillsByCategory).map(([category, list]) => (
                <div key={category} className="surface p-6">
                  <div className="text-mono text-xs text-[var(--primary-bright)] mb-5 tracking-wider uppercase">{category}</div>
                  <div className="space-y-4">
                    {list.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-[var(--fg-2)]">{skill.name}</span>
                          <span className="text-mono text-xs text-[var(--fg-4)]">{skill.level}/5</span>
                        </div>
                        <div className="h-1.5 bg-[var(--bg-2)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="h-full bg-[var(--primary)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <section className="grid gap-6 md:grid-cols-[1fr_420px] md:items-stretch">
          <CommercialCTA
            title="如果你正在推进一个 AI 项目，我们可以聊三件事。"
            body="这个场景值不值得做？POC 指标是否能说服预算方？如何从试点推进到规模化采购？"
            primaryHref={`mailto:${profile.email}`}
            primaryLabel="REQUEST BRIEFING"
          />
          <div className="signal-panel rounded-3xl p-6 md:p-8">
            <div className="relative z-10">
              <div className="text-mono text-[10px] text-[var(--primary-bright)] mb-5 tracking-[0.24em]">CONTACT PROTOCOL</div>
              <div className="space-y-4">
                <div className="grid grid-cols-[70px_1fr] gap-3 border-t border-[var(--border)] pt-4"><span className="text-mono text-[10px] text-[var(--fg-4)]">WECHAT</span><span>{profile.wechat}</span></div>
                <div className="grid grid-cols-[70px_1fr] gap-3 border-t border-[var(--border)] pt-4"><span className="text-mono text-[10px] text-[var(--fg-4)]">PHONE</span><span>{profile.phone}</span></div>
                <a href={`mailto:${profile.email}`} className="grid grid-cols-[70px_1fr] gap-3 border-t border-[var(--border)] pt-4 hover:text-[var(--primary-bright)]"><span className="text-mono text-[10px] text-[var(--fg-4)]">EMAIL</span><span className="break-all">{profile.email}</span></a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
