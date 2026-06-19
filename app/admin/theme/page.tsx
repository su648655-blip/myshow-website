"use client";

import { Check } from "lucide-react";
import { useTheme, type ThemeName } from "@/components/ThemeProvider";
import { useToast } from "@/components/Toast";

const themes: { id: ThemeName; name: string; tagline: string; color: string; bg: string; accent: string }[] = [
  {
    id: "default",
    name: "AI 科技青",
    tagline: "推荐方案：电气青 + 深蓝黑，匹配 AI 行业气质",
    color: "#06b6d4",
    bg: "linear-gradient(135deg, #030712 0%, #0a1929 50%, #1a2340 100%)",
    accent: "#22d3ee",
  },
  {
    id: "gold",
    name: "黑金商务",
    tagline: "高端商务感：暖金 + 深黑，适合资深销售",
    color: "#d4af37",
    bg: "linear-gradient(135deg, #0a0908 0%, #1a1410 50%, #2a1f15 100%)",
    accent: "#f4d03f",
  },
  {
    id: "youth",
    name: "活力青春",
    tagline: "生机浅绿 + 白底深字，清新生长的年轻力",
    color: "#16a34a",
    bg: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)",
    accent: "#22c55e",
  },
  {
    id: "light",
    name: "亮色商务",
    tagline: "白底黑字：传统商务感、易读、可打印",
    color: "#0070f3",
    bg: "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)",
    accent: "#3b82f6",
  },
];

export default function ThemeAdminPage() {
  const { theme, setTheme } = useTheme();
  const toast = useToast();

  const handlePick = (id: ThemeName) => {
    setTheme(id);
    toast.show(`已切换为「${themes.find((t) => t.id === id)?.name}」`);
  };

  return (
    <div>
      <div className="mb-10">
        <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// THEME</div>
        <h1 className="text-3xl font-bold mb-2">主题外观</h1>
        <p className="text-[var(--fg-3)] text-sm">选择一套预设主题，立即应用到整个网站。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {themes.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handlePick(t.id)}
              className={`group text-left rounded-2xl border-2 transition-all overflow-hidden ${
                isActive ? "border-[var(--primary)] shadow-[0_0_0_3px_rgba(6,182,212,0.2)]" : "border-[var(--border)] hover:border-[var(--border-strong)]"
              }`}
            >
              {/* 预览块 */}
              <div className="relative h-48 p-6 overflow-hidden" style={{ background: t.bg }}>
                <div className="absolute top-3 right-3">
                  {isActive && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: t.color }}>
                      <Check className="w-4 h-4" style={{ color: t.id === "light" ? "#fff" : "#000" }} />
                    </div>
                  )}
                </div>

                <div className="font-bold text-2xl mb-1" style={{ color: t.id === "light" ? "#0a0e1a" : "#ffffff" }}>
                  Sample
                </div>
                <div className="text-sm" style={{ color: t.accent }}>
                  {t.tagline.split("：")[0]}
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2">
                  <div className="h-1.5 rounded-full flex-1" style={{ background: t.color }} />
                  <div className="h-1.5 rounded-full flex-1 opacity-50" style={{ background: t.color }} />
                  <div className="h-1.5 rounded-full flex-1 opacity-25" style={{ background: t.color }} />
                </div>
              </div>

              {/* 元信息 */}
              <div className="p-5 bg-[var(--bg-1)]">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base">{t.name}</h3>
                  {isActive && (
                    <span className="text-mono text-[10px] text-[var(--primary-bright)] tracking-wider">
                      ● ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--fg-3)]">{t.tagline}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 surface p-5 text-sm text-[var(--fg-3)]">
        <p className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// TIP</p>
        主题选择会保存在你的浏览器中，刷新页面后仍然生效。如需添加自定义主题，可联系开发者。
      </div>
    </div>
  );
}
