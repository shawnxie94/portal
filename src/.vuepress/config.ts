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
  ],

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,
});
