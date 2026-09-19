---
title: 构建与部署
description: 构建纯静态站点并部署到常见静态托管平台
type: guide
category: 发布
tags: [构建, 部署, GitHub Pages, Cloudflare Pages, Vercel, Netlify]
aliases: [静态部署, 发布网站]
contributors: [Mueo]
---

# 构建与部署

## 生成静态站点

```bash
pnpm build
```

默认输出到 `dist/`：

```text
dist/
├─ index.html
├─ 404.html
├─ search-index.json
├─ assets/
├─ archive.html
└─ ...
```

部署不需要 Node.js 服务端。只要托管平台能够发布静态目录即可。

## 本地检查构建结果

```bash
pnpm preview
```

请在部署前至少检查：

- 首页与内容页能正常打开。
- 搜索可以找到新页面。
- 图片和 favicon 正常显示。
- 刷新深层地址不会返回托管平台自己的 404。
- 暗色模式和移动端导航可以使用。

## 根目录与子目录

部署到域名根目录：

```ts
base: '/'
```

部署到 `https://username.github.io/repository/`：

```ts
base: '/repository/'
```

如果配置错误，最常见的现象是首页 HTML 能打开，但 CSS、JavaScript 或图片返回 404。

## GitHub Pages

项目站点通常使用仓库名作为 `base`：

```ts
base: '/cocowiki-doc/'
```

构建命令：

```text
pnpm build
```

发布目录：

```text
dist
```

如果使用自定义域名，通常将 `base` 恢复为 `/`。

### 使用 GitHub Actions 自动部署

GitHub Actions 可以在每次推送到 `main` 分支后自动安装依赖、构建站点，并把 `dist/` 发布到 GitHub Pages。

在项目根目录创建以下文件：

```text
.github/
└─ workflows/
   └─ deploy.yml
```

将下面的内容写入 `.github/workflows/deploy.yml`：

```yaml
# 构建 CoCoWiki 站点，并将生成的静态文件部署到 GitHub Pages。
name: 部署 CoCoWiki 到 GitHub Pages

on:
  # 每次向 main 分支推送内容时自动部署。
  # 如果仓库默认分支不是 main，请改成实际的分支名称。
  push:
    branches: [main]

  # 允许在仓库的 Actions 页面手动运行此工作流。
  workflow_dispatch:

# 授予工作流读取仓库和发布 GitHub Pages 所需的最小权限。
permissions:
  contents: read
  pages: write
  id-token: write

# 同一时间只进行一次 Pages 部署。
# 新提交会进入队列，但不会中断正在发布的版本。
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: 构建站点
    runs-on: ubuntu-latest
    steps:
      # 拉取仓库内容。完整历史可供“最后更新时间”等能力使用。
      - name: 拉取代码
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      # 安装 pnpm。版本可根据项目需要调整。
      - name: 安装 pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      # 安装 Node.js，并缓存 pnpm 下载的依赖。
      - name: 安装 Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: pnpm

      # 初始化 GitHub Pages 的构建环境。
      - name: 配置 GitHub Pages
        uses: actions/configure-pages@v4

      # 严格按照 pnpm-lock.yaml 安装依赖，避免线上构建结果漂移。
      - name: 安装项目依赖
        run: pnpm install --frozen-lockfile

      # 调用 package.json 中的 build 命令，CoCoWiki 默认输出到 dist/。
      - name: 构建 CoCoWiki
        run: pnpm build

      # 将 dist/ 打包为 GitHub Pages 可以发布的构建产物。
      - name: 上传静态站点
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    name: 发布站点
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      # 发布上一个任务上传的静态站点，并返回最终访问地址。
      - name: 部署到 GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

然后进入 GitHub 仓库：

```text
Settings → Pages → Build and deployment → Source
```

将发布来源选择为 `GitHub Actions`。完成后，把代码推送到 `main` 分支；也可以进入仓库的 `Actions` 页面手动运行工作流。

部署地址与 `base` 必须对应：

| 部署地址 | `base` |
| --- | --- |
| `https://username.github.io/repository/` | `'/repository/'` |
| `https://username.github.io/` | `'/'` |
| 自定义域名根目录 | `'/'` |

例如仓库名是 `cocowiki-doc`，站点发布到 `https://username.github.io/cocowiki-doc/`，则配置应为：

```ts
export default defineCocoWikiConfig({
  base: '/cocowiki-doc/'
})
```

工作流运行成功后，后续每次推送到 `main` 分支都会自动重新构建并更新站点。

## Cloudflare Pages

| 设置 | 值 |
| --- | --- |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| Node.js | 20 或更高 |

默认域名部署在根路径，`base` 使用 `/`。

## Vercel

| 设置 | 值 |
| --- | --- |
| Framework Preset | Other |
| Build Command | `pnpm build` |
| Output Directory | `dist` |

## Netlify

| 设置 | 值 |
| --- | --- |
| Build command | `pnpm build` |
| Publish directory | `dist` |

## Nginx

将 `dist/` 上传到网站目录。为了兼容没有 `.html` 后缀的地址，可以使用：

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

如果站点部署在子目录，还需要让 Nginx 的目录位置与 `base` 保持一致。

## 其他静态托管

对于对象存储或其他平台，核心规则只有两条：

1. 构建命令执行 `pnpm build` 或 `npm run build`。
2. 对外发布 `dist/`，不要发布项目源码或 `.cocowiki/`。

CoCoWiki 自带静态 `404.html`。托管平台允许设置错误页面时，将它指定为 404 页面即可。
