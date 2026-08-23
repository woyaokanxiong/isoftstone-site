# 伟业泽城企业官网（示例站点）

一个仿照企业数字化转型服务商官网风格制作的**静态企业官网**，金色主题设计（主色 `#DAA520`），内容均为原创，仅用于学习演示。

## 技术栈

- 纯静态 HTML + CSS + JavaScript
- 无构建工具，可直接部署到 GitHub Pages

## 页面结构

| 页面 | 说明 |
| --- | --- |
| `index.html` | 首页（轮播图、核心业务、数据统计、信息推荐、近期新闻） |
| `services.html` | 软件与数字技术服务 |
| `operations.html` | 数字化运营服务 |
| `industries.html` | 行业解决方案 |
| `about.html` | 关于我们 |
| `news.html` | 新闻中心 |
| `career.html` | 人才招聘 |
| `contact.html` | 联系我们 |

## 功能特性

- 响应式布局（桌面 / 平板 / 移动端）
- Hero 轮播图（自动播放、箭头与指示点切换）
- 数字滚动动画（滚动到可视区触发）
- 下拉导航菜单
- 移动端汉堡菜单
- 联系表单（演示功能）

## 本地预览

在项目目录下执行：

```bash
python -m http.server 8000
```

然后访问 http://localhost:8000

## 目录结构

```
isoftstone-site/
├── index.html
├── services.html
├── operations.html
├── industries.html
├── about.html
├── news.html
├── career.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

> 说明：本项目为学习演示用途，站内名称、文案、数据均为虚构原创，不涉及任何真实企业的商标与版权。
