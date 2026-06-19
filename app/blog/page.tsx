"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteData } from "@/components/DataProvider";

export default function BlogPage() {
  const { data } = useSiteData();
  const { posts } = data;
  const publishedPosts = posts.filter((p) => p.status === "published");

  return (
    <div className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-4 sm:px-10 min-h-screen bg-grid">
      <div className="aurora aurora-cyan" style={{ width: 500, height: 500, top: "5%", right: "5%" }} />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 md:mb-20">
            <div className="text-mono text-xs text-[var(--fg-3)] mb-4">// INSIGHTS</div>
            <h1 className="text-mega mb-6">
              <span className="text-gradient">销售方法论</span>
              <br />
              与 AI 商业化思考
            </h1>
            <p className="text-base md:text-lg text-[var(--fg-2)] max-w-2xl leading-relaxed">
              复盘真实项目、提炼方法论。希望对正在做 AI 销售或 AI 战略的你有所启发。
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {publishedPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.06}>
              <Link href={`/blog/${post.slug}`}>
                <article className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-4 md:px-6 py-5 md:py-8 border-b border-[var(--border)] hover:bg-[var(--bg-1)] transition-colors -mx-4 md:-mx-6 items-start">
                  <div className="md:col-span-2 text-mono text-xs text-[var(--fg-4)]">
                    {post.publishedAt}
                  </div>

                  <div className="md:col-span-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-[var(--primary-bright)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-base text-[var(--fg-3)] leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <div className="flex md:justify-end items-center gap-1.5 text-mono text-xs text-[var(--fg-4)] mb-3">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <ArrowRight className="w-5 h-5 transition-all group-hover:translate-x-1 group-hover:text-[var(--primary-bright)] md:ml-auto text-[var(--fg-4)]" />
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
