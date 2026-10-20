---
title: 配置参考
order: 160
description: cocowiki.config.ts 当前支持的全部配置项
type: reference
category: 参考
tags: [配置参考, TypeScript]
aliases: [CocoWikiConfig, 全部配置]
contributors: [Mueo]
---

# 配置参考

以下字段均写在 `defineCocoWikiConfig()` 中。

## 顶层配置

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 必填 | 站点名称 |
| `description` | `string` | 无 | 站点描述 |
| `lang` | `string` | `zh-CN` | 页面语言 |
| `logo` | `string` | 无 | 导航 Logo |
| `favicon` | `string` | `logo` 或 `/favicon.svg` | 浏览器图标 |
| `base` | `string` | `/` | 部署网址根目录 |
| `navigation` | `NavigationItem[]` | 无 | 顶部导航 |
| `directories` | `Directories` | 见下文 | 用户目录位置 |
| `theme` | `ThemeConfig` | 默认主题 | 样式、部件或主题入口 |
| `search` | `SearchConfig` | 开启 | 搜索入口与收录范围 |
| `markdown` | `MarkdownConfig` | 扩展开启 | Markdown 扩展开关 |
| `content` | `ContentConfig` | 见下文 | 内容页默认布局 |
| `home` | `HomeConfig` | 见下文 | 首页文案与搜索入口 |

## `navigation`

```ts
interface NavigationItem {
  text: string
  link?: string
  items?: NavigationItem[]
}
```

```ts
navigation: [
  { text: '首页', link: '/' },
  {
    text: '档案',
    link: '/archive',
    items: [
      { text: '人物', link: '/characters' },
      { text: '物品', link: '/items' }
    ]
  }
]
```

## `directories`

```ts
directories: {
  content?: string      // 默认 content
  components?: string   // 默认 components
  data?: string         // 默认 data
  public?: string       // 默认 public
  out?: string          // 默认 dist
}
```

## `search`

```ts
search: {
  enabled?: boolean
  include?: string[]
  exclude?: string[]
}
```

`enabled` 默认 `true`，控制搜索入口。`include` 默认匹配 `**/*.md`、`**/*.page.vue`、`**/*.page.json`；`include` 和 `exclude` 均使用相对于内容目录的 glob 模式。

这两个范围只决定搜索收录，不影响归档、相邻导航和贡献统计。Vue 源文件与同名 JSON 按同一页面匹配，任一名称命中 exclude 都优先排除整页；显式 `include: []` 不收录页面。

## `markdown`

```ts
markdown: {
  spoiler?: boolean   // 默认 true
  wikiLink?: boolean  // 默认 true
}
```

## `content`

```ts
content: {
  outline?: boolean
  sidebar?: 'none' | 'light' | 'outline'
  showPrevNext?: boolean
  showLastUpdated?: boolean
}
```

当前默认行为是显示右侧目录；前后页默认关闭；最后更新时间默认显示。模板站可以显式开启前后页。

## `home`

```ts
home: {
  name?: string
  text?: string
  tagline?: string
  eyebrow?: string
  note?: string
  search?: {
    placeholder?: string
  }
  visual?: {
    image?: string
    labels?: string[]
  }
  actions?: Array<{
    text: string
    link: string
    theme?: 'brand' | 'alt'
  }>
}
```

`content/index.md` 中的 `hero` 按第一层字段覆盖这些值。首页入口按 `actions` 数组顺序显示为文字链接。

## `theme`

```ts
theme: {
  entry?: string
  styles?: string | string[]
  components?: {
    Header?: string
    Home?: string
    Search?: string
    Archive?: string
    Contributors?: string
    PageMeta?: string
    PageOutline?: string
    ContentSidebar?: string
    PageNavigation?: string
    PageFooter?: string
    SearchOverlay?: string
    Loading?: string
    NotFound?: string
  }
}
```

路径都相对于项目根目录。部件名称区分大小写，未知名称及缺失文件会在启动或配置重建前报告错误；覆盖组件的 props、事件和复用方式见 [[布局与主题]]。

## 页面 Frontmatter 参考

```ts
interface CocoWikiPageMeta {
  title: string
  layout?: string
  description?: string
  type?: string
  category?: string
  tags?: string[]
  aliases?: string[]
  contributors?: string[]
  image?: string
  updated?: string
  search?: boolean
  archive?: boolean
  outline?: boolean
  sidebar?: 'none' | 'light' | 'outline'
  order?: number
  showPrevNext?: boolean
  showLastUpdated?: boolean
}
```

字段解释和示例见 [[Frontmatter]]。

## 完整示例

```ts
import { defineCocoWikiConfig } from 'cocowiki'

export default defineCocoWikiConfig({
  title: '世界档案馆',
  description: '人物、地点与事件记录',
  lang: 'zh-CN',
  base: '/',
  logo: '/logo.png',
  favicon: '/favicon.png',
  navigation: [
    { text: '首页', link: '/' },
    {
      text: '探索',
      link: '/archive',
      items: [
        { text: '万物图鉴', link: '/atlas' },
        { text: '归档索引', link: '/archive' }
      ]
    }
  ],
  search: {
    enabled: true,
    exclude: ['drafts/**']
  },
  markdown: {
    spoiler: true,
    wikiLink: true
  },
  content: {
    outline: true,
    showPrevNext: true,
    showLastUpdated: true
  },
  home: {
    name: '世界档案馆',
    text: '所有资料一处查阅',
    tagline: '搜索人物、地点与事件'
  },
  theme: {
    styles: './styles/custom.css'
  }
})
```

