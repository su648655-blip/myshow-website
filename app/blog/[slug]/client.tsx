"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";
import CommercialCTA from "@/components/brand/CommercialCTA";
import PunkLabel from "@/components/brand/PunkLabel";

function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const blocks = text.split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (/^##\s+/.test(trimmed)) {
      return (
        <h2 key={i} className="mt-14 mb-5 text-3xl font-black tracking-tight text-[var(--fg)]">
          {renderInline(trimmed.replace(/^##\s+/, ""))}
        </h2>
      );
    }
    if (/^#\s+/.test(trimmed)) {
      return (
        <h1 key={i} className="mt-14 mb-5 text-4xl font-black tracking-tight text-[var(--fg)]">
          {renderInline(trimmed.replace(/^#\s+/, ""))}
        </h1>
      );
    }
    if (/^###\s+/.test(trimmed)) {
      return (
        <h3 key={i} className="mt-10 mb-4 text-2xl font-black tracking-tight text-[var(--fg)]">
          {renderInline(trimmed.replace(/^###\s+/, ""))}
        </h3>
      );
    }
    if (/^- /m.test(trimmed)) {
      const items = trimmed.split("\n").filter((l) => /^- /.test(l)).map((l) => l.replace(/^- /, ""));
      return (
        <ul key={i} className="my-6 list-disc space-y-3 pl-6 text-[17px] leading-8 text-[var(--fg-2)]">
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    }
    if (/^>\s+/.test(trimmed)) {
      return (
        <blockquote key={i} className="my-8 rounded-2xl border border-[rgba(182,255,0,0.22)] bg-[rgba(182,255,0,0.06)] p-5 text-lg leading-8 text-[var(--fg-2)]">
          <div className="mb-2 text-mono text-[10px] uppercase tracking-[0.22em] text-[var(--primary-bright)]">INSIGHT</div>
          {renderInline(trimmed.replace(/^>\s+/, ""))}
        </blockquote>
      );
    }
    return (
      <p key={i} className="my-5 text-[17px] leading-8 text-[var(--fg-2)] md:text-lg md:leading-9">
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    const seg = m[0];
    if (seg.startsWith("**")) parts.push(<strong key={key++} className="text-[var(--primary-bright)]">{seg.slice(2, -2)}</strong>);
    else if (seg.startsWith("`")) parts.push(<code key={key++} className="code-mark">{seg.slice(1, -1)}</code>);
    else parts.push(<em key={key++}>{seg.slice(1, -1)}</em>);
    lastIdx = m.index + seg.length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts.length ? parts : text;
}

export default function BlogPostClient() {
  const params = useParams<{ slug: string }>();
  const { data } = useSiteData();
  const post = data.posts.find((p) => p.slug === params.slug);

  if (!post || post.status !== "published") {
    return (
      <div className="signal-bg pt-32 pb-32 px-6 text-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">文章未找到</h1>
        <Link href="/blog" className="btn-secondary inline-flex">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Link>
      </div>
    );
  }

  return (
    <div className="relative signal-bg min-h-screen px-4 pt-24 pb-20 sm:px-10 md:pt-36 md:pb-32">
      <div className="aurora aurora-blue" style={{ width: 420, height: 420, top: "0%", left: "4%" }} />
      <div className="relative mx-auto max-w-4xl">
        <Link href="/blog" className="btn-ghost inline-flex mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" />
          返回 Field Notes
        </Link>
        <article>
          <div className="mb-6 flex flex-wrap gap-2">
            <PunkLabel>FIELD NOTE</PunkLabel>
            {post.tags.map((tag) => (
              <PunkLabel key={tag} tone="violet">{tag}</PunkLabel>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-6 text-mono text-xs text-[var(--fg-3)]">
            <span className="text-[var(--primary-bright)]">{post.publishedAt}</span>
            <span>/</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-display mb-8">{post.title}</h1>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt="" className="w-full rounded-2xl mb-12 border border-[var(--border)]" />
          )}
          <div className="signal-panel rounded-2xl p-5 mb-12">
            <div className="relative z-10">
              <div className="mb-2 text-mono text-[10px] uppercase tracking-[0.22em] text-[var(--primary-bright)]">CORE THESIS</div>
              <p className="text-xl text-[var(--fg-2)] leading-9 font-semibold">{post.excerpt}</p>
            </div>
          </div>
          {post.content?.trim() ? (
            <div className="prose-content mx-auto max-w-3xl text-base leading-relaxed">
              {renderMarkdown(post.content)}
            </div>
          ) : (
            <div className="surface p-12 text-center">
              <p className="mb-3 text-base text-[var(--fg-2)]">文章正文待补充</p>
              <p className="text-sm text-[var(--fg-4)]">
                你可以在{" "}
                <Link href="/admin/posts" className="text-[var(--primary-bright)] hover:underline">后台</Link>{" "}
                编辑这篇文章。
              </p>
            </div>
          )}
        </article>
        <div className="mt-16 md:mt-24">
          <CommercialCTA
            title="如果这篇手记击中了你的 AI 项目问题，我们可以继续聊。"
            body="把一个 AI 场景推进到预算桌，往往不是技术问题，而是价值地图、POC 指标和组织共识问题。"
            primaryHref={`mailto:${data.profile.email}`}
            primaryLabel="REQUEST BRIEFING"
          />
        </div>
      </div>
    </div>
  );
}
