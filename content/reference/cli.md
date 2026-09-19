---
title: CLI 命令
description: 使用 cocowiki dev、build 和 preview 管理站点
type: reference
category: 参考
tags: [CLI, dev, build, preview]
aliases: [命令行, cocowiki 命令]
contributors: [Mueo]
---

# CLI 命令

模板项目已经在 `package.json` 中准备好三个脚本：

```json
{
  "scripts": {
    "dev": "cocowiki dev",
    "build": "cocowiki build",
    "preview": "cocowiki preview"
  }
}
```

通常通过包管理器脚本调用，不需要全局安装 CoCoWiki。

## `cocowiki dev`

启动开发服务器：

```bash
pnpm dev
```

指定端口：

```bash
pnpm dev --port 4173
```

允许局域网设备访问：

```bash
pnpm dev --host 0.0.0.0
```

开发模式会监听：

- `cocowiki.config.ts`
- 内容目录中的 Markdown 和纯 Vue 页面
- `components/` 中的 Vue 组件
- `data/contributors.json`

内容变化会增量同步。新增或删除全局组件时，组件注册入口会自动更新。

## `cocowiki build`

生成生产环境静态文件：

```bash
pnpm build
```

默认输出到 `dist/`，可以通过 `directories.out` 修改。命令返回非零退出码时，不应继续部署这次产物。

构建会完成：

1. 读取配置和内容目录。
2. 生成纯 Vue 页面的路由入口。
3. 扫描 Frontmatter 与 Markdown 正文。
4. 生成静态搜索数据。
5. 渲染 HTML 并打包客户端资源。

## `cocowiki preview`

预览最近一次构建结果：

```bash
pnpm preview
```

指定端口：

```bash
pnpm preview --port 5050
```

`preview` 不会重新构建。修改内容后请先再次执行 `pnpm build`。

## 常见报错

### 未找到配置文件

```text
未找到 cocowiki.config.ts。
```

请在项目根目录运行命令，并确认配置文件名正确。

### 内容目录不存在

检查 `directories.content` 指向的目录是否存在。使用默认配置时需要有 `content/`。

### 全局组件名称冲突

两个 Vue 文件转换成了相同组件名。例如 `status-badge.vue` 和 `StatusBadge.vue` 都会注册为 `StatusBadge`。重命名其中一个即可。

### 页面能打开但资源 404

通常是部署地址与 `base` 不一致。根目录使用 `/`，仓库子目录使用 `/repository/`，修改后重新构建。

### 预览内容没有更新

`preview` 读取 `dist/`，不是源文件。先执行：

```bash
pnpm build
pnpm preview
```

