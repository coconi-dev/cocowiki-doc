---
title: 首页与导航
description: 配置搜索优先首页、星轨视觉、操作按钮和下拉导航
type: guide
category: 配置
tags: [首页, 导航, Hero, 星轨]
aliases: [首页配置, 导航配置]
contributors: [Mueo]
---

# 首页与导航

## 建立首页

`content/index.md` 使用 `home` 布局：

```md
---
layout: home
title: 世界档案馆
search: false
hero:
  eyebrow: WORLD ARCHIVE
  name: 世界档案馆
  text: 每一页，都留住一段来路。
  tagline: 在人物、地点和旧日事件之间寻找线索。
  search:
    placeholder: 搜索人物、地点或关键词…
  actions:
    - theme: brand
      text: 开始阅读
      link: /welcome
    - theme: alt
      text: 浏览归档
      link: /archive
  note: 内容会在每次构建时整理为静态页面。
---
```

Frontmatter 中的 `hero` 会覆盖 `cocowiki.config.ts` 的 `home` 配置，适合把首页文案留在内容文件中。

## 配置星轨视觉

```ts
home: {
  visual: {
    image: '/logo.png',
    labels: ['人物', '地点', '组织', '物品', '事件', '概念']
  }
}
```

- `image` 是星轨中央图片；未填写时使用站点 `logo`。
- `labels` 最多显示前六项。
- 图片建议使用接近正方形、背景透明或边缘干净的 PNG / WebP。

首页的文字也可以全部写在配置中：

```ts
home: {
  eyebrow: 'WORLD ARCHIVE',
  name: '世界档案馆',
  text: '每一页，都留住一段来路。',
  tagline: '在散落的记录之间寻找线索。',
  note: '静态构建，随处部署。',
  search: { placeholder: '搜索整个资料库…' },
  actions: [
    { text: '开始阅读', link: '/welcome', theme: 'brand' },
    { text: '浏览归档', link: '/archive', theme: 'alt' }
  ],
  visual: {
    image: '/logo.png',
    labels: ['人物', '地点', '组织']
  }
}
```

## 普通导航项

```ts
navigation: [
  { text: '首页', link: '/' },
  { text: '世界观', link: '/world' },
  { text: '时间线', link: '/timeline' }
]
```

## 下拉导航

给导航项添加 `items`：

```ts
navigation: [
  {
    text: '档案',
    link: '/archive',
    items: [
      { text: '人物', link: '/archive/characters' },
      { text: '物品', link: '/archive/items' },
      { text: '全部归档', link: '/archive' }
    ]
  }
]
```

当父项同时有 `link` 和 `items` 时，下拉菜单顶部会出现“查看全部”。移动端导航会折叠，点击父项按钮展开子项。

:::tip 保持导航简短
搜索优先并不等于没有导航。把首页、核心功能页和少量主题入口放进导航即可，具体词条交给搜索和归档。
:::

