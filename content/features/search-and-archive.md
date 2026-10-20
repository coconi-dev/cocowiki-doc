---
title: 搜索与归档
order: 100
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

正文和自动摘要提取前会排除完整的 `script`、`style` 块、代码围栏与 HTML 注释；纯 Vue 页面使用元数据中的标题、描述等字段，不扫描组件脚本或模板正文。

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

将输入焦点放在文本框中时，按 `/` 不会打断正常输入。在搜索页中通过浮层切换查询参数，或使用浏览器前进、后退时，输入框与结果会跟随当前 URL 更新。

## 控制搜索范围

关闭全站搜索入口：

```ts
search: {
  enabled: false
}
```

`enabled: false` 隐藏首页、导航和快捷键搜索入口，不会删除内容页面或公共内容索引。

按文件模式限制搜索收录：

```ts
search: {
  include: ['archive/**/*.md', 'pages/**/*.md'],
  exclude: ['drafts/**', '**/private-*.md']
}
```

`include` 和 `exclude` 相对于内容目录，使用 glob 模式；默认匹配全部 `.md`、`.page.vue` 和 `.page.json`。显式设置 `include: []` 时，没有页面参与搜索。

Vue 文件与同名 JSON 作为同一页面匹配：include 命中任一名称即可收录，exclude 命中任一名称则排除整页，且排除优先。例如 `exclude: ['atlas.page.vue']` 不会被同名 JSON 绕过；JSON 尚未创建时，其名称也参与规则匹配。

这些 glob 只决定搜索资格，不会让页面从归档、相邻导航或贡献统计中消失。

只排除某一个页面：

```yaml
---
search: false
---
```

搜索默认排除 `home`、`search`、`archive`、`contributors` 布局。单页 `search: false` 也会将该页面排除出相邻导航，但不影响归档和贡献统计。

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

1. 收集所有未设置 `archive: false` 的内容页面，排除 `home`、`search` 和 `archive` 布局。
2. 优先按照 `category` 分组，没有分类时使用 `type`。
3. 每组按页面标题排序。
4. 提供只作用于归档内容的即时筛选框。

:::tip 分类字段
`type` 更适合保存稳定的程序化类型，例如 `character`；`category` 更适合显示给读者，例如“人物”。归档优先显示 `category`。
:::

## 搜索索引是静态的

搜索不需要服务器。生产构建时，`search-index.json` 输出完整公共内容集合及各页的搜索资格，浏览器再派生搜索、归档、贡献统计和前后页导航。它不会包含本机绝对源路径、生成路径或原始脚本。

这些页面共享内容数据与搜索实例。开发模式下，已打开的页面会跟随内容更新；加载期间显示状态，失败时显示错误并提供重试入口。较旧的请求不会覆盖较新的结果。
