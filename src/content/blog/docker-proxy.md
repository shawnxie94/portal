---
title: "自建Docker镜像代理加速"
description: "Docker Hub 是一个容器注册表，专为开发人员和开源贡献者构建，用于查找、使用和共享其容器镜像。但从2023年5月中旬，hub.docker.com “不知” 何种原因国内均无法正常访问了，好在国内各大高校和容器技术社区提供了加速"
pubDate: 2024-09-05
category: "技术提效"
tags:
  - "Docker"
  - "教程"
draft: false
originalPath: "/blogs/tools/docker-proxy.html"
---

Docker Hub 是一个容器注册表，专为开发人员和开源贡献者构建，用于查找、使用和共享其容器镜像。但从2023年5月中旬，hub.docker.com “不知” 何种原因国内均无法正常访问了，好在国内各大高校和容器技术社区提供了加速站点，国内开发者还是能获取到各种镜像。



![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017430.png)

好景不长，今年6月份各大高校和容器技术社区由于一些不可抗因素，纷纷关闭了镜像加速站点，这极大地影响了工作效率和开发进度。

为了继续使用DockerHub获取各种各样的镜像数据，我们可以尝试自己搭建代理，中转对Docker官方镜像仓库的请求，解决一些访问限制和加速访问的问题。下文介绍基于Cloudflare Workers的Docker镜像代理部署和使用。

## 部署DockerHub代理
### fork仓库 CF-Workers-docker.io
将 [CF-Workers-docker.io](https://github.com/cmliu/CF-Workers-docker.io) fork到自己仓库。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017433.png)

### 部署到Cloudflare的pages中
- 创建pages应用

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017434.png)

- 连接GitHub

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017435.png)

- 选择存储库部署

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017436.png)

- 等待部署完成

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017437.png)

- 获取镜像代理域名

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017438.png)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017439.png)

- 自定义域名（可选）

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017440.png)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017441.png)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017442.png)

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202411270017443.png)

## 如何配置镜像加速
### 官方镜像路径前加域名
```bash
docker pull dockers.shawnxie.top/library/nginx:latest
```

### 设置镜像加速docker配置
修改文件 /etc/docker/daemon.json（如果不存在则创建）
```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://dockers.shawnxie.top"]  # 请替换为您自己的Worker自定义域名
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
可以执行 docker info命令，如果从结果中看到了如下内容，说明配置成功。
```bash
docker info
---
Registry Mirrors:
    https://dockers.shawnxie.top
```
