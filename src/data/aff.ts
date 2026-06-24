export const affDisclosure =
  "本页面包含推广或返利链接。通过这些链接注册或购买服务，我可能获得一定返佣。推荐内容以个人使用体验和公开信息为基础，不构成购买建议，请根据自身需求判断。";

export const affItems = [
  {
    slug: "lumina",
    name: "Lumina",
    description: "高价值内容采集、AI 解读和资产沉淀工作台。",
    url: "https://lumina.shawnxie.top/",
    label: "个人项目",
    affiliate: false,
    updatedAt: "2026-04-21",
    tags: ["信息管理", "AI", "阅读"],
    reason: "适合有信息收集习惯、需要把文章变成可复用资产的人。",
    risk: "仍在持续迭代，重度工作流建议先小范围试用。",
  },
  {
    slug: "infinitum",
    name: "Infinitum",
    description: "懒人阅读方案 2.0，聚合信息源并降低日常阅读摩擦。",
    url: "/blog/infinitum/",
    label: "使用记录",
    affiliate: false,
    updatedAt: "2026-05-05",
    tags: ["阅读", "效率", "信息源"],
    reason: "适合希望把碎片信息集中处理、减少切换成本的读者。",
    risk: "阅读效率提升依赖个人信息源质量和后续整理习惯。",
  },
  {
    slug: "services",
    name: "自用订阅推荐",
    description: "云服务、订阅和网络工具等使用记录。",
    url: "/blog/aff/",
    label: "可能含返利",
    affiliate: true,
    updatedAt: "2026-03-30",
    tags: ["订阅", "云服务", "工具"],
    reason: "只整理自己了解或使用过的服务，方便后续回看。",
    risk: "价格、活动和服务质量可能变化，下单前需要自行确认。",
  },
];
