---
title: "文章图片自动管理方案：Github + PicGo + jsDelivr + Obsidian"
description: "笔者在 我的内容创作最强搭子——Kimi https //mp.weixin.qq.com/s/HDUjesD7Qs5o9qm3bPs ZA 中介绍了周刊创作时素材收集和整理的基本思路，这之后便会进行文章撰写。 写作在电脑本地进行，采用"
pubDate: 2024-11-23
category: "技术提效"
tags:
  - "自动化"
  - "写作工具"
  - "教程"
draft: false
originalPath: "/blogs/tools/picture-manage.html"
---

笔者在[我的内容创作最强搭子——Kimi](https://mp.weixin.qq.com/s/HDUjesD7Qs5o9qm3bPs_ZA)中介绍了周刊创作时素材收集和整理的基本思路，这之后便会进行文章撰写。

写作在电脑本地进行，采用 [Markdown](https://www.markdownguide.org) 语法，不过其有一个缺点——**不能所见即所得**。因此需要一个专业的 Markdown 写作编辑器来展示效果，笔者目前使用双链笔记工具 Obsidian。

另外本地写作使用 Markdown 时还有一个痛点——**图片管理困难**。图片粘贴后默认存放到本地目录下，如果路径进行了变更还需要手动调整图片的引用。前期周刊写完后还需要一一检查图片的引用，相当的痛苦，这对写作意愿有不小的消耗。

针对上述第二个痛点，本文将介绍一种图片管理方案，不花一分钱即可实现文章图片自动管理，做到“**一次写作，到处（粘贴）发布**”。

## 工具介绍
对本文涉及的工具进行简要介绍：
- **[GitHub](https://github.com)**

代码托管云服务网站，帮助开发者存储和管理其项目源代码。在本文中充当**免费图床**作用。

![](/images/blog/picture-manage/202411231816214-0665f0a6.png)

- **[PicGo](https://molunerfinn.com/PicGo/)**

一个用于快速上传图片并获取图片 URL 链接的工具。在本文中提供**图片上传+管理**功能。

![](/images/blog/picture-manage/202411231814767-47f9321a.png)

- **[jsDelivr](https://www.jsdelivr.com/)**

国外的优秀公共 CDN 服务提供商，也是首个打通中国大陆与海外的免费 CDN 服务。在本文中用来**加速 Github 仓库的图片链接访问速度**。

![](/images/blog/picture-manage/202411231817239-a1767ece.png)

- **[Obsidian](https://obsidian.md/)**

一款强大的知识管理和笔记软件，以Markdown编辑器为基础，支持双向链接和图谱视图，帮助用户构建知识网络。在本文中配合插件[image-auto-upload](https://github.com/renmu123/obsidian-image-auto-upload-plugin)实现文章**图片自动管理**。

![](/images/blog/picture-manage/202411231819700-5da8dabd.png)
## 详细方案
![](/images/blog/picture-manage/202411231847843-5dc4990b.png)
上图为各工具交互示意图，黑色箭头表示图片上传过程，红色箭头表示图片访问过程，下面将介绍详细配置步骤：
### 第一步：配置GitHub免费图床
#### ① 创建公共仓库
在Github中[创建](https://github.com/new)一个公共仓库，用于存放上传的图片。

![](/images/blog/picture-manage/202411231928488-3524c74d.png)
#### ② 生成Github访问token
- 在[开发设置](https://github.com/settings/tokens)中选择生成新token

![](/images/blog/picture-manage/202411231930473-6e4ffab0.png)
- 选择永不过期，并按照下图设置访问权限

![](/images/blog/picture-manage/202411231931131-bdd901db.png)
- 拉到最下面，点击 `Generate token`，生成并复制（一定要保存好token，只会在创建时显示一次）
### 第二步：安装PicGo并配置图床
- 访问[releases](https://github.com/Molunerfinn/PicGo/releases)找到对应操作系统安装包下载并安装

![](/images/blog/picture-manage/202411231937398-df87a817.png)
- 打开PicGo，在图床设置中配置好GitHub设置（token即为第一步中申请值）

![](/images/blog/picture-manage/202411231940672-3e5da62d.png)
### 第三步：配置图片链接CDN加速
按照下述格式配置图片链接即可享有jsdelivr提供的加速能力。
```
https://cdn.jsdelivr.net/gh/{github账号名}/{仓库名}/{图片路径}
```
在PicGo中GitHub设置中设定自定义域名，即可自动生成加速后图片链接。

![](/images/blog/picture-manage/202411231949714-b53930da.png)
### 第四步：Obsidian图片自动上传配置
- 在Obsidian的偏好“第三方插件”配置中关闭安全模式，之后浏览插件市场安装image-auto-upload并开启插件

![](/images/blog/picture-manage/202411231951700-3415aec8.png)
- 插件设置中已经默认配好了PicGo相关参数，如有需要也可以自行调整

![](/images/blog/picture-manage/202411231953924-21f6ad06.png)
- 按上述配置好后，即可开启丝滑的写作体验

将图片粘贴到文章中，将自动上传并展示。Markdown图文内容变成了**纯静态数据**，想粘贴就粘贴。

![](/images/blog/picture-manage/202411232002552-bc9f5d26.png)
## 结语
文章写好后再结合之前推荐的[doocs/md](https://mp.weixin.qq.com/s/4Du8pyhz9357lxkG0Z8gpQ)公众号排版工具，只需**点点点**（粘贴markdown到md，粘贴排版后内容到公众号，再点击发布），一篇规整的公众号文章就发出来啦！

![](/images/blog/picture-manage/202411232018369-ab88eadc.png)

图片存储还有很多其他方案（专业图床），有兴趣的朋友可以自行检索一下。如果图片链接可以顺畅访问则不需要配置cdn加速，例如使用Gitee作为图床。另外PicGo还提供了大量插件，如果有特殊的需求不妨看看。
