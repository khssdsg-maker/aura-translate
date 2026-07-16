# 🌌 AuraTranslate | 极光翻译与智能英语备考系统

AuraTranslate 是一款将**高颜值毛玻璃（Glassmorphism）视觉设计**与**智能英语备考学习**融为一体的单页 Web 应用。它不仅提供流畅的实时翻译功能，还内置了口语跟读评测、3D 单词卡片、以及大学英语四六级（CET-4/CET-6）30天备考计划与真题模拟训练系统。

---

## ✨ 核心特性

### 1. 🌌 极致的现代美学 UI (Premium Glassmorphism)
- **毛玻璃效果**：利用 `backdrop-filter` 实现了极具质感的半透明卡片设计。
- **动态光晕**：背景内置三层随时间微弱漂移的彩色渐变光晕（Glow Blobs），营造极光的流光溢彩感。
- **深浅色主题**：支持一键切换深色/浅色模式，并支持与系统设置（Dark Mode）自动同步。
- **响应式布局**：完美适配手机、平板及电脑屏幕。

### 2. ⚡ 强劲的翻译引擎
- **免 Key API 接入**：基于 MyMemory 翻译接口，支持中、英、日、韩、法、西、德、俄等多国语言对调翻译。
- **智能分片翻译 (Auto-Chunking)**：突破免费接口单次 1000 字符的限制。输入长文本时自动按段落/标点切分并行请求并拼接，支持长篇翻译。
- **输入防抖与缓存**：内置 800ms 输入防抖与内存 Cache 机制，避免重复接口请求，节省流量并提升加载速度。

### 3. 🎓 Aura Academy 英语学习中心
- **3D 智能单词卡片 (Flashcards)**：
  - 用户可直接将翻译结果一键保存至“生词本”。
  - 采用 CSS 3D 转换实现的翻转卡片，正反面展示发音与释义。
- **每日美句跟读**：
  - 每日精选双语佳句，支持单词智能拆解与一键收录生词本。
- **口语跟读评测 (Oral Evaluation)**：
  - 接入浏览器 SpeechRecognition 语音识别。
  - 对用户的跟读发音进行分析，结合模糊文本比对算法计算准确度，并使用精美的 **SVG 环形图表**反馈百分比得分与评语。

### 4. 📝 四六级备考与错题本系统 (CET-4 & CET-6 Prep)
- **30天备考计划日历**：内置 CET-4/6 专属 30 天打卡进度管理，支持打卡进度条百分比展示。
- **专项模拟训练**：
  - 支持“词汇专项”与“仔细阅读”测试。
  - **即时批改与详解**：点击选项后立即高亮显示正误（绿色正确，红色错误）并弹出详尽的词汇语法解析。
- **错题本系统**：
  - 错题自动归档，采用底部滑入式抽屉设计。
  - 支持错题**“一键重做”**（自动重新加载至答题区）或移除。

---

## 🛠️ 技术栈

- **前端核心**：Semantic HTML5, CSS3 (Vanilla / Custom properties), JavaScript (ES6+)
- **图标资源**：FontAwesome 6.4.0 (CDN)
- **字体族**：Outfit & Inter (Google Fonts)
- **核心 Web API**：Web Speech API (`speechSynthesis` / `SpeechRecognition`), Web Storage API (`localStorage`)

---

## 🚀 快速开始

项目为纯静态网页，无需安装任何复杂的依赖，克隆后即可直接运行。

### 1. 克隆项目
```bash
git clone https://github.com/khssdsg-maker/aura-translate.git
cd aura-translate
```

### 2. 运行本地 Web 服务

**使用 Python (推荐)：**
```bash
python -m http.server 8080
```

**使用 Node.js (如果您安装了 npm)：**
```bash
npx http-server -p 8080
```

### 3. 访问项目
在浏览器中打开 **[http://localhost:8080](http://localhost:8080)** 即可开始使用。

---

## 📂 项目结构

```text
aura-translate/
├── index.html     # 主页面结构及 DOM 容器
├── index.css      # 全局毛玻璃设计系统、3D卡片及自适应样式
├── app.js         # 翻译防抖、API请求、语音合成/识别、四六级备考与缓存逻辑
└── README.md      # 项目说明文档
```

---

## 💡 友情提示
*   由于 **SpeechRecognition (语音识别)** 功能依赖浏览器的 Web Speech API，建议在最新版 **Google Chrome** 或 **Microsoft Edge** 浏览器中访问以获得最佳的口语测评体验。
*   如遇网络波动导致翻译请求失败，可稍后点击“立即翻译”按钮进行手动重试。
