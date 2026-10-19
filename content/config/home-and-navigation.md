---
title: 首页与导航
order: 140
description: 配置首页名称、说明、副标题、搜索和站点导航
type: guide
category: 配置
tags: [首页, 导航, Hero]
aliases: [首页配置, 导航配置]
contributors: [Mueo]
---

# 首页与导航

## 建立首页

在 `content/index.md` 使用 `home` 布局：

```md
---
layout: home
title: 世界档案馆
search: false
archive: false
hero:
  name: 世界档案馆
  text: 所有资料一处查阅
  tagline: 搜索人物、地点与事件
  search:
    placeholder: 搜索人物、地点或关键词…
  actions:
    - text: 开始阅读
      link: /guide/introduction
    - text: 浏览归档
      link: /archive
  note: 由 CoCoWiki 构建
---
```

`search: false` 只让首页不进入搜索结果，不会隐藏首页搜索框。若要关闭站点搜索入口，请设置全局 `search.enabled: false`。

## 文案层级

| 字段 | 默认主题中的用途 |
| --- | --- |
| `name` | 最大号主标题；未设置时使用站点 `title` |
| `text` | 主标题下方的说明，建议保持为一句简短文案 |
| `tagline` | 灰色副标题，可省略 |
| `eyebrow` | 主标题上方的可选小字，通常不必设置 |
| `search.placeholder` | 搜索框提示文字 |
| `actions` | 搜索框下方的文字入口 |
| `note` | 页面底部的小字说明 |

`hero` 与配置中的 `home` 按第一层字段合并；同名字段以当前页面为准。例如在 Frontmatter 中设置 `search`，会替换整个 `home.search` 对象。

## 在站点配置中设置默认值

```ts
home: {
  name: '世界档案馆',
  text: '所有资料一处查阅',
  tagline: '搜索人物、地点与事件',
  search: { placeholder: '搜索整个资料库…' },
  actions: [
    { text: '开始阅读', link: '/guide/introduction' },
    { text: '浏览归档', link: '/archive' }
  ],
  note: '由 CoCoWiki 构建'
}
```

首页入口由 `actions` 的文字与链接组成，按数组顺序显示。

## 首页背景

默认主题内置倒 8 曲线、侧边波纹和淡色背景层。线条缓慢漂移，不影响搜索、链接点击或键盘操作；深色模式有对应配色，系统开启“减少动态效果”时曲线保持静止。

背景没有单独的配置字段。如需隐藏，可通过 `theme.styles` 加载自定义 CSS：

```css
.cw-home-flow {
  display: none;
}
```

若需要完全不同的首页结构，可使用 `theme.components.Home` 替换首页，见 [[布局与主题]]。

## 普通导航项

```ts
navigation: [
  { text: '首页', link: '/' },
  { text: '使用指南', link: '/guide/introduction' },
  { text: '归档索引', link: '/archive' }
]
```

## 下拉导航

```ts
navigation: [
  {
    text: '开始使用',
    link: '/guide/introduction',
    items: [
      { text: '认识 CoCoWiki', link: '/guide/introduction' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '项目目录', link: '/guide/project-structure' }
    ]
  }
]
```

父项同时有 `link` 和 `items` 时，下拉菜单顶部会出现“查看全部”。移动端先打开导航，再点击父项按钮展开子项；按 `Escape` 可关闭导航。

导航项按配置数组顺序显示。文档底部“上一篇 / 下一篇”的阅读顺序由页面 `order` 控制，两者独立。
