---
title: "碎片时间刷文章！懒人阅读方案分享"
description: "成年人缓解焦虑的三种方式： 阅读、运动和冥想 。其中阅读的门槛和成本最低，通过碎片化阅读能有效利用垃圾时间，在缓解焦虑的同时提升自己。但在这个信息爆炸的时代，优质信息反而更难发现。 首先是 信息分散 ，各类APP、公众号、网站和news"
pubDate: 2025-05-11
category: "技术提效"
tags:
  - "RSS"
  - "自动化"
  - "阅读"
draft: false
originalPath: "/blogs/tools/read-flow.html"
---

成年人缓解焦虑的三种方式：**阅读、运动和冥想**。其中阅读的门槛和成本最低，通过碎片化阅读能有效利用垃圾时间，在缓解焦虑的同时提升自己。但在这个信息爆炸的时代，优质信息反而更难发现。

首先是**信息分散**，各类APP、公众号、网站和newsletter像一盘散沙，阅读时需要反复切换、筛选，进一步消耗本就稀缺的时间和精力。

其次是**信息密度低**，内容形式日益短视频化，降低了碎片化阅读的效率。

再者是**算法困境**，各类APP为留住用户都会使用推荐算法，通过分析用户的行为和偏好，推荐“感兴趣”的内容给用户，但算法收集的信息毕竟有限，会导致推荐的内容单一，用户的行为又会进一步加重这种单一化，最终形成信息茧房。

最后是**AI的冲击**，低成本的AI工具快速生成了大量垃圾内容，充斥在各大平台，严重干扰到有价值内容的获取。

针对以上问题，如果有这样一个工具，能够统一整合所有类型的信息源，让我们在碎片化的时间里，**像刷短视频一样阅读**，岂不美滋滋？

## 基本思路

基本思路见下图，大体包含四个部分：
- **信息收集**：标准化信息源内容拉取过程；
- **信息存储**：云端数据存储，支持多端快速访问；
- **信息阅读**：碎片化阅读，注重效率和体验；
- **信息留存**：一键留存，扩充个人知识库。

![](/images/blog/read-flow/202505101720464-7c4481a3.png)
## 详细方案
介绍一种具体的实现方案，大家可以自行折腾平替方案。
### 环境搭建
#### 准备运行环境

推荐使用阿里云、腾讯云和UCloud等云服务器，也可以使用自己的电脑。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101046200.png)

#### 安装宝塔面板

[宝塔面板](https://www.bt.cn/new/index.html)是一款服务器管理软件，支持windows和linux系统，可以通过Web端轻松管理服务器，提升运维效率。例如：创建管理网站、FTP、数据库，拥有可视化文件管理器，可视化软件管理器，可视化CPU、内存、流量监控图表，计划任务等功能。

简而言之，它能够简化服务器操作，减少大量繁琐的环境配置工作。

- 云厂商一键安装宝塔面板

![](/images/blog/read-flow/202505101049740-400b7968.png)

- 手动安装宝塔面板

Windows直接下载软件安装，Linux系统使用命令安装（[官方安装文档](https://www.bt.cn/new/download.html)）：

```bash
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec
```
- 宝塔面板主页

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101055001.png)

#### 安装MySQL

用来存储RSS源和文章内容。宝塔面板支持各种数据库的快捷创建和配置，步骤：

- 点击数据库边栏，选择对应的数据库类型并安装环境

![](/images/blog/read-flow/202505101106730-8fc71e33.png)

- 环境安装完成后，点击“添加数据库”创建（具体创建参数在工具使用DB时说明）

![](/images/blog/read-flow/202505101109934-58ed7e4e.png)

### 对接方式统一
数据源对接方式采用[RSS](https://zh.wikipedia.org/wiki/RSS)，它是一种消息来源格式规范，用以聚合多个网站更新的内容并自动通知网站订阅者。这个规范很久远了，已从曾经的互联网“宠儿”变成了如今的“弃子”。但针对本文场景却是一个不错的选择，确定了规范就能标准化对接方式，况且还有不少怀旧人士在使用和折腾RSS。

使用 RSS 的一大难题是找到“订阅源”，因为不是所有的信息源都支持RSS订阅，如果不支持则需要通过工具为其生成。

#### 有RSS订阅

一些网站提供了明显的RSS订阅链接：

![](/images/blog/read-flow/202505101131338-e735f11f.png)

如果网页没有明显的RSS订阅链接，可以通过油猴脚本快速查找：

- 安装[篡改猴](https://chromewebstore.google.com/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/dhdgffkkebhmkfjojejmpbldmpobfkfo)浏览器插件并配置[RSS+](https://greasyfork.org/zh-CN/scripts/373252-rss-show-site-all-rss)脚本

![](/images/blog/read-flow/202505101136358-6593dba9.png)

- 检索网页RSS订阅源

如果网页提供了订阅源，则会在页面右下角显示数字，点击后可查看订阅源详情。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101138241.png)

#### 无RSS订阅

如果信息源本身不提供RSS，通过下面这些工具能够覆盖90%场景的RSS订阅源生成。

1. [wewe-rss：公众号转RSS](https://github.com/cooderl/wewe-rss)

能够将公众号文章转换成RSS订阅源。宝塔面板配置步骤：

- 配置MySQL数据库

![](/images/blog/read-flow/202505101201484-1aee018c.png)

- 新增Docker编排模版

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101202910.png)

模版内容填入：
```yaml
version: '3.9'

services:
  app:
    image: cooderl/wewe-rss:latest
    ports:
      - 4000:4000
    environment:
      # 数据库连接地址(下面password替换为刚刚新建数据库密码，172.17.0.1是容器中宿主机IP)
      - DATABASE_URL=mysql://wewe-rss:password@172.17.0.1:3306/wewe-rss?schema=public&connect_timeout=30&pool_timeout=30&socket_timeout=30
      # 服务接口请求授权码
      - AUTH_CODE=123456
      # 提取全文内容模式
      # - FEED_MODE=fulltext
      # 定时更新订阅源Cron表达式（每天8、11、17、20点刷新）
      - CRON_EXPRESSION=0 0 8,11,17,20 * * ?
      # 服务接口请求限制，每分钟请求次数
      # - MAX_REQUEST_PER_MINUTE=60
      # 外网访问时，需设置为服务器的公网 IP 或者域名地址
      # - SERVER_ORIGIN_URL=http://localhost:4000

```
- 添加Docker容器编排

![](/images/blog/read-flow/202505101206927-c33917b8.png)

- wewe-rss配置

若执行顺利就能在{服务器IP}:4000访问wewe-rss服务了，如果打不开检查一下容器是否正常启动或者端口外网访问防火墙是否开启。

a. 配置微信读书账号

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101311856.png)

b. 添加公众号源

![](/images/blog/read-flow/202505101318012-ef73d1d2.png)

c. 获取RSS订阅源

![](/images/blog/read-flow/202505101319691-17a72014.png)

2. [RSSHub：万物皆可 RSS](https://github.com/DIYgod/RSSHub)

RSSHub 给各种奇奇怪怪的网站生成了 RSS 源，堪称“万物皆可 RSS”。适配了 300 多个网站，，涵盖了知乎、微博、豆瓣、B站、贴吧、斗鱼、小红书、网易云音乐、U2B、Github、Reddit 等国内外主流网站。

国内访问官网比较慢，可通过宝塔面板自部署，再结合[RssHub Radar](https://chromewebstore.google.com/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa)浏览器插件快速获取RSS订阅源。配置步骤：

- 宝塔面板安装RSSHub

在Docker应用商店搜索安装即可。

![](/images/blog/read-flow/202505101341409-3ea02a93.png)


正常启动后，可在{服务器IP}:1200访问RSSHub服务。

![](/images/blog/read-flow/202505101340524-3caef617.png)

- RssHub Radar 插件配置实例地址

![](/images/blog/read-flow/202505101343885-6205a2a2.png)

- 获取RSS订阅源

![](/images/blog/read-flow/202505101344308-73aedf53.png)

3. 自定义爬虫

如果上述工具都无法满足需求，可通过自定义爬虫来实现RSS订阅源定制生成。虽然有一定技术门槛，但使用现成的爬虫工具结合AI编程，实现难度也不算高。笔者目前定制化诉求不高，这部分暂不展开，等之后有具诉求再写文章讲述。

### 信息存储
信息对接统一后需要一个工具来获取并存储信息。[FreshRSS](https://github.com/FreshRSS/FreshRSS)是一个开源的RSS阅读器，支持多平台（web应用），支持自定义订阅，内容分类管理和API（多端集成），非常适合用来进行内容存储和同步。宝塔面板配置步骤：

- 数据库配置

![](/images/blog/read-flow/202505101201684-0c712c49.png)

- 新增Docker编排模版

![](/images/blog/read-flow/202505101357126-3e11c64d.png)

模版内容填入：
```yaml
version: "3"
services:
  freshrss:
    image: freshrss/freshrss:latest
    container_name: freshrss
    hostname: freshrss-app
    restart: unless-stopped
    ports:
      - "8900:80"  # 主机端口:容器端口
    volumes:
      - ./data:/var/www/FreshRSS/data  # 持久化数据
      - ./extensions:/var/www/FreshRSS/extensions  # 插件目录
    environment:
      TZ: Asia/Shanghai  # 时区
      MYSQL_HOST: 172.17.0.1
      MYSQL_USER: freshrss
       # 替换为自己的数据库密码
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: freshrss
```

- 添加Docker容器编排

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101359797.png)

- FreshRSS配置

正常部署后就能在{服务器IP}:8900访问FreshRSS了，首次登录会有一些环境检查和配置，按照引导操作即可。

![](/images/blog/read-flow/202505101403533-0dc41ba2.png)

a. 信息源导入

在订阅管理”导入/导出“中导入事先整理好的RSS订阅源，之后返回主页刷新即可实现内容拉取。

![](/images/blog/read-flow/202505101404498-74f06d38.png)

b. 自动刷新

默认未开启自动刷新，这对懒人来说不太友好，可通过配置宝塔面板定时任务实现定时刷新。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202505101457371.png)

```bash
docker exec freshrss php /var/www/FreshRSS/app/actualize_script.php
```
c. API授权

为了实现多端接入FreshRSS，需要开启API授权。

- 认证配置中开启”允许 API 访问“

![](/images/blog/read-flow/202505101409415-2d4cb294.png)


- 在账户配置”API“管理中设置密码并提交

![](/images/blog/read-flow/202505101411990-d900e8aa.png)

### 多端阅读
终于到了阅读时刻！为了实现随时随地像刷短视频一样阅读，需要在手机上安装[Readrops](https://github.com/readrops/Readrops)并连接到FreshRss。Readrops 是一款开源的多服务 RSS 客户端，适用于 Android 平台，它支持本地 RSS 解析、外部服务支持（集成FreshRSS）、分享等功能。

- 安装

在[releases](https://github.com/readrops/Readrops/releases)中下载最新apk安装即可。

- FreshRSS账号配置

在账号管理中添加FreshRSS账号，确认后返回主页刷新内容。

![](/images/blog/read-flow/202505101421950-e292b5e7.png)

- 分享模版配置

首选项最后一项可以设置分享文本模版，方便快速生成内容留存文案。

![](/images/blog/read-flow/202505101424231-030768a4.png)

### 碎片信息记录（素材化）
[flomo](https://flomoapp.com/)（浮墨笔记）是一款全平台的卡片笔记工具，能帮助用户快速记录想法与灵感，并更好地回顾过往记录。通过Readrops分享到flomo，实现碎片素材快速记录，方便后续写作时寻找灵感。

- 分享到flomo

![](/images/blog/read-flow/202505101435952-33662063.png)

- flomo回顾

![](/images/blog/read-flow/202505101434539-500c2e1a.png)

## 结语
如果不想折腾这套流程，市面上也有一些现成的产品，推荐网站 bestblogs.dev。提供了大量信息源内容汇总，且结合AI打分对内容进行了精选，每周也能整理精选内容形成周刊并通过邮件推送。网站的信息收集和处理流程已经十分完善，如果你没有太多个性化诉求，完全可以直接使用。

![](/images/blog/read-flow/202505100947286-3664548f.png)


但对笔者来说，个性化比流程完整更重要，以最小成本实现个性化诉求，是我的首要目标。对信息的挑剔感能培养人在内容上的品味。搭建完这套流程后，通过不断优化信息源和阅读转换方案，让我们更好地逃离垃圾信息，冲破信息茧房。
