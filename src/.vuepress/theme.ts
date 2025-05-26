import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://shawnxie.top",
  author: {
    name: "ShawnXie",
    url: "https://shawnxie.top",
  },
  favicon: "/image.png",
  logo: "/image.png",
  repo: "shawnxie94/suibi",
  docsDir: "src",
  // 导航栏
  navbar,
  // 侧边栏
  sidebar,
  copyright: "Copyright © 2025 肖恩聊技术",
  // 页脚
  footer: "肖恩聊技术：持续提供有价值的技术内容",
  displayFooter: true,

  // 博客相关
  blog: {
    description: "后端大头兵，喜欢阅读写作。",
    timeline:"未完待续...",
    medias: {
      GitHub: "https://github.com/shawnxie94",
      Wechat: "https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20241103221454.png",
      Rss: "https://shawnxie.top/rss.xml",
      Gmail: "mailto:xiexiao064@gmail.com",
    },
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大的负面影响
  hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    feed: true,
    components: {
      components: ["Badge", "VPCard"],
    },
    icon: {
      prefix: "fa6-solid:",
    },
    slimsearch: {
      // 插件选项
      indexContent: true,
      suggestion: true,
      locales: {
        '/': {
          placeholder: '搜索',
        }
      },
    },
    comment: {
      provider: "Giscus",
      repo: "shawnxie94/suibi",
      repoId: "R_kgDOMsmo_w",
      category: "Announcements",
      categoryId: "DIC_kwDOMsmo_84CmWI9",
    },
  },
});
