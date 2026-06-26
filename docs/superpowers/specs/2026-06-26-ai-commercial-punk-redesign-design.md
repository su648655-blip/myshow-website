# AI Commercial Punk 全站视觉重设计规格

日期：2026-06-26
项目：NeonMe / 邓学德个人品牌站
状态：待用户 Review

## 1. 背景与目标

当前网站是一个基于 Next.js 14、TypeScript、Tailwind CSS、Framer Motion 的个人展示站，定位为 AI 公司销售总监 / Enterprise AI Strategist 的个人品牌站。现有设计偏深色科技、青色霓虹、网格背景和玻璃卡片，功能完整但容易落入普通 AI SaaS 模板。

本次目标是进行全站版面调整和 UI 视觉更换，将网站升级为一个更大胆、年轻、酷炫、有记忆点的个人 IP 品牌站。

核心目标：

> 从普通个人展示网站，升级为 AI 商业化个人情报品牌站。

新版网站应让访客感知到：邓学德不是普通销售，而是懂 AI、懂企业决策、懂 ROI、能把复杂技术推进到预算、采购和规模化落地的销售型战略人物。

## 2. 设计方向

用户已确认采用 **方案 A：AI 商业朋克全站重塑**。

设计语言定义为：

> AI 商业情报杂志 + Deal War Room + 个人方法论档案馆。

关键气质：

- Bold：大胆、强观点、大字号
- Youthful：年轻、活力、高饱和点缀
- Commercial：成交、ROI、案例、客户结果
- Intelligence：情报、信号、洞察、判断
- Punk：不循规蹈矩，有锋芒
- Editorial：栏目化、专栏化、有主编意识的内容品牌

避免：

- 普通 SaaS 首页
- 纯暗黑科技模板
- 大面积青色网格
- 玻璃拟态堆叠
- 企业官网式稳重无趣
- 游戏化赛博朋克

## 3. 配色系统

主方向：**酸性绿 + 深紫黑**。

建议 token：

- `--bg`：近黑深紫，用作全站底色
- `--bg-1`：墨紫表面，用于卡片、信息面板、案例档案
- `--bg-2`：更亮暗紫表面，用于 hover 或层级提升
- `--fg`：主文字
- `--fg-2`：次文字
- `--fg-3`：辅助文字
- `--acid`：酸性绿，用于 CTA、关键数据、状态灯、扫描线、重点词
- `--violet`：深紫，用于情绪背景和渐变
- `--blue`：电蓝，用于次级高亮、链接、交互反馈
- `--yellow`：亮黄，只用于少量重点标签或警示
- `--border`：暗紫边框
- `--border-acid`：酸性绿边框
- `--ease-signal`：全站动效曲线

使用比例：

- 70% 深色底与暗紫表面
- 15% 紫色/蓝色辅助层
- 10% 酸性绿关键高光
- 5% 亮黄或其他临时强调

酸性绿只能作为“信号色”，不能满屏铺开，避免变成游戏站。

## 4. 字体与排版

### 字体策略

- 中文正文：继续使用系统中文字体或 Noto Sans SC，保证可读性。
- 英文、标签、数据：使用 JetBrains Mono 或 Space Grotesk 气质。
- 标题：使用更大胆的几何无衬线方向，例如 Space Grotesk / Archivo / DM Sans 风格；在当前项目中可优先用系统字体 + 字重、字距、字号建立效果，避免额外依赖。

### 排版原则

- 第一屏标题要非常大，像海报。
- 中文强观点可以分行、断句、加粗，不要整段平铺。
- 英文标签用于情报系统感，但不能抢中文主体。
- 数字指标做成巨大信号块，而不是普通四宫格 stats。
- 页面区块使用栏目命名，例如：
  - `SIGNAL 01 / OPENING`
  - `DOSSIER 02 / DEALS`
  - `FIELD NOTES / BLOG`
  - `OPERATING PRINCIPLES / ABOUT`

## 5. 全站视觉元素

### Signal Strip 信号条

用于 Hero、页间分隔、Footer、ticker。内容示例：

- `AI COMMERCIALIZATION`
- `ENTERPRISE DEALS`
- `ROI TRANSLATION`
- `CFO BUY-IN`
- `DISCOVERY → POC → SCALE`

### Deal Dossier 战绩档案

案例卡片不再是普通 portfolio card，而像一份项目情报档案，包含：

- 档案编号
- 行业/项目类型
- Mission
- Impact metrics
- Role
- Timeline
- Status

### Insight Fragments 洞察碎片

博客和方法论内容展示为商业判断：

- 强标题
- 一句话结论
- 标签
- 阅读时间
- 为什么重要

### Punk Labels 酸性标签

用于强调身份和能力，例如：

- `CFO-READY`
- `VALUE MAP`
- `AI DEAL MAKING`
- `BOARDROOM TRANSLATOR`
- `ROI-FIRST`

标签可轻微错位或旋转，但数量要控制。

## 6. 首页设计

首页名称概念：**AI Deal Intelligence Opening**。

页面结构：

1. Opening Terminal / 第一屏商业情报终端
2. Signal Proof / 战绩信号区
3. Operating Model / AI 大单方法论
4. Deal Dossiers / 代表性项目档案
5. Field Notes / 商业化洞察文章
6. Conversion Strip / 预约咨询收口

### 第一屏

第一屏不再以姓名开场，而以强观点开场：

> AI 销售不是卖工具。  
> 是把技术不确定性翻译成业务确定性。

旁边或下方出现身份说明：

> 邓学德 / Enterprise AI Sales Strategist  
> 8 年 AI 商业化经验，主导亿元级企业 AI 项目落地。

布局：

- 左侧 60%：强观点、身份说明、CTA。
- 右侧 40%：Deal Intelligence Board。

Deal Intelligence Board 内容示例：

```text
LIVE SIGNALS
STAGE       POC → SCALE
BUYER       CEO / CFO / CIO
VALUE MAP   READY
ARR IMPACT  ¥800M+
INDUSTRY    BANK / GOV / MFG / RETAIL
STATUS      AVAILABLE Q3 2026
```

CTA：

- 主按钮：`预约 AI 商业化咨询` / `REQUEST BRIEFING`
- 次按钮：`查看大客户战绩` / `VIEW DOSSIERS`

### 战绩信号区

将现有四个 stats 改为横向战绩信号带：

- `¥800M+ ARR DRIVEN`
- `50+ ENTERPRISE DEALS`
- `12 INDUSTRIES`
- `8Y AI COMMERCIALIZATION`

每个指标需要配一句业务含义，而不是只放数字。

### 方法论区

新增核心模块：**The AI Deal Operating Model**。

步骤：

1. Discovery：把客户模糊需求转成可量化业务问题。
2. Value Map：把模型能力映射到成本、效率、收入指标。
3. POC Design：让技术验证变成业务验证。
4. CFO Buy-In：把方案翻译成预算语言和 ROI 逻辑。
5. Scale：从试点推进到集团级规模化采购。

### 案例预览

展示 3-4 个 Dossier Card，入口到案例页。

### Field Notes 预览

展示文章为商业判断，而不是普通博客卡片。

### 收口 CTA

底部文案：

> 需要把 AI 项目从 Demo 推到预算桌上？

提供咨询方向：客户价值地图、POC 成功指标、CFO 可理解的 ROI 叙事、大客户推进路径。

## 7. 案例页设计

案例页名称概念：**Deal Dossier Archive**。

页面结构：

1. Archive Hero / 档案库开场
2. Impact Overview / 总体战绩概览
3. Industry Filter / 行业情报筛选
4. Dossier Grid / 项目档案列表
5. Commercialization CTA / 商业化咨询收口

标题方向：

> AI Deal Dossiers  
> 不是案例展示，是复杂企业 AI 项目的成交样本。

筛选器命名为 `FILTER BY SIGNAL`。

Dossier Card 结构：

```text
DOSSIER 001
BANKING / AI CUSTOMER SERVICE
MISSION
IMPACT
ROLE
TIMELINE
STATUS
```

第一阶段不新增独立案例详情页；优先完成视觉升级，可保留现有锚点结构或使用展开式卡片。

## 8. 关于页设计

关于页名称概念：**Operator Profile**。

页面结构：

1. Profile Hero / 人物档案开场
2. Origin Story / 为什么进入 AI 商业化
3. Operating Principles / 操盘原则
4. Experience Timeline / 关键经历时间线
5. Capability Matrix / 能力矩阵
6. Contact Protocol / 联系方式

标题方向：

> Operator Profile  
> 我负责把 AI 从 Demo 推向预算桌。

操盘原则：

1. Sell Outcomes, Not Features
2. Make ROI Boardroom-Ready
3. Design POC as Business Proof
4. Build Internal Consensus

能力矩阵四象限：

- Commercial Strategy
- Enterprise Sales
- AI Translation
- Team Leadership

联系方式底部使用 `Contact Protocol`，并保留微信、手机、邮箱。

## 9. 博客页设计

博客页名称概念：**Field Notes / AI 商业化战地手记**。

页面结构：

1. Field Notes Hero / 栏目开场
2. Featured Thesis / 主推观点
3. Notes Index / 文章索引
4. Topic Signals / 主题筛选
5. Newsletter / Consultation CTA

标题方向：

> Field Notes  
> 这里不记录 AI 新闻。只记录 AI 如何被企业真正买单。

文章列表改为 Note Row：

```text
NOTE 001
标题
核心判断
TAGS / READ TIME / DATE
```

博客详情页正文宽度控制在 680-760px，中文字号 17-18px，行高约 1.8。引用块和公式使用 Insight Box。

## 10. 导航与 Footer

### 导航

新版导航概念：**Signal Bar**。

Logo 推荐：`DENG.OS`。

导航命名：

- `00 SIGNAL`
- `01 DOSSIERS`
- `02 OPERATOR`
- `03 NOTES`

右侧可显示：

- `STATUS: OPEN_Q3_2026`
- `CONTACT`

后台入口需要弱化，不应抢访客主路径。

### 移动端导航

展开菜单像命令面板：

```text
NAV COMMANDS
> OPEN SIGNAL
> VIEW DOSSIERS
> READ OPERATOR PROFILE
> ACCESS FIELD NOTES
> CONTACT
```

### Footer

Footer 概念：**End Terminal**。

内容：

```text
END OF SIGNAL
如果你正在推进一个 AI 项目，但它卡在 Demo、POC 或预算桌前，我们可以聊聊。
CHANNELS
WECHAT
PHONE
EMAIL
NEXT COMMAND
REQUEST BRIEFING
```

## 11. 组件改造范围

建议新增或抽象的视觉组件：

1. `SignalStrip`
2. `SignalPanel`
3. `DossierCard`
4. `NoteRow`
5. `PunkLabel`
6. `CommercialCTA`

改造页面和组件：

- `app/page.tsx`
- `app/portfolio/page.tsx`
- `app/about/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/globals.css`
- `components/Navbar.tsx`
- `components/Footer.tsx`
- 可能涉及 `ContactModal`、`ScrollReveal`、`ParticleBackground`、`ThemeProvider`

不建议本阶段做：

- 新 CMS
- 新后台功能
- 真实客户 logo
- 独立案例详情页
- 复杂 WebGL
- 付费字体依赖

## 12. 动效边界

允许：

- Framer Motion stagger reveal
- CSS 扫描线
- CSS ticker
- hover 扫描高光
- 状态点 pulse
- 背景色块慢漂移

禁止：

- WebGL
- 高成本 Canvas 粒子
- 高频 glitch
- 大量复杂随机动画
- 对移动端造成卡顿的持续动画

必须支持 `prefers-reduced-motion`。

## 13. 内容规则

可以调整展示文案，但必须遵守：

- 不夸大数据
- 不新增不存在的客户名称
- 保留匿名客户表达，如“某头部银行”“某汽车 OEM”
- 数字沿用 `lib/data.ts`
- 文案从“介绍项目”改为“解释商业结果”
- 个人定位聚焦 AI 商业化、企业销售、ROI 翻译

## 14. 测试与验收

### 自动检查

必须运行：

```bash
npm test
npx tsc --noEmit
npm run build
```

如 `npm run lint` 可用也运行；若因 Next lint 版本问题失败，需要如实报告。

### 页面检查

至少检查：

- `/`
- `/portfolio`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/admin`

### 响应式检查

至少检查：

- 375px mobile
- 768px tablet
- 1440px desktop

### 视觉验收

- 第一屏明显不同于当前普通 AI SaaS 风。
- 酸性绿 + 深紫形成统一品牌记忆。
- 页面不显得游戏化。
- 中文长文阅读舒适。
- CTA 清晰。
- 案例页能支撑企业信任。
- 移动端无横向滚动。
- 动效不干扰阅读。

### 可访问性验收

- 正文对比度 ≥ 4.5:1。
- 按钮/链接有 focus state。
- icon-only 按钮有 aria-label。
- reduced motion 下可用。
- 移动端触控区域 ≥ 44px。

## 15. 风险与控制

### 风险：太酷导致不可信

控制方式：数据和方法论必须明确；酸性绿只用于信号；企业客户路径清晰。

### 风险：移动端太复杂

控制方式：移动端单列；减少背景动效；情报面板转为卡片；CTA 满宽。

### 风险：改动太大引入 bug

控制方式：优先页面层改造；少动数据结构；抽少量组件复用；每页完成后进行类型检查/构建。

### 风险：静态导出破坏

控制方式：不新增服务端 API；不使用动态运行时功能；链接遵守现有静态导出和 basePath 规则。

## 16. 交付边界

本次实施应交付：

1. 全站新视觉 token。
2. 首页重做。
3. 案例页重做。
4. 关于页重做。
5. 博客列表和详情视觉升级。
6. 导航和 Footer 升级。
7. 后台入口保留但弱化。
8. 基础测试通过。
9. 构建成功，静态导出不破坏。

不交付：

- 新 CMS。
- 新后台功能。
- 真实客户 logo。
- 新独立案例详情页。
- 复杂 WebGL 特效。
- 付费字体依赖。
