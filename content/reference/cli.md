---
title: CLI 命令
order: 170
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
- 内容目录中的 Markdown、`.page.vue` 和 `.page.json` 元数据
- `components/` 中的 Vue 组件
- `data/contributors.json`

内容变化会增量同步。新增或删除全局组件时，组件注册入口会自动更新。

### 实例、端口与退出

同一项目只运行一个开发服务。再次执行 `pnpm dev` 会核对已有实例、显示预览地址并正常退出，不会启动第二个服务。

在原来启动服务的终端按 `Ctrl + C` 退出，再执行 `pnpm dev` 即可重新启动。默认端口已被其他程序占用时会报告错误；需要换端口时请显式传入 `--port`。

配置变化会串行重建服务。配置无效时会输出原因并保留上一次可用预览；修正配置并保存后再更新。普通文档修改无需手动重启；更新依赖后应重新启动服务。

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

开发服务运行期间也可以执行构建；开发、构建和静态预览分别使用 `.cocowiki/site`、`.cocowiki/build` 和 `.cocowiki/preview`，构建不会清空开发运行目录。

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

### 开发地址已在使用

如果提示复用当前项目的开发服务，请使用终端显示的地址。需要停止时，回到最初启动服务的终端按 `Ctrl + C`。端口被其他项目占用时，可使用 `pnpm dev --port 4173`，不要重复启动多个开发终端。

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

