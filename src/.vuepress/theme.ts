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

  // 精简 Markdown 增强功能，减少运行时体积
  markdown: {
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    tasklist: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,
    feed: true,
    icon: {
      prefix: "fa6-solid:",
    },

    slimsearch: {
      indexContent: true,
      suggestion: false,
      queryHistoryCount: 0,
      resultHistoryCount: 0,
      hotKeys: [],
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    },

    comment: {
      provider: "Giscus",
      repo: "shawnxie94/suibi",
      repoId: "R_kgDOMsmo_w",
      category: "Announcements",
      categoryId: "DIC_kwDOMsmo_84CmWI9",
      lazyLoading: true,
    },

    // PWA 插件配置
    pwa: {
      favicon: "/image.png",
      cacheHTML: false,
      cacheImage: false,
      appendBase: true,
      update: "disable",
      generateSWConfig: {
        mode: "development",
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
        globIgnores: ["**/fonts/*.ttf", "**/assets/images/**"],
        runtimeCaching: [
          {
            urlPattern: /\/fonts\/.*\.ttf$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "local-fonts",
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxEntries: 2,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern:
              /^https:\/\/cdn\.jsdelivr\.net\/gh\/shawnxie94\/images\/.*\.(?:png|jpe?g|gif|webp|svg)$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "cdn-images",
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    },

    // SEO 插件
    seo: true,
    // Sitemap 插件
    sitemap: true,
  },
});
