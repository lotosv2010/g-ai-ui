---
title: Web 应用
---

# Web 应用

`@g-ai-ui/web` 是组件库与工具函数的集成验证层，不只是展示页面。它承担三类职责：

- 验证 `@g-ai-ui/ui` 在真实页面中的可用性
- 验证 `@g-ai-ui/utils` 在业务流程中的输出稳定性
- 为文档示例提供可运行的落地参照

## 快速运行

```bash
pnpm --filter @g-ai-ui/web dev
```

访问：`http://localhost:3010`

## 当前集成能力

### 1. 对话 UI 集成

- 使用 `ChatBubble` 渲染消息流
- 使用 `ChatInput` 处理输入与发送
- 在页面中模拟基础消息往返流程

### 2. AI 工具函数验证

页面内置 “AI 工具函数测试” 区域，运行并展示：

- `normalizePrompt`
- `renderPromptTemplate`
- `buildMessageContext`
- `pickTopScoredChunks`
- `mergeModelConfig`

这有助于在改动工具函数后快速校验行为是否符合预期。

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

## 目录说明

```txt
apps/web/
├── src/app/
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 集成验证页面
│   └── globals.css      # 全局样式
├── next.config.js
└── package.json
```

## 推荐工作流

1. 在 `packages/ui` 或 `packages/utils` 实施改动。  
2. 在 `apps/web` 观察页面交互与测试区输出。  
3. 回写文档示例，保持“代码行为”和“文档描述”一致。  
