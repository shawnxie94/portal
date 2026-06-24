---
title: "TCP Fast Open"
description: "面试中问到 TCP 相关知识时一般会问到三次握手和四次挥手，内容大家一定回答过很多次并熟记于心了。传统的 TCP 建立连接时需要三次握手，并且握手时只发送简单的 SYN 和 ACK 报文（部分优化的网络协议栈可以在第三次握手时直接发送数"
pubDate: 2025-02-10
category: "技术随笔"
tags:
  - "网络"
draft: false
originalPath: "/blogs/tech-notes/tcp-fast-open.html"
---

面试中问到 TCP 相关知识时一般会问到三次握手和四次挥手，内容大家一定回答过很多次并熟记于心了。传统的 TCP 建立连接时需要三次握手，并且握手时只发送简单的 SYN 和 ACK 报文（部分优化的网络协议栈可以在第三次握手时直接发送数据）。

从网络带宽的资源利用的角度来看，传输层的 TCP 头部 + 网络层的 IP 头部，最少有 40 个字节，为了发送几个字节的报文数据包，而额外组装了 40 个字节的头部，着实有点浪费资源。

从应用优化的角度来看，因为要等到 TCP 经过三次握手建立连接之后才能发送应用层数据，所以会造成应用程序首次发送数据时存在一定的延迟，尤其是短连接、移动设备等场景中，这种副作用会加剧。

为解决上述问题，**TCP Fast Open** 应运而生。


## 原理
TFO [提案](https://conferences.sigcomm.org/co-next/2011/papers/1569470463.pdf)最初于2011年提出，并于2014年12月作为实验性 [RFC 7413](https://datatracker.ietf.org/doc/html/rfc7413)发布。作为 TCP 协议的扩展，TFO 可以在 TCP 连接建立时就发送数据，而不需要等待 SYN 报文的确认。这大大提高 TCP 连接的建立速度，减少延迟。其核心原理是在发送方和接收方通信中引入 Cookie 机制，这样使发送方在后续重连接收方时能够得到简化。

由此可见，TFO 在双方首次连接时相比传统连接并没有优势，重点在于提升后续连接建立的效率。其工作分两个阶段：
### 首次连接请求
- 客户端发送一个 SYN 包，头部包含 Fast Open 选项，且该选项的Cookie 为空，这表明客户端请求 Fast Open Cookie
- 服务端收取 SYN 包以后，生成一个 cookie 值（一串字符串）
- 服务端发送 SYN + ACK 包，在 Options 的 Fast Open 选项中设置 cookie 的值
- 客户端缓存服务端的 IP 和收到的 cookie 值

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202502101857971.png)

### 后续连接建立
- 当发送方再次连接同一个接收方时，可以在 SYN 报文中携带上次保存的 TFO Cookie，同时在 SYN 报文中附带应用层数据 (第一次握手时就直接发送数据)
- 接收方验证发送方的 TFO Cookie 后，将数据发送给应用层处理，并返回 SYN-ACK 报文 (同时也可以发送数据)
- 发送方收到 SYN-ACK 报文后，发送 ACK 报文给接收方，完成三次握手

![](/images/blog/tcp-fast-open/202502101857973-dac7c013.png)

### 优缺点
#### 优势
- **降低连接延迟**：通过在首次连接时获取Cookie，后续连接可以在第一次握手时就发送数据，跳过了一个RTT的延迟，能够显著提高连接建立的速度。对于频繁建立连接的应用场景，如网页浏览、在线游戏等，性能提升效果明显。
- **减轻服务器负担**：在某些情况下，例如突发的大量连接请求，TFO可以减少服务器在连接建立阶段的处理负担，因为部分数据可以在早期就开始传输，而不需要等待三次握手完全完成。

#### 劣势
- **中间设备的影响**：防火墙、负载均衡器等中间设备可能会影响TCP Fast Open的使用，导致连接回退到传统的三次握手方式。
- **安全性**：由于TCP Fast Open允许在连接建立时发送数据，可能会带来一些安全风险，如放大攻击等。因此，需要在使用时进行适当的安全配置。
- **数据量限制**：IPv4中，与SYN报文一起发送的数据量有一定限制，通常为1460字节。如果数据量过大，可能不适合使用TFO。
- **应用类型限制**：并非所有的应用都适合使用TCP Fast Open。例如，对于POST等非幂等性的请求，使用TFO可能会带来安全风险，因为在连接尚未完全建立时就发送数据可能会被恶意利用。

## 实践
### Linux服务端开启TFO
#### 确保内核版本支持TFO（3.7及以上）
```bash
uname -r
```
#### 查看服务器是否开启 TFO
```bash
cat /proc/sys/net/ipv4/tcp_fastopen
```
0 表示禁用，1 表示开启客户端，2 表示开启服务器端 ，3 表示开启TFO客户端和服务器端。

#### 内核开启 TFO
```bash
echo 3 > /proc/sys/net/ipv4/tcp_fastopen
```
#### 应用软件开启 TFO

使用 Nginx 充当应用，先在服务器上安装。
```bash
# 安装Nginx
sudo yum install epel-release
sudo yum install nginx
# 修改NG配置
vim /etc/nginx/nginx.conf
```
修改 nginx 配置 listen 80 fastopen=256，使之支持 TFO。
```
server {
    listen 80  fastopen=256;
    server_name example.com;
    access_log  /var/log/nginx/example.com main;
    location /{
        default_type text/html;
        return 200 '<html>Hello, Nginx</html>';
    }
}
```
### 验证 TFO 效果
#### 检查 macOS 是否开启客户端 TFO
```bash
sysctl net.inet.tcp.fastopen
```
0 表示禁用，1 表示开启客户端，2 表示开启服务器端 ，3 表示开启TFO客户端和服务器端。

#### 打开 wireshark 抓包
使用 **tcp.options.tfo** 过滤条件，快速筛选出和 TCP Fast Open 有关的 TCP 报文。

![](/images/blog/tcp-fast-open/202502101857974-564a68ad.png)
#### 首次请求
执行调用（curl 7.49及以后的版本支持 TFO）。
``` Bash
curl --tcp-fastopen http://example.com
```
接收方返回 SYN-ACK 报文的同时，附带一个随机生成的名为 TFO Cookie 的标识符给发送方。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202502101857975.png)

#### 再次请求
再次调用会携带Cookie简化握手流程，第一次握手时就可以直接发送数据。

![](/images/blog/tcp-fast-open/202502101857976-7ba4ec7c.png)

## 结语
HTTP/3 通过 QUIC 协议提供了类似 TFO 的快速连接建立功能，且设计更为先进，能够直接在首次握手时发送数据，并解决了TCP的队头阻塞问题。等 HTTP/3 推广开来，TFO 也将成为时代的眼泪了。

当前主流的网站已开始陆续支持HTTP/3，可以在 Chrome 浏览器打开开发者工具（F12），在 Network 面板中查看协议使用情况。

![](/images/blog/tcp-fast-open/202502101857978-f43e71fa.png)

## 拓展阅读
- [TCP 快速打开](https://zh.wikipedia.org/wiki/TCP%E5%BF%AB%E9%80%9F%E6%89%93%E5%BC%80)
- [TCP Fast Open](https://dbwu.tech/posts/network/what-is-tcp-fast-open/)
- [A QUIC look at HTTP/3](https://lwn.net/Articles/814522/)
- [理解TCP](https://www.inlighting.org/archives/understand-tcp)
