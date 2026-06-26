import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/lib/data";

interface NoteRowProps {
  post: Post;
  index: number;
}

export default function NoteRow({ post, index }: NoteRowProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="note-row group grid gap-4 py-6 md:grid-cols-12 md:gap-8 md:py-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-4)] md:col-span-2">
          NOTE {String(index + 1).padStart(3, "0")}
        </div>
        <div className="md:col-span-7">
          <h3 className="text-2xl font-black leading-tight tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--primary-bright)] md:text-3xl">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--fg-2)] md:text-base">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-4)] md:col-span-3 md:flex-col md:items-end md:justify-start">
          <span>{post.publishedAt}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
          <ArrowRight className="h-5 w-5 text-[var(--primary-bright)] transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}
