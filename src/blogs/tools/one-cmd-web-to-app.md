---
icon: en-to-square
date: 2024-09-28
category:
  - 技术提效
tag:
  - Mac
  - 桌面应用
  - 教程
---

# 用一行命令把任意网站变成桌面应用
传统意义上，网站不是”用户**拥有**的东西“，而更像是”用户**访问**的地方“，具有以下特点：

1. **用户不访问时，网站不在用户的设备上存在**：这意味着网站不像应用程序那样可以安装在用户的设备上，用户不使用时，网站不会占用设备资源；
2. **用户只能通过打开浏览器访问网站**：用户需要主动打开浏览器，输入网址或点击链接才能访问网站；
3. **高度依赖网络连接**：网站需要网络连接才能访问，如果用户没有网络，就无法访问网站。

但如果我们发现了一个有意思的网站，想拥有它，这时就不希望它是传统意义上的网站了，更希望是一个原生的APP。这样当我们使用时，点击一个图标即可打开，提供沉浸式的用户体验。

<!-- more -->

举个例子，笔者写公众号使用的排版工具[**doocs/md**](https://doocs.github.io/md/)，官方提供了网站，也可以自己本地部署，但页面用起来体验始终不如本地APP，并且自己部署也会存在新功能难以快速同步的问题。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030266.png)

## PWA很好，但不通用

使用Chrome浏览器打开网页时，细心地小伙伴能发现导航栏有时会有这样的小图标。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030267.png)

点击一下，就能将网页下载到本地。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030268.png)

这种能下载的网页叫**渐进式Web应用**（Progressive Web App，**PWA**），可以直接通过浏览器安装，像原生APP一样在线或离线使用。但想让一个网站成为PWA是有前提的，需要在网站开发的时候就按照规定的方式编写代码（具体的要求这里就不详述了，有兴趣的朋友可以自行查一下）。

对于一些不是PWA的网站，如前文提到的doocs/md，还有没有其他办法将其变成桌面软件呢？

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030270.png)

## 将任意网页变为桌面应用
是的，有，刚好有这么一个便利的工具——[**Pake**](https://github.com/tw93/Pake)。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030271.png)

Pake是国内一个前端大佬做的开源工具，能够将**任何网页**转换成桌面应用程序。它支持Mac、Windows和Linux系统，并且相较于Electron打包的应用程序体积更小、速度更快。Pake提供了命令行工具来简化打包流程，并允许用户自定义开发。

下面简要介绍一下提供的三种使用方式：

### 常用包下载
提供了一些常用网站的包，进行一些定制优化，可以去仓库[Release](https://github.com/tw93/Pake/releases)下载安装使用。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030272.png)

### 命令行一键打包
对于未提供的网站，可以使用下面命令一键打包。
```Bash
# 使用 npm 进行安装
npm install -g pake-cli
# 命令使用格式
pake url [OPTIONS]...
# 打包举例
pake https://www.shawnxie.top/ --name Shawn-Weekly
```
命令参数详细说明可以参考[README_CN](https://github.com/tw93/Pake/blob/master/bin/README_CN.md)。

注：Pake底层使用的是Tauri，环境一定要按照[要求](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites/#%E7%AE%A1%E7%90%86-rust-%E5%AE%89%E8%A3%85)安装，不然会出现一些报错。如果按照下面命令安装后还有问题，可以在Issue里找一下解决方法。
``` Bash
# MAC环境安装
# 安装 CLang 和 macOS 开发依赖项
xcode-select --install
# 安装 Rust
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
# node安装一下最新版本
nvm install v20.17.0
```

现在我们就用一行命令把前文中提到的doocs/md打包成桌面APP吧！
``` bash
pake https://doocs.github.io/md --name Wechat-MD --icon ./Markdown.icns
```

省略命令执行过程，得到一个安装包。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030273.png)

安装之后我们就能像本地APP一样使用doocs/md网站啦，大功告成！

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030274.png)

### 定制开发
针对爱折腾的用户，也提供了「定制开发」方式，可深度二次开发定制功能。笔者刚好前端和Rust都不会，直接Pass。

```bash
# 安装依赖
npm i
# 本地开发[右键可打开调试模式]
npm run dev
# 打包应用
npm run build
```

### 原理浅析
前面提到Pake底层使用了[Tauri](https://tauri.app/zh-cn/)，它是一款应用构建的工具包，能够为使用Web技术的所有主流桌面操作系统构建软件。Tauri的核心是用Rust构建的，CLI（命令行界面）则利用了Node.js。相较于其他同类型工具，Tauri拥有诸多优点。奈何笔者前端和Rust都不太懂，就不进一步探究啦，感兴趣的小伙伴可以自行查查资料。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270030275.png)

<div style="text-align: center;"> —— 完 —— </div>

---
关注“**肖恩聊技术**”公众号，原创技术文章第一时间推送~

<img src="https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20241103221454.png" alt="公众号二维码" width="300">