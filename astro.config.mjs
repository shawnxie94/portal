import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://shawnxie.top",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page, "https://shawnxie.top").pathname;
        return !pathname.startsWith("/nav/") && !pathname.startsWith("/tools/");
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
  vite: {
    build: {
      target: "es2020",
      modulePreload: {
        polyfill: false,
      },
    },
    esbuild: {
      legalComments: "none",
    },
  },
});
