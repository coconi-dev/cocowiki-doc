---
title: Markdown 与扩展
description: 在 CoCoWiki 中使用标准 Markdown、Wiki 内链、剧透和提示容器
type: guide
category: 内容创作
tags: [Markdown, WikiLink, 剧透, 提示框]
aliases: [Markdown 语法, 自定义 Markdown]
contributors: [Mueo]
---

# Markdown 与扩展

CoCoWiki 兼容 VitePress 支持的标准 Markdown，并在其上加入少量适合资料站的语法。标题、列表、引用、表格、图片和代码块可以照常使用。

## 标题与目录

```md
# 页面标题

## 第一部分

### 更具体的内容
```

右侧目录会从二级、三级标题生成。一个页面建议只保留一个一级标题；是否显示目录可以在站点或单页配置中控制。

## 链接与图片

```md
[外部链接](https://example.com)

[站内页面](/guide/getting-started)

![图片说明](/images/example.webp)
```

放在 `public/` 下的资源从 `/` 开始引用。

## Wiki 内链

用双方括号按页面标题或别名链接：

```md
阅读 [[快速开始]]，然后查看 [[Frontmatter]]。
```

实际效果：阅读 [[快速开始]]，然后查看 [[Frontmatter]]。

如果目标标题尚不存在，链接会前往搜索页并自动搜索括号中的文字。页面别名来自 Frontmatter 的 `aliases`。

## 剧透

```md
||这里藏着一段剧透。||
```

实际效果：||这里藏着一段剧透。||

剧透默认被遮挡，可通过鼠标悬停、键盘聚焦或点击显示；再次点击会隐藏。

## 提示容器

### 信息

```md
:::info 补充信息
这里是一段背景说明。
:::
```

:::info 补充信息
这里是一段背景说明。
:::

### 提示

```md
:::tip 写作建议
为页面填写 description，可以改善搜索结果摘要。
:::
```

:::tip 写作建议
为页面填写 `description`，可以改善搜索结果摘要。
:::

### 注意与警告

```md
:::warning 注意
修改 base 后应重新执行构建。
:::

:::danger 警告
不要直接修改 .cocowiki 目录。
:::
```

:::warning 注意
修改 `base` 后应重新执行构建。
:::

:::danger 警告
不要直接修改 `.cocowiki` 目录。
:::

### 可折叠内容

```md
:::details 查看完整说明
这里的内容默认折叠。
:::
```

:::details 查看完整说明
这里的内容默认折叠。
:::

## 表格

```md
| 名称 | 类型 | 状态 |
| --- | --- | --- |
| 内容索引 | 核心模块 | 已收录 |
| 搜索面板 | 功能组件 | 待补充 |
```

较宽的表格在移动端会自动放入横向滚动区域，不会撑破页面。

## 代码块

在围栏后写语言名称即可获得语法高亮：

````md
```ts
const title = 'CoCoWiki'
```
````

代码块支持复制按钮，过长内容会在块内滚动。

## 开关扩展语法

Wiki 内链和剧透可以在配置中关闭：

```ts
markdown: {
  spoiler: false,
  wikiLink: false
}
```

提示容器、表格包装和标准 Markdown 始终可用。
