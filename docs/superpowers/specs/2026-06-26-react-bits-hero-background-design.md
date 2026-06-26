# React Bits-Style Hero Background Design

日期：2026-06-26
项目：NeonMe / AI Commercial Punk redesign
状态：已确认

## Goal

为首页 Hero 添加 React Bits 风格的轻量动态背景，让第一屏更酷、更有打开方式，同时保持当前 AI Commercial Punk 设计语言、可读性、静态导出兼容和移动端性能。

## Selected Approach

采用 **Aurora + Signal Grid**。

这是一个受 React Bits animated background 启发的轻量方案，不直接引入 Three.js/WebGL，也不安装整套 React Bits 仓库。

## Visual Behavior

Hero 背景由三层组成：

1. **Aurora blobs**
   - 深紫、酸性绿、电蓝的柔和光斑。
   - 慢速漂移，作为情绪背景。
   - 不覆盖主标题区域，避免降低文字对比度。

2. **Signal grid**
   - 更细的商业情报网格，弱透明度。
   - 和当前 `signal-bg` 统一，但只在 Hero 内更有层次。

3. **Scan beam / signal sweep**
   - 一条或两条极淡的扫描光带缓慢穿过 Hero。
   - 表达“正在运行的商业情报终端”。

## Interaction and Accessibility

- 不依赖鼠标交互，不需要 hover 才能理解。
- `prefers-reduced-motion: reduce` 下关闭漂移动画和扫描线。
- 移动端降低透明度和复杂度。
- 背景必须永远在文字后方，不能影响 CTA 点击。
- 不引入 WebGL、Canvas 或重型依赖。

## Implementation Scope

Create one focused component:

- `components/brand/HeroSignalBackground.tsx`

Modify:

- `app/page.tsx`：替换当前 Hero 中两个散落的 aurora div。
- `app/globals.css`：添加背景动画类和 reduced-motion 样式。

## Acceptance Criteria

- 首页 Hero 背景明显比当前更有层次和 React Bits 风格。
- 首屏文字仍然清晰，主标题对比度不下降。
- 移动端不横向溢出。
- `npx tsc --noEmit` 通过。
- `npm test` 通过。
- `npm run build` 通过。
- 静态导出和 basePath 不受影响。
