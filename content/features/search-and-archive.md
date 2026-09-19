---
title: 搜索与归档
description: 了解构建期搜索索引、搜索范围和归档分类
type: guide
category: 站点能力
tags: [搜索, 归档, MiniSearch]
aliases: [全文搜索, 归档页]
contributors: [Mueo]
---

# 搜索与归档

## 搜索包含什么

CoCoWiki 在构建期读取所有内容页面，并生成静态的 `search-index.json`。默认可以检索：

- 标题 `title`
- 别名 `aliases`
- 标签 `tags`
- 贡献者 `contributors`
- 页面描述 `description`
- Markdown 正文

搜索结果会展示标题、类型或分类、描述以及命中的正文片段。标题和别名拥有更高权重；前缀匹配和少量模糊匹配默认开启。

```yaml
---
title: 皙折
description: CoCoWiki 示例页面中的资料整理者
aliases: [皙折同学]
tags: [CoCoWiki, 文档]
contributors: [Mueo]
---
```

上面的页面可以通过“皙折”“皙折同学”“CoCoWiki”“文档”或“Mueo”找到。

## 使用搜索

- 首页搜索框会前往完整搜索页。
- 导航栏搜索按钮会打开快速搜索浮层。
- 桌面端可以按 `/`、`Command + K` 或 `Ctrl + K` 打开快速搜索。

将输入焦点放在文本框中时，按 `/` 不会打断正常输入。

## 控制搜索范围

全局关闭搜索：

```ts
search: {
  enabled: false
}
```

按文件模式限制索引：

```ts
search: {
  include: ['archive/**/*.md', 'pages/**/*.md'],
  exclude: ['drafts/**', '**/private-*.md']
}
```

`include` 和 `exclude` 相对于内容目录。它们使用 glob 模式。

只排除某一个页面：

```yaml
---
search: false
---
```

## 归档页

建立一个内置归档页面：

```md
---
layout: archive
title: 归档索引
description: 浏览全部词条
search: false
archive: false
---
```

归档会：

1. 收集所有未设置 `archive: false` 的内容页面。
2. 优先按照 `category` 分组，没有分类时使用 `type`。
3. 每组按页面标题排序。
4. 提供只作用于归档内容的即时筛选框。

:::tip 分类字段
`type` 更适合保存稳定的程序化类型，例如 `character`；`category` 更适合显示给读者，例如“人物”。归档优先显示 `category`。
:::

## 搜索索引是静态的

搜索不需要服务器。生产构建时，索引会作为静态 JSON 输出；浏览器只在需要搜索、归档、贡献者统计或前后页导航时加载它，并复用已经创建的搜索实例。
