# Frontend Site Settings Admin Design

日期：2026-06-27
项目：NeonMe / AI Commercial Punk redesign
状态：已确认

## Goal

新增后台「前台设置」页 `/admin/site`，让后台设置能对应新版前台逻辑，优先管理首页 Hero、标签、Deal Intelligence Board、首页模块开关和视觉强度。

本阶段不做完整 CMS，也不替代现有案例、博客、个人资料管理页。

## Selected Approach

采用 **轻量前台设置页**。

新增一个独立后台入口：

```text
/admin/site
前台设置
```

## Data Model

在 `SiteData` 中新增可选字段：

```ts
siteSettings?: SiteSettings
```

建议类型：

```ts
interface SiteSettings {
  hero: {
    eyebrowLabels: { text: string; tone: "acid" | "violet" | "yellow" | "blue" }[];
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
    backgroundIntensity: "low" | "medium" | "high";
    scanLines: boolean;
    labelStyle: "restrained" | "punk";
  };
}
```

`siteSettings` 必须有默认值，并通过 `getSiteData()` 兼容旧 localStorage：如果旧数据没有该字段，则用默认设置补齐。

## Admin Page Structure

### 1. Hero 主视觉

字段：

- 主标题第一行
- 主标题高亮行
- 简介文案
- 主 CTA 文案
- 次 CTA 文案

这些字段控制首页第一屏的核心内容。主 CTA 仍然打开联系弹窗，次 CTA 仍然链接到案例页。

### 2. Hero 标签

可编辑标签列表：

- text
- tone: acid / violet / yellow / blue

支持添加和删除。默认：

- AI COMMERCIALIZATION / acid
- BOARDROOM TRANSLATOR / violet
- ROI-FIRST / yellow

### 3. Deal Intelligence Board

字段：

- eyebrow
- title
- rows: label/value
- footer

支持添加/删除 rows。默认 rows 保持当前首页内容：Stage、Buyer、Value Map、ARR Impact、Industry、Status。

### 4. 首页模块开关

布尔开关：

- 战绩信号区
- Operating Model
- Deal Dossiers
- Field Notes
- Bottom CTA

关闭模块后，首页不渲染对应 section。

### 5. 视觉强度

字段：

- `backgroundIntensity`: low / medium / high
- `scanLines`: on/off
- `labelStyle`: restrained / punk

前台 Hero 背景组件根据这些设置调整 className：

- low：弱光斑、弱网格、扫描线默认关闭
- medium：当前默认强度
- high：更强光斑和扫描线，但仍必须保证文字可读

## Frontend Behavior

首页读取：

```ts
const siteSettings = data.siteSettings ?? defaultSiteSettings;
```

并应用到：

- Hero 标签
- Hero 标题和描述
- CTA 文案
- Hero Signal Board
- 首页模块显隐
- HeroSignalBackground 视觉强度

如果后台数据缺字段，必须 fallback 到默认值，不能让前台崩溃。

## Admin Navigation

后台侧边栏新增入口：

```text
前台设置
```

图标可使用现有 lucide-react 中的 `MonitorCog` 或 `SlidersHorizontal`。

## Non-goals

本阶段不做：

- 案例页所有文案配置
- 博客页所有文案配置
- Footer 文案配置
- Contact Modal 全字段配置
- 模块拖拽排序
- JSON 编辑器
- 多主题完整主题系统
- 后端数据库或云同步

## Acceptance Criteria

- `/admin/site` 可访问，并出现在后台导航。
- 后台可编辑 Hero 文案、标签、Board rows、模块开关、视觉强度。
- 保存后首页立即反映设置。
- 旧 localStorage 数据不含 `siteSettings` 时仍正常显示默认首页。
- `npx tsc --noEmit` 通过。
- `npm test` 通过。
- `npm run build` 通过。
- `/myshow-website/` 和 `/myshow-website/admin/site/` 在静态导出中可访问。
