---
title: 快速开始
order: 1
---

# 快速开始

本指南用于帮助你快速接入 `g-ai-ui` monorepo，并理解各子包在 AI 前端场景中的职责边界。

## 适用对象

- 希望在业务中复用 AI 对话组件的前端工程师
- 需要统一维护组件、工具函数和文档的团队
- 需要在 monorepo 中做跨包联调与验证的项目

## 环境要求

- Node.js >= 18
- pnpm（建议与仓库保持一致版本）

## 1. 获取代码并安装依赖

```bash
git clone https://github.com/lotosv2010/g-ai-ui.git
cd g-ai-ui
pnpm install
```

## 2. 启动开发环境

```bash
pnpm dev
```

默认会启动工作区内开发任务，常用访问地址：

- Web 集成验证：`http://localhost:3010`
- 文档站点：`http://localhost:3020`

## 3. 按包单独运行

```bash
# AI 工具函数（watch 构建）
pnpm --filter @g-ai-ui/utils dev

# UI 组件库（watch 构建）
pnpm --filter @g-ai-ui/ui dev

# Next.js 集成验证应用
pnpm --filter @g-ai-ui/web dev

# Rspress 文档站
pnpm --filter @g-ai-ui/doc dev
```

## 4. 构建与校验

```bash
# 全量构建
pnpm build

# 代码规范检查
pnpm lint

# 关键包类型检查
pnpm --filter @g-ai-ui/utils typecheck
pnpm --filter @g-ai-ui/ui typecheck
```

## 项目结构

```txt
g-ai-ui/
├── apps/
│   ├── web/              # Next.js 集成验证应用
│   └── doc/              # Rspress 文档站
├── packages/
│   ├── ui/               # React UI 组件
│   └── utils/            # AI 工具函数（es-toolkit 封装）
├── pnpm-workspace.yaml
└── turbo.json
```

## 下一步

- [组件能力](./components)：了解组件 API 与组合模式
- [工具函数](./utils)：了解 AI 数据处理与配置规范化能力
- [Web 应用](./web)：了解真实页面中的接入与验证方式
