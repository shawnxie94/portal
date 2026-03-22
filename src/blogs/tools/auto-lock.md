---
icon: en-to-square
date: 2024-04-08
category:
  - 技术提效
tag:
  - 自动化
  - Mac
  - 教程
---
# 离开工位老是忘记锁屏？试着让电脑自动完成这事吧！
  公司要求离开工位要**立刻**锁定电脑屏幕防止信息泄露，但无论是使用锁屏快捷键还是设置触发角，总感觉不得劲。想想汽车现在基本都是自动锁车了，电脑它就不能自己锁屏吗？于是抽空搜罗了一些自动化的解决方案，并按照Win和Mac进行分类。
<!-- more -->
## 配置方式
### Windows
Windows官方系统就支持“动态锁”，其通过检测和电脑配对的蓝牙设备距离来触发操作，当蓝牙配对设备低于最大接收信号强度指示器 (RSSI) 值时，会自动锁定 Windows 设备。不过此功能仅当蓝牙信号下降且系统处于空闲状态时，动态锁定功能才会锁定设备，也就说如果有人在你刚离开就操作电脑就不能生效😂。
**如何设置自动锁屏**
1. 使用蓝牙将你的手机与电脑配对；
2. 进入「设置」→「账户」→「登录选项」→「动态锁」（或者直接在设置中搜索“动态锁”）；
3. 勾选「允许 Windows 在你离开时自动锁定设备」前的复选框。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251211203.png)


官方文档“[离开Windows自动锁定电脑](https://support.microsoft.com/zh-cn/windows/%E7%A6%BB%E5%BC%80windows%E8%87%AA%E5%8A%A8%E9%94%81%E5%AE%9A%E7%94%B5%E8%84%91-d0a5f536-74ac-0859-820a-4140dac9fcaf)”中对锁定场景的描述是“走出蓝牙覆盖范围约1分钟后自动锁定电脑”，这一点对于需要立即触发锁定的场景不太友好。但在我实际测试中发现只要设备远离到一定程度就会自动锁定，后续官方应该有更新但文档并未同步。

之后从文档“[动态锁](https://learn.microsoft.com/zh-cn/windows/security/identity-protection/hello-for-business/hello-feature-dynamic-lock)”中看到目前可以配置动态锁定因素，目前默认的配置如下：**rssiMin**属性值信号指示设备被视为在范围内所需的强度，默认值-10；**rssiMaxDelta**的默认值-10为，超过度量值后锁定设备。RSSI测量值是相对值，会随两台配对设备之间信号的减弱而降低。测量值0强于-10，-10强于-60，-60表示设备正在相互远离，这个描述可以简单理解为在RSSI[-60,0]范围内不会锁定设备，超过之后自动锁定。一般这个设置足够使用了，去上个厕所的距离大多超过了这个范围。
```XML
<rule schemaVersion="1.0">
  <signal type="bluetooth" scenario="Dynamic Lock" classOfDevice="512" rssiMin="-10" rssiMaxDelta="-10"/>
</rule>
```

### Mac
Mac的设置方式则根据你是否拥有苹果设备和是否愿意有一定花销分成了不同的方式：

#### 有苹果设备且愿意花点小钱
如果你有苹果设备，那么可以通过下载[Near Lock](https://nearlock.me/)应用实现丝滑的锁屏&解锁动作。不过软件虽然可以免费下载使用，但想要在 iPhone 锁定的时候仍然可以使用距离感应来解锁 Mac电脑的话，是需要付费的（这一点挺适合花点小钱提高生活品质的朋友）。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251211407.png)


**如何设置自动锁屏**
分别在 iPhone 和 Mac 上安装好 Near Lock 以后，接下来便可以进入配对操作了。首先请分别在 iPhone 和 Mac 上打开 Near Lock 应用，随后请等待它们之间的配对识别。如下图所示，当 Mac 上的 Near Lock 识别到附近的 iPhone 设备以后，会在 Mac 电脑上显示。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251211050.png)


突然想起本人没有苹果移动设备😭，手机端的配置就不展示了，大家可以自己下载试一试。类似的软件还有MacID（收费）。

#### 没有苹果设备或一毛不拔
如果你啥苹果设备都没有或者就是不想花钱，那么可以使用[BLEUnlock](https://github.com/ts1/BLEUnlock)这款开源软件实现自动解/锁屏。其原理是通过检测蓝牙设备的距离来控制解/锁屏，使用时蓝牙设备无需安装任何应用程序。当蓝牙设备靠近 Mac 电脑时，自动解锁屏幕并唤醒电脑；而当蓝牙设备远离时，自动锁定屏幕并暂停播放音乐/视频。

![](https://cdn.jsdelivr.net/gh/shawnxie94/images/images/202501251212133.png)


尝试了一下，此软件对苹果设备的蓝牙支持更好，其他品牌的设备存在识别不够灵敏的情况，大家可以用自己的手机或者手环试一试。网上也有一些相关的设置教程，如：[小米手环解锁MacOS系统笔记本MacBookPro](https://juejin.cn/post/6964669944327831560?from=search-suggest)。

看到最后是不是觉得还是锁屏快捷键更便利（想想汽车就算有自动锁车还是会人工确认一遍😂，主打一个安心），那就从现在开始养成习惯吧，形成肌肉记忆后锁屏就和呼吸一样自然了，哈哈。


