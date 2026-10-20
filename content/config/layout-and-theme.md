---
title: 布局与主题
order: 150
description: 配置内容侧栏、目录、前后页、暗色模式与主题覆盖
type: guide
category: 配置
tags: [布局, 主题, CSS, 暗色模式]
aliases: [自定义主题, 内容布局]
contributors: [Mueo]
---

# 布局与主题

## 全局内容布局

```ts
content: {
  outline: true,
  sidebar: 'outline',
  showPrevNext: true,
  showLastUpdated: true
}
```

| 选项 | 作用 |
| --- | --- |
| `outline` | 快速开启或关闭 Markdown 标题目录 |
| `sidebar: 'none'` | 不显示侧栏 |
| `sidebar: 'light'` | 显示轻量内容入口侧栏 |
| `sidebar: 'outline'` | 显示当前页面右侧目录 |
| `showPrevNext` | 显示上一篇、下一篇 |
| `showLastUpdated` | 显示最后更新时间 |

单页可以用同名 Frontmatter 覆盖：

```yaml
---
outline: false
sidebar: none
showPrevNext: false
showLastUpdated: false
---
```

`outline` 的明确设置优先于 `sidebar`。例如本站全局开启了 `outline: true`，单页需要无侧栏时应同时设置 `outline: false`；使用轻侧栏时写成：

```yaml
outline: false
sidebar: light
```

## 相邻页面顺序

开启 `showPrevNext` 后，每页 Frontmatter 中的 `order` 控制阅读顺序。数值越小越靠前，未设置的排在后面。`order` 是页面字段，不放在全局 `content` 中，完整规则见 [[Frontmatter]]。

## 默认外观与动效

默认主题包含半透明导航与搜索控件、首页动态曲线和紧凑贡献者名片。页面切换以短暂淡入为主，列表有轻微错峰出现，按钮和卡片提供按压、悬停反馈；正文不做逐段滚动入场。

动效遵循系统的“减少动态效果”，透明控件遵循“减少透明度”。若希望所有访客都看到静态背景，可在自定义 CSS 中隐藏 `.cw-home-flow`。没有独立的 `motion` 或 `glass` 配置字段。

## Light、Dark 与 System

默认主题内置三种模式，读者可以通过导航栏按钮循环切换：

1. `System`：跟随操作系统，并实时响应系统主题变化。
2. `Light`：固定亮色。
3. `Dark`：固定暗色。

选择保存在浏览器本地，不需要在配置中维护状态。

## 添加自己的样式

新建 `styles/custom.css`：

```css
:root {
  --cw-accent: #7657d6;
  --cw-radius: 14px;
}

.dark {
  --cw-accent: #a995ff;
}
```

然后配置：

```ts
theme: {
  styles: './styles/custom.css'
}
```

多个文件可以使用数组：

```ts
theme: {
  styles: [
    './styles/colors.css',
    './styles/content.css'
  ]
}
```

自定义样式在默认主题之后加载，适合修改变量、排版和局部组件外观。

## 替换布局部件

可以保留 CoCoWiki 的整体布局，只替换特定部分：

```ts
theme: {
  components: {
    Header: './theme/MyHeader.vue',
    PageFooter: './theme/MyPageFooter.vue',
    NotFound: './theme/MyNotFound.vue'
  }
}
```

支持的部件名：

| 区域 | 名称 |
| --- | --- |
| 顶部与首页 | `Header`、`Home` |
| 功能页 | `Search`、`Archive`、`Contributors` |
| 内容页 | `PageMeta`、`PageOutline`、`ContentSidebar`、`PageNavigation`、`PageFooter` |
| 全局状态 | `SearchOverlay`、`Loading`、`NotFound` |

替换组件会异步加载。路径相对于项目根目录；缺失的主题入口、样式或覆盖组件，以及未知部件名，会在配置预检查时报告。

### 覆盖组件的接口

| 部件 | Props | 事件 |
| --- | --- | --- |
| `Header` | 无 | `open-search`：请求打开搜索浮层 |
| `PageOutline` | `headers?: { level, title, slug }[]` | 无 |
| `PageFooter` | `showLastUpdated?: boolean` | 无 |
| `SearchOverlay` | 无 | `close`：请求关闭搜索浮层 |

其余覆盖点没有约定 props 或事件，所有覆盖点均无命名插槽。可通过 VitePress 的 `useData()`、`useRoute()` 读取页面状态；覆盖搜索浮层时，需要处理焦点、键盘和页面滚动恢复。

默认组件可以从 `cocowiki/theme/components` 导入复用，默认布局以 `CocoWikiLayout` 从 `cocowiki/theme` 导出。

## 使用完整主题入口

如果确实需要完全接管 VitePress 主题，可以指定入口：

```ts
theme: {
  entry: './theme/index.ts'
}
```

完整主题入口需要导出 VitePress `Theme` 对象。此方式会取代默认主题，适合已经熟悉 Vue 与 VitePress 主题结构的站点；普通视觉调整优先使用 `styles` 和 `components`。

