---
title: 快速开始
description: 创建、启动并构建一个 CoCoWiki 站点
type: guide
category: 开始使用
tags: [安装, CLI, pnpm, npm]
aliases: [安装 CoCoWiki, 创建站点]
contributors: [Mueo]
---

# 快速开始

## 环境要求

- Node.js 20 或更高版本
- pnpm 或 npm

可以用下面的命令检查当前 Node.js 版本：

```bash
node --version
```

## 使用 pnpm 创建

```bash
pnpm create cocowiki my-wiki
cd my-wiki
pnpm install
pnpm dev
```

## 使用 npm 创建

```bash
npm create cocowiki@latest my-wiki
cd my-wiki
npm install
npm run dev
```

脚手架会把站点名称改为目录名，并生成可以直接运行的示例内容。终端输出本地地址后，在浏览器中打开即可。

:::warning 不要混用锁文件
pnpm 会生成 `pnpm-lock.yaml`，npm 会生成 `package-lock.json`。同一个站点建议固定使用一种包管理器。
:::

## 常用命令

| pnpm | npm | 用途 |
| --- | --- | --- |
| `pnpm dev` | `npm run dev` | 启动开发服务器并监听内容变化 |
| `pnpm build` | `npm run build` | 生成静态站点到 `dist/` |
| `pnpm preview` | `npm run preview` | 在本地预览已经构建的结果 |

开发服务器还接受 Vite 常用的地址参数：

```bash
pnpm dev --host 0.0.0.0 --port 4173
```

## 写下第一篇内容

在 `content/hello.md` 中写入：

```md
---
title: 第一篇记录
description: 我的 CoCoWiki 页面
category: 示例
tags: [开始]
---

# 第一篇记录

从这里开始写正文。
```

保存后访问 `/hello`。这个页面也会自动出现在搜索结果和归档中。

## 构建前检查

```bash
pnpm build
pnpm preview
```

`build` 成功后，部署时只需要上传 `dist/`。如果站点不是部署在域名根目录，请先阅读 [[构建与部署]] 中的 `base` 配置。

## 更新 CoCoWiki

pnpm 项目：

```bash
pnpm update cocowiki
```

npm 项目：

```bash
npm update cocowiki
```

需要升级到最新主版本时，可以显式指定 `latest`：

```bash
pnpm add cocowiki@latest
```

