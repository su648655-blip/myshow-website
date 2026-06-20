export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  tags: string[];
  role: string;
  timeline: string;
  status: "published" | "draft";
  sortOrder: number;
  metrics?: { label: string; value: string }[];
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  status: "published" | "draft";
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education";
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  avatar: string;
  socialLinks: { platform: string; url: string }[];
  // 联系方式
  wechat: string;             // 微信号（About 页特殊展示）
  phone: string;              // 手机号（About 页特殊展示）
  // 前台展示文字
  headline: string;
  statusText: string;
  tagline: string;
  logoText: string;
}

export const profile: Profile = {
  name: "邓学德",
  title: "AI 销售总监 / Enterprise AI Strategist",
  bio: "深耕企业 AI 应用 8 年，主导过 5 亿元级 AI 项目落地。专注于帮助 500 强客户从 0 到 1 构建 AI 战略，将前沿模型能力转化为可衡量的业务增长。",
  location: "广州",
  email: "472662613@qq.com",
  avatar: "/myshow-website/avatar.jpeg",
  wechat: "dengtuzi91",
  phone: "17665085909",
  headline: "AI SALES LEADER",
  statusText: "AVAILABLE FOR Q3 2026",
  tagline: "ENTERPRISE AI · SALES LEADERSHIP",
  logoText: "DENG",
  socialLinks: [
    { platform: "微信", url: "472662613" },
    { platform: "手机号", url: "17665085909" },
    { platform: "谷歌邮箱", url: "su648655@gmail.com" },
  ],
};

export const projects: Project[] = [
  {
    id: "1",
    title: "某头部银行 AI 智能客服项目",
    slug: "bank-ai-customer-service",
    summary:
      "为某 Top 5 商业银行落地 AI 客服平台，覆盖 8000 万用户，单次交互成本降低 73%，CSAT 提升至 92。",
    coverImage: "",
    tags: ["金融行业", "AI 客服", "大模型"],
    role: "项目负责人",
    timeline: "2024.03 - 2024.12",
    status: "published",
    sortOrder: 1,
    metrics: [
      { label: "签约金额", value: "¥1.2亿" },
      { label: "覆盖用户", value: "8000万+" },
      { label: "成本降幅", value: "-73%" },
    ],
  },
  {
    id: "2",
    title: "制造业 AI 质检解决方案",
    slug: "manufacturing-ai-qc",
    summary:
      "主导某汽车 OEM 视觉 AI 质检系统部署，召回率从 78% 提升至 99.6%，年节省质检成本 4500 万元。",
    coverImage: "",
    tags: ["制造业", "计算机视觉", "B端"],
    role: "Sales Director",
    timeline: "2023.08 - 2024.05",
    status: "published",
    sortOrder: 2,
    metrics: [
      { label: "签约金额", value: "¥6800万" },
      { label: "召回率", value: "99.6%" },
      { label: "年节省", value: "¥4500万" },
    ],
  },
  {
    id: "3",
    title: "零售集团 AI 智能选品平台",
    slug: "retail-ai-merchandising",
    summary:
      "推动头部零售集团 AI 选品系统落地，覆盖 3000+ 门店，季度毛利率提升 8.4 个百分点。",
    coverImage: "",
    tags: ["零售", "增长", "数据智能"],
    role: "Account Lead",
    timeline: "2023.01 - 2023.10",
    status: "published",
    sortOrder: 3,
    metrics: [
      { label: "签约金额", value: "¥3500万" },
      { label: "门店覆盖", value: "3000+" },
      { label: "毛利提升", value: "+8.4pp" },
    ],
  },
  {
    id: "4",
    title: "AI 战略咨询：某省政务大模型",
    slug: "gov-ai-strategy",
    summary:
      "为某省政务厅设计 AI 战略与采购框架，三年期总规模 2.4 亿，已完成首期签约和上线。",
    coverImage: "",
    tags: ["政企", "战略咨询", "AI 落地"],
    role: "战略合伙人",
    timeline: "2024.06 - 至今",
    status: "published",
    sortOrder: 4,
    metrics: [
      { label: "三年规模", value: "¥2.4亿" },
      { label: "首期签约", value: "¥7200万" },
      { label: "覆盖部门", value: "32个" },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "1",
    title: "AI 销售：从卖工具到卖结果的范式跃迁",
    slug: "ai-sales-paradigm-shift",
    excerpt:
      "传统软件销售卖的是功能，AI 销售卖的是 ROI 承诺。本文复盘三年来我在 AI 大单中验证的方法论。",
    content: `## 旧范式：卖功能

传统软件销售的核心逻辑是 **功能清单竞争**。你有 10 个功能，我有 12 个，我就赢了。

这在 SaaS 时代已经渐渐失效，在 AI 时代彻底崩塌。

## 新范式：卖结果

客户不再关心"你的模型准确率是多少"，他们关心的是：

- 这个系统上线后，我的客服团队能**少招多少人**？
- 质检线的**漏检率能降到多少**？
- 选品推荐能让我的**毛利率提升几个点**？

## 三个实操转变

### 1. Discovery 阶段：从 Demo 到 Use Case
不再演示产品功能，而是带客户一起画 **Value Map**：把他们的业务痛点逐个映射到 AI 可解决的方案上。

### 2. POC 阶段：从 技术验证 到 业务验证
POC 的目标不是证明"模型能跑通"，而是证明"ROI 能成立"。我们用一个简单的公式：

> POC 成功 = (业务指标提升 > 20%) AND (集成成本 < 客户预算 15%)

### 3. 签约阶段：从 采购流程 到 联合商业计划
AI 项目往往不是从 IT 预算出，而是从业务部门的 **创新预算** 出。这意味着你需要和业务 VP 对话，而不是和 IT 采购对话。

## 总结

AI 销售的本质是把 **技术不确定性** 翻译成 **业务确定性**。如果你能做到这一点，客户不是在"买你的产品"——而是在"投资自己的未来"。`,
    tags: ["销售方法论", "AI 商业化"],
    publishedAt: "2024-05-15",
    readTime: "12 分钟",
    status: "published",
  },
  {
    id: "2",
    title: "大客户 AI 项目立项的 7 个关键问题",
    slug: "enterprise-ai-discovery",
    excerpt:
      "面对一个 500 强客户，第一次会议怎么聊？我用一份 Discovery Questions 清单帮你打开局面。",
    content: `## 为什么 Discovery 决定了 AI 项目的成败

AI 项目和传统 IT 项目最大的不同：**需求不在客户嘴里，在客户的数据和流程里**。

如果第一次会议你只是在听客户"想要什么"，你已经在失败的路线上了。

## 7 个必须问的问题

### 1. "过去 12 个月，这个问题的成本是多少？"
**目的**：量化痛点的财务价值。如果客户回答不了，这个问题本身就是一个 insight。

### 2. "谁对这个问题的解决有决策权？"
**目的**：找到真正的 economic buyer。AI 项目往往跨部门，没有 sponsor 必死。

### 3. "你们目前怎么解决？"（手工/外包/现有系统）
**目的**：了解现状 baselines，这是衡量 ROI 的基准线。

### 4. "如果明天有一个完美方案，你会怎么验证它有效？"
**目的**：反向推导客户的评估标准，POC 设计就围绕这些标准。

### 5. "上次你们尝试类似项目发生了什么？"
**目的**：了解组织记忆。大多数企业都试过 AI，但失败了。失败原因就是你最大的风险。

### 6. "数据现在在哪里？谁有权访问？"
**目的**：数据就绪度是 AI 项目的头号杀手。提前搞清楚数据所有权、格式、频率。

### 7. "如果这个项目成功，下一个项目是什么？"
**目的**：探索长期合作潜力。也测试客户是否真的认真。

## 总结

**Don't sell AI. Sell the business outcome that AI enables.**

用这 7 个问题，你能在 60 分钟内判断一个 AI 机会是真金还是泡沫。`,
    tags: ["大客户", "Discovery"],
    publishedAt: "2024-04-20",
    readTime: "8 分钟",
    status: "published",
  },
  {
    id: "3",
    title: "AI POC 的成功率：从 12% 到 67% 怎么做到的",
    slug: "ai-poc-success",
    excerpt:
      "AI 项目最容易死在 POC 阶段。我们团队用一套结构化方法把 POC 转化率提升了 5 倍。",
    content: `## POC 为什么会死

12% 的 POC 转化率意味着 **88% 的 AI 项目在概念验证阶段就结束了**。为什么？

不是因为技术不行，而是因为 **POC 的目标错了**。

## 常见错误：技术 POC

大多数 AI 团队做 POC 的思路是：
- 选一个开源模型
- 调参、fine-tune
- 展示"看，准确率 94%！"

客户的反应？"So what？这对我有什么意义？"

## 正确做法：业务 POC

我们的方法：

### 1. POC 目标 = 业务指标，不是模型指标
不要说"准确率 94%"，要说"**质检漏检率从 8% 降到 1.2%**"。

### 2. 用客户自己的数据，不用公开数据集
模型在 ImageNet 上 99% 准确率毫无意义。用客户的产线数据跑 30 天，才是硬道理。

### 3. POC 必须有人买单
如果业务 VP 没有在 POC 评估会上签字说"这个结果值得投资"，POC 就没做完。

### 4. 提前约定 Go/No-Go 标准
在 POC 开始前就和客户一起定义：什么指标、达到什么数值，POC 就算成功。

## 结果

用这套方法，我们团队的 POC 转化率从 12% 提升到了 67%。不是因为我们模型更好——是因为我们 **定义了正确的成功**。`,
    tags: ["项目管理", "POC"],
    publishedAt: "2024-03-10",
    readTime: "10 分钟",
    status: "published",
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "1",
    year: "2022 - 至今",
    title: "AI 销售总监 / Enterprise Director",
    organization: "某头部 AI 公司",
    description: "负责金融、政企、制造行业 AI 解决方案销售，带领 12 人团队，年签约规模超过 8 亿。",
    type: "work",
  },
  {
    id: "2",
    year: "2019 - 2022",
    title: "高级行业总监",
    organization: "某全球 SaaS 巨头",
    description: "管理华东大客户业务线，连续三年达成 130%+ 配额，主导 9 个 7 位数 ARR 项目签约。",
    type: "work",
  },
  {
    id: "3",
    year: "2016 - 2019",
    title: "Enterprise Account Executive",
    organization: "某美资云计算公司",
    description: "从 0 到 1 搭建华东金融行业团队，签约首批银行/保险客户，开拓行业标杆。",
    type: "work",
  },
  {
    id: "4",
    year: "2012 - 2016",
    title: "工商管理（MBA）",
    organization: "中欧国际工商学院",
    description: "主修战略与营销，毕业论文方向：B2B 软件销售模式演进。GPA 3.8/4.0。",
    type: "education",
  },
];

export const skills: Skill[] = [
  { name: "Enterprise Sales", level: 5, category: "核心能力" },
  { name: "AI 解决方案设计", level: 5, category: "核心能力" },
  { name: "大客户战略", level: 5, category: "核心能力" },
  { name: "Discovery / Qualification", level: 5, category: "方法论" },
  { name: "MEDDIC", level: 4, category: "方法论" },
  { name: "Challenger Sale", level: 5, category: "方法论" },
  { name: "Solution Selling", level: 5, category: "方法论" },
  { name: "金融行业", level: 5, category: "行业" },
  { name: "制造业", level: 4, category: "行业" },
  { name: "政企", level: 4, category: "行业" },
  { name: "零售", level: 4, category: "行业" },
  { name: "Salesforce", level: 4, category: "工具" },
  { name: "Gong", level: 4, category: "工具" },
  { name: "ChatGPT / Claude", level: 5, category: "工具" },
];
