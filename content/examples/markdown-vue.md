---
title: Markdown 与 Vue 示例
description: 在 Markdown 正文中直接使用全局 Vue 组件
type: example
category: 功能示例
tags: [Markdown, Vue, 全局组件]
contributors: [Mueo]
---

# Markdown 与 Vue 示例

这段标题、正文和列表来自普通 Markdown：

- 页面仍然拥有右侧目录。
- Frontmatter 仍然参与搜索和归档。
- 只在需要的位置加入 Vue 组件。

<DocBadge label="Markdown + Vue" detail="这部分由 components/DocBadge.vue 渲染" />

## 组件调用代码

```md
<DocBadge
  label="Markdown + Vue"
  detail="这部分由 components/DocBadge.vue 渲染"
/>
```

由于组件位于 `components/`，CoCoWiki 已经完成全局注册。

