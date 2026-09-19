---
title: 站点配置
description: 配置站点名称、语言、网址根目录、图标和目录位置
type: guide
category: 配置
tags: [配置, cocowiki.config.ts, base]
aliases: [基础配置]
contributors: [Mueo]
---

# 站点配置

项目根目录的 `cocowiki.config.ts` 是用户配置入口：

```ts
import { defineCocoWikiConfig } from 'cocowiki'

export default defineCocoWikiConfig({
  title: 'CoCoWiki 资料站',
  description: 'Mueo 的项目资料与使用记录',
  lang: 'zh-CN',
  base: '/',
  logo: '/logo.png',
  favicon: '/favicon.png'
})
```

## 名称与描述

```ts
title: 'CoCoWiki 资料站',
description: 'Mueo 的项目资料与使用记录',
lang: 'zh-CN'
```

- `title` 必填，显示在导航和浏览器标题中。
- `description` 用作站点描述元信息，也可以成为首页默认副标题。
- `lang` 写入页面语言属性，默认是 `zh-CN`。

## Logo 与 favicon

把文件放进 `public/`：

```text
public/logo.png
public/favicon.png
```

然后配置：

```ts
logo: '/logo.png',
favicon: '/favicon.png'
```

如果没有单独填写 `favicon`，会尝试使用 `logo`；两者都未填写时使用默认 `/favicon.svg` 地址。

## `base`

根域名部署：

```ts
base: '/'
```

部署到 `https://example.com/my-wiki/`：

```ts
base: '/my-wiki/'
```

CoCoWiki 会自动规范开头和结尾的斜杠，但建议始终写成 `/name/`。导航、框架资源、favicon 和使用了 `withBase()` 的组件资源都会带上这个路径。

:::warning 修改后重新构建
`base` 属于构建期配置。修改后请重新运行 `pnpm build`，不要直接移动旧的 `dist/`。
:::

## 自定义目录

```ts
directories: {
  content: 'content',
  components: 'components',
  data: 'data',
  public: 'public',
  out: 'dist'
}
```

所有路径都相对于项目根目录。没有必要时保留默认值即可。

## 一份完整的基础配置

```ts
import { defineCocoWikiConfig } from 'cocowiki'

export default defineCocoWikiConfig({
  title: '世界档案馆',
  description: '人物、地点与事件记录',
  lang: 'zh-CN',
  base: '/',
  logo: '/logo.png',
  favicon: '/favicon.png',
  search: { enabled: true },
  markdown: {
    spoiler: true,
    wikiLink: true
  },
  content: {
    outline: true,
    showPrevNext: true,
    showLastUpdated: true
  }
})
```

全部字段见 [[配置参考]]。
