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

CoCoWiki 是基于 VitePress 的轻量静态 Wiki 框架，适合设定集、游戏资料站、人物档案和项目知识库。本文档包含入门步骤、配置参考和可运行的页面示例。

你可以先用 Markdown 写资料，需要筛选、图表或复杂展示时，再加入 Vue 组件。构建结果是静态文件，无需数据库或 Node.js 服务端。

## 内容如何组织

| 位置 | 用途 |
| --- | --- |
| `content/` | Markdown 文档与纯 Vue 页面 |
| `components/` | 可在 Markdown 中直接调用的 Vue 组件 |
| `data/` | 图鉴、时间线和贡献者等静态数据 |
| `public/` | 图片、字体和其他公开资源 |
| `cocowiki.config.ts` | 站点名称、导航、搜索、主题和目录配置 |

页面标题、分类、标签和别名写在 Frontmatter 中。CoCoWiki 扫描这些字段与正文，生成搜索、归档和贡献统计。访问者既可以搜索独立词条，也可以通过 `order` 按设定的顺序阅读文档。

## 与 VitePress 的关系

Markdown 渲染、Vue 支持、路由和静态构建来自 VitePress。CoCoWiki 在此基础上提供资料站默认主题、全文搜索、归档、贡献者页面、组件自动注册，以及统一的项目约定与 CLI。

如果你希望直接维护 VitePress 的配置与主题，可以使用 VitePress；如果希望从内容目录和一份站点配置开始，CoCoWiki 提供了已经组合好的默认方案。

## 三种页面形式

| 页面形式 | 写法 | 适合内容 |
| --- | --- | --- |
| 普通 Markdown | `.md` | 人物、地点、概念和说明文章 |
| Markdown + Vue | 在 `.md` 中使用组件 | 局部图表、状态标记和交互内容 |
| 纯 Vue 页面 | `.page.vue` + `.page.json` | 图鉴、时间线、筛选器和关系图 |

大多数内容可以保持为 Markdown，只有页面主要功能依赖交互时才需要纯 Vue 页面。本站的 [[Markdown 与 Vue 示例]] 和 [[图鉴示例]] 分别展示后两种形式。

## 从哪里开始

- [[快速开始]]：创建站点、安装依赖并启动本地预览。
- [[项目目录]]：了解内容、组件、数据和资源的位置。
- [[Frontmatter]]：设置分类、署名、布局和阅读顺序。
- [[站点配置]] 与 [[配置参考]]：按需配置站点。
- [[构建与部署]]：生成并发布静态文件。
