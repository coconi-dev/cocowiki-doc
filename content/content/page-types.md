---
title: 三种页面形式
description: 使用普通 Markdown、Markdown 与 Vue 混合页和纯 Vue 专属页
type: guide
category: 内容创作
tags: [Markdown, Vue, 页面]
aliases: [页面类型, 纯 Vue 页面]
contributors: [Mueo]
---

# 三种页面形式

## 普通 Markdown 页面

创建 `content/archive/members/xizhe.md`：

```md
---
title: 皙折
description: CoCoWiki 示例页面中的资料整理者
category: 项目成员
tags: [CoCoWiki, 文档]
aliases: [皙折同学]
---

# 皙折

这里记录与 CoCoWiki 项目相关的示例内容。

## 经历

这里是正文。
```

页面地址是 `/archive/members/xizhe`。它会自动参与搜索、归档、目录和前后页导航。

## Markdown + Vue 页面

所有 `components/` 下的 Vue 组件都会全局注册，可以直接写进 Markdown：

```md
---
title: 当前状态
category: 示例
---

# 当前状态

普通 Markdown 内容仍然保留。

<StatusBadge label="资料整理中" />
```

这种形式适合在文章中加入卡片、图表、状态、人物列表等局部交互，同时继续使用 Markdown 的标题目录和阅读布局。

本站的 [[Markdown 与 Vue 示例]] 就是一张可运行的混合页面。

## 纯 Vue 专属页

纯 Vue 页面由两个同名文件组成：

```text
content/atlas.page.vue
content/atlas.page.json
```

`atlas.page.vue` 负责页面界面：

```vue
<script setup lang="ts">
import AtlasPage from '../components/pages/AtlasPage.vue'
</script>

<template>
  <AtlasPage />
</template>
```

`atlas.page.json` 提供可被搜索、归档和贡献统计读取的页面元信息：

```json
{
  "title": "万物图鉴",
  "description": "浏览和筛选全部物品",
  "type": "special",
  "category": "功能页面",
  "tags": ["图鉴", "筛选"],
  "contributors": ["Mueo"]
}
```

最终页面地址是 `/atlas`。

:::warning 元信息文件必须是合法 JSON
JSON 不能包含注释或尾随逗号。修改 `.page.json` 后，开发服务器会重新生成对应页面和搜索索引。
:::

## 如何选择

| 需求 | 推荐形式 |
| --- | --- |
| 以文字、图片和表格为主 | 普通 Markdown |
| 文章中只有一小块动态内容 | Markdown + Vue |
| 页面核心是筛选、排序或可视化 | 纯 Vue 专属页 |
| 希望自动生成标题目录 | 两种 Markdown 形式 |
| 需要完全控制页面结构 | 纯 Vue 专属页 |

优先从 Markdown 开始。当普通内容已经足够时，不必为了统一形式改写成 Vue。
