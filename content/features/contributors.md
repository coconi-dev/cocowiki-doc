---
title: 贡献者与署名
order: 110
description: 配置贡献者资料、页面署名和贡献次数统计
type: guide
category: 站点能力
tags: [贡献者, Frontmatter, ContributorList]
aliases: [贡献统计, 页面署名, 贡献者功能]
contributors: [Mueo]
---

# 贡献者与署名

## 定义贡献者资料

在 `data/contributors.json` 中以稳定键名保存资料：

```json
{
  "Mueo": {
    "name": "Mueo",
    "initials": "MU",
    "role": "维护者",
    "avatar": "/contributors/mueo.webp",
    "github": "Mueoink"
  },
  "Alice": {
    "name": "Alice",
    "url": "https://example.com/alice"
  }
}
```

| 字段 | 是否必需 | 说明 |
| --- | --- | --- |
| `name` | 否 | 显示名称；缺省时使用对象键名 |
| `initials` | 否 | 没有头像时显示的缩写 |
| `role` | 否 | 角色或说明 |
| `avatar` | 否 | `public/` 中的头像地址 |
| `url` | 否 | 点击后的完整链接 |
| `github` | 否 | GitHub 用户名或完整地址 |

`url` 优先于 `github`。这些简介字段都应填写字符串，类型错误会指出文件和字段。

## 给页面署名

在 Frontmatter 中引用贡献者键名：

```yaml
contributors:
  - Mueo
  - Alice
```

页面信息区会显示头像与名称，搜索也能通过贡献者名字找到这张页面。

## 在正文中显示贡献者

`ContributorList` 是框架内置的全局组件。不传 `names` 时，它读取当前页面 Frontmatter：

```md
<ContributorList />
```

指定名单和标题：

```md
<ContributorList
  :names="['Mueo', 'Alice']"
  label="资料整理"
/>
```

紧凑显示：

```md
<ContributorList :compact="true" />
```

## 贡献者总览页

建立入口文件 `content/contributors.md`：

```md
---
layout: contributors
title: 贡献者
description: 查看全部贡献者
search: false
archive: false
---
```

总览页会列出 `contributors.json` 中的人，并统计每个内容页面 Frontmatter 中出现的次数。同一人在同一页面重复填写只计算一次。统计使用完整页面集合，不受 `search.include/exclude`、`search: false` 或 `archive: false` 影响。

总览页采用横向紧凑名片：左侧头像或缩写，中间姓名与角色，右侧贡献次数。没有配置 `role` 时不显示额外说明。桌面三列、平板两列、窄屏单列，名片会保留外部主页链接。

页面会汇总资料配置与索引中出现的贡献者，按贡献次数从多到少排序；次数相同时按姓名排序。头像、角色和链接在 `contributors.json` 中维护，无需修改组件。

## 功能页补充贡献次数

纯 Vue 功能页内部的数据也可以参与总数统计：

```ts
import { onUnmounted } from 'vue'
import { registerContributorContributions } from 'cocowiki/theme'

const unregister = registerContributorContributions('item-atlas', {
  Mueo: 8,
  Alice: 3
})
onUnmounted(unregister)
```

第一个参数是当前统计来源的唯一名称，第二个参数是贡献者键名与次数。重复使用相同来源名称会更新该来源，而不是叠加出重复记录；旧清理函数不会删除后来的新登记。次数需要是非负有限数值，也可传入字符串数组，按姓名出现次数累计。

组件卸载或不再提供这份数据时应调用返回的清理函数。登记仅在其运行生命周期内有效；如果希望离开功能页后总览仍包含这些统计，应在站点级常驻组件中维护登记。

:::info 统计口径
页面 Frontmatter 表示“参与过这个页面”，每页每人计一次；功能页接口适合统计物品、时间线事件等页面内部的数据条目。
:::
