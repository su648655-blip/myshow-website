# AI Commercial Punk Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the full public NeonMe site into an AI Commercial Punk personal brand system while preserving existing data, admin access, static export, and core behavior.

**Architecture:** Keep the existing Next.js App Router structure and data model. Add a small set of focused visual primitives under `components/brand/`, replace page layouts with those primitives, and centralize visual tokens/effects in `app/globals.css` so the redesign remains consistent without introducing heavy dependencies.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, lucide-react, Jest, static export/GitHub Pages.

---

## File Structure Map

- Modify `app/globals.css`: new AI Commercial Punk tokens, button/card/tag styles, signal background, scanning effects, reduced-motion rules, article typography.
- Create `components/brand/SignalStrip.tsx`: reusable moving/static signal ticker for hero dividers and footer.
- Create `components/brand/SignalPanel.tsx`: key/value terminal-like panel used in hero, about profile, impact console, footer.
- Create `components/brand/PunkLabel.tsx`: controlled acid/violet/yellow label treatment.
- Create `components/brand/DossierCard.tsx`: project dossier card for homepage and portfolio.
- Create `components/brand/NoteRow.tsx`: blog/field-note row for homepage and blog index.
- Create `components/brand/CommercialCTA.tsx`: reusable conversion strip with optional contact button/link.
- Modify `components/Navbar.tsx`: convert to Signal Bar and command-panel mobile nav; keep admin access but weaken it.
- Modify `components/Footer.tsx`: convert to End Terminal.
- Modify `components/ContactModal.tsx`: retheme modal copy and remove emoji success state.
- Modify `app/page.tsx`: rebuild homepage sections around opening terminal, signals, operating model, dossiers, notes, CTA.
- Modify `app/portfolio/page.tsx`: rebuild as Deal Dossier Archive with impact console, signal filters, dossier cards.
- Modify `app/about/page.tsx`: rebuild as Operator Profile with profile panel, principles, career signals, capability matrix, contact protocol.
- Modify `app/blog/page.tsx`: rebuild as Field Notes with featured thesis, topic filters, note index.
- Modify `app/blog/[slug]/client.tsx`: rebuild article detail styling with Field Note header, insight/quote styles, bottom CTA.

---

### Task 1: Establish AI Commercial Punk CSS System

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace visual tokens and add signal primitives**

Edit `app/globals.css` so `:root` exposes the new palette while preserving existing variable names used by current code:

```css
:root {
  --bg: #07030f;
  --bg-1: #11081f;
  --bg-2: #1c1031;
  --bg-3: #2a1746;

  --fg: #f7f3ff;
  --fg-2: #d8cdee;
  --fg-3: #a99bbf;
  --fg-4: #6f617f;

  --acid: #b6ff00;
  --acid-soft: rgba(182, 255, 0, 0.14);
  --violet: #7c3aed;
  --violet-deep: #28104f;
  --blue: #38bdf8;
  --yellow: #ffe45e;
  --pink: #ff3d81;

  --primary: var(--acid);
  --primary-bright: #d7ff5f;
  --primary-glow: rgba(182, 255, 0, 0.42);

  --warning: var(--yellow);
  --danger: #ff4d6d;
  --success: var(--acid);

  --border: rgba(216, 205, 238, 0.12);
  --border-strong: rgba(216, 205, 238, 0.22);
  --border-glow: rgba(182, 255, 0, 0.54);
  --border-acid: rgba(182, 255, 0, 0.7);

  --font-sans: "PingFang SC", "Microsoft YaHei", "Inter", "Helvetica Neue", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "JetBrains Mono", "SF Mono", Menlo, monospace;
  --ease-signal: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Keep existing `.theme-light`, `.theme-gold`, and `.theme-youth` only if they do not override the new default in normal usage.

- [ ] **Step 2: Add reusable CSS classes**

Add these classes after the existing button/surface definitions, or replace the old definitions with equivalent new ones:

```css
.signal-bg {
  background:
    radial-gradient(circle at 18% 12%, rgba(124, 58, 237, 0.34), transparent 34rem),
    radial-gradient(circle at 82% 6%, rgba(182, 255, 0, 0.12), transparent 28rem),
    linear-gradient(135deg, #07030f 0%, #11081f 48%, #06020b 100%);
}

.signal-bg::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(182, 255, 0, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.06) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, black, transparent 80%);
  z-index: -1;
}

.signal-panel {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-strong);
  background: linear-gradient(145deg, rgba(17, 8, 31, 0.94), rgba(28, 16, 49, 0.72));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.signal-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(182, 255, 0, 0.08), transparent);
  transform: translateY(-100%);
  animation: signal-scan 4.8s var(--ease-signal) infinite;
}

.dossier-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  background: rgba(17, 8, 31, 0.82);
  transition: transform 220ms var(--ease-signal), border-color 220ms var(--ease-signal), box-shadow 220ms var(--ease-signal);
}

.dossier-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-acid);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(182, 255, 0, 0.08);
}

.punk-label {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-acid);
  background: rgba(182, 255, 0, 0.1);
  color: var(--primary-bright);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.35rem 0.55rem;
}

.note-row {
  border-top: 1px solid var(--border);
  transition: background 180ms var(--ease-signal), border-color 180ms var(--ease-signal);
}

.note-row:hover {
  background: rgba(182, 255, 0, 0.045);
  border-color: rgba(182, 255, 0, 0.22);
}

@keyframes signal-scan {
  0% { transform: translateY(-110%); opacity: 0; }
  18% { opacity: 1; }
  48% { opacity: 0.9; }
  100% { transform: translateY(110%); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }

  .signal-panel::after {
    display: none;
  }
}
```

- [ ] **Step 3: Verify CSS compiles**

Run: `npx tsc --noEmit`

Expected: no TypeScript errors. CSS itself is validated later by `npm run build`.

- [ ] **Step 4: Commit**

Run:

```bash
git add app/globals.css
git commit -m "style: establish ai commercial punk tokens"
```

---

### Task 2: Add Brand Visual Components

**Files:**
- Create: `components/brand/SignalStrip.tsx`
- Create: `components/brand/SignalPanel.tsx`
- Create: `components/brand/PunkLabel.tsx`
- Create: `components/brand/DossierCard.tsx`
- Create: `components/brand/NoteRow.tsx`
- Create: `components/brand/CommercialCTA.tsx`

- [ ] **Step 1: Create `components/brand/SignalStrip.tsx`**

```tsx
export default function SignalStrip({ items }: { items: string[] }) {
  const content = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden border-y border-[var(--border)] bg-[rgba(182,255,0,0.04)] py-3 text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">
      <div className="flex min-w-full animate-[ticker_28s_linear_infinite] gap-8 whitespace-nowrap px-4">
        {content.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[var(--fg-4)]">/</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
    </div>
  );
}
```

Add this keyframe to `app/globals.css` if missing:

```css
@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

- [ ] **Step 2: Create `components/brand/SignalPanel.tsx`**

```tsx
import type { ReactNode } from "react";

interface SignalPanelProps {
  eyebrow: string;
  title?: string;
  rows: { label: string; value: ReactNode }[];
  footer?: ReactNode;
  className?: string;
}

export default function SignalPanel({ eyebrow, title, rows, footer, className = "" }: SignalPanelProps) {
  return (
    <div className={`signal-panel rounded-2xl p-5 md:p-6 ${className}`}>
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">{eyebrow}</span>
          <span className="h-2 w-2 rounded-full bg-[var(--acid)] shadow-[0_0_18px_var(--primary-glow)]" />
        </div>
        {title && <h3 className="mb-5 text-xl font-black tracking-tight text-[var(--fg)] md:text-2xl">{title}</h3>}
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[minmax(88px,0.45fr)_1fr] gap-4 border-t border-[var(--border)] pt-3">
              <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">{row.label}</div>
              <div className="text-sm font-semibold text-[var(--fg-2)]">{row.value}</div>
            </div>
          ))}
        </div>
        {footer && <div className="mt-5 border-t border-[var(--border)] pt-4">{footer}</div>}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/brand/PunkLabel.tsx`**

```tsx
interface PunkLabelProps {
  children: React.ReactNode;
  tone?: "acid" | "violet" | "yellow";
  className?: string;
}

const toneClass = {
  acid: "border-[var(--border-acid)] bg-[rgba(182,255,0,0.1)] text-[var(--primary-bright)]",
  violet: "border-[rgba(124,58,237,0.55)] bg-[rgba(124,58,237,0.16)] text-[#cbb6ff]",
  yellow: "border-[rgba(255,228,94,0.6)] bg-[rgba(255,228,94,0.12)] text-[var(--yellow)]",
};

export default function PunkLabel({ children, tone = "acid", className = "" }: PunkLabelProps) {
  return <span className={`punk-label ${toneClass[tone]} ${className}`}>{children}</span>;
}
```

- [ ] **Step 4: Create `components/brand/DossierCard.tsx`**

```tsx
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";
import PunkLabel from "./PunkLabel";

interface DossierCardProps {
  project: Project;
  index: number;
  compact?: boolean;
}

function statusFromProject(project: Project) {
  if (project.tags.some((tag) => tag.includes("战略") || tag.includes("政企"))) return "STRATEGY";
  if (project.timeline.includes("至今")) return "LIVE";
  return "SCALED";
}

export default function DossierCard({ project, index, compact = false }: DossierCardProps) {
  return (
    <article id={project.slug} className="dossier-card group h-full rounded-2xl p-5 md:p-7">
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fg-4)]">DOSSIER {String(index + 1).padStart(3, "0")}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.slice(0, compact ? 2 : 3).map((tag, tagIndex) => (
                <PunkLabel key={tag} tone={tagIndex === 0 ? "acid" : "violet"}>{tag}</PunkLabel>
              ))}
            </div>
          </div>
          <PunkLabel tone="yellow">{statusFromProject(project)}</PunkLabel>
        </div>

        <h3 className="mb-4 text-2xl font-black leading-tight tracking-tight text-[var(--fg)] md:text-3xl">{project.title}</h3>
        <p className="mb-6 text-sm leading-7 text-[var(--fg-2)] md:text-base">{project.summary}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3 border-y border-[var(--border)] py-5 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-xl font-black text-[var(--primary-bright)] md:text-2xl">{metric.value}</div>
                <div className="mt-1 text-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-4)]">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto grid gap-3 text-sm text-[var(--fg-3)] md:grid-cols-2">
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">Role</div>
            <div className="mt-1 font-semibold text-[var(--fg-2)]">{project.role}</div>
          </div>
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">Timeline</div>
            <div className="mt-1 font-semibold text-[var(--fg-2)]">{project.timeline}</div>
          </div>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-mono text-xs uppercase tracking-[0.18em] text-[var(--primary-bright)] opacity-80 transition-opacity group-hover:opacity-100">
          Open dossier <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Create `components/brand/NoteRow.tsx`**

```tsx
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
        <div className="text-mono text-[10px] uppercase tracking-[0.22em] text-[var(--fg-4)] md:col-span-2">NOTE {String(index + 1).padStart(3, "0")}</div>
        <div className="md:col-span-7">
          <h3 className="text-2xl font-black leading-tight tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--primary-bright)] md:text-3xl">{post.title}</h3>
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
```

- [ ] **Step 6: Create `components/brand/CommercialCTA.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CommercialCTAProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
}

export default function CommercialCTA({
  title = "你的 AI 项目卡在 Demo、POC 或预算桌前？",
  body = "我可以帮你梳理客户价值地图、POC 成功指标、CFO 可理解的 ROI 叙事和大客户推进路径。",
  primaryLabel = "REQUEST BRIEFING",
  primaryHref,
  secondaryLabel = "VIEW DOSSIERS",
  secondaryHref = "/portfolio",
  onPrimaryClick,
}: CommercialCTAProps) {
  const primaryClass = "btn-primary justify-center";

  return (
    <section className="signal-panel rounded-3xl p-6 md:p-10">
      <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-4 text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">NEXT COMMAND</div>
          <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--fg-2)]">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          {onPrimaryClick ? (
            <button type="button" onClick={onPrimaryClick} className={primaryClass}>{primaryLabel}<ArrowRight className="h-4 w-4" /></button>
          ) : primaryHref ? (
            <Link href={primaryHref} className={primaryClass}>{primaryLabel}<ArrowRight className="h-4 w-4" /></Link>
          ) : null}
          <Link href={secondaryHref} className="btn-secondary justify-center">{secondaryLabel}</Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Verify component types**

Run: `npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add components/brand app/globals.css
git commit -m "feat: add ai commercial punk brand components"
```

---

### Task 3: Convert Navigation and Footer

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace nav labels and layout**

Modify `components/Navbar.tsx` so `navItems` becomes:

```tsx
const navItems = [
  { href: "/", label: "SIGNAL", cn: "首页", num: "00" },
  { href: "/portfolio", label: "DOSSIERS", cn: "案例", num: "01" },
  { href: "/about", label: "OPERATOR", cn: "关于", num: "02" },
  { href: "/blog", label: "NOTES", cn: "洞察", num: "03" },
];
```

Update desktop logo to `DENG.OS`, nav links to show `num label`, and right side to show status + contact/admin:

```tsx
<Link href="/" className="flex items-center gap-2 group">
  <span className="h-2 w-2 rounded-full bg-[var(--acid)] shadow-[0_0_18px_var(--primary-glow)]" />
  <span className="text-mono text-sm font-black tracking-[0.18em] text-[var(--fg)]">DENG.OS</span>
</Link>
```

For each nav link use:

```tsx
<span className="text-[var(--fg-4)]">{item.num}</span>
<span>{item.label}</span>
```

Keep the admin link but render it as small text `ADMIN` instead of the prominent settings icon on desktop.

- [ ] **Step 2: Convert mobile menu to command panel**

In the mobile `AnimatePresence` panel, add a header `NAV COMMANDS` and render links as:

```tsx
<span className="text-[var(--primary-bright)]">&gt;</span>
<span>{item.label}</span>
<span className="ml-auto text-xs text-[var(--fg-4)]">{item.cn}</span>
```

Keep `ADMIN ACCESS` at the bottom with muted styling.

- [ ] **Step 3: Replace Footer with End Terminal**

Modify `components/Footer.tsx` to render:

- `END OF SIGNAL`
- CTA sentence about Demo/POC/budget
- `CHANNELS` rows for wechat, phone, email
- `REQUEST BRIEFING` mailto or contact link
- muted `ADMIN` link

Use existing `profile.wechat`, `profile.phone`, `profile.email`; do not rely on `socialLinks` for the primary contact rows.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx
git commit -m "feat: convert navigation and footer to signal system"
```

---

### Task 4: Rebuild Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace hero with opening terminal**

Use imports:

```tsx
import SignalStrip from "@/components/brand/SignalStrip";
import SignalPanel from "@/components/brand/SignalPanel";
import DossierCard from "@/components/brand/DossierCard";
import NoteRow from "@/components/brand/NoteRow";
import CommercialCTA from "@/components/brand/CommercialCTA";
import PunkLabel from "@/components/brand/PunkLabel";
```

Render the top-level container with `signal-bg` and a hero that includes:

- Strong viewpoint headline: `AI 销售不是卖工具。是把技术不确定性翻译成业务确定性。`
- Identity line from `profile.name` and `profile.title`
- CTA buttons
- `SignalPanel` rows for stage, buyer, value map, ARR impact, industry, status.

- [ ] **Step 2: Add signal proof section**

Create an inline array:

```tsx
const proofSignals = [
  { value: "¥800M+", label: "ARR DRIVEN", body: "从 POC 到规模化采购，推动亿元级 AI 项目商业闭环。" },
  { value: "50+", label: "ENTERPRISE DEALS", body: "覆盖金融、政企、制造、零售等复杂采购场景。" },
  { value: "12", label: "INDUSTRIES", body: "把行业痛点转译成可采购、可验证的 AI 价值。" },
  { value: "8Y", label: "AI COMMERCIALIZATION", body: "长期处在技术、预算和组织共识的交界面。" },
];
```

Render as a responsive grid of signal panels/cards below `SignalStrip`.

- [ ] **Step 3: Add operating model section**

Create steps Discovery, Value Map, POC Design, CFO Buy-In, Scale and render as vertical timeline/list with large numbers.

- [ ] **Step 4: Add dossier and field notes previews**

Use `DossierCard` for `publishedProjects.slice(0, 4)` and `NoteRow` for `publishedPosts.slice(0, 2)`.

- [ ] **Step 5: Add bottom CTA**

Use `CommercialCTA` with `onPrimaryClick={() => setContactOpen(true)}`.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rebuild homepage as ai deal intelligence opening"
```

---

### Task 5: Rebuild Portfolio Page

**Files:**
- Modify: `app/portfolio/page.tsx`

- [ ] **Step 1: Update imports**

Use `DossierCard`, `SignalPanel`, `PunkLabel`, and `CommercialCTA`.

- [ ] **Step 2: Replace hero copy**

Hero title:

```text
AI Deal Dossiers
不是案例展示，是复杂企业 AI 项目的成交样本。
```

Hero body:

```text
金融、制造、零售、政务等场景中，从业务痛点识别、POC 设计、ROI 证明到规模化采购的关键路径。
```

- [ ] **Step 3: Add impact console**

Use `SignalPanel` with rows for total ARR, enterprise deals, industries, core buyers.

- [ ] **Step 4: Convert filters to signal filters**

Replace the filter row label with `FILTER BY SIGNAL`. Use acid active state and dark bordered inactive state. Keep existing state logic.

- [ ] **Step 5: Render `DossierCard` grid/list**

Use:

```tsx
<div className="grid gap-5 lg:grid-cols-2">
  {filtered.map((project, index) => <DossierCard key={project.id} project={project} index={index} />)}
</div>
```

- [ ] **Step 6: Add bottom CTA**

Use `CommercialCTA` with `primaryHref="mailto:..."` or link to about/contact section.

- [ ] **Step 7: Verify and commit**

Run `npx tsc --noEmit`, then:

```bash
git add app/portfolio/page.tsx
git commit -m "feat: rebuild portfolio as deal dossier archive"
```

---

### Task 6: Rebuild About Page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Update imports**

Use `SignalPanel`, `PunkLabel`, `CommercialCTA`.

- [ ] **Step 2: Replace hero with Operator Profile**

Hero title:

```text
我负责把 AI 从 Demo 推向预算桌。
```

Render tags: `BOARDROOM TRANSLATOR`, `ROI-FIRST SELLING`, `AI DEAL OPERATOR`.

- [ ] **Step 3: Add Profile ID panel**

Use `SignalPanel` rows for profile id, role, base, focus, available.

- [ ] **Step 4: Add Origin Story**

Use current bio plus two paragraphs explaining AI sales is about certainty, ROI, and consensus. Keep existing facts.

- [ ] **Step 5: Add Operating Principles**

Render four principle cards:

1. Sell Outcomes, Not Features
2. Make ROI Boardroom-Ready
3. Design POC as Business Proof
4. Build Internal Consensus

- [ ] **Step 6: Convert timeline to Career Signals**

Reuse `timeline.map`, but style as signal rows with year left, acid node, content right.

- [ ] **Step 7: Convert skills to Capability Matrix**

Keep grouped skills but title the section `Capability Matrix`. Render categories as cards with skill rows and progress bars.

- [ ] **Step 8: Add Contact Protocol CTA**

Use `CommercialCTA` and preserve copy buttons for wechat/phone if existing UI remains.

- [ ] **Step 9: Verify and commit**

Run `npx tsc --noEmit`, then:

```bash
git add app/about/page.tsx
git commit -m "feat: rebuild about page as operator profile"
```

---

### Task 7: Rebuild Blog Index

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Add tag filtering**

Use `useMemo` and `useState` like portfolio page to compute all tags and selected tag.

- [ ] **Step 2: Replace hero copy**

Hero title:

```text
Field Notes
这里不记录 AI 新闻。只记录 AI 如何被企业真正买单。
```

- [ ] **Step 3: Add Featured Thesis**

Render `publishedPosts[0]` as a large featured card with label `FEATURED THESIS`, its title, excerpt, read time, and link.

- [ ] **Step 4: Add Topic Signals filter**

Render `TOPIC SIGNALS` with all tags.

- [ ] **Step 5: Render Note index**

Use `NoteRow` for filtered posts.

- [ ] **Step 6: Add bottom CTA**

Use `CommercialCTA` with blog-specific title.

- [ ] **Step 7: Verify and commit**

Run `npx tsc --noEmit`, then:

```bash
git add app/blog/page.tsx
git commit -m "feat: rebuild blog index as field notes"
```

---

### Task 8: Rebuild Blog Detail and Contact Modal

**Files:**
- Modify: `app/blog/[slug]/client.tsx`
- Modify: `components/ContactModal.tsx`

- [ ] **Step 1: Retheme markdown renderer**

In `renderMarkdown`, update classes:

- headings use stronger tracking and acid labels
- blockquote uses `border-l-4 border-[var(--acid)] bg-[rgba(182,255,0,0.06)]`
- paragraphs use `text-[17px] md:text-lg leading-8 text-[var(--fg-2)]`

- [ ] **Step 2: Replace article header**

Use Field Note header with label `FIELD NOTE`, date/read time, title, excerpt as Insight box.

- [ ] **Step 3: Add bottom CTA**

Add `CommercialCTA` after article content.

- [ ] **Step 4: Retheme ContactModal**

Change modal label to `REQUEST BRIEFING`, title to `预约 AI 商业化诊断`, placeholder to ask for Demo/POC/budget context, and replace `✅` success icon with an acid status dot.

- [ ] **Step 5: Verify and commit**

Run `npx tsc --noEmit`, then:

```bash
git add app/blog/[slug]/client.tsx components/ContactModal.tsx
git commit -m "feat: polish field note detail and briefing modal"
```

---

### Task 9: Full Verification and Fixes

**Files:**
- Modify only files needed to fix verification failures.

- [ ] **Step 1: Run unit tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`

Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: PASS and static export still succeeds.

- [ ] **Step 4: Smoke check routes**

If build passes, start dev server:

```bash
npm run dev
```

Open/check:

- `/`
- `/portfolio`
- `/about`
- `/blog`
- one `/blog/[slug]`
- `/admin`

Expected: each route renders, no obvious console/build errors, admin remains reachable.

- [ ] **Step 5: Responsive visual check**

Check 375px, 768px, and 1440px widths. Confirm no horizontal scroll, nav usable, CTA visible, text readable.

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "test: verify ai commercial punk redesign"
```

---

## Self-Review

### Spec coverage

Covered:

- AI Commercial Punk tokens and visual language: Tasks 1-2.
- Homepage opening terminal, proof, operating model, dossiers, notes, CTA: Task 4.
- Portfolio dossier archive and filters: Task 5.
- About operator profile, principles, timeline, matrix, contact: Task 6.
- Blog field notes and article detail: Tasks 7-8.
- Navigation, footer, admin access weak emphasis: Task 3.
- Contact modal retheme: Task 8.
- Testing and build verification: Task 9.

No gaps identified.

### Placeholder scan

No TBD/TODO/fill-in placeholders. Tasks include exact files, commands, and expected outcomes. Some layout code is intentionally described at component level because it is page composition rather than standalone algorithmic code; each task names concrete sections and source files.

### Type consistency

Shared component props are defined in Task 2 and referenced consistently in later tasks. Data types use existing `Project` and `Post` from `@/lib/data`.
