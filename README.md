# suibi

肖恩聊技术个人门户。本站从 VuePress 迁移到 Astro，承载个人信息、博客归档、项目、工具入口、导航资源和推广推荐。

**访问站点**：[肖恩聊技术](https://shawnxie.top/)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501241814430.png)

## 开发

```bash
npm install
npm run dev
npm run build
```

## 图片迁移

旧文章已经迁移到 `src/content/blog/`。后续只需要处理文章内远程图片：

```bash
npm run images:download
```

如果直连远程图床不稳定，可以通过代理 URL 模板下载。脚本支持以下占位符：

- `{url}`：原始 URL
- `{encodedUrl}`：URL 编码后的原始 URL
- `{urlNoProtocol}`：去掉 `https://` 或 `http://` 的 URL

```bash
IMAGE_PROXY_TEMPLATE='https://images.weserv.nl/?url={urlNoProtocol}' npm run images:download
```

图片会下载到 `public/images/blog/<slug>/`，并自动改写 `src/content/blog/*.md` 中的图片链接。迁移结果写入 `docs/blog-image-migration-report.md`。

旧文章 URL 重定向生成到 `public/_redirects`，适配 Cloudflare Pages。

## 部署

Cloudflare Pages 配置：

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20 或 22

## 更多
扫码关注“肖恩聊技术”公众号，原创技术文章第一时间推送。

<img src="https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20241103221454.png" alt="公众号二维码" width="300">
