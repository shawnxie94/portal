---
icon: en-to-square
date: 2023-10-11
category:
  - 代码可视化
tag:
  - 可视化
  - 静态分析
  - 概念引言
sticky: false
star: false
---

# 代码可视化(Code Visualization)

> Code visualization is the process of creating graphical representations of source code to help understand and analyze it.  
代码可视化是创建源代码的图形表示以帮助理解和分析它的过程。

**个人理解**：通过使用图形化手段（架构图、依赖图、分布式追踪、类图、火焰图、CallGraph等）使代码在某些特征上变得可观测，用于辅助开发人员理解分析项目或建设一些自动化工具。

<!-- more -->

## 为什么需要代码可视化?
下面通过几个场景来说明开发、测试同学为什么需要代码可视化功能：

### 场景1：代码逻辑理解困难
项目代码量很大且需求迭代快，每次梳理的文档很快就过时了。新同学入手困难苦不堪言，老手也很难对项目整体的业务逻辑有一个全面的认知，常常需要重新梳理逻辑。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251311287.png)


### 场景2：代码改动影响面难以评估
需求的诉求是修改A页面的逻辑，但由于后端代码很多公用逻辑且调用层级很深，上线才后发现影响了B页面的逻辑，造成了线上事故。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251311465.png)


### 场景3：遗留项目重构缺少抓手
老旧遗留项目经过长时间迭代和多次更换团队，导致内部代码逻辑十分混乱且没人能完全讲明白所有逻辑。但新的业务迭代需求源源不断，在原有项目上修改成本越来越高，亟需重构以获得更高地研发效率。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251311868.png)


**其他场景**：代码改动影响面评估不准导致自动化case编写困难，回归也常常覆盖不到关联逻辑；线上问题排查困难，难以快速定位到出错代码......

## 怎么实现代码可视化?
实现过程大体可以分两步走：
- 第一步**程序分析**：获取到源码、各种中间表示方式或其他方式采集的数据形成可视化的数据基础；
- 第二步**数据可视化**：根据想要观测的视角选择对应的图表类型，将第一步获取的数据进行可视化展示。  

当然对于实际应用场景完成可视化也只是刚刚开始，之后会基于可观测的部分再结合自己的诉求建设更复杂的工具。后面将从理论和实践两部分进行展开阐述：
- 了解实现代码可视化需要掌握的基础理论，例如：AST生成、CFG和DFG等；
- 实践部分会实现“**CallGraph可视化**”并提供基于Git Diff的代码影响变更分析功能；
- 也会罗列一些业界已知的实践方案供大家参考学习。  

相关内容会逐步汇总到”代码可视化“书籍：[code-visualization-book](https://code-visualization.shawnxie.top/).


<div style="text-align: center;"> —— 完 —— </div>

---
关注“**肖恩聊技术**”公众号，原创技术文章第一时间推送~

<img src="https://cdn.jsdelivr.net/gh/shawnxie94/images/images/20241103221454.png" alt="公众号二维码" width="300">



