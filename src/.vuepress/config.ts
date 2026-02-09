import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

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
    ["link", { rel: "icon", type: "image/webp", href: "/image.webp?v=20260209" }],
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon-v2.ico" }],
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
  ],

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,
});
