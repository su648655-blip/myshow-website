"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteData } from "@/components/DataProvider";
import { useToast } from "@/components/Toast";
import { defaultSiteSettings, type SiteSettings, type LabelTone, type BackgroundIntensity, type LabelStyle } from "@/lib/store";

const toneOptions = ["acid", "violet", "yellow", "blue"] as const;
const intensityOptions = ["low", "medium", "high"] as const;
const labelStyleOptions = ["restrained", "punk"] as const;

const moduleLabels: { key: keyof SiteSettings["homeModules"]; label: string; description: string }[] = [
  { key: "proofSignals", label: "战绩信号区", description: "¥800M+、50+ Deals 等首页证明模块" },
  { key: "operatingModel", label: "Operating Model", description: "AI 大单方法论流程" },
  { key: "dossiers", label: "Deal Dossiers", description: "首页精选案例档案" },
  { key: "fieldNotes", label: "Field Notes", description: "首页洞察文章预览" },
  { key: "bottomCta", label: "底部 CTA", description: "首页底部咨询收口模块" },
];

function cloneSettings(settings: SiteSettings): SiteSettings {
  return JSON.parse(JSON.stringify(settings));
}

export default function SiteSettingsAdminPage() {
  const { data, updateData } = useSiteData();
  const toast = useToast();
  const [settings, setSettings] = useState<SiteSettings>(() => cloneSettings(data.siteSettings || defaultSiteSettings));

  useEffect(() => {
    setSettings(cloneSettings(data.siteSettings || defaultSiteSettings));
  }, [data.siteSettings]);

  const save = () => {
    updateData((current) => ({ ...current, siteSettings: settings }));
    toast.show("前台设置已保存");
  };

  const reset = () => {
    const defaults = cloneSettings(defaultSiteSettings);
    setSettings(defaults);
    updateData((current) => ({ ...current, siteSettings: defaults }));
    toast.show("已恢复默认前台设置");
  };

  const updateHero = (patch: Partial<SiteSettings["hero"]>) => {
    setSettings((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));
  };

  const updateBoard = (patch: Partial<SiteSettings["heroBoard"]>) => {
    setSettings((prev) => ({ ...prev, heroBoard: { ...prev.heroBoard, ...patch } }));
  };

  const updateVisual = (patch: Partial<SiteSettings["visual"]>) => {
    setSettings((prev) => ({ ...prev, visual: { ...prev.visual, ...patch } }));
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// SITE SETTINGS</div>
          <h1 className="text-3xl font-bold mb-2">前台设置</h1>
          <p className="text-[var(--fg-3)] text-sm">管理首页 Hero、情报面板、模块开关和视觉强度。</p>
        </div>
        <div className="flex gap-3">
          <button onClick={reset} className="btn-secondary">恢复默认</button>
          <button onClick={save} className="btn-primary">
            <Save className="w-4 h-4" />
            保存设置
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <section className="surface p-6">
          <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">Hero 主视觉</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">主标题第一行</label>
              <input className="input" value={settings.hero.titleLine1} onChange={(e) => updateHero({ titleLine1: e.target.value })} />
            </div>
            <div>
              <label className="label">主标题高亮行</label>
              <input className="input" value={settings.hero.titleHighlight} onChange={(e) => updateHero({ titleHighlight: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Hero 简介 <span className="label-hint">留空则使用个人简介</span></label>
              <textarea className="input" rows={3} value={settings.hero.description} onChange={(e) => updateHero({ description: e.target.value })} placeholder="留空时自动使用：姓名 / 职位 + bio" />
            </div>
            <div>
              <label className="label">主 CTA 文案</label>
              <input className="input" value={settings.hero.primaryCta} onChange={(e) => updateHero({ primaryCta: e.target.value })} />
            </div>
            <div>
              <label className="label">次 CTA 文案</label>
              <input className="input" value={settings.hero.secondaryCta} onChange={(e) => updateHero({ secondaryCta: e.target.value })} />
            </div>
          </div>
        </section>

        <section className="surface p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-mono text-xs text-[var(--primary-bright)] tracking-wider uppercase">Hero 标签</div>
            <button
              onClick={() => updateHero({ eyebrowLabels: [...settings.hero.eyebrowLabels, { text: "NEW SIGNAL", tone: "acid" }] })}
              className="btn-ghost"
            >
              <Plus className="w-3.5 h-3.5" /> 添加标签
            </button>
          </div>
          <div className="space-y-2">
            {settings.hero.eyebrowLabels.map((label, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_160px_44px] gap-2 items-center">
                <input
                  className="input"
                  value={label.text}
                  onChange={(e) => {
                    const next = [...settings.hero.eyebrowLabels];
                    next[index] = { ...next[index], text: e.target.value };
                    updateHero({ eyebrowLabels: next });
                  }}
                />
                <select
                  className="input"
                  value={label.tone}
                  onChange={(e) => {
                    const next = [...settings.hero.eyebrowLabels];
                    next[index] = { ...next[index], tone: e.target.value as LabelTone };
                    updateHero({ eyebrowLabels: next });
                  }}
                >
                  {toneOptions.map((tone) => <option key={tone} value={tone}>{tone}</option>)}
                </select>
                <button
                  onClick={() => updateHero({ eyebrowLabels: settings.hero.eyebrowLabels.filter((_, i) => i !== index) })}
                  className="btn-icon btn-danger"
                  aria-label="删除标签"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="surface p-6">
          <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">Deal Intelligence Board</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="label">Eyebrow</label>
              <input className="input" value={settings.heroBoard.eyebrow} onChange={(e) => updateBoard({ eyebrow: e.target.value })} />
            </div>
            <div>
              <label className="label">标题</label>
              <input className="input" value={settings.heroBoard.title} onChange={(e) => updateBoard({ title: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Footer 文案</label>
              <input className="input" value={settings.heroBoard.footer} onChange={(e) => updateBoard({ footer: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-[var(--fg-2)]">Rows</div>
            <button
              onClick={() => updateBoard({ rows: [...settings.heroBoard.rows, { label: "Label", value: "Value" }] })}
              className="btn-ghost"
            >
              <Plus className="w-3.5 h-3.5" /> 添加 Row
            </button>
          </div>
          <div className="space-y-2">
            {settings.heroBoard.rows.map((row, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[180px_1fr_44px] gap-2 items-center">
                <input
                  className="input"
                  value={row.label}
                  onChange={(e) => {
                    const rows = [...settings.heroBoard.rows];
                    rows[index] = { ...rows[index], label: e.target.value };
                    updateBoard({ rows });
                  }}
                />
                <input
                  className="input"
                  value={row.value}
                  onChange={(e) => {
                    const rows = [...settings.heroBoard.rows];
                    rows[index] = { ...rows[index], value: e.target.value };
                    updateBoard({ rows });
                  }}
                />
                <button
                  onClick={() => updateBoard({ rows: settings.heroBoard.rows.filter((_, i) => i !== index) })}
                  className="btn-icon btn-danger"
                  aria-label="删除 Row"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="surface p-6">
          <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">首页模块</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {moduleLabels.map((item) => (
              <label key={item.key} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.homeModules[item.key]}
                  onChange={(e) => setSettings((prev) => ({ ...prev, homeModules: { ...prev.homeModules, [item.key]: e.target.checked } }))}
                  className="mt-1"
                />
                <span>
                  <span className="block font-semibold text-[var(--fg)]">{item.label}</span>
                  <span className="block text-sm text-[var(--fg-3)] mt-1">{item.description}</span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="surface p-6">
          <div className="text-mono text-xs text-[var(--primary-bright)] mb-4 tracking-wider uppercase">视觉强度</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">背景强度</label>
              <select className="input" value={settings.visual.backgroundIntensity} onChange={(e) => updateVisual({ backgroundIntensity: e.target.value as BackgroundIntensity })}>
                {intensityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className="label">扫描线</label>
              <select className="input" value={settings.visual.scanLines ? "on" : "off"} onChange={(e) => updateVisual({ scanLines: e.target.value === "on" })}>
                <option value="on">on</option>
                <option value="off">off</option>
              </select>
            </div>
            <div>
              <label className="label">标签风格</label>
              <select className="input" value={settings.visual.labelStyle} onChange={(e) => updateVisual({ labelStyle: e.target.value as LabelStyle })}>
                {labelStyleOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
