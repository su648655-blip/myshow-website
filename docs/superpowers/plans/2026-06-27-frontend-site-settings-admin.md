# Frontend Site Settings Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/admin/site` so backend settings control the new frontend homepage content, hero labels, deal board rows, module visibility, and hero background visual intensity.

**Architecture:** Add a typed `SiteSettings` model with defaults in `lib/store.ts`, merge defaults for old localStorage data in `getSiteData()`, expose the settings in a new admin page, and update `app/page.tsx` plus `HeroSignalBackground` to consume those settings. Keep existing project data, profile data, cases, posts, and static export behavior unchanged.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Jest + ts-jest, localStorage persistence.

## Global Constraints

- New route: `/admin/site`.
- New data field: `siteSettings?: SiteSettings` on `SiteData`, with fallback defaults for old data.
- No backend database or cloud sync.
- No JSON editor.
- No drag-and-drop module sorting in this phase.
- Must preserve static export and basePath `/myshow-website`.
- Must pass `npx tsc --noEmit`, `npm test`, and `npm run build`.

---

## File Structure Map

- Modify `lib/store.ts`: add `SiteSettings`, `defaultSiteSettings`, and `withSiteDataDefaults()` merging logic.
- Modify `lib/__tests__/store.test.ts`: test default settings and legacy localStorage compatibility.
- Modify `components/DataProvider.tsx`: include `siteSettings` in its SSR initial default state.
- Modify `components/AdminLayoutClient.tsx`: add sidebar item for `/admin/site`.
- Create `app/admin/site/page.tsx`: form-driven admin UI for frontend settings.
- Modify `components/brand/HeroSignalBackground.tsx`: accept `intensity` and `scanLines` props.
- Modify `app/page.tsx`: read `data.siteSettings`, use configured Hero labels/title/description/CTA/board rows/module toggles/background settings.

---

### Task 1: Add SiteSettings Model and Persistence Compatibility

**Files:**
- Modify: `lib/store.ts`
- Modify: `lib/__tests__/store.test.ts`
- Modify: `components/DataProvider.tsx`

**Interfaces:**
- Produces: `SiteSettings`, `defaultSiteSettings`, `SiteData.siteSettings`.
- Consumes: existing `Profile`, `Project`, `Post`, `TimelineItem`, `Skill`, and localStorage storage key.

- [ ] **Step 1: Add failing tests for default and legacy compatibility**

Append to `lib/__tests__/store.test.ts` inside `describe("getSiteData / saveSiteData", ...)`:

```ts
  test("getSiteData includes default siteSettings when no localStorage exists", () => {
    const data = getSiteData();
    expect(data.siteSettings).toBeDefined();
    expect(data.siteSettings.hero.titleLine1).toBe("AI 销售不是卖工具。");
    expect(data.siteSettings.heroBoard.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Stage", value: "POC → SCALE" }),
      ])
    );
    expect(data.siteSettings.homeModules.dossiers).toBe(true);
  });

  test("getSiteData backfills siteSettings for legacy stored data", () => {
    const legacy = getSiteData();
    const { siteSettings, ...withoutSettings } = legacy;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withoutSettings));

    const result = getSiteData();

    expect(result.siteSettings).toBeDefined();
    expect(result.siteSettings.visual.backgroundIntensity).toBe("medium");
    expect(result.profile.name).toBe("邓学德");
  });
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --runInBand lib/__tests__/store.test.ts`

Expected: FAIL because `siteSettings` is not defined on `SiteData` yet.

- [ ] **Step 3: Implement types and defaults**

In `lib/store.ts`, add after `ContactSubmission`:

```ts
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
```

Add `siteSettings: SiteSettings;` to `SiteData`.

Add exported default:

```ts
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
```

Update `defaultData`:

```ts
const defaultData: SiteData = {
  profile: defaultProfile,
  projects: defaultProjects,
  posts: defaultPosts,
  timeline: defaultTimeline,
  skills: defaultSkills,
  contacts: [],
  siteSettings: defaultSiteSettings,
};
```

Add merge helper:

```ts
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
```

Update `getSiteData()` to return `withSiteDataDefaults(parsed)` and `withSiteDataDefaults(defaultData)`.

- [ ] **Step 4: Update DataProvider initial state**

In `components/DataProvider.tsx`, import `defaultSiteSettings`:

```ts
import { getSiteData, saveSiteData, defaultSiteSettings, type SiteData } from "@/lib/store";
```

Update `defaultData`:

```ts
const defaultData: SiteData = { profile, projects, posts, timeline, skills, contacts: [], siteSettings: defaultSiteSettings };
```

- [ ] **Step 5: Run tests and typecheck**

Run:

```bash
npm test -- --runInBand lib/__tests__/store.test.ts
npx tsc --noEmit
```

Expected: PASS.

---

### Task 2: Add `/admin/site` Admin Page and Sidebar Entry

**Files:**
- Modify: `components/AdminLayoutClient.tsx`
- Create: `app/admin/site/page.tsx`

**Interfaces:**
- Consumes: `SiteData.siteSettings`, `defaultSiteSettings`, `LabelTone`, `BackgroundIntensity`, `LabelStyle`.
- Produces: persisted `siteSettings` updates through `updateData()`.

- [ ] **Step 1: Add sidebar entry**

In `components/AdminLayoutClient.tsx`, import `SlidersHorizontal` from `lucide-react` and add this item after dashboard:

```ts
{ href: "/admin/site", label: "前台设置", icon: SlidersHorizontal },
```

- [ ] **Step 2: Create admin page**

Create `app/admin/site/page.tsx` with a client component that:

- reads `data.siteSettings || defaultSiteSettings`
- edits a local `settings` state
- saves with `updateData((d) => ({ ...d, siteSettings: settings }))`
- manages hero fields, labels, board rows, home module checkboxes, visual selects

Use exact field options:

```ts
const toneOptions = ["acid", "violet", "yellow", "blue"] as const;
const intensityOptions = ["low", "medium", "high"] as const;
const labelStyleOptions = ["restrained", "punk"] as const;
```

- [ ] **Step 3: Verify route types**

Run: `npx tsc --noEmit`

Expected: PASS.

---

### Task 3: Wire Site Settings into Homepage and Hero Background

**Files:**
- Modify: `components/brand/HeroSignalBackground.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SiteSettings.visual.backgroundIntensity`, `SiteSettings.visual.scanLines`, `SiteSettings.visual.labelStyle`, `SiteSettings.homeModules`, `SiteSettings.hero`, `SiteSettings.heroBoard`.
- Produces: homepage rendering controlled by admin site settings.

- [ ] **Step 1: Update HeroSignalBackground props**

Change `components/brand/HeroSignalBackground.tsx` to:

```tsx
import type { BackgroundIntensity } from "@/lib/store";

interface HeroSignalBackgroundProps {
  intensity?: BackgroundIntensity;
  scanLines?: boolean;
}

export default function HeroSignalBackground({ intensity = "medium", scanLines = true }: HeroSignalBackgroundProps) {
  return (
    <div className={`hero-signal-bg hero-signal-${intensity}`} aria-hidden="true">
      <div className="hero-signal-grid" />
      <div className="hero-orb hero-orb-acid" />
      <div className="hero-orb hero-orb-violet" />
      <div className="hero-orb hero-orb-blue" />
      {scanLines && (
        <>
          <div className="hero-scan hero-scan-one" />
          <div className="hero-scan hero-scan-two" />
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add intensity CSS**

Append to `app/globals.css`:

```css
.hero-signal-low .hero-signal-grid { opacity: 0.24; }
.hero-signal-low .hero-orb { opacity: 0.42; }
.hero-signal-low .hero-scan { opacity: 0.16; }

.hero-signal-high .hero-signal-grid { opacity: 0.62; }
.hero-signal-high .hero-orb { opacity: 0.84; }
.hero-signal-high .hero-scan { opacity: 0.72; }
```

- [ ] **Step 3: Use settings in `app/page.tsx`**

Import `defaultSiteSettings`:

```ts
import { defaultSiteSettings } from "@/lib/store";
```

Inside `Home()`:

```ts
const siteSettings = data.siteSettings || defaultSiteSettings;
const heroDescription = siteSettings.hero.description || `${profile.name} / ${profile.title}。${profile.bio}`;
```

Replace hardcoded hero labels with `siteSettings.hero.eyebrowLabels`.

Replace hero title lines, description, CTA labels, `HeroSignalBackground`, `SignalPanel`, and module sections with settings.

Use module gates:

```tsx
{siteSettings.homeModules.proofSignals && (...)}
{siteSettings.homeModules.operatingModel && (...)}
{siteSettings.homeModules.dossiers && (...)}
{siteSettings.homeModules.fieldNotes && (...)}
{siteSettings.homeModules.bottomCta && (...)}
```

- [ ] **Step 4: Verify all checks**

Run:

```bash
npx tsc --noEmit
npm test
npm run build
```

Expected: PASS.

---

## Self-Review

### Spec coverage

Covered: `/admin/site`, sidebar entry, typed siteSettings with compatibility, Hero fields, labels, Deal Board rows, module toggles, visual intensity, homepage rendering, and full verification.

### Placeholder scan

No placeholders.

### Type consistency

`SiteSettings`, `LabelTone`, `BackgroundIntensity`, and `LabelStyle` are defined in Task 1 and consumed consistently in Tasks 2 and 3.
