---
title: Frontmatter
description: 使用页面元信息控制标题、搜索、归档、贡献者与内容布局
type: reference
category: 内容创作
tags: [Frontmatter, 页面元信息, YAML]
aliases: [页面元信息]
contributors: [Mueo]
---

# Frontmatter

Frontmatter 是 Markdown 文件开头两条 `---` 之间的 YAML 数据。CoCoWiki 用它生成页面标题、搜索索引、归档分类、贡献者和布局。

```yaml
---
title: 皙折
description: CoCoWiki 示例页面中的资料整理者
type: member
category: 项目成员
tags:
  - CoCoWiki
  - 文档
aliases:
  - 皙折同学
contributors:
  - Mueo
image: /contributors/xizhe.webp
---
```

## 基础字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `title` | `string` | 页面标题；建议始终填写 |
| `description` | `string` | 页面摘要，用于搜索结果和页面信息 |
| `type` | `string` | 内容类型，例如 `character`、`item` |
| `category` | `string` | 面向读者显示的分类，例如“人物” |
| `tags` | `string[]` | 可搜索标签 |
| `aliases` | `string[]` | 别名，可用于搜索和 Wiki 内链 |
| `contributors` | `string[]` | 贡献者键名 |
| `image` | `string` | 页面相关图片地址，供组件或自定义主题使用 |
| `updated` | `string` | 保留给组件或自定义主题使用的更新时间文本 |

如果未填写 `title`，普通 Markdown 会尝试使用正文中的第一个一级标题；为了让搜索和归档保持稳定，仍建议显式填写。

## 搜索与归档

```yaml
search: false
archive: false
```

- `search: false`：不进入全文搜索索引。
- `archive: false`：不显示在归档列表中。

两个选项互不影响。某个页面可以不出现在搜索中，但仍保留在归档里。

## 内容布局

```yaml
outline: true
sidebar: outline
showPrevNext: true
showLastUpdated: true
```

| 字段 | 可选值 | 说明 |
| --- | --- | --- |
| `outline` | `true` / `false` | 是否显示当前页面标题目录 |
| `sidebar` | `none` / `light` / `outline` | 无侧栏、轻侧栏或右侧目录 |
| `showPrevNext` | `boolean` | 是否显示上一篇与下一篇 |
| `showLastUpdated` | `boolean` | 是否显示构建得到的最后更新时间 |

单页设置优先于 `cocowiki.config.ts` 中的全局 `content` 设置。

:::info `outline` 与 `sidebar`
`outline: true` 会选择右侧目录，`outline: false` 会关闭目录；如需轻侧栏，请直接使用 `sidebar: light`。纯 Vue 专属页不会自动生成正文目录。
:::

## 特殊布局

框架内置以下布局入口：

```yaml
layout: home
layout: search
layout: archive
layout: contributors
```

它们分别用于首页、搜索页、归档页和贡献者页。一般内容页面不需要填写 `layout`；`.page.vue` 页面会自动生成 `special` 布局，不应手动设置。

## 数组写法

简单数组可以写在一行：

```yaml
tags: [项目成员, CoCoWiki, 文档]
```

也可以分行：

```yaml
tags:
  - 项目成员
  - CoCoWiki
  - 文档
```

两种写法效果相同。
