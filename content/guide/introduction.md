---
title: 认识 CoCoWiki
description: 了解 CoCoWiki 的定位、适用场景与基本工作方式
type: guide
category: 开始使用
tags: [CoCoWiki, 静态 Wiki, VitePress]
aliases: [CoCoWiki 是什么]
contributors: [Mueo]
---

# 认识 CoCoWiki

CoCoWiki 是一个基于 VitePress 深度封装的轻量静态 Wiki 框架。

它适合小型 Wiki、世界观设定集、游戏资料站、人物与物品档案，以及其他由大量独立词条组成的内容站。

使用时，你主要接触三类东西：

- 在 `content/` 中写 Markdown。
- 在 `components/` 中写需要交互的 Vue 组件。
- 在 `data/` 中保存 JSON 或 TypeScript 静态数据。

底层的 Markdown 渲染、Vue 支持、页面路由和静态构建来自 VitePress。

CoCoWiki 在此基础上整理搜索、归档、贡献者、默认主题和项目目录，并提供统一的配置与命令。

简单来说，你只需要关心“要写什么”，不必先搭建一整套 Wiki 网站。

## 为什么选择 CoCoWiki

VitePress 本身已经是一套优秀的静态站点工具。

它原生支持 Markdown、Frontmatter、在 Markdown 中使用 Vue 组件、页面路由、暗色模式和静态构建。

这些也是 CoCoWiki 的基础能力，并不是 CoCoWiki 重新实现或独有的功能。

直接使用 VitePress 建立资料站时，通常还要根据自己的需求组合主题、搜索、归档、页面分类、贡献者和其他配置。

这些事情完全可以使用 VitePress 的主题和插件实现。

CoCoWiki 只是提前选择并组合了一套适合轻量资料站的默认方案，同时尽量隐藏 `.vitepress/`、主题入口和插件配置。

它主要提供的是使用方式上的简化：

- 用 `content/`、`components/`、`data/` 和 `public/` 组织站点。
- 用 `cocowiki.config.ts` 管理资料站配置。
- 用 `cocowiki dev`、`build` 和 `preview` 运行项目。
- 自动整理页面元信息，并用于搜索、归档和贡献统计。
- 自动全局注册 `components/` 中的 Vue 组件。
- 使用 `.page.vue` 和 `.page.json` 约定建立纯 Vue 功能页。
- 使用预先准备的搜索优先首页、归档页和贡献者页。
- 使用 Wiki 内链和剧透等少量 Markdown 扩展。

这里的重点不是增加 VitePress 做不到的功能，而是减少每次建立资料站时需要重复完成的配置和页面工作。

CoCoWiki 不是 VitePress 的替代品。

它更像是一套建立在 VitePress 上的资料站预设和工具层。

如果你希望先把内容写下来，需要复杂页面时再使用 Vue，而不想每次都从 VitePress 配置开始搭建，CoCoWiki 会更省事。

## 为什么是搜索优先

并非所有资料都适合排成一套从第一章读到最后一章的目录。

人物、地点、组织、物品和概念往往彼此交错。访问者打开网站时，通常已经带着一个名字或关键词。

CoCoWiki 因此不要求你维护完整的多级目录。

每个页面都可以独立存在，再依靠标题、别名、标签、贡献者和正文搜索被找到。

如果读者只是想随意浏览，也可以打开归档页，按照分类查看站点中的全部内容。

:::tip 适合的内容
如果站点里的页面可以单独阅读、类型较杂，而且访问者更常“查找”而不是“按顺序学习”，CoCoWiki 会很合适。
:::

## 三种页面形式

| 页面形式 | 写法 | 适合内容 |
| --- | --- | --- |
| 普通 Markdown | `.md` | 人物、地点、概念、说明文章 |
| Markdown + Vue | 在 `.md` 中写组件标签 | 图表、状态标记、小型交互内容 |
| 纯 Vue 页面 | `.page.vue` + `.page.json` | 图鉴、时间线、筛选器、关系图 |

普通 Markdown 和 Markdown + Vue 都是 VitePress 原生支持的形式。

CoCoWiki 在此基础上增加了 `components/` 自动注册，以及 `.page.vue` 配合 `.page.json` 的功能页约定。

三种页面都会参与同一套路由和构建流程。

你可以让大多数内容保持为 Markdown，只在真正需要搜索、筛选、排序或动态展示时使用 Vue。

不需要为了加入一个小组件，就把整张页面全部改写成 Vue。

## 构建结果

执行 `cocowiki build` 后，得到的是普通的 HTML、CSS、JavaScript、JSON、图片和字体文件。

这一静态构建能力同样来自 VitePress，CoCoWiki 的 CLI 对它进行了包装。

网站运行时不需要数据库，也不需要 Node.js 服务器。

构建结果可以放在 GitHub Pages、Cloudflare Pages、Vercel、Netlify、Nginx 或对象存储中。

## 接下来阅读

- [[快速开始]]：创建第一个站点并启动本地预览。
- [[项目目录]]：了解内容、组件、数据和静态资源应放在哪里。
- [[三种页面形式]]：选择适合当前内容的页面写法。
- [[站点配置]]：设置名称、网址根目录和资源路径。
