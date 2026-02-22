import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/blogs/",
  {
    text: "时间轴",
    icon: "gravity-ui:list-timeline",
    link: "/timeline/",
  },
  {
    text: "信息源",
    icon: "rss",
    link: "https://lumina.shawnxie.top/",
  },
  {
    text: "技术周刊",
    icon: "newspaper",
    link: "https://weekly.shawnxie.top/",
  },
  {
    text: "小册",
    icon: "book",
    children: [
      {
        text: "《代码可视化》",
        link: "https://code-visualization.shawnxie.top/",
      }
    ]
  },
]);
