---
title: "编程史上的趣事（一）"
description: "整理编程史上一些轻松有趣的故事，包括第一位程序员、语言起源、经典名言、Bug 由来和 COBOL 的现实影响。"
pubDate: 2024-12-01
category: "肖恩杂谈"
tags:
  - "编程史"
draft: false
originalPath: "/blogs/talk/code-funny.html"
---

最近干货吸收的有点多，脑子快转不动了。闲暇时搜罗了一些编程相关的趣事，放松一下。相关内容没有进行严格考证，大家图一乐就好~

### 第一台可编程机器

![](/images/blog/code-funny/202411301954799-68ddbd8f.png)

世界上第一个可编程的机器是由法国人[Joseph Marie Jacquard](https://en.wikipedia.org/wiki/Joseph_Marie_Jacquard)于1801年发明的[雅卡尔织布机](https://en.wikipedia.org/wiki/Jacquard_machine)，使用打孔卡片进行编程，控制织布机织出不同图案的布。
### 第一位程序员

![](/images/blog/code-funny/202411302007587-0da838dc.png)

英国诗人拜伦的女儿，数学家Ada Lovelace描述了一个计算伯努利数的算法和程序，被认为是最早的计算机程序，并被尊为第一位程序员。但是，1815年才出生的她，理论上比Jacquard更晚才进行编程工作（毕竟拜伦女儿更出名吧，然后法国人...每日辱法）。后来美国国防部组织开展研发的Ada语言以这位女数学家的名字命名。
### 第一门高级编程语言

![](/images/blog/code-funny/202411302008811-d552841f.png)

一般认为1957年发明的Fortran是世界上第一门高级编程语言，而实际上早在1942至1945年，发明了世界上第一台图灵完全的通用数字计算机Z3的德国工程师[Konrad Zuse](https://en.wikipedia.org/wiki/Konrad_Zuse)还研发了一种叫作[Plankalkül](https://en.wikipedia.org/wiki/Plankalk%C3%BCl)的语言。

可惜的是，Z3在1944年柏林轰炸中被炸毁，Plankalkül在战争结束前既没有正式发表，也没有被实现。这门语言的设计一直到了1972年才被正式发表出来，而1998年第一个该语言的编译器才首次被实现。这门语言对后世的编程语言设计几乎没有任何影响，但是它却考虑了包括赋值语句、子程序、条件判断、循环、浮点小数计算、数组、拥有层次结构的结构体、断言、异常处理、结果导向执行等后来许多语言都不具有的功能，这些设计在当时以及之后的很长一段时间内都是非常具有先进性的。
### C++ 为什么这么复杂

![](/images/blog/code-funny/202411302010688-a83c8f4f.png)

C++之父“本贾尼·斯特劳斯特卢普”说他发明C++只是因为发现程序员门槛太低， 导致工资也低，所以发明一个晦涩难学的语言，为的是让程序员能够由此多拿些工资。
### 世界上最好的语言

![](/images/blog/code-funny/202411302016029-2d05a80f.png)

PHP官方文档激进的言论：PHP是最好的语言！目前是程序员常用梗，用来嘲讽程序员技术较差，比较初级，或者只善于做键盘侠，而没有真本事。
### 被谷歌嫌弃年龄的老年大叔

![](/images/blog/code-funny/202411302000993-9ff7328f.png)

Java创始人James Gosling(詹姆斯·高斯林)最早在IBM工作，但是很不受IBM高管的待见，所以辞职转至Sun公司。在Sun公司，他主持并开发了“Oak”语言，这就是Java语言的前生。2000年的时候，Java语言开始大规模流行普及，James Gosling得到了业界的认可。2009年，Sun公司被甲骨文收购，James Gosling随之也去了甲骨文，但是不满一年，他就从甲骨文辞职加入了Google。在加入Google的时候，他曾被HR告知，“通常我们不招你这种年龄的程序员，但你的情况特殊(指的是他 Java 之父的身份)，所以对你特殊考虑”。进入谷歌以后，他的同事都想通过整容变得年轻一点。可能是老年大叔实在无法与年轻人一起愉快的工作，几个月之后，他就从谷歌辞职加入了一家创业公司。
### 打发时间创造的编程语言

![](/images/blog/code-funny/202411302013733-2d4845d0.png)

1989年，Guido van Rossum在阿姆斯特丹为了打发圣诞节的咸鱼时间，开发了一门编程语言——Python。Python是一种解释型、面向对象、动态数据类型的高级程序设计语言，也是全面都应该学习的一种计算机语言，目前的大数据、算法、人工智能等前沿领域都是用其编写。
### hello, world

![](/images/blog/code-funny/202411302026027-4ea9bd86.png)

"Hello, World!"是编程界最经典的入门示例，用于展示一个语言的基本语法和输出功能。

1972年，在[贝尔实验室](https://zh.wikipedia.org/wiki/%E8%B2%9D%E7%88%BE%E5%AF%A6%E9%A9%97%E5%AE%A4 "贝尔实验室")成员[布莱恩·柯林汉](https://zh.wikipedia.org/wiki/%E5%B8%83%E8%90%8A%E6%81%A9%C2%B7%E6%9F%AF%E6%9E%97%E6%BC%A2 "布莱恩·柯林汉")撰写的内部技术文件《A Tutorial Introduction to the Language B》中首次提到了Hello World这一字符串。当时，他使用[B语言](https://zh.wikipedia.org/wiki/B%E8%AA%9E%E8%A8%80 "B语言")撰写了一个用于演示外部变量的示例程序。

1974年，时值[C语言](https://zh.wikipedia.org/wiki/C%E8%AF%AD%E8%A8%80 "C语言")取代B语言，在贝尔实验室的又一内部备忘录《Programming in C: A Tutorial》中，柯林汉用C语言再次编写了一个Hello World程序作为教学示例。这一程序在他和[丹尼斯·里奇](https://zh.wikipedia.org/wiki/%E4%B8%B9%E5%B0%BC%E6%96%AF%C2%B7%E9%87%8C%E5%A5%87 "丹尼斯·里奇")于1978年出版的《[C程序设计语言](https://zh.wikipedia.org/wiki/C%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E8%AF%AD%E8%A8%80_(%E4%B9%A6) "C程序设计语言 (书)")》中得到继承。
### Talk is cheap. Show me the code.

![](/images/blog/code-funny/202411302031989-cacb78cb.png)

在 2000 年 8 月 25 日，在讨论关于Linux内核线程优化的问题时，一个人提出了一个他认为非常高效的[方案](https://lkml.org/lkml/2000/8/25/106)。Linus Torvalds 认为这个方案不好，便在回信中写下了这句至理名言。
### BUG

![](/images/blog/code-funny/202411302035861-dec032de.png)

1947年9月9日，[葛丽丝·霍普](https://zh.wikipedia.org/wiki/%E8%91%9B%E9%BA%97%E7%B5%B2%C2%B7%E9%9C%8D%E6%99%AE "葛丽丝·霍普")（Grace Hopper）发现了第一个电脑bug。有一次[Mark II](https://zh.wikipedia.org/wiki/%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A1%AC%E9%AB%94%E6%AD%B7%E5%8F%B2#%E5%B7%A8%E5%83%8F%E9%9B%BB%E8%85%A6 "计算机硬件历史")突然宕机，整队团队都搞不清电脑为何不能正常运作。经过大家深度挖掘，发现原来有[飞蛾](https://zh.wikipedia.org/wiki/%E9%A3%9E%E8%9B%BE "飞蛾")意外飞入一台电脑引起故障（如图所示）。团队很快排除错误，并在日志本记录这事。也因此，人们逐渐开始用“Bug”（原意为“虫子”）来称呼计算机隐藏错误。

### 价值十亿美元的错误

![](/images/blog/code-funny/202411302039073-3543dfd4.png)

1965年，托尼·霍尔发明了空指针，尽管他也发明过快速排序和霍尔逻辑，但空指针是他最毁誉参半的发明。 2009年一次会议上，他公开道歉，认为这个发明是个价值十亿美元的错误。
### 无法退休的 COBOL 程序员

![](/images/blog/code-funny/202411302043906-8a2d6334.png)

美国至少有 12 个州的失业救济系统运行在已经有 60 年历史、使用 COBOL 编程语言的大型机上。很多 COBOL 职位的招聘要求拥有 20 年工作经验，但开出的年薪却只有 35000 美元。年轻人不愿意学这种复杂的过时语言，这就意味着这些已经 60 岁高龄的 COBOL 程序员至少还需要在未来一二十年里继续维护这些老系统。

### CAFEBABE

![](/images/blog/code-funny/202411302054213-67f5dda2.png)

Java中`class`文件的前四个字节是 `CAFEBABE`，为什么这么定义，Java之父詹姆斯•高斯林是这么解释：

我们过去常去一个叫 St Michael's Alley 的地方吃午饭。根据当地传说，在深邃黑暗的过去，Grateful Dead 乐队在成名之前曾在那里演出。这是一个非常时髦的地方，绝对是一个 Grateful Dead Kinda Place。当 Jerry 去世时，他们甚至建立了一个佛教风格的小神殿，我们把这个地方称为 Cafe Dead。

可以看到，这是一个十六进制数。那时候我正好需要维护一些文件的编码格式，需要用到两个魔数: 一个用于对象持久化文件，另一个用于类文件。于是我就用 CAFEDEAD 作为对象持久化文件的魔数, 类文件选中了BABE。

当时这个魔数并没有什么特别的意义，也没有什么重要的，或许很快就会消失在历史中。所以 CAFEBABE 成为 class 文件的魔数，CAFEDEAD 成为持久对象的魔数。但没多久，持久化对象(persistent object)技术真的消失了，就如同魔数 CAFEDEAD 含义一样 —— 被 RMI 取代。
