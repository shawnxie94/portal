import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig, type PluginObject, type Page } from "vuepress";

import theme from "./theme.js";

const articleOutro = `
<!-- article-outro -->
<div class="article-outro-shell"><div class="article-outro-divider" aria-hidden="true"><span>完</span></div><section class="article-outro-card" aria-label="文章尾注"><div class="article-outro-copy"><p class="article-outro-eyebrow">感谢阅读</p><h2 class="article-outro-title">微信公众号「肖恩聊技术」</h2><p class="article-outro-desc">如果这篇文章对你有帮助，欢迎扫码关注，获取原创文章推送。</p></div><div class="article-outro-qr"><img src="https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20260322212654277.jpg" alt="肖恩聊技术公众号二维码"><p class="article-outro-caption">扫码关注公众号</p></div></section></div>
`;

const autoBlogSidebarOrderPlugin: PluginObject = {
  name: "auto-blog-sidebar-order",
  extendsPage: (page: Page) => {
    const filePath = page.filePathRelative;

    if (!filePath?.startsWith("blogs/") || filePath.endsWith("/README.md")) {
      return;
    }

    const currentOrder = page.frontmatter.order;

    if (typeof currentOrder === "number") {
      return;
    }

    const normalizedDate = page.date?.replaceAll("-", "");
    const dateOrder = Number(normalizedDate);

    if (!Number.isFinite(dateOrder)) {
      return;
    }

    // Catalog 默认按 order 升序排序，这里转成负数即可让新文章排在前面。
    page.frontmatter.order = -dateOrder;
    page.routeMeta.order = -dateOrder;
  },
};

const autoBlogArticleOutroPlugin: PluginObject = {
  name: "auto-blog-article-outro",
  extendsPage: (page: Page, app) => {
    const filePath = page.filePathRelative;

    if (!filePath?.startsWith("blogs/") || filePath.endsWith("/README.md")) {
      return;
    }

    if (page.frontmatter.article === false) {
      return;
    }

    if (page.content.includes("<!-- article-outro -->")) {
      return;
    }

    const normalizedContent = `${page.content.trimEnd()}\n\n${articleOutro.trim()}`;

    if (normalizedContent === page.content.trimEnd()) {
      return;
    }

    page.content = `${normalizedContent}\n`;
    page.contentRendered = app.markdown.render(page.content, {
      base: app.options.base,
      filePath: page.filePath,
      filePathRelative: page.filePathRelative,
      frontmatter: { ...page.frontmatter },
    });

    if (page.sfcBlocks.template) {
      page.sfcBlocks.template.contentStripped = page.contentRendered;
    }
  },
};

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "肖恩聊技术",
  description: "持续提供有价值的技术内容",

  bundler: viteBundler({
    viteOptions: {
      build: {
        target: "es2020",
        modulePreload: {
          polyfill: false,
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            quietDeps: true,
            silenceDeprecations: ["if-function"],
          },
        },
      },
      esbuild: {
        legalComments: "none",
      },
    },
  }),

  head: [
    ["link", { rel: "icon", type: "image/png", href: "/image.png" }],
    ["link", { rel: "shortcut icon", type: "image/png", href: "/image.png" }],
    // 预连接外部域名，减少 DNS/TLS 握手耗时
    ["link", { rel: "preconnect", href: "https://cdn.jsdelivr.net" }],
    ["link", { rel: "dns-prefetch", href: "https://cdn.jsdelivr.net" }],
    ["link", { rel: "preconnect", href: "https://cloud.umami.is" }],
    ["link", { rel: "dns-prefetch", href: "https://cloud.umami.is" }],
    ["link", { rel: "preconnect", href: "https://giscus.app" }],
    ["link", { rel: "dns-prefetch", href: "https://giscus.app" }],
    // Umami Analytics
    [
      "script",
      {
        defer: true,
        src: "https://cloud.umami.is/script.js",
        "data-website-id": "48024348-b9b8-4fe3-83da-3edeaaddbd5b",
      },
    ],
    [
      "style",
      {},
      `
      .article-outro-shell {
        margin: 3.25rem 0 0.75rem;
      }

      .article-outro-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 1rem;
        color: rgba(100, 116, 139, 0.88);
        font-size: 0.76rem;
        letter-spacing: 0.32em;
        text-indent: 0.32em;
      }

      .article-outro-divider::before,
      .article-outro-divider::after {
        content: "";
        width: min(64px, 18vw);
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.75), transparent);
      }

      .article-outro-divider span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.8rem;
        padding: 0.2rem 0.72rem;
        border-radius: 999px;
        border: 1px solid rgba(203, 213, 225, 0.9);
        background: rgba(255, 255, 255, 0.9);
      }

      .article-outro-card {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(200px, 0.82fr);
        gap: 1rem;
        padding: 1.25rem 1.3rem;
        border: 1px solid rgba(226, 232, 240, 0.95);
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
      }

      .article-outro-copy,
      .article-outro-qr {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .article-outro-eyebrow {
        margin: 0 0 0.55rem;
        color: #64748b;
        font-size: 0.76rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .article-outro-title {
        margin: 0;
        color: #1e293b;
        font-size: clamp(1.15rem, 1.02rem + 0.45vw, 1.42rem);
        font-weight: 700;
        line-height: 1.35;
      }

      .article-outro-desc {
        max-width: 32rem;
        margin: 0.65rem 0 0;
        color: #64748b;
        font-size: 0.94rem;
        line-height: 1.8;
      }

      .article-outro-qr {
        align-items: center;
        padding: 0.9rem;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid rgba(226, 232, 240, 0.95);
      }

      .article-outro-qr img {
        width: min(196px, 100%);
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 10px;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
      }

      .article-outro-caption {
        margin: 0.7rem 0 0;
        color: #64748b;
        font-size: 0.82rem;
        letter-spacing: 0.04em;
      }

      @media (max-width: 719px) {
        .article-outro-shell {
          margin-top: 2.8rem;
        }

        .article-outro-card {
          grid-template-columns: 1fr;
          padding: 1.05rem;
          border-radius: 16px;
        }

        .article-outro-copy {
          text-align: center;
        }

        .article-outro-desc {
          max-width: none;
        }

        .article-outro-qr {
          padding: 0.8rem;
        }
      }
      `,
    ],
  ],

  theme,

  plugins: [autoBlogSidebarOrderPlugin, autoBlogArticleOutroPlugin],

  // 和 PWA 一起启用
  shouldPrefetch: false,
});
