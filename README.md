# NeonMe - 炫酷个人展示网站

> 为互联网创造者打造的新一代个人展示平台

## 项目概览

这是一个基于 Next.js 14 + TypeScript + Tailwind CSS 构建的**炫酷个人网站**，专为产品经理等互联网从业者设计。具备粒子动效背景、作品集展示、博客、关于我等核心模块，支持暗黑/亮色模式切换。

## 快速开始

```bash
# 1. 进入项目目录
cd neonme

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问 http://localhost:3000
```

## 构建部署

```bash
# 构建静态站点（输出到 out/ 目录）
npm run build

# 部署到 Vercel / Netlify / GitHub Pages
# 将 out/ 目录内容上传即可
```

## 技术栈

| 技术 | 版本 | 用途 |
|-----|------|-----|
| Next.js | 14 | React 框架（App Router + SSG） |
| TypeScript | 5 | 类型安全 |
| Tailwind CSS | 3 | 原子化样式 |
| Framer Motion | 11 | 动画与交互 |
| Lucide React | 0.4 | 图标库 |

## 项目结构

```
neonme/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页（Hero + 精选作品 + 最新文章）
│   ├── layout.tsx          # 根布局（主题、导航、页脚）
│   ├── globals.css         # 全局样式 + CSS 变量主题
│   ├── portfolio/
│   │   └── page.tsx        # 作品集页面
│   ├── about/
│   │   └── page.tsx        # 关于我页面
│   └── blog/
│       ├── page.tsx        # 博客列表
│       └── [slug]/
│           └── page.tsx    # 博客详情
├── components/             # React 组件
│   ├── Navbar.tsx          # 顶部导航栏
│   ├── Footer.tsx          # 页脚
│   ├── ParticleBackground.tsx  # Canvas 粒子背景
│   ├── ThemeProvider.tsx   # 主题上下文
│   └── ScrollReveal.tsx    # 滚动显现动画包装器
├── lib/
│   ├── utils.ts            # 工具函数（cn）
│   └── data.ts             # 模拟数据（作品、文章、时间线等）
├── public/                 # 静态资源
├── tailwind.config.ts      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
└── next.config.mjs         # Next.js 配置（静态导出）
```

## 自定义内容

所有个人数据集中在 `lib/data.ts` 中，修改即可更新网站内容：

```typescript
// lib/data.ts
export const profile = {
  name: "你的名字",
  title: "你的职位",
  bio: "你的简介...",
  // ...
};

export const projects = [
  // 你的作品列表
];

export const posts = [
  // 你的文章列表
];
```

## 功能特性

- [x] Canvas 粒子动态背景（鼠标交互）
- [x] 首屏入场动画
- [x] 暗黑 / 亮色模式切换
- [x] 响应式导航栏（桌面 + 移动端）
- [x] 作品集卡片 + 标签筛选
- [x] 职业时间线
- [x] 技能标签云
- [x] 滚动显现动画
- [x] 玻璃拟态设计风格
- [x] 静态导出（无需服务器）

## 后续扩展建议

1. **接入 CMS**：使用 Strapi / Notion API / Markdown 文件管理内容
2. **添加后台**：Next.js API Routes + 数据库（SQLite/PostgreSQL）
3. **评论系统**：接入 Giscus（GitHub Discussions）
4. **数据统计**：Plausible / Google Analytics
5. **搜索功能**：Algolia DocSearch 或本地搜索
6. **RSS 订阅**：生成 RSS feed
