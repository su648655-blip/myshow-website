"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, X, Edit3, GripVertical, ExternalLink } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";
import { useToast } from "@/components/Toast";
import { useDragSort } from "@/lib/useDragSort";

export interface ItemConfig<T extends { id: string; title: string; status: "published" | "draft" }> {
  label: string;            // "案例" / "文章"
  labelPlural: string;      // "案例管理" / "文章管理"
  items: T[];
  dataKey: "projects" | "posts";
  slugField: keyof T;       // "slug"
  previewPath: string;      // "/portfolio#" / "/blog/"
  renderPreview?: (item: T) => string;
  renderExtra?: (item: T) => ReactNode;
  renderForm: (props: {
    item: T;
    onChange: (next: T) => void;
  }) => ReactNode;
  createEmpty: () => T;
}

export default function AdminItemManager<T extends { id: string; title: string; status: "published" | "draft"; coverImage?: string }>({
  config,
}: {
  config: ItemConfig<T>;
}) {
  const { data, updateData } = useSiteData();
  const toast = useToast();
  const [editing, setEditing] = useState<T | null>(null);

  const drag = useDragSort(config.items, (next) => {
    updateData((d) => ({ ...d, [config.dataKey]: next }));
    toast.show("顺序已更新");
  });

  const items = config.items;

  const handleNew = () => {
    setEditing(config.createEmpty());
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.show("请填写标题", "error");
      return;
    }
    updateData((d) => {
      const arr = [...(d[config.dataKey] as unknown as T[])];
      const idx = arr.findIndex((x) => x.id === editing.id);
      if (idx >= 0) {
        arr[idx] = editing;
      } else {
        arr.unshift(editing);
      }
      return { ...d, [config.dataKey]: arr };
    });
    setEditing(null);
    toast.show(`${config.label}已保存`);
  };

  const handleDelete = (id: string) => {
    if (!confirm(`确定删除这个${config.label}吗？`)) return;
    updateData((d) => ({
      ...d,
      [config.dataKey]: (d[config.dataKey] as unknown as T[]).filter((x) => x.id !== id),
    }));
    toast.show(`${config.label}已删除`);
  };

  const toggleStatus = (item: T) => {
    updateData((d) => ({
      ...d,
      [config.dataKey]: (d[config.dataKey] as unknown as T[]).map((x) =>
        x.id === item.id ? { ...x, status: x.status === "published" ? "draft" : "published" } : x
      ),
    }));
    toast.show(item.status === "published" ? "已设为草稿" : "已发布");
  };

  const getPreviewUrl = (item: T): string => {
    if (config.renderPreview) return config.renderPreview(item);
    const slug = item[config.slugField] as string;
    return `${config.previewPath}${slug}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="text-mono text-xs text-[var(--fg-3)] mb-2 tracking-wider">// {config.labelPlural.toUpperCase()}</div>
          <h1 className="text-3xl font-bold mb-2">{config.labelPlural}</h1>
          <p className="text-[var(--fg-3)] text-sm">
            <span className="text-[var(--primary-bright)]">{items.length}</span> 个{config.label} ·
            <span className="text-mono text-xs ml-2">拖拽 ⋮⋮ 调整顺序</span>
          </p>
        </div>
        <button onClick={handleNew} className="btn-primary">
          <Plus className="w-4 h-4" />
          新建{config.label}
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 && (
          <div className="surface p-16 text-center">
            <p className="text-[var(--fg-3)] mb-4">还没有{config.label}</p>
            <button onClick={handleNew} className="btn-primary">
              <Plus className="w-4 h-4" /> 新建第一个{config.label}
            </button>
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={drag.onDragStart(item.id)}
            onDragOver={drag.onDragOver(item.id)}
            onDragLeave={drag.onDragLeave}
            onDrop={drag.onDrop(item.id)}
            onDragEnd={drag.onDragEnd}
            className={`surface p-5 flex items-center gap-3 transition-all ${
              drag.draggingId === item.id ? "opacity-40" : ""
            } ${
              drag.overId === item.id && drag.draggingId !== item.id ? "border-t-2 border-t-[var(--primary)]" : ""
            }`}
          >
            <div className="cursor-grab active:cursor-grabbing text-[var(--fg-4)] hover:text-[var(--fg)]">
              <GripVertical className="w-4 h-4" />
            </div>

            {item.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.coverImage} alt="" className="w-14 h-14 rounded-lg object-cover border border-[var(--border)]" />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-[var(--bg-2)] border border-[var(--border)] flex items-center justify-center text-mono text-xs text-[var(--fg-4)]">
                {items.indexOf(item) + 1}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold truncate">{item.title}</h3>
                <span className={`tag ${item.status === "draft" ? "tag-neutral" : ""}`}>
                  {item.status === "published" ? "已发布" : "草稿"}
                </span>
              </div>
              {config.renderExtra && <div className="text-xs text-[var(--fg-3)] truncate">{config.renderExtra(item)}</div>}
            </div>

            <div className="flex gap-1.5 items-center">
              <button
                onClick={() => toggleStatus(item)}
                className={`px-3 h-9 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  item.status === "published"
                    ? "bg-[var(--bg-2)] text-[var(--fg-3)] hover:text-[var(--fg)] border border-[var(--border)]"
                    : "bg-[var(--primary)] text-[var(--bg)] hover:opacity-90"
                }`}
              >
                {item.status === "published" ? "撤回草稿" : "立即发布"}
              </button>
              <Link href={getPreviewUrl(item)} target="_blank" className="btn-icon" title="预览">
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button onClick={() => setEditing(item)} className="btn-icon" title="编辑">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(item.id)} className="btn-icon btn-danger" title="删除">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <>
          <div className="panel-overlay" onClick={() => setEditing(null)} />
          <div className="slide-panel">
            <div className="sticky top-0 bg-[var(--bg-1)] z-10 px-8 py-5 flex items-center justify-between border-b border-[var(--border)]">
              <div>
                <div className="text-mono text-xs text-[var(--fg-3)] mb-1 tracking-wider">
                  {items.find((x) => x.id === editing.id) ? `EDIT ${config.label.toUpperCase()}` : `NEW ${config.label.toUpperCase()}`}
                </div>
                <h2 className="text-xl font-bold">{editing.title || `新${config.label}`}</h2>
              </div>
              <button onClick={() => setEditing(null)} className="btn-icon">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 space-y-5">
              {config.renderForm({
                item: editing,
                onChange: setEditing,
              })}
            </div>

            <div className="sticky bottom-0 bg-[var(--bg-1)] px-8 py-4 flex items-center justify-end gap-3 border-t border-[var(--border)]">
              <button onClick={() => setEditing(null)} className="btn-secondary">取消</button>
              <button onClick={handleSave} className="btn-primary">
                保存
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
