---
title: "打造更好用的Mac终端：iTerm2 + zsh + OhMyZsh"
description: "Mac 自带的终端很简陋，缺少很多必要的功能，用户体验较差。但一个好用的终端将直接给开发人员的工作效率带来极大提升，毕竟很多操作是直接在命令行上执行的。笔者对终端有几个基本的诉求： 好看的界面 ，并包含一些 关键信息 ，如：用户名、文件"
pubDate: 2024-11-28
category: "技术提效"
tags:
  - "Mac"
  - "教程"
draft: false
originalPath: "/blogs/tools/mac-terminal.html"
---

Mac 自带的终端很简陋，缺少很多必要的功能，用户体验较差。但一个好用的终端将直接给开发人员的工作效率带来极大提升，毕竟很多操作是直接在命令行上执行的。笔者对终端有几个基本的诉求：
- **好看的界面**，并包含一些**关键信息**，如：用户名、文件路径以及git相关信息等；
- **关键字高亮**，让命令行更加易读易懂；
- **自动补全**，根据历史命令和当前输入内容，自动推荐可能的命令。

当然还有一些非必要的功能，有的话可以锦上添花，例如：
- **快速访问**，快速跳转到常用目录；
- **Git命令缩写**，有的命令着实有点长了，能够有效的减少命令输入量；
- **模糊搜索**，快速搜索历史命令、文件、目录等。



笔者目前的终端是基于 **iTerm2 + zsh + Oh My Zsh** 打造的，这套组合基本能满足上述诉求。这些工具不算新了，笔者第一份工作时mentor就给我推荐了。由于存在一定的配置成本，每次更换电脑都需要重新配置，为方便后续配置有迹可循，就有了这篇文章。

## 工具介绍
对本文涉及的工具进行简要介绍：
### [Homebrew](https://brew.sh/zh-cn/)
Mac OS 下强大的包管理工具，用来安装软件。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271656646.png)
### [iTerm2](https://iterm2.com/)
iTerm2是 Mac OS 终端的替代品，也是iTerm的继承者。iTerm2将终端带入了"只有想不到，没有做不到"的时代。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271704342.png)
### [zsh](https://www.zsh.org/)
zsh 是 shell 语言类型，兼容bash，提供强大的**交互式**命令行功能，比如 tab 补全，自动纠错功能等。但有一个缺点，就是配置太麻烦。下图介绍了一些常见的shell类型：

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271717934.png)
### [Oh My Zsh](https://ohmyz.sh/)
管理 zsh 配置的框架，提供了数百个插件、主题和功能。只需要简单的修改配置文件，就能让 zsh 用的很顺手。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271716417.png)
## 配置流程

### 第一步：安装 Homebrew

#### 安装命令
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
如果执行不成功，可选择国内镜像安装：
```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271838726.png)
#### 常用命令
```bash
# 查看配置
brew config
# 更新 Homebrew
brew update
#  搜索相关的包
brew search [关键词]
# 查看包的信息
brew info [软件名]
# 查看已安装的包
brew list
# 更新某个软件
brew upgrade [软件名]
# 清理所有软件的旧版
brew cleanup
# 卸载某个软件
brew uninstall [软件名]
# 安装某个软件
brew install [软件名]
# 安装cask软件
brew install --cask [软件名]
```
### 第二步：安装 iTerm 2
#### 安装命令

```bash
brew install iterm2
```

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271841097.png)
#### 个性化设置
可以在Settings中进行个性化配置，如字体、背景、快捷键等，笔者一般情况下直接使用默认配置。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271847191.png)
### 第三步：安裝 zsh
更多安装信息可以访问[Installing ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)。
```bash
brew install zsh
```
![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271851444.png)
### 第四步：安装 Oh My Zsh 并配置
#### 安装命令
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271907948.png)
#### 个性化配置
- **别名配置**

oh my zsh内置了很多命令缩写别名，可执行aliases命令展示所有的别名（很多和git相关）。
``` Bash
# 获取所有别名
aliases

—————— 别名列表（部分） ——————
-='cd -'
...=../..
....=../../..
.....=../../../..
......=../../../../..
1='cd -1'
2='cd -2'
3='cd -3'
4='cd -4'
5='cd -5'
6='cd -6'
7='cd -7'
8='cd -8'
9='cd -9'
_='sudo '
egrep='grep -E'
fgrep='grep -F'
g=git
ga='git add'
gaa='git add --all'
gam='git am'
gama='git am --abort'
gamc='git am --continue'
gams='git am --skip'
gamscp='git am --show-current-patch'
gap='git apply'
gapa='git add --patch'
gapt='git apply --3way'
gau='git add --update'
gav='git add --verbose'
gb='git branch'
gbD='git branch --delete --force'
gba='git branch --all'
gbd='git branch --delete'
gbg='LANG=C git branch -vv | grep ": gone\]"'
gbgD='LANG=C git branch --no-color -vv | grep ": gone\]" | cut -c 3- | awk '\''{print $1}'\'' | xargs git branch -D'
gbgd='LANG=C git branch --no-color -vv | grep ": gone\]" | cut -c 3- | awk '\''{print $1}'\'' | xargs git branch -d'
gbl='git blame -w'
gbm='git branch --move'
......
history=omz_history
l='ls -lah'
la='ls -lAh'
ll='ls -lh'
ls='ls -G'
lsa='ls -lah'
md='mkdir -p'
rd=rmdir
run-help=man
which-command=whence
```
- **主题设置**

主题主要用于定制Zsh终端外观，默认主题为“robbyrussell”。替换方式是编辑`~/.zshrc`文件，将`ZSH_THEME`设置为对应主题。
```bash
# 编辑文件
vim ~/.zshrc
# 添加内容后执行
source .zshrc
```

![](/images/blog/mac-terminal/202411271938526-24880a7f.png)

但一些主题可能和系统默认字体不兼容，导致一些字符不能正常展示。这种情况下需要额外安装字体，笔者懒得折腾，一般就使用默认主题。下面展示agnoster和gnzh主题样式，更多样式可以到[Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)查看。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271939377.png)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411271942728.png)

至此，**好看的界面**这一诉求已经达成了，其他的诉求则通过插件方式实现。

- **插件配置**

Oh My Zsh 有几百个[官方插件](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)，还有很多第三方插件，提供了各式各样的功能。但很多并不常用，笔者这里只推荐个人平常使用较多的插件，若对插件感兴趣可自行阅读一下相关文档。

**① git**

官方插件，默认开启。提供**Git命令别名**，帮助在终端中加快使用Git的速度。下面展示部分内容，查看全部别名列表可访问[git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git/)。

```bash
g=git
ga='git add'
gaa='git add --all'
gam='git am'
gama='git am --abort'
gamc='git am --continue'
gams='git am --skip'
gamscp='git am --show-current-patch'
gap='git apply'
gapa='git add --patch'
gapt='git apply --3way'
gau='git add --update'
gav='git add --verbose'
gb='git branch'
gbD='git branch --delete --force'
gba='git branch --all'
gbd='git branch --delete'
gbg='LANG=C git branch -vv | grep ": gone\]"'
gbgD='LANG=C git branch --no-color -vv | grep ": gone\]" | cut -c 3- | awk '\''{print $1}'\'' | xargs git branch -D'
gbgd='LANG=C git branch --no-color -vv | grep ": gone\]" | cut -c 3- | awk '\''{print $1}'\'' | xargs git branch -d'
gbl='git blame -w'
gbm='git branch --move'
......
```

**② sudo**

官方插件，把`sudo` 作为当前或前一个命令的前缀，只需按两下`ESC`。通过编辑`~/.zshrc`文件，在`plugins`配置换行添加插件名即可开启。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272009329.png)

**③ z**

官方插件，开启方式同上。跟踪最常访问的目录，能够通过输入所需目录路径中的几个字符来**快速访问**。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272030894.png)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272013222.png)

**④ zsh-autosuggestions**

三方插件，**自动补全**插件，根据历史命令和当前输入内容，自动推荐可能的命令。安装命令：
``` Bash
brew install zsh-autosuggestions
# 编辑文件
vim ~/.zshrc
# 将下面配置加到.zshrc内容末尾
source /opt/homebrew/share/zsh-autosuggestions/zsh-autosuggestions.zsh
# 添加内容后执行
source .zshrc
```

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272038502.png)

**⑤ zsh-syntax-highlighting**

三方插件，**语法高亮**插件，让命令行更加易读易懂。安装命令：
```bash
brew install zsh-syntax-highlighting
# 编辑文件
vim ~/.zshrc
# 将下面配置加到.zshrc内容末尾
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
# 添加内容后执行
source .zshrc
```

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272029765.png)

**⑥ fzf**

三方插件，**模糊搜索**插件，可以快速搜索历史命令、文件、目录等。安装命令：
```bash
brew install fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
```

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272055083.png)
## 结语
上述配置后就能获得一个基本好用的终端了，但也只是基本好用，因为在AI时代，终端也需要与时俱进。iTerm2提供了与OpenAI的集成方法，但功能仅仅是用大模型辅助生成命令，能提供的帮助比较有限。

![](https://pic-bed-1256249917.cos.ap-chengdu.myqcloud.com/uPic/iterm2-ai-003-20240614205616478.gif)

其他比较火的AI终端有[warp](https://www.warp.dev)，但由于笔者还没有深入试用，下次再分享吧。warp官方做了与ITerm2的功能对比，可以先看看[iterm2-vs-warp](https://www.warp.dev/compare-terminal-tools/iterm2-vs-warp)。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411272128581.png)
