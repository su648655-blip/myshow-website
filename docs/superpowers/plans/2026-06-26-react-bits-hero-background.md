# React Bits Hero Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lightweight React Bits-style animated hero background to the homepage without adding heavy dependencies or breaking static export.

**Architecture:** Create a focused `HeroSignalBackground` component that renders decorative, non-interactive background layers. Keep motion and visual rules in `app/globals.css`, then replace the current two inline aurora divs in `app/page.tsx` with the component.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, CSS animations.

---

## File Structure Map

- Create `components/brand/HeroSignalBackground.tsx`: decorative Hero-only background layers.
- Modify `app/page.tsx`: use the new component in the Hero section.
- Modify `app/globals.css`: add aurora/signal grid/beam animation classes and reduced-motion rules.

---

### Task 1: Add Hero Signal Background Component

**Files:**
- Create: `components/brand/HeroSignalBackground.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create component**

Create `components/brand/HeroSignalBackground.tsx`:

```tsx
export default function HeroSignalBackground() {
  return (
    <div className="hero-signal-bg" aria-hidden="true">
      <div className="hero-signal-grid" />
      <div className="hero-orb hero-orb-acid" />
      <div className="hero-orb hero-orb-violet" />
      <div className="hero-orb hero-orb-blue" />
      <div className="hero-scan hero-scan-one" />
      <div className="hero-scan hero-scan-two" />
    </div>
  );
}
```

- [ ] **Step 2: Add CSS**

Append to `app/globals.css`:

```css
.hero-signal-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero-signal-grid {
  position: absolute;
  inset: -20%;
  background-image:
    linear-gradient(rgba(182, 255, 0, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px);
  background-size: 44px 44px;
  transform: perspective(900px) rotateX(58deg) translateY(-12%);
  transform-origin: top center;
  opacity: 0.46;
  mask-image: radial-gradient(circle at 50% 28%, black, transparent 72%);
}

.hero-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  mix-blend-mode: screen;
  opacity: 0.72;
  animation: hero-orb-drift 15s var(--ease-signal) infinite alternate;
}

.hero-orb-acid {
  width: 34rem;
  height: 34rem;
  left: -12rem;
  bottom: 6rem;
  background: radial-gradient(circle, rgba(182, 255, 0, 0.34), transparent 68%);
}

.hero-orb-violet {
  width: 44rem;
  height: 44rem;
  right: -16rem;
  top: -14rem;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.46), transparent 70%);
  animation-duration: 19s;
}

.hero-orb-blue {
  width: 26rem;
  height: 26rem;
  right: 18%;
  bottom: -8rem;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.22), transparent 70%);
  animation-duration: 17s;
}

.hero-scan {
  position: absolute;
  left: -20%;
  right: -20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(182, 255, 0, 0.72), rgba(56, 189, 248, 0.38), transparent);
  opacity: 0.58;
  transform: rotate(-8deg);
  animation: hero-scan-sweep 5.5s var(--ease-signal) infinite;
}

.hero-scan-one { top: 28%; }
.hero-scan-two { top: 68%; animation-delay: 2.2s; opacity: 0.34; }

@keyframes hero-orb-drift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(2.5rem, -1.5rem, 0) scale(1.08); }
}

@keyframes hero-scan-sweep {
  0% { transform: translateY(-12rem) rotate(-8deg); opacity: 0; }
  22% { opacity: 0.62; }
  100% { transform: translateY(22rem) rotate(-8deg); opacity: 0; }
}

@media (max-width: 768px) {
  .hero-signal-grid { opacity: 0.28; background-size: 36px 36px; }
  .hero-orb { filter: blur(58px); opacity: 0.52; }
  .hero-scan { opacity: 0.24; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-orb,
  .hero-scan {
    animation: none !important;
  }
}
```

- [ ] **Step 3: Wire into homepage**

In `app/page.tsx` add import:

```tsx
import HeroSignalBackground from "@/components/brand/HeroSignalBackground";
```

Inside the Hero `<section>`, replace the two inline `aurora` divs with:

```tsx
<HeroSignalBackground />
```

- [ ] **Step 4: Verify**

Run:

```bash
npx tsc --noEmit
npm test
npm run build
```

Expected: all pass.

---

## Self-Review

### Spec coverage

Covered: lightweight React Bits-style Hero background, no new dependencies, CSS/Framer-compatible style, reduced motion, mobile simplification, static export safe.

### Placeholder scan

No placeholders.

### Type consistency

No props required; component is import-only and can be safely rendered in the existing client page.
