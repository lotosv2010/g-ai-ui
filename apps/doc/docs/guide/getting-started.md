---
title: 快速开始
order: 1
---

# 快速开始

欢迎使用 Turborepo Demo！本指南将帮助你快速开始使用本项目。

## 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 安装

### 1. 克隆项目

```bash
git clone https://github.com/example/turborepo-demo.git
cd turborepo-demo
```

### 2. 安装依赖

```bash
pnpm install
```

## 开发

启动所有开发服务器：

```bash
pnpm dev
```

这将同时启动以下服务：

- **Web 应用**: http://localhost:3010
- **文档站点**: http://localhost:3020

### 单独启动某个服务

```bash
# Utils 开发模式
pnpm --filter @g-ai-ui/utils dev

# UI 开发模式
pnpm --filter @g-ai-ui/ui dev

# Web 开发模式
pnpm --filter @g-ai-ui/web dev

# Doc 开发模式
pnpm --filter doc dev
```

## 构建

构建所有子包：

```bash
pnpm build
```

## 项目结构

```
turborepo-demo/
├── apps/
│   ├── utils/          # 工具函数库
│   ├── ui/             # UI 组件库
│   ├── web/            # Web 应用
│   └── doc/            # 文档站点
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 技术栈

| 子包 | 打包工具 | 主要技术 |
|------|---------|---------|
| Utils | tsup | TypeScript |
| UI | tsup | React, TypeScript, Tailwind CSS |
| Web | Next.js | Next.js, TypeScript, Tailwind CSS |
| Doc | RSPress | Markdown |

## 下一步

- [工具函数](./utils) - 了解如何使用工具函数
- [UI 组件](./components) - 了解如何使用 UI 组件
- [样式定制](./theming) - 了解如何定制样式
