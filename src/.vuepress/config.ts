import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "肖恩聊技术",
  description: "持续提供有价值的技术内容",

  head: [
    // 预连接 CDN，加速图片加载
    ["link", { rel: "preconnect", href: "https://cdn.jsdelivr.net" }],
    ["link", { rel: "dns-prefetch", href: "https://cdn.jsdelivr.net" }],
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
