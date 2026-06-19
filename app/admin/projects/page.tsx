"use client";

import ImageUpload from "@/components/ImageUpload";
import AdminItemManager from "@/components/AdminItemManager";
import { useSiteData } from "@/components/DataProvider";
import { genId } from "@/lib/store";
import type { Project } from "@/lib/data";

export default function ProjectsAdminPage() {
  const { data } = useSiteData();

  return (
    <AdminItemManager<Project>
      config={{
        label: "案例",
        labelPlural: "案例管理",
        items: data.projects,
        dataKey: "projects",
        slugField: "slug",
        previewPath: "/portfolio#",
        renderExtra: (p) => `${p.timeline} · ${p.role} · ${p.tags.join(" / ")}`,
        createEmpty: () => ({
          id: genId(),
          title: "新案例",
          slug: "new-case-" + Date.now(),
          summary: "",
          coverImage: "",
          tags: [],
          role: "",
          timeline: "",
          status: "draft",
          sortOrder: data.projects.length + 1,
          metrics: [],
        }),
        renderForm: ({ item, onChange }) => (
          <>
            <div className="max-w-xs">
              <ImageUpload
                value={item.coverImage}
                onChange={(v) => onChange({ ...item, coverImage: v })}
                shape="rect"
                label="封面图"
                hint="建议 16:9 · < 2MB"
              />
            </div>

            <div>
              <label className="label">标题</label>
              <input className="input" value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">时间 <span className="label-hint">YYYY.MM</span></label>
                <input className="input" value={item.timeline} onChange={(e) => onChange({ ...item, timeline: e.target.value })} />
              </div>
              <div>
                <label className="label">角色</label>
                <input className="input" value={item.role} onChange={(e) => onChange({ ...item, role: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="label">简介</label>
              <textarea className="input" rows={3} value={item.summary} onChange={(e) => onChange({ ...item, summary: e.target.value })} />
            </div>

            <div>
              <label className="label">标签 <span className="label-hint">用逗号分隔</span></label>
              <input
                className="input"
                value={item.tags.join(", ")}
                onChange={(e) => onChange({ ...item, tags: e.target.value.split(/[,，]/).map((t) => t.trim()).filter(Boolean) })}
                placeholder="金融行业, AI 客服, 大模型"
              />
            </div>

            {/* 关键指标 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="label" style={{ marginBottom: 0 }}>关键指标 <span className="label-hint">展示业务成果</span></label>
                <button
                  type="button"
                  onClick={() => {
                    const next = [...(item.metrics || []), { label: "新指标", value: "" }];
                    onChange({ ...item, metrics: next });
                  }}
                  className="btn-ghost text-xs"
                >
                  + 添加
                </button>
              </div>
              <div className="space-y-2">
                {(item.metrics || []).map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="input flex-1" placeholder="标签" value={m.label}
                      onChange={(e) => {
                        const next = [...(item.metrics || [])];
                        next[i] = { ...next[i], label: e.target.value };
                        onChange({ ...item, metrics: next });
                      }} />
                    <input className="input flex-1" placeholder="数值" value={m.value}
                      onChange={(e) => {
                        const next = [...(item.metrics || [])];
                        next[i] = { ...next[i], value: e.target.value };
                        onChange({ ...item, metrics: next });
                      }} />
                    <button type="button" onClick={() => onChange({ ...item, metrics: (item.metrics || []).filter((_, idx) => idx !== i) })}
                      className="btn-icon btn-danger">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Slug <span className="label-hint">URL</span></label>
                <input className="input" value={item.slug} onChange={(e) => onChange({ ...item, slug: e.target.value })} />
              </div>
              <div>
                <label className="label">状态</label>
                <select className="input" value={item.status}
                  onChange={(e) => onChange({ ...item, status: e.target.value as Project["status"] })}>
                  <option value="published">已发布</option>
                  <option value="draft">草稿</option>
                </select>
              </div>
            </div>
          </>
        ),
      }}
    />
  );
}
