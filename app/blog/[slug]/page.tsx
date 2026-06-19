import { posts as defaultPosts } from "@/lib/data";
import BlogPostClient from "./client";

export function generateStaticParams() {
  return defaultPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
