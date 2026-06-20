"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, GraduationCap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";

export default function AboutPage() {
  const { data } = useSiteData();
  const { profile, timeline, skills } = data;

  // 按 category 分组技能
  const skillsByCategory = useMemo(() => {
    const acc: Record<string, typeof skills> = {};
    skills.forEach((s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
    });
    return acc;
  }, [skills]);

  return (
    <div className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-4 sm:px-10 min-h-screen">
      <div className="aurora aurora-cyan" style={{ width: 600, height: 600, top: "0%", left: "10%" }} />
      <div className="aurora aurora-blue" style={{ width: 500, height: 500, bottom: "20%", right: "5%" }} />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-4">// ABOUT</div>
            <h1 className="text-mega mb-8 max-w-5xl">
              <span className="text-gradient">让 AI</span> 真正
              <br />
              产生<span className="text-gradient">业务价值</span>
            </h1>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
            <div className="md:col-span-5">
              <div className="surface p-8">
                <div className="relative w-28 h-28 mb-6">
                  {profile.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-2xl object-cover border border-[var(--border-strong)]" />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--primary)] via-[var(--primary-bright)] to-[var(--primary-glow)] flex items-center justify-center text-4xl font-black text-[var(--bg)] shadow-lg">
                      {profile.name[0]}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--success)] border-4 border-[var(--bg-1)]" />
                </div>

                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider">
                  {profile.title}
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--fg-3)] mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </div>

                <div className="space-y-2">
                  {/* 微信 */}
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[var(--fg-2)]">
                    <span className="text-mono text-[10px] text-[var(--primary-bright)] tracking-wider w-10">微信</span>
                    <span className="font-medium">{profile.wechat || "—"}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(profile.wechat)}
                      className="text-[10px] text-[var(--fg-4)] hover:text-[var(--primary-bright)] ml-auto"
                    >
                      复制
                    </button>
                  </div>
                  {/* 手机 */}
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[var(--fg-2)]">
                    <span className="text-mono text-[10px] text-[var(--primary-bright)] tracking-wider w-10">手机</span>
                    <span className="font-medium">{profile.phone || "—"}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(profile.phone)}
                      className="text-[10px] text-[var(--fg-4)] hover:text-[var(--primary-bright)] ml-auto"
                    >
                      复制
                    </button>
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--primary-bright)] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider">// MY STORY</div>
              <p className="text-xl md:text-3xl font-bold leading-relaxed mb-6 md:mb-8">
                {profile.bio}
              </p>
              <div className="text-base text-[var(--fg-2)] leading-relaxed space-y-4">
                <p>
                  我相信 AI 销售不只是「卖工具」，而是<span className="code-mark">卖结果</span>
                  ——把客户的业务问题翻译成可被 AI 解决的方案，把技术能力翻译成可被 CFO 验证的 ROI。
                </p>
                <p>
                  在过去 8 年中，我和团队帮助 50+ 家头部企业落地了 AI 项目，
                  覆盖金融、制造、零售、政企四大行业，累计签约金额超过 8 亿人民币。
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-12">
              <div className="text-mono text-xs text-[var(--fg-3)]">// 02 / EXPERIENCE</div>
            </div>

            <div className="space-y-3">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="surface p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-3">
                      <div className="text-mono text-sm text-[var(--primary-bright)] mb-1">
                        {item.year}
                      </div>
                      <div className="flex items-center gap-1.5 text-mono text-[10px] text-[var(--fg-4)] tracking-wider uppercase">
                        {item.type === "education" ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                        {item.type === "education" ? "Education" : "Work"}
                      </div>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-[var(--fg-2)] mb-2 font-medium">{item.organization}</p>
                      <p className="text-sm text-[var(--fg-3)] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <div className="text-mono text-xs text-[var(--fg-3)] mb-12">// 03 / SKILLS & TOOLS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillsByCategory).map(([category, list]) => (
                <div key={category} className="surface p-6">
                  <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">
                    {category}
                  </div>
                  <div className="space-y-3">
                    {list.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-mono text-xs text-[var(--fg-4)]">{skill.level}/5</span>
                        </div>
                        <div className="h-1 bg-[var(--bg-2)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-bright)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
