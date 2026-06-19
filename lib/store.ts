import type { Project, Post, TimelineItem, Skill, Profile } from "./data";

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export interface SiteData {
  profile: Profile;
  projects: Project[];
  posts: Post[];
  timeline: TimelineItem[];
  skills: Skill[];
  contacts: ContactSubmission[];
}

const STORAGE_KEY = "neonme_site_data";
const AUTH_KEY = "neonme_auth";

const DEFAULT_PASSWORD = "deng19910228";
const PASSWORD_KEY = "neonme_password";

import {
  profile as defaultProfile,
  projects as defaultProjects,
  posts as defaultPosts,
  timeline as defaultTimeline,
  skills as defaultSkills,
} from "./data";

const defaultData: SiteData = {
  profile: defaultProfile,
  projects: defaultProjects,
  posts: defaultPosts,
  timeline: defaultTimeline,
  skills: defaultSkills,
  contacts: [],
};

export function getSiteData(): SiteData {
  if (typeof window === "undefined") return defaultData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // 兼容旧数据：用默认值补全缺失字段
      if (!parsed.contacts) parsed.contacts = [];
      if (parsed.profile) {
        parsed.profile = {
          ...defaultProfile,
          ...parsed.profile,
        };
      }
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load site data", e);
  }
  return defaultData;
}

export function saveSiteData(data: SiteData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("neonme:data-updated"));
}

export function resetSiteData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("neonme:data-updated"));
}

// ===== 认证 =====
export function getPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}

export function setPassword(newPassword: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PASSWORD_KEY, newPassword);
}

export function login(password: string): boolean {
  if (password === getPassword()) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_KEY, "true");
    }
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function logout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

// ===== ID 生成 =====
export function genId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
