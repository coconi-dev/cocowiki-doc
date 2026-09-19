---
title: 项目目录
description: 了解 CoCoWiki 用户项目中的目录与文件职责
type: guide
category: 开始使用
tags: [目录, 文件结构]
contributors: [Mueo]
---

# 项目目录

一个常见的 CoCoWiki 站点如下：

```text
my-wiki/
├─ content/                 Markdown 与纯 Vue 页面
│  ├─ index.md              首页
│  ├─ archive.md            归档页入口
│  ├─ contributors.md       贡献者页入口
│  └─ archive/
│     └─ characters/
│        └─ black-rabbit.md
├─ components/              自动全局注册的 Vue 组件
├─ data/                    JSON 或 TypeScript 静态数据
│  └─ contributors.json
├─ public/                  原样复制的图片、字体等资源
├─ cocowiki.config.ts       站点配置
├─ package.json
└─ pnpm-lock.yaml
```

## `content/`

所有内容页面都从这里产生。Markdown 文件的相对路径就是页面地址：

| 文件 | 页面地址 |
| --- | --- |
| `content/index.md` | `/` |
| `content/world.md` | `/world` |
| `content/archive/index.md` | `/archive` |
| `content/archive/characters/rabbit.md` | `/archive/characters/rabbit` |

纯 Vue 页面也放在这里，文件名使用 `.page.vue`。具体规则见 [[三种页面形式]]。

## `components/`

这里的 `.vue` 文件会自动注册为全局组件，并采用异步加载。组件名由文件名转换而来：

| 文件 | Markdown 中的写法 |
| --- | --- |
| `NoticeBadge.vue` | `<NoticeBadge />` |
| `notice-badge.vue` | `<NoticeBadge />` |
| `cards/PersonCard.vue` | `<PersonCard />` |

不同子目录中不能存在会转换为相同名称的组件，否则启动时会提示冲突。

## `data/`

用于保存物品列表、时间线、贡献者资料等静态数据。Vue 组件中可以通过别名导入：

```ts
import items from '@data/items.json'
```

贡献者资料固定读取 `data/contributors.json`，格式见 [[贡献者与署名]]。

## `public/`

文件会原样出现在构建结果根目录。例如：

```text
public/images/map.webp
```

在 Markdown、配置或 Vue 模板中使用：

```md
![世界地图](/images/map.webp)
```

当站点配置了 `base` 时，Markdown 链接由 VitePress 处理；Vue 组件中建议使用 VitePress 的 `withBase()` 生成资源地址。

## 自动生成目录

`.cocowiki/` 是开发与构建时生成的内部运行目录，`dist/` 是最终静态产物。两者都不应手动维护，也通常不提交到 Git。

:::danger 不要把内容写进 `.cocowiki/`
该目录可能在启动或配置变化时重新生成。长期内容只应写在 `content/`、`components/`、`data/` 和 `public/` 中。
:::

## 自定义目录名

如果已有项目使用其他命名，可以在 `cocowiki.config.ts` 中修改：

```ts
directories: {
  content: 'docs',
  components: 'ui',
  data: 'datasets',
  public: 'static',
  out: 'build'
}
```
