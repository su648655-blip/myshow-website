"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Github, Linkedin } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Globe,
  即刻: Globe,
};

export default function Footer() {
  const { data } = useSiteData();
  const { profile } = data;

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-1)] overflow-hidden">
      <div className="aurora aurora-cyan" style={{ width: 500, height: 500, bottom: "-50%", left: "10%" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-5">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-3 tracking-wider">// CONTACT</div>
            <h2 className="text-display mb-6">
              开启<span className="text-gradient">下一个项目</span>
            </h2>
            <p className="text-[var(--fg-3)] leading-relaxed">
              如果你正在评估企业级 AI 解决方案，或希望探讨 AI 战略合作，
              欢迎随时联系。
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-3 tracking-wider">// EMAIL</div>
            <a
              href={`mailto:${profile.email}`}
              className="text-lg md:text-2xl font-bold hover:text-[var(--primary-bright)] transition-colors break-all inline-flex items-center gap-2 group"
            >
              {profile.email}
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-3 tracking-wider">// FOLLOW</div>
            <div className="space-y-2">
              {profile.socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform] || Globe;
                return (
                  <Link
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--primary-bright)] transition-all border border-transparent hover:border-[var(--border)]"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" />
                      {link.platform}
                    </span>
                    <span className="text-xs text-[var(--fg-4)] truncate max-w-[140px] hidden sm:block">
                      {link.url.replace(/^https?:\/\//, "")}
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--fg-4)] text-mono">
          <p>© {new Date().getFullYear()} {profile.name.toUpperCase()} · ALL RIGHTS RESERVED</p>
          <p>BUILT FOR AI ENTERPRISE LEADERS</p>
        </div>
      </div>
    </footer>
  );
}
