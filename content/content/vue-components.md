---
title: 使用 Vue 组件
description: 创建自动全局注册的 Vue 组件并在 Markdown 和专属页中使用
type: guide
category: 内容创作
tags: [Vue, 组件, 静态数据]
aliases: [全局组件, Markdown Vue]
contributors: [Mueo]
---

# 使用 Vue 组件

`components/` 下的所有 `.vue` 文件都会自动注册为全局异步组件。无需建立统一入口，也无需在每篇 Markdown 中导入。

## 创建组件

新建 `components/StatusBadge.vue`：

```vue
<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  tone?: 'default' | 'success'
}>(), {
  tone: 'default'
})
</script>

<template>
  <span :class="['status-badge', `is-${tone}`]">{{ label }}</span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  padding: 4px 10px;
  border: 1px solid var(--cw-border);
  border-radius: 999px;
}
.is-success { color: #24845c; }
</style>
```

在任意 Markdown 中直接使用：

```md
<StatusBadge label="已经收录" tone="success" />
```

## 组件命名

文件名会转换为 PascalCase：

```text
status-badge.vue  → StatusBadge
StatusBadge.vue   → StatusBadge
```

组件只使用文件名，不包含上级目录。因此下面两个文件会产生冲突：

```text
components/cards/ItemCard.vue
components/archive/ItemCard.vue
```

启动时 CoCoWiki 会报告冲突名称。可以将其中一个改为 `ArchiveItemCard.vue`。

## 导入静态数据

通过 `@data` 别名读取 `data/`：

```vue
<script setup lang="ts">
import items from '@data/items.json'
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

这些 JSON 会随前端代码构建，不需要请求后端。

## 引用其他组件

Markdown 可以直接使用全局组件；在普通 `.vue` 文件内部，建议显式导入它依赖的子组件：

```vue
<script setup lang="ts">
import ItemCard from './ItemCard.vue'
</script>
```

显式导入更容易让编辑器提供类型提示，也能清楚表达组件之间的依赖。

## 静态资源与 `base`

Vue 组件中需要引用 `public/` 资源时，使用 `withBase()`：

```vue
<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <img :src="withBase('/images/map.webp')" alt="世界地图">
</template>
```

这样部署到 `/repo-name/` 等子路径时，图片地址仍然正确。

## 实际示例

下面的组件来自本站 `components/DocBadge.vue`，它直接嵌在当前 Markdown 页面中：

<DocBadge label="全局组件已加载" detail="无需在 Markdown 中 import" />

更完整的写法见 [[Markdown 与 Vue 示例]] 和 [[图鉴示例]]。

