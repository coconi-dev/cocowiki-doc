---
title: Frontmatter
order: 60
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
order: 10
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
| `order` | `number` | 底部相邻页面导航的阅读顺序，数字越小越靠前 |
| `updated` | `string` | 有效日期字符串，覆盖默认页脚使用的源文件 Git 提交时间 |

如果未填写 `title`，普通 Markdown 会尝试使用正文中的第一个可见一级标题，再回退到文件名；纯 Vue 页面默认使用文件名。为了让搜索和归档保持稳定，仍建议显式填写。

标题、描述等文本字段需要使用字符串；`tags`、`aliases`、`contributors` 必须是字符串数组。错误信息会指出文件路径和字段名，例如 `tags: 示例` 应改成 `tags: [示例]`。不同页面之间的标题和别名也不能冲突，否则 Wiki 内链无法唯一定位。

## 最后更新时间

默认页脚优先使用手动设置的 `updated`：

```yaml
updated: '2026-10-20'
```

也可以使用带时区的 ISO 日期字符串。未设置时读取源 Markdown 文件的最近 Git 提交时间；纯 Vue 页面取 `.page.vue` 与现存同名 `.page.json` 中较新的提交时间。没有手动日期、也没有源文件提交记录时，不显示日期。未提交的编辑不会自动成为新的提交时间。

`showLastUpdated: false` 只隐藏当前页的日期，不会改变搜索和归档收录。

## 搜索与归档

```yaml
search: false
archive: false
```

- `search: false`：不进入全文搜索索引。
- `archive: false`：不显示在归档列表中。

两个选项互不影响。某个页面可以不出现在搜索中，但仍保留在归档里。

## 文档阅读顺序

在页面 Frontmatter 设置 `order`，底部“上一篇 / 下一篇”按数值从小到大排列：

```yaml
---
title: 快速开始
order: 20
---
```

例如 `10 → 20 → 30`；插入新页面时可使用 `15`。支持负数、零和小数，请填写 YAML 数值，避免写成带引号的字符串。

- 未设置、类型不是数字或数值不是有限数的 `order` 排在已设置页面后面。
- 数值相同时按标题排序，标题也相同时按页面路径排序，保证结果稳定。
- `home`、`search`、`archive`、`contributors` 布局和 `search: false` 的页面不参与相邻页面导航。
- `showPrevNext: false` 只隐藏当前页的导航，不会把当前页移出阅读顺序。
- 此顺序不改变搜索排名、归档分组或顶部导航顺序。

全局启用导航：

```ts
content: { showPrevNext: true }
```

纯 Vue 页面在同名 `.page.json` 中设置：

```json
{ "title": "组件图鉴", "order": 120 }
```

开发模式下保存文档或页面元数据后，相邻页面链接会自动更新。

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
`outline` 的明确设置优先于 `sidebar`。`outline: true` 选择右侧目录；`outline: false` 关闭标题目录，并在 `sidebar: light` 时保留轻侧栏。若全局启用了 `outline: true`，单页改用轻侧栏需同时设置 `outline: false` 和 `sidebar: light`。纯 Vue 专属页不会自动生成正文目录。
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
