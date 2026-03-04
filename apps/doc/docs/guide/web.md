---
title: Web 应用
---

# Web 应用

`@g-ai-ui/web` 是组件库与工具函数的联调验证层，定位不是 Demo，而是工程化可运行实验场。

## 快速运行

```bash
pnpm --filter @g-ai-ui/web dev
```

访问：`http://localhost:3010`

## 路由结构

Playground 已拆分为独立路由：

- `/components`：UI 组件测试页，验证 `Welcome / Conversations / Prompts / Attachments / Bubble / Sender`
- `/tools`：工具函数测试页，验证 `normalizePrompt / renderPromptTemplate / buildMessageContext / pickTopScoredChunks / mergeModelConfig`
- `/`：自动重定向到 `/components`

这种方式可以避免组件视觉联调与工具函数输出验证相互干扰。

## 当前能力

### 1. 组件测试路由（`/components`）

- 左侧：会话列表与附件状态
- 右侧：欢迎区、提示词、消息流、发送器
- 目标：验证完整会话链路交互是否顺畅

### 2. 工具测试路由（`/tools`）

- 每个工具函数单独提供输入项与 JSON 输出
- 支持实时调整 `TopK`、`maxMessages`、`temperature`、`maxTokens` 等参数
- 目标：快速确认函数行为、参数边界与结果格式

## 关键工程配置

### workspace 依赖

```json
{
  "dependencies": {
    "@g-ai-ui/ui": "workspace:*",
    "@g-ai-ui/utils": "workspace:*"
  }
}
```

### Next.js 跨包转译

```js
// apps/web/next.config.js
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@g-ai-ui/ui', '@g-ai-ui/utils'],
}
```

### Turbopack 开发模式

```json
{
  "scripts": {
    "dev": "next dev --turbo --port 3010"
  }
}
```

## 推荐工作流

1. 在 `packages/ui` 或 `packages/utils` 实施变更。
2. 进入对应路由（`/components` 或 `/tools`）做联调验证。
3. 回写文档与示例，保持实现和描述一致。
