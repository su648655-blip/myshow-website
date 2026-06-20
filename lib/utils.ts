import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 获取静态资源完整路径（自动拼接 basePath） */
export function assetPath(path: string): string {
  // 已在 next.config.mjs 中配置 basePath: "/myshow-website"
  const basePath = "/myshow-website";
  if (!path) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
