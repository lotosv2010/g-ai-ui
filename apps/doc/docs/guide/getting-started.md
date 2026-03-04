---
title: 快速开始
order: 1
---

# 快速开始

本指南帮助你在本地启动 `g-ai-ui` monorepo，并快速进入组件和工具函数联调流程。

## 环境要求

- Node.js >= 18
- pnpm（建议与仓库锁定版本一致）

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

默认会启动工作区内任务，常用地址：

- Web Playground：`http://localhost:3010`
- Rspress 文档站：`http://localhost:3020`

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
pnpm build
pnpm lint
pnpm --filter @g-ai-ui/ui typecheck
pnpm --filter @g-ai-ui/utils typecheck
```

## 推荐入口

1. 先在 Web Playground 的 `组件测试` 菜单验证交互与样式。
2. 再切换到 `工具测试` 菜单验证函数输出与参数边界。
3. 最后在文档页面沉淀示例与规范。
