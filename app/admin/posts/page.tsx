"use client";

import ImageUpload from "@/components/ImageUpload";
import AdminItemManager from "@/components/AdminItemManager";
import { useSiteData } from "@/components/DataProvider";
import { genId } from "@/lib/store";
import type { Post } from "@/lib/data";

export default function PostsAdminPage() {
  const { data } = useSiteData();

  return (
    <AdminItemManager<Post>
      config={{
        label: "文章",
        labelPlural: "文章管理",
        items: data.posts,
        dataKey: "posts",
        slugField: "slug",
        previewPath: "/blog/",
        renderExtra: (p) => `${p.publishedAt} · ${p.readTime} · ${p.tags.join(" / ")}`,
        createEmpty: () => ({
          id: genId(),
          title: "新文章",
          slug: "new-post-" + Date.now(),
          excerpt: "",
          content: "",
          coverImage: "",
          tags: [],
          publishedAt: new Date().toISOString().slice(0, 10),
          readTime: "5 分钟",
          status: "draft",
        }),
        renderForm: ({ item, onChange }) => (
          <>
            <div className="max-w-xs">
              <ImageUpload
                value={item.coverImage}
                onChange={(v) => onChange({ ...item, coverImage: v })}
                shape="rect"
                label="封面图（可选）"
                hint="建议 16:9 · < 2MB"
              />
            </div>

            <div>
              <label className="label">标题</label>
              <input className="input" value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} />
            </div>

            <div>
              <label className="label">摘要 <span className="label-hint">列表页显示，1-2 句话</span></label>
              <textarea className="input" rows={2} value={item.excerpt} onChange={(e) => onChange({ ...item, excerpt: e.target.value })} />
            </div>

            <div>
              <label className="label">正文内容 <span className="label-hint">支持 ## 标题、**加粗**、*斜体*、空行分段</span></label>
              <textarea
                className="input font-mono"
                rows={16}
                value={item.content || ""}
                onChange={(e) => onChange({ ...item, content: e.target.value })}
                placeholder={`## 引言\n\n这里写文章的开头...`}
                style={{ minHeight: 360, lineHeight: 1.7, fontSize: "0.9rem" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">发布日期</label>
                <input className="input" type="date" value={item.publishedAt} onChange={(e) => onChange({ ...item, publishedAt: e.target.value })} />
              </div>
              <div>
                <label className="label">阅读时长</label>
                <input className="input" value={item.readTime} onChange={(e) => onChange({ ...item, readTime: e.target.value })} placeholder="例：8 分钟" />
              </div>
            </div>

            <div>
              <label className="label">标签 <span className="label-hint">用逗号分隔</span></label>
              <input
                className="input"
                value={item.tags.join(", ")}
                onChange={(e) => onChange({ ...item, tags: e.target.value.split(/[,，]/).map((t) => t.trim()).filter(Boolean) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Slug</label>
                <input className="input" value={item.slug} onChange={(e) => onChange({ ...item, slug: e.target.value })} />
              </div>
              <div>
                <label className="label">状态</label>
                <select className="input" value={item.status} onChange={(e) => onChange({ ...item, status: e.target.value as Post["status"] })}>
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
