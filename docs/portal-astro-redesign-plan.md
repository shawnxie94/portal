# 个人门户网站 Astro 新建方案

## 背景

目标是新建一个简约、静态优先的个人门户网站，用来长期承载个人信息、最新动态、博客、产品、在线工具、导航和推广内容。现有 `suibi` 旧站不再作为框架约束，不需要复用 VuePress、主题、插件、路由、PWA、评论或部署逻辑。

旧站唯一必须保留的资产是文章内容。迁移时只把现有 Markdown 文章、文章内图片引用、必要 frontmatter 元数据和公开传播过的文章 URL 纳入考虑。

## 设计原则

- 按新应用设计，不兼容旧框架内部逻辑。
- 静态优先，默认不引入后端、数据库、登录或服务端任务。
- 简约优先，先建设最小可用门户，再逐步扩展栏目。
- 内容和页面分离，文章用内容集合，项目/工具/导航/渠道用结构化数据。
- 工具页按需加载交互代码，避免影响首页和博客性能。
- 免费部署优先，主部署平台选择 Cloudflare Pages。
- 旧文章内容不丢，旧 URL 尽量 100% 兼容；如果个别路径实现成本过高，可以放弃兼容并记录例外。
- 文章图片迁移到本仓库静态资源，避免继续分散依赖外部图床。

## 范围

### 必须包含

- 个人门户首页。
- 个人信息和自媒体渠道入口。
- 博客列表和文章详情。
- 产品/项目展示。
- 工具集合入口和独立工具页框架。
- 导航资源页。
- 推广/AFF 内容页。
- RSS、Sitemap、基础 SEO。
- 静态托管部署。

### 暂不包含

- 后端 API。
- 管理后台或 CMS。
- 用户登录、收藏、评论、云端文件处理。
- 复杂文件转换服务，例如 PDF 转 Word、OCR 批处理、视频转码。
- 复刻 VuePress Hope 的时间轴、目录页、PWA、评论和主题能力。

## 推荐技术栈

推荐使用 Astro 作为站点框架。

Astro 适合内容驱动网站和静态站点生成。页面默认输出静态 HTML，需要交互的工具组件可以按需加载。这一点适合个人门户：博客、项目、导航和推广页面保持轻量，只有具体工具页加载图片处理、PDF 处理或文本转换相关代码。

建议技术组合：

| 层级 | 技术 | 用途 |
| --- | --- | --- |
| 站点框架 | Astro | 静态页面、路由、布局、内容集合 |
| 内容 | Markdown/MDX | 博客、长文、推广详情 |
| 数据 | TypeScript 数据文件 | 个人信息、渠道、项目、工具、导航链接 |
| 交互组件 | Vue 或原生 TypeScript | 前端工具、筛选、复制、上传文件 |
| 样式 | Astro scoped style 或全局 CSS | 简约 UI 和响应式布局 |
| 部署 | Cloudflare Pages | 主部署平台，绑定 `shawnxie.top` |

参考资料：

- Astro 官方文档：https://docs.astro.build/
- Astro Content Collections：https://docs.astro.build/en/guides/content-collections/
- Astro Islands：https://docs.astro.build/en/concepts/islands/
- Astro 部署文档：https://docs.astro.build/en/guides/deploy/
- GitHub Pages：https://pages.github.com/
- Cloudflare Pages：https://developers.cloudflare.com/pages/

## UI 设计方向

推荐采用“轻量个人门户风”，介于个人名片、内容索引和工具入口之间。整体应克制、清晰、长期耐看，不做营销官网式大视觉，也不做重博客主题。

核心气质：

- 简约、克制、信息密度适中。
- 首页像个人名片，内页像可检索资料库。
- 内容优先，导航清晰，工具入口明确。
- 适合长期承载博客、项目、工具、导航和推广，不被某一种视觉风格绑死。

视觉规则：

| 项目 | 建议 |
| --- | --- |
| 背景 | 白色或极浅灰 |
| 主文字 | 接近黑色的深灰 |
| 辅助文字 | 中性灰，弱化但保证可读 |
| 强调色 | 选择一种低饱和主色，用于链接、按钮、标签 |
| 边框 | 细边框优先，少用阴影 |
| 阴影 | 只用于悬浮层或少量重点卡片，强度很轻 |
| 圆角 | 6-8px，避免过度圆润 |
| 字体 | 系统字体优先，中文阅读舒适优先 |
| 动效 | 轻量过渡，不做复杂动画 |

不建议采用：

- 大 hero、渐变背景和大量装饰图形。
- 卡片瀑布流堆满首页。
- 过度素白的 Notion 风。
- 暗黑科技风。
- SaaS landing page 风格。
- 纯作品集模板风格。

首页布局建议：

```text
顶部导航：
  About / Blog / Projects / Tools / Nav / Aff

首屏：
  左侧：姓名、身份、一句话介绍、渠道入口
  右侧：最近动态 3-5 条

下方：
  精选文章
  代表项目
  工具入口
  导航入口
  推广入口
```

栏目页布局建议：

- `/blog/`：文章列表 + 标签/分类筛选。
- `/projects/`：项目卡片列表，突出状态、链接和标签。
- `/tools/`：工具分类和工具卡片，标注可用、规划中或外链。
- `/nav/`：按分类分组的链接目录。
- `/aff/`：带免责声明的推荐列表，区分推荐和返利。
- `/about/`：个人介绍、渠道、二维码、联系方式。
- `/now/`：按时间倒序展示最近动态。

## 模板策略

不建议直接套完整 Astro 主题。当前目标不是单纯博客或作品集，而是个人名片、内容库、工具导航、导航站和推广页面的组合。完整主题容易把数据结构、页面组织和视觉风格绑死，后续扩展成本会变高。

推荐策略：

1. 使用 Astro 官方 starter 或极简 blog starter 初始化项目。
2. 参考 Astro 官方 Themes 中的个人站、博客、目录类模板获取布局灵感。
3. 自定义一套很小的设计系统，而不是引入大型 UI 框架。
4. 使用普通 CSS、CSS variables 和 Astro 组件完成基础样式。
5. 仅在具体工具页按需引入 Vue 或其他交互组件。

小型设计系统建议包含：

```text
BaseLayout
ArticleLayout
ToolLayout
SiteHeader
SiteFooter
PageHeader
Section
LinkCard
ArticleCard
ProjectCard
ToolCard
Badge
ButtonLink
Disclaimer
```

这些组件应服务信息组织，不做复杂视觉抽象。样式优先集中在 `src/styles/global.css` 和组件 scoped style 中，避免把大量样式散落到页面模板里。

## 目标站点结构

建议采用以下路由：

```text
/
  个人门户首页
/about/
  个人介绍、联系方式、自媒体渠道
/now/
  最新动态、近期计划、最近发布
/blog/
  博客列表
/blog/:slug/
  博客详情
/projects/
  个人项目、开源项目、产品入口
/tools/
  工具集合
/tools/:slug/
  独立工具页
/nav/
  导航站、常用资源、推荐链接
/aff/
  推广、订阅推荐、返利说明
/rss.xml
  RSS
/sitemap-index.xml
  Sitemap
```

首页只放身份识别和高频入口：

- 一句话介绍。
- 主要频道入口。
- 最近动态。
- 最新文章。
- 代表项目。
- 常用工具入口。
- 推广或推荐入口。

不要把所有栏目内容堆在首页。首页负责分发，栏目页负责展开。

首页定位为“个人名片 + 少量最新动态”。首屏应优先表达个人身份、关注方向、主要渠道和关键入口；动态区域只展示少量最近更新，例如 3-5 条最新文章、项目进展或近期动态，完整动态进入 `/now/`。

## 推荐目录结构

```text
src/
  assets/
    images/
      blog/
      profile/
      projects/
  components/
    home/
    cards/
    tools/
    ui/
  content/
    blog/
    aff/
    notes/
  data/
    profile.ts
    channels.ts
    projects.ts
    tools.ts
    nav-links.ts
    updates.ts
  layouts/
    BaseLayout.astro
    ArticleLayout.astro
    ToolLayout.astro
  pages/
    index.astro
    about.astro
    now.astro
    blog/
      index.astro
      [...slug].astro
    projects.astro
    tools/
      index.astro
      image-converter.astro
      pdf-merge.astro
    nav.astro
    aff/
      index.astro
      [...slug].astro
  styles/
    global.css
  public/
    _redirects
  workers/
    image-converter.worker.ts
```

如果第一阶段要更轻，可以先不引入 `notes/`、`workers/` 和具体工具实现页。工具栏目先完成列表、分类和外链/占位框架，后续再逐步添加具体工具。

## 内容模型

### 博客文章

旧文章迁移到：

```text
src/content/blog/
```

建议收敛后的 frontmatter：

```yaml
title: 文章标题
description: 简短摘要
pubDate: 2026-06-24
updatedDate: 2026-06-24
category: 技术笔记
tags:
  - AI
  - 工具
draft: false
originalPath: /blogs/ai/ai-agent.html
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 页面标题和文章标题 |
| `description` | 建议 | SEO、列表摘要、分享卡片 |
| `pubDate` | 是 | 发布时间 |
| `updatedDate` | 否 | 更新时间 |
| `category` | 否 | 单一主分类 |
| `tags` | 否 | 多标签 |
| `draft` | 否 | 草稿文章不发布 |
| `originalPath` | 建议 | 旧 URL 兼容和迁移追踪 |

### 个人信息

```ts
export const profile = {
  name: "肖恩",
  headline: "后端开发者，关注 AI 工具、工程效率和内容创作",
  location: "China",
  avatar: "/images/avatar.png",
  bio: "用于首页和 about 页的简短介绍。",
};
```

### 渠道信息

```ts
export const channels = [
  {
    name: "GitHub",
    url: "https://github.com/shawnxie94",
    type: "code",
  },
  {
    name: "微信公众号",
    url: "/about/#wechat",
    type: "media",
  },
];
```

### 项目和产品

```ts
export const projects = [
  {
    name: "项目名称",
    description: "项目简介",
    url: "https://example.com",
    status: "active",
    tags: ["AI", "工具"],
    featured: true,
  },
];
```

### 工具

```ts
export const tools = [
  {
    name: "图片格式转换",
    description: "在浏览器本地转换常见图片格式",
    path: "/tools/image-converter/",
    category: "图片",
    tags: ["图片", "转换", "本地处理"],
    localOnly: true,
    featured: true,
  },
];
```

### 导航链接

```ts
export const navLinks = [
  {
    title: "Astro",
    description: "内容驱动网站框架",
    url: "https://astro.build/",
    category: "开发",
    tags: ["SSG", "Web"],
  },
];
```

## 工具站设计

工具站第一阶段只搭建页面导航框架，不要求马上实现具体工具。`/tools/` 先提供工具分类、工具卡片、状态标识和后续扩展入口。具体工具页可以先显示“规划中”或跳转到外部服务，后续再按需补充本地工具实现。

后续实现具体工具时，工具站使用 Astro 页面承载，交互工具使用 Vue 组件或原生 TypeScript 组件实现。工具组件必须只在工具页加载。

示例：

```astro
---
import ToolLayout from "../../layouts/ToolLayout.astro";
import ImageConverter from "../../components/tools/ImageConverter.vue";
---

<ToolLayout title="图片格式转换">
  <ImageConverter client:visible />
</ToolLayout>
```

工具实现原则：

- 文件默认只在浏览器本地处理。
- 大型依赖只进入对应工具页 chunk。
- 重计算任务使用 Web Worker，避免阻塞 UI。
- 工具页展示输入、输出、清空、下载、复制、错误状态。
- 明确标注文件大小、浏览器兼容和隐私边界。

工具优先级：

| 优先级 | 类型 | 原因 |
| --- | --- | --- |
| P0 | JSON 格式化、Base64、URL 编解码、时间戳转换 | 轻量、稳定、适合首批上线 |
| P1 | 图片压缩、裁剪、格式转换 | 价值高，可纯前端实现 |
| P2 | PDF 合并、拆分、图片转 PDF | 可做，但依赖和性能要控制 |
| P3 | OCR、视频转码、PDF 转 Word | 不建议内置，可跳转外部服务 |

第一阶段只需要建立这些优先级和元数据，不需要交付 P0/P1/P2 工具本体。

## 旧文章迁移策略

旧站只作为内容来源，不保留框架逻辑。

需要迁移的内容：

- `src/blogs/**/*.md` 下的文章正文。
- 文章标题、日期、分类、标签、摘要等 frontmatter。
- 文章中的图片和外部链接。
- 已公开传播过的文章路径。

不需要迁移的内容：

- VuePress 配置。
- Hope 主题 frontmatter，例如 `home`、`layout`、`projects`、`icon` 等非文章内容字段。
- `<Catalog />` 等 VuePress 特有组件。
- 自动文章尾注插件逻辑。
- 旧 PWA、评论、搜索和主题样式配置。

迁移处理：

1. 扫描旧文章，生成文章清单。
2. 过滤目录 README 和索引页。
3. 统一 frontmatter 字段。
4. 移除或替换 VuePress 特有语法。
5. 保留文章正文 Markdown。
6. 下载或搬运文章图片到本仓库静态资源目录。
7. 将文章内图片链接改写为本仓库静态资源路径。
8. 将旧路径写入 `originalPath`。
9. 构建时生成新路由。
10. 尽量生成旧 URL 重定向。

## 图片资源迁移策略

旧文章中的外部图片应迁移到本仓库统一管理。建议目录：

```text
src/assets/images/blog/
src/assets/images/profile/
src/assets/images/projects/
```

处理规则：

- 文章内图片下载到 `src/assets/images/blog/<article-slug>/`。
- 文件名保持可读，必要时使用短 hash 避免重名。
- Markdown 中的远程图片链接改写为站内路径。
- 无法下载或版权/稳定性不明确的图片记录到迁移报告，人工确认。
- 个人头像、二维码、项目封面等非文章图片独立存放在 profile 或 projects 目录。
- 首期不再依赖外部 CDN 作为主要图片源。

## URL 策略

新站可以使用更清晰的路径：

```text
/blog/ai-agent/
/blog/read-flow/
```

旧站文章路径可能类似：

```text
/blogs/ai/ai-agent.html
/blogs/tools/read-flow.html
```

建议采用“新 URL + 旧 URL 重定向”策略，并尽量做到旧文章 URL 100% 兼容：

- 新站内部全部使用 `/blog/:slug/`。
- 旧文章 frontmatter 保留 `originalPath`。
- 构建时生成重定向表。
- 对外传播过的旧链接跳转到新链接。
- 若个别旧路径兼容实现明显过于繁琐，可以不兼容，但需要在迁移报告中列出。

部署在 Cloudflare Pages 时，优先使用 `_redirects` 管理旧 URL 跳转。GitHub Pages 不作为首选部署平台。

## SEO 和订阅

首期保留必要能力：

- 每页 `title` 和 `description`。
- canonical URL。
- Open Graph 基础字段。
- RSS。
- Sitemap。
- 文章结构化数据。
- 404 页面。

评论系统不是首期必要能力。后续如果需要评论，再评估 Giscus 或其他静态站友好的方案。

## 部署方案

### 主部署：Cloudflare Pages

Cloudflare Pages 作为主部署平台，绑定原有域名 `shawnxie.top`。它的免费额度、自定义域名、缓存、重定向和全球访问体验更适合该门户站长期使用。

建议配置：

```text
Build command: npm run build
Build output directory: dist
Node version: 20 或 22
```

首期只使用静态 Pages，不启用 Worker 业务逻辑。

### 备选：GitHub Pages

GitHub Pages 仅作为备选方案。缺点是重定向、缓存控制和边缘能力弱一些。

建议配置：

```text
Build command: npm run build
Build output directory: dist
```

如果使用 GitHub Pages 并且要兼容旧 URL，需要为旧路径生成静态 HTML 跳转页。

## 推广和免责声明

推广/AFF 内容需要统一声明，避免读者误解推荐性质。建议在 `/aff/` 页顶部和每个推广详情页底部展示简短免责声明。

建议文案：

```text
本页面包含推广或返利链接。通过这些链接注册或购买服务，我可能获得一定返佣。推荐内容以个人使用体验和公开信息为基础，不构成购买建议，请根据自身需求判断。
```

推广内容结构建议：

- 推荐理由。
- 适用场景。
- 价格或活动信息的更新时间。
- 风险或限制说明。
- 推广/返利标识。

## 质量要求

### 性能

- 首页首屏不加载工具依赖。
- 图片使用合理尺寸和懒加载。
- 工具页按页面拆包。
- 重型工具引入前检查构建产物体积。

### 可访问性

- 页面结构使用语义化 HTML。
- 链接、按钮、表单控件有明确文本。
- 工具页支持键盘操作。
- 移动端布局可用。

### 安全和隐私

- 文件工具默认本地处理，不上传文件。
- 外链使用明确标识。
- AFF 内容需要统一声明。
- 推广链接需要明确标识推荐或返利关系。
- 不在仓库中保存密钥。

### 可维护性

- 内容集合负责文章。
- 数据文件负责链接和卡片。
- 布局组件负责页面结构。
- 工具组件独立于站点内容。
- 避免把大量业务数据写死在页面模板里。

## 验证标准

新应用完成后至少验证：

- `npm run build` 成功。
- 所有迁移文章能生成页面。
- 首页、博客、文章、项目、工具、导航、推广页面可访问。
- RSS 和 Sitemap 可生成。
- 旧文章 URL 尽量全部重定向；未兼容路径有清单。
- 首页不加载图片/PDF 等工具依赖。
- 工具栏目能展示导航框架、分类和工具状态。
- 文章图片已迁移到本仓库静态资源或记录例外清单。
- 移动端主要页面布局正常。

## 实施顺序输入

后续如果写执行计划，建议拆成以下阶段：

1. 新建 Astro 应用骨架。
2. 建立轻量个人门户风的基础视觉系统。
3. 建立基础布局、全局样式和首页。
4. 建立内容集合 schema。
5. 迁移旧博客 Markdown。
6. 实现博客列表和文章详情。
7. 建立 profile、channels、projects、tools、nav-links、updates 数据文件。
8. 实现 about、now、projects、tools、nav、aff 页面。
9. 实现 RSS、Sitemap、SEO 和 404。
10. 实现旧 URL 重定向。
11. 迁移文章图片到本仓库静态资源。
12. 接入 Cloudflare Pages 部署并绑定 `shawnxie.top`。
13. 搭建工具导航框架。
14. 后续按需添加具体工具页。

## 已确认决策

- 主部署平台：Cloudflare Pages。
- 域名：继续使用 `shawnxie.top`。
- 旧文章 URL：尽量 100% 兼容，过于繁琐的个别路径可以放弃兼容并记录。
- 工具：第一阶段只搭建页面导航框架，具体工具后续添加。
- 首页：偏个人名片，同时展示少量最新动态。
- 推广：需要统一免责声明。
- 图片：迁移到本仓库静态资源，统一管理。
- UI 风格：轻量个人门户风，白底/浅灰底、细边框、少阴影、单一强调色。
- 模板策略：不直接套完整主题，使用 Astro starter + 自定义小型设计系统。
