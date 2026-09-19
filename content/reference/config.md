---
title: 配置参考
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
| `logo` | `string` | 无 | 导航和首页默认 Logo |
| `favicon` | `string` | `logo` 或 `/favicon.svg` | 浏览器图标 |
| `base` | `string` | `/` | 部署网址根目录 |
| `navigation` | `NavigationItem[]` | 无 | 顶部导航 |
| `directories` | `Directories` | 见下文 | 用户目录位置 |
| `theme` | `ThemeConfig` | 默认主题 | 样式、部件或主题入口 |
| `search` | `SearchConfig` | 开启 | 搜索开关与扫描范围 |
| `markdown` | `MarkdownConfig` | 扩展开启 | Markdown 扩展开关 |
| `content` | `ContentConfig` | 见下文 | 内容页默认布局 |
| `home` | `HomeConfig` | 见下文 | 首页内容与视觉 |

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

`include` 默认扫描 `**/*.md`；`exclude` 使用相对于内容目录的 glob 模式。

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

`content/index.md` 中的 `hero` 可以覆盖这些值。

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

路径都相对于项目根目录。部件名称区分大小写，未知名称会在启动时报告错误。

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
    visual: {
      image: '/logo.png',
      labels: ['人物', '地点', '组织', '物品']
    }
  },
  theme: {
    styles: './styles/custom.css'
  }
})
```

