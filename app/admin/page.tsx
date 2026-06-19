"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Briefcase, FileText, User, Plus, ArrowUpRight, Sparkles, Palette } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";

export default function AdminDashboard() {
  const { data } = useSiteData();

  const stats = [
    { label: "案例总数", value: data.projects.length, change: data.projects.filter(p => p.status === "published").length + " 已发布" },
    { label: "文章总数", value: data.posts.length, change: data.posts.filter(p => p.status === "published").length + " 已发布" },
    { label: "技能标签", value: data.skills.length, change: new Set(data.skills.map((s) => s.category)).size + " 类" },
    { label: "时间线", value: data.timeline.length, change: data.timeline.filter(t => t.type === "work").length + " 工作" },
    { label: "咨询记录", value: (data.contacts || []).length, change: (data.contacts || []).filter(c => !c.read).length + " 条未读" },
  ];

  return (
    <div>
      <div className="mb-12">
        <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// DASHBOARD</div>
        <h1 className="text-4xl font-bold mb-2">
          欢迎回来，<span className="text-gradient">{data.profile.name}</span>
        </h1>
        <p className="text-[var(--fg-3)]">在这里管理你的网站内容、外观与配置。</p>
      </div>

      {/* 数据卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="surface p-6">
            <div className="text-mono text-[10px] text-[var(--fg-4)] tracking-wider uppercase mb-3">
              {stat.label}
            </div>
            <div className="metric-number text-4xl text-[var(--fg)] mb-2">{stat.value}</div>
            <div className="text-xs text-[var(--primary-bright)]">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* 快捷操作 */}
      <div className="text-mono text-xs text-[var(--fg-3)] mb-4 tracking-wider">// QUICK ACTIONS</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link href="/admin/projects" className="surface-interactive p-7">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[var(--primary-bright)]" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--fg-4)]" />
          </div>
          <h3 className="text-lg font-bold mb-1">添加新案例</h3>
          <p className="text-sm text-[var(--fg-3)]">展示你的最新企业 AI 项目</p>
        </Link>

        <Link href="/admin/posts" className="surface-interactive p-7">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[var(--primary-bright)]" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--fg-4)]" />
          </div>
          <h3 className="text-lg font-bold mb-1">写一篇文章</h3>
          <p className="text-sm text-[var(--fg-3)]">分享你的销售方法论与思考</p>
        </Link>
      </div>

      {/* 最近案例 */}
      {data.projects.length > 0 && (
        <>
          <div className="text-mono text-xs text-[var(--fg-3)] mb-4 tracking-wider">// RECENT CASES</div>
          <div className="surface p-2 mb-10">
            {data.projects.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                href="/admin/projects"
                className="flex items-center justify-between p-4 rounded-lg hover:bg-[var(--bg-2)] transition-colors group"
              >
                <div>
                  <div className="font-semibold text-sm mb-0.5">{p.title}</div>
                  <div className="text-mono text-xs text-[var(--fg-4)]">{p.timeline} · {p.role}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`tag ${p.status === "draft" ? "tag-neutral" : ""}`}>
                    {p.status === "published" ? "已发布" : "草稿"}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--fg-4)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/profile" className="surface-interactive p-5 flex items-center gap-3">
          <User className="w-5 h-5 text-[var(--primary-bright)]" />
          <div>
            <div className="font-semibold text-sm">编辑资料</div>
            <div className="text-xs text-[var(--fg-4)]">基础信息、社交链接</div>
          </div>
        </Link>
        <Link href="/admin/theme" className="surface-interactive p-5 flex items-center gap-3">
          <Palette className="w-5 h-5 text-[var(--primary-bright)]" />
          <div>
            <div className="font-semibold text-sm">切换主题</div>
            <div className="text-xs text-[var(--fg-4)]">3 套预设方案</div>
          </div>
        </Link>
        <Link href="/" target="_blank" className="surface-interactive p-5 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[var(--primary-bright)]" />
          <div>
            <div className="font-semibold text-sm">访问网站</div>
            <div className="text-xs text-[var(--fg-4)]">在新标签页打开</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
