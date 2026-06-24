import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://shawnxie.top",
  output: "static",
  integrations: [sitemap()],
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
