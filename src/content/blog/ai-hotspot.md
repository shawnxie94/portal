---
title: "没时间了解技术热点？让大模型帮你整理重点吧！"
description: "提问：技术人的精神食粮是什么❓ AI给出的第一条是“ 知识与学习 ”。学习的方式有很多种，对笔者而言了解新技术和新热点是保持职业热爱很重要的方式。完成日常工作是保证物质基础，人终究还是想追求一些精神价值😂。 但日常工作已经占用了大量的"
pubDate: 2024-06-03
category: "AI探索"
tags:
  - "AI"
  - "智能体"
  - "自动化"
draft: false
originalPath: "/blogs/ai/ai-hotspot.html"
---

**提问：技术人的精神食粮是什么❓**
AI给出的第一条是“**知识与学习**”。学习的方式有很多种，对笔者而言了解新技术和新热点是保持职业热爱很重要的方式。完成日常工作是保证物质基础，人终究还是想追求一些精神价值😂。

但日常工作已经占用了大量的时间，此外还有生活琐事需要对线，根本就没有时间搜集并学习新知识。这时如果有一个工具能**自动抓取技术热点**并将长篇大论的文字**浓缩为100~200字左右的摘要**，这样每天花半个小时就能消化信息了，这也太棒了吧（看过摘要也算读过文章了😁）。



![](/images/blog/ai-hotspot/202501261127030-f68f5db0.png)

## 实现思路
![](/images/blog/ai-hotspot/202501261127194-109599b4.png)

实现过程分三步走：信息收集 -> 信息解读 -> 结果展示。其中：

**① 信息收集**：对感兴趣的内容进行收集。实现方式可以使用聚合API、RSS或者自定义爬虫；

**② 信息解读**：通过大模型对内容进行解读。目前通过端直接访问的大模型大多都带有搜索能力，将网页发送给它就可以生成摘要。但多数大模型开放API不带搜索能力，需要自己抓取网页内容再传递给它处理；

![](/images/blog/ai-hotspot/202501261127382-67634d52.png)

**③ 结果展示**：将文章原始信息和解读后的摘要按照一定格式进行展示。
## 落地方案
业余时间搞了一个DEMO：[developer-hotspots-summary](https://github.com/shawnxie94/developer-hotspots-summary)，基本实现了按照配置的榜单信息进行抓取和解读功能，但暂未实现“文章重复数据过滤”、“自定义爬虫”和“文章内容预处理”功能，后续会逐步完善。生成的结果样例如下，完整数据查看☞[生成样例](https://github.com/shawnxie94/developer-hotspots-summary/blob/main/result/2024-06-03%E7%83%AD%E9%97%A8%E6%96%87%E7%AB%A0.md)。

![](/images/blog/ai-hotspot/202501261128108-98da9ddd.png)

下面简要说明实现方案：
### 信息收集
信息收集主要是对感兴趣的内容进行收集，可使用聚合API、RSS或者自定义爬虫。目前DEMO实现了基于聚合API和RSS的内容收集，下面介绍不同方式的基本实现思路：

**① 聚合API**

聚合API已经对信息进行了封装并提供了易用的接口，上手难度最低，但天下没有免费的午餐一般都会按照调用量收取一定费用。DEMO中使用[今日热榜](https://tophub.today/)的开放API [Tophubdata](https://www.tophubdata.com/)，目前提供了[7500+](https://www.tophubdata.com/all-nodes)数据源。

![](/images/blog/ai-hotspot/202501261128784-d48a6a87.png)

接口的调用也封装的很简洁，通过修改数据源类型可实时获取最新数据，具体代码实现可以查看DEMO源码。
```bash
curl --location 'https://api.tophubdata.com/nodes/mproPpoq6O' --header 'Authorization: YOUR_ACCESS_KEY'
```
```json
{
    "error":false,
    "status":200
    "data": {
        "hashid": "mproPpoq6O",
        "name": "知乎",
        "display": "热榜",
        "domain": "zhihu.com",
        "logo": "********",
        "items": [
            {
                "extra": "455 万热度",
                "url": "https://www.zhihu.com/question/629047878",
                "thumbnail": "https://pica.zhimg.com/80/v2-00a693d9ac81c601223512d5725cbacd_1440w.png",
                "description": "美联储加息周期终于似要走到尽头了。 ",
                "title": "美元大跳水，10 年期美债收益率大跌，离岸人民币大涨 400 点，美股五连阳，美联储加息周期到头了吗？"
            },
            {
                "extra": "206 万热度",
                "url": "https://www.zhihu.com/question/621684259",
                "thumbnail": "https://pic3.zhimg.com/50/v2-0e599dcb44ad61215462fdfbb58d983e_qhd.jpg",
                "description": "感觉老一辈的亲戚总是不知道一些边界感，每次都无下限的打探我的个人问题和生活，弄得我非常的不适。要怎么样才能有礼貌的进行回应呢？",
                "title": "过节聚餐时总感到亲戚在惯性「侵犯」我的边界，是我太敏感还是「亲戚PTSD」在作祟？"
            }
            ...
        ]
    }
  }
```
其他还有历史数据获取、WebHook功能可以自己研究一下[API文档](https://www.tophubdata.com/documentation#%E5%88%9B%E5%BB%BA%E5%B8%90%E6%88%B7)。不过由于调用会收费，不是长久之计。

**② RSS源**

如果网站支持RSS，那么可以通过RSS源获取到页面最新的内容信息。

![](/images/blog/ai-hotspot/202501261129942-8723fff0.png)

![](/images/blog/ai-hotspot/202501261129552-f90b0786.png)

如果未提供源，那就要感谢 [RSSHub](https://docs.rsshub.app/zh/guide/)项目了，它可以给各种奇奇怪怪的网站生成了 RSS 源，堪称“万物皆可 RSS”。再结合[RSSHub Radar](https://chromewebstore.google.com/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa)或脚本[RSS+](https://greasyfork.org/zh-CN/scripts/373252-rss-show-site-all-rss)对当前页面RSS源进行检测，妈妈再也不用担心我找不到订阅源啦。更多扩展知识可阅读“[可能是 2023 年最全的 RSS 源，微信公众号也有！](https://www.runningcheese.com/rss-subscriptions)”这篇文章，一些热门的RSS源可以在[top-rss-list](https://github.com/weekend-project-space/top-rss-list)获取。

![](/images/blog/ai-hotspot/202501261129492-4d08d8e3.png)

介绍完RSS源的获取方式后，下面用代码实现从rss源中获取文章名称和地址。
```python
import feedparser

def parse_rss_feed(rss_url):
    # 解析 RSS 源
    feed = feedparser.parse(rss_url)
    # 创建一个列表存储结果
    result = []
    # 遍历每个条目，提取标题和链接，并添加到结果列表中
    for entry in feed.entries:
        item = {
            'title': entry.title,
            'url': entry.link
        }
        result.append(item)
    return result

# 示例 RSS 源 URL
rss_url = 'https://www.shawnxie.top/feed.xml'
# 调用函数并获取结果
parsed_feed = parse_rss_feed(rss_url)
# 打印结果
for item in parsed_feed:
    print(item)
```
**③ 自定义爬虫**

如果上述两种方式都不能获取到想要的信息，那就只有通过自定义爬虫了。由于实现的逻辑比较定制化，DEMO中暂时没有提供相关功能。下面举例说明抓取掘金热榜数据过程，使用[Selenium](https://www.selenium.dev/)加载页面，然后使用[BeautifulSoup](https://pypi.org/project/beautifulsoup4/)解析HTML并提取所需的信息。

![](/images/blog/ai-hotspot/202501261130917-aaa1996b.png)

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup

url = 'https://juejin.cn/hot/articles/6809637769959178254'
 # 设置浏览器选项
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # 无头模式，不显示浏览器窗口
options.add_argument('--disable-gpu')

# 启动浏览器
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get(url)

# 等待页面加载完成（根据页面复杂度设置适当的等待时间）
time.sleep(5)

# 获取页面HTML
html = driver.page_source

# 使用BeautifulSoup解析HTML
soup = BeautifulSoup(html, 'html.parser')

# 查找所有文章项
article_items = soup.find_all('a', class_='article-item-link')

# 存储文章数据
articles = []

for item in article_items:
    link = item['href']
    title = item.find('div', class_='article-title').text.strip()
    articles.append({'title': title, 'link': 'https://juejin.cn' + link})

# 输出文章数据
for article in articles:
    print(f"Title: {article['title']}, Link: {article['link']}")

# 关闭浏览器
driver.quit()
```

![](/images/blog/ai-hotspot/202501261130958-31660f9d.png)

### 信息解读
通过大模型对文章内容进行解读。大模型是否具备搜索能力将影响功能实现的难易程度，OpenAI、Gemini等自带搜索能力的大模型直接将网址发送进行总结即可，而国内的大模型API大多是离线的，则需要提前对网页内容抓取和预处理。由于一些不可抗因素，DEMO使用了不带搜索能力的大模型[KIMI](https://kimi.moonshot.cn/)（文档总结能力强），信息解读功能实现分为了两部分：

**① 网页内容获取**

由于使用的大模型API本身不带搜索能力，因此需要获取网页html静态文本信息并转换为字符串。
```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

def fetch_article_content(url):
    print(f"【LOG】fetch_article_content: {url}")
    try:
        # 设置浏览器选项
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # 无头模式，不显示浏览器窗口
        options.add_argument('--disable-gpu')

        # 启动浏览器
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.get(url)

        # 等待页面加载完成
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )

        # 获取页面内容
        page_content = driver.page_source
        driver.quit()

        # 解析页面内容
        soup = BeautifulSoup(page_content, 'html.parser')
        text = soup.get_text()
        cleaned_lines = [line.strip() for line in text.splitlines() if line.strip()]
        return '\n'.join(cleaned_lines)
    except Exception as e:
        print(f"【LOG】获取文章内容异常: {e}")
    return None
```

![](/images/blog/ai-hotspot/202501261130244-1dbc04b2.png)

直接获取的内容存在较多噪音，如：评论、作者信息、目录以及推荐文章列表等，这些都会对AI生成造成影响，使得生成的结果不符合预期。因此在内容获取后最好再添加一步“预处理”或“数据清洗”动作，仅留下关联性更高的内容。目前DEMO暂未实现清洗功能，后续会调研一下通用实现方案。

**② 大模型生成文章摘要**

将第一步获取的内容传递给大模型API生成文章摘要。
```python
from openai import OpenAI
import fetch, time

# 调用kimi api生成摘要
def summarize_content_kimi(url, key):
    try:
        # kimi api暂不支持搜索 需要调用内容抓取
        content = fetch.fetch_article_content(url)
        if content == None : return
        # 调用kimi api生成摘要
        client = OpenAI(
            api_key = key,
            base_url = 'https://api.moonshot.cn/v1',
        )
        completion = client.chat.completions.create(
            # 如果传入的文本太大可以调整模型
            model = "moonshot-v1-32k",
            messages = [
                {"role": "system", "content": "你是Kimi，你擅长对软件开发技术博客进行内容总结。你会为用户提供安全，有帮助，准确的回答。"},
                {"role": "user", "content": "请协助我对博客内容进行总结，150字以内，博客内容为：" + content}
            ],
            temperature = 0.3
        )
        result = completion.choices[0].message.content
        time.sleep(20)  # 注意控制调用频率，免费版为每分钟3次
        return result
    except Exception as e:
        print(f"【LOG】使用ai总结文章异常: {e}")
    return None
```
### 结果展示
将文章原始信息和解读后的摘要按照一定格式进行展示。这部分诉求因人而异，对笔者来说方便信息阅读即可，因此使用[markdown_strings](https://github.com/awesmubarak/markdown_strings)生成了简单的md表格。
```python
import markdown_strings as md
...
contents = []
file_title = date + '热门文章'
contents.append(md.header(file_title, 1))
contents.append(md.blockquote('Power By: [developer-hotspots-summary](https://github.com/shawnxie94/developer-hotspots-summary).'))
for key, value in result.items():
    contents.append(md.header(key, 2))
    table_title = ['文章']
    table_summary= ['摘要']
    for item in value:
        table_title.append(f"[{item['title'].replace("|", "")}]({item['url'].replace(" ", "")})")
        table_summary.append(item['summary'])
    contents.append(md.table([table_title, table_summary]))
with open('./result/' + file_title + '.md', 'w', encoding="utf8") as file:
    file.write("\n".join(contents))
```
## 总结
笔者对此类功能零开发经验，整个过程搜索了大量的资料并使用大模型辅助，整体感觉很不错，很多诉求大模型都可以给出比较接近的解决方案，细节问题也可以通过多轮对话进行解决。DEMO还有很多可以优化的地方，后续会优化一下抓取逻辑提供更多免费的抓取方式并加上重复文章过滤能力，对于文章解读这块也会接入一些自带搜索能力的大模型，尽量让文章的解读更准确和精炼。最后，很期待后续大模型会进化成什么样，但又有点小怕😂。不过回顾历史，解放生产力后往往会创造新的生产力，作为历史洪流中的一粒尘埃，还是顺势而为吧。
## 参考
- [Selenium 浏览器自动化项目](https://www.selenium.dev/zh-cn/documentation/)
- [可能是 2023 年最全的 RSS 源，微信公众号也有！](https://www.runningcheese.com/rss-subscriptions)
-  [sum4all](https://github.com/fatwang2/sum4all?tab=readme-ov-file)
- GPT-4o
