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

export type LabelTone = "acid" | "violet" | "yellow" | "blue";
export type BackgroundIntensity = "low" | "medium" | "high";
export type LabelStyle = "restrained" | "punk";

export interface SiteSettings {
  hero: {
    eyebrowLabels: { text: string; tone: LabelTone }[];
    titleLine1: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  heroBoard: {
    eyebrow: string;
    title: string;
    rows: { label: string; value: string }[];
    footer: string;
  };
  homeModules: {
    proofSignals: boolean;
    operatingModel: boolean;
    dossiers: boolean;
    fieldNotes: boolean;
    bottomCta: boolean;
  };
  visual: {
    backgroundIntensity: BackgroundIntensity;
    scanLines: boolean;
    labelStyle: LabelStyle;
  };
}

export interface SiteData {
  profile: Profile;
  projects: Project[];
  posts: Post[];
  timeline: TimelineItem[];
  skills: Skill[];
  contacts: ContactSubmission[];
  siteSettings: SiteSettings;
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

export const defaultSiteSettings: SiteSettings = {
  hero: {
    eyebrowLabels: [
      { text: "AI COMMERCIALIZATION", tone: "acid" },
      { text: "BOARDROOM TRANSLATOR", tone: "violet" },
      { text: "ROI-FIRST", tone: "yellow" },
    ],
    titleLine1: "AI 销售不是卖工具。",
    titleHighlight: "是翻译确定性。",
    description: "",
    primaryCta: "预约 AI 商业化诊断",
    secondaryCta: "查看大客户战绩",
  },
  heroBoard: {
    eyebrow: "LIVE SIGNALS",
    title: "Deal Intelligence Board",
    rows: [
      { label: "Stage", value: "POC → SCALE" },
      { label: "Buyer", value: "CEO / CFO / CIO" },
      { label: "Value Map", value: "READY" },
      { label: "ARR Impact", value: "¥800M+" },
      { label: "Industry", value: "BANK / GOV / MFG / RETAIL" },
      { label: "Status", value: "AVAILABLE FOR Q3 2026" },
    ],
    footer: "ROI VERIFIED / COMMERCIALIZATION ONLINE",
  },
  homeModules: {
    proofSignals: true,
    operatingModel: true,
    dossiers: true,
    fieldNotes: true,
    bottomCta: true,
  },
  visual: {
    backgroundIntensity: "medium",
    scanLines: true,
    labelStyle: "punk",
  },
};

const defaultData: SiteData = {
  profile: defaultProfile,
  projects: defaultProjects,
  posts: defaultPosts,
  timeline: defaultTimeline,
  skills: defaultSkills,
  contacts: [],
  siteSettings: defaultSiteSettings,
};

function withSiteDataDefaults(data: Partial<SiteData>): SiteData {
  return {
    ...defaultData,
    ...data,
    profile: {
      ...defaultProfile,
      ...(data.profile || {}),
    },
    contacts: data.contacts || [],
    siteSettings: {
      ...defaultSiteSettings,
      ...(data.siteSettings || {}),
      hero: {
        ...defaultSiteSettings.hero,
        ...(data.siteSettings?.hero || {}),
        eyebrowLabels: data.siteSettings?.hero?.eyebrowLabels || defaultSiteSettings.hero.eyebrowLabels,
      },
      heroBoard: {
        ...defaultSiteSettings.heroBoard,
        ...(data.siteSettings?.heroBoard || {}),
        rows: data.siteSettings?.heroBoard?.rows || defaultSiteSettings.heroBoard.rows,
      },
      homeModules: {
        ...defaultSiteSettings.homeModules,
        ...(data.siteSettings?.homeModules || {}),
      },
      visual: {
        ...defaultSiteSettings.visual,
        ...(data.siteSettings?.visual || {}),
      },
    },
  };
}

export function getSiteData(): SiteData {
  if (typeof window === "undefined") return defaultData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<SiteData>;
      return withSiteDataDefaults(parsed);
    }
  } catch (e) {
    console.error("Failed to load site data", e);
  }
  return withSiteDataDefaults(defaultData);
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
