---
title: "想提高阅读代码的效率？试试这些工具吧！"
description: "程序员间有句名言——“Talk is cheap, show me the code！”源码的确相较于言语更接近程序真实的状态，包含了更多的一手信息。因此，无论是刚开始学习代码的小白还是久经沙场的代码大神，不管是学习优秀的开源项目还是做"
pubDate: 2024-01-04
category: "技术提效"
tags:
  - "可视化"
  - "阅读"
draft: false
originalPath: "/blogs/tools/read-code-tools.html"
---

程序员间有句名言——“Talk is cheap, show me the code！”源码的确相较于言语更接近程序真实的状态，包含了更多的一手信息。因此，无论是刚开始学习代码的小白还是久经沙场的代码大神，不管是学习优秀的开源项目还是做老项目的重构，代码阅读都是开发者必备的技能之一。但在业务场景越来越复杂、迭代越来越快的背景下，提高梳理代码的效率能够极大程度的提高开发人员的工作效率，进一步为业务创造新的价值。

工欲善其事必先利其器，阅读代码也能通过工具来提升效率，本文将介绍3种代码阅读辅助工具，大家不妨在工作中试用一下，看看是否能带来实际帮助。


## 工具
### [Source Insight](https://www.sourceinsight.com/)
![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251329061.png)

SI使用静态代码分析技术，提供了多个维度代码分析结果展示，对代码阅读、快速查找、代码分析和代码格式化都有帮助。可惜的是只支持Windows系统，Mac如果要使用需要安装虚拟机。

**①代码可视化**：提供各种图形可视化能力，包括继承关系图，CallGraph等；

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251329652.png)

- 继承关系图

![](/images/blog/read-code-tools/202501251330947-d9424988.png)

- CallGraph

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251330987.png)

**②代码检查**：对于语法格式和样式进行检查；

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251330517.png)

**③代码探索**：查看函数和变量的使用位置；

自动显示对函数、变量、类等的引用，使用高级搜索功能在整个项目中进行搜索。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251331414.png)

**④对比分析**：提供了多维度对比分析能力。

- 文件对比

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251331930.png)

- 目录对比

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251332499.png)

还有其他功能，有兴趣的同学可以自行探索一下。
### [Understand](https://scitools.com/)
![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251332435.png)

Understand使用静态代码分析技术，提供了多个维度的代码分析结果展示，其核心功能和SI类似但更丰富，而且工具易用性更好，也支持多种操作系统。

**①代码可视化**：提供各种图形可视化能力，包括依赖关系图，CallGraph，CFG、UML等等；

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251332494.png)

- 控制流程图（CFG）

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251333764.png)

- CallGraph

![](/images/blog/read-code-tools/202501251333617-21a525f2.png)

- UML

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251333496.png)

更多可视化图形介绍可参考：[Interesting Graphs about Your Code﻿](https://blog.scitools.com/graphlist/)

**②代码检查**：使用行业、通用或定制化的标准来检查代码，保证其安全、整洁，可用；

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251333887.png)

**③代码量化**：使用各种指标对代码进行度量，如：圈复杂度、度量树状图等度量图表；
度量树状图中的每个块都代表代码中的一个文件、类或函数。图块的大小和颜色渐变各不相同，以区分度量指标的程度。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251334441.png)

度量图表可提供整个项目的信息，包括最复杂和最大的函数、类和文件等。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251334411.png)

**④代码探索**：使复杂的代码关系变得简单；
提供了便捷的搜索功能，能够快速查找及定位指定的标识符。对于函数，可查看返回类型、参数和引用列表，点击后可立即进入该实例。对于类可查看成员变量和函数、包含列表以及相关指标。还可以通过信息浏览窗口或右键单击代码中任何已命名的实体来访问图表。使用蝴蝶图可以快速查看调用或被调用特定函数的所有内容。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251334245.png)

**⑤代码变更分析**：快速查看两个项目代码之间的差异。
可以按文件、文件夹、实体或架构维度查看变更。只需要指定要对比的git版本或要对比的两个数据库，便可以以文本或树形图对比的形式查看变更情况。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251335732.png)

还有其他很多功能，有兴趣的同学可以自行探索一下。
### [Source Trail](https://github.com/CoatiSoftware/Sourcetrail)
Sourcetrail是一款开源免费的跨平台源码分析工具，可在阅读源代码时提高效率。提供了按脑图形式展示的函数调用链路。在分析代码的同时，提供了优雅的图形化界面来展示工程项目中的各类标识符信息和链路图，能够让人更为直观地了解整个工程的调用信息。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251335890.png)

## 总结
| 工具 | 功能丰富 | 易用性 | 费用 | 支持操作系统 | 维护情况 |
|-------|-------|-------|-------|-------|-------|
|Source Insight|⭐️⭐️⭐️⭐️|⭐️⭐️|高|Win|功能长时间未新增|
|Understand|⭐️⭐️⭐️⭐️⭐️|⭐️⭐️⭐️⭐️⭐️|高|Win/Linux/Mac|维护中|
|Source Trail|⭐️⭐️|⭐️⭐️⭐️⭐️|无|Win/Linux/Mac|2021停止维护|

## 参考
- [【工利其器】必会工具之（一）Source Insight篇](https://www.cnblogs.com/andy-songwei/p/9965714.html)
- [你用过的最好的代码阅读或编辑工具是什么？](https://www.zhihu.com/question/19570229)
- [12 Greatest Code Visualization Tools for Developers](https://hashdork.com/greatest-code-visualization-tools-for-developers/)
- [Code visualization: How to turn complex code into diagrams](https://www.lucidchart.com/blog/visualize-code-documentation)
