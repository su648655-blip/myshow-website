"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useSiteData } from "@/components/DataProvider";

// 极简 Markdown 渲染
function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const blocks = text.split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (/^##\s+/.test(trimmed)) {
      return (
        <h2 key={i} className="text-2xl font-bold mt-12 mb-5 text-[var(--fg)]">
          {renderInline(trimmed.replace(/^##\s+/, ""))}
        </h2>
      );
    }
    if (/^#\s+/.test(trimmed)) {
      return (
        <h1 key={i} className="text-3xl font-bold mt-12 mb-5 text-[var(--fg)]">
          {renderInline(trimmed.replace(/^#\s+/, ""))}
        </h1>
      );
    }
    if (/^###\s+/.test(trimmed)) {
      return (
        <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-[var(--fg)]">
          {renderInline(trimmed.replace(/^###\s+/, ""))}
        </h3>
      );
    }
    if (/^- /m.test(trimmed)) {
      const items = trimmed.split("\n").filter((l) => /^- /.test(l)).map((l) => l.replace(/^- /, ""));
      return (
        <ul key={i} className="list-disc pl-6 my-5 space-y-2 text-[var(--fg-2)]">
          {items.map((item, j) => (
            <li key={j} className="leading-relaxed">{renderInline(item)}</li>
          ))}
        </ul>
      );
    }
    if (/^>\s+/.test(trimmed)) {
      return (
        <blockquote key={i} className="border-l-2 border-[var(--primary)] pl-4 my-5 text-[var(--fg-2)] italic">
          {renderInline(trimmed.replace(/^>\s+/, ""))}
        </blockquote>
      );
    }
    return (
      <p key={i} className="my-4 leading-relaxed text-[var(--fg-2)]">
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
    if (seg.startsWith("**")) parts.push(<strong key={key++} className="text-[var(--fg)]">{seg.slice(2, -2)}</strong>);
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
      <div className="pt-32 pb-32 px-6 text-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">文章未找到</h1>
        <Link href="/blog" className="btn-secondary inline-flex">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Link>
      </div>
    );
  }

  return (
    <div className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-4 sm:px-10 min-h-screen">
      <div className="aurora aurora-cyan" style={{ width: 400, height: 400, top: "0%", left: "10%" }} />
      <div className="relative max-w-3xl mx-auto">
        <Link href="/blog" className="btn-ghost inline-flex mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" />
          返回洞察
        </Link>
        <article>
          <div className="flex items-center gap-4 mb-6 text-mono text-xs text-[var(--fg-3)]">
            <span className="text-[var(--primary-bright)]">{post.publishedAt}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-display mb-6">{post.title}</h1>
          <div className="flex items-center gap-2 mb-12 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt="" className="w-full rounded-2xl mb-12 border border-[var(--border)]" />
          )}
          <p className="text-xl text-[var(--fg-2)] leading-relaxed mb-12 font-medium border-l-2 border-[var(--primary)] pl-5">
            {post.excerpt}
          </p>
          {post.content?.trim() ? (
            <div className="prose-content text-base leading-relaxed">
              {renderMarkdown(post.content)}
            </div>
          ) : (
            <div className="surface p-12 text-center">
              <p className="mb-3 text-base text-[var(--fg-2)]">📝 文章正文待补充</p>
              <p className="text-sm text-[var(--fg-4)]">
                你可以在{" "}
                <Link href="/admin/posts" className="text-[var(--primary-bright)] hover:underline">后台</Link>{" "}
                编辑这篇文章。
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
