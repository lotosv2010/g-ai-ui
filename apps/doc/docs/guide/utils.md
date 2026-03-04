---
title: 工具函数
order: 2
---

# 工具函数

`@g-ai-ui/utils` 聚焦 AI 场景中的“输入规范化、上下文组织、检索选择、模型参数治理”。

底层依赖 `es-toolkit`，在保持轻量的前提下提供稳定的类型体验与数据处理能力。

## 能力地图

- Prompt 处理：`normalizePrompt`、`renderPromptTemplate`
- 消息窗口：`buildMessageContext`
- 检索排序：`pickTopScoredChunks`
- 模型配置：`mergeModelConfig`

## normalizePrompt

规范化提示词文本（去首尾空白、压缩冗余空白、限制最大长度）。

```typescript
import { normalizePrompt } from '@g-ai-ui/utils'

const prompt = normalizePrompt('  你是一个客服助手。\n\n请回答用户问题。  ', {
  preserveLineBreaks: true,
  maxLength: 100,
})

console.log(prompt)
// "你是一个客服助手。\n\n请回答用户问题。"
```

## renderPromptTemplate

渲染 `{{变量}}` 语法模板，适合对系统提示词做参数化管理。

```typescript
import { renderPromptTemplate } from '@g-ai-ui/utils'

const prompt = renderPromptTemplate(
  '你是 {{role}}，请回答：{{question}}',
  {
    role: 'AI 助手',
    question: '如何在 monorepo 中复用 UI 组件？',
  }
)

console.log(prompt)
// 你是 AI 助手，请回答：如何在 monorepo 中复用 UI 组件？
```

## buildMessageContext

按角色过滤、排序并截取上下文窗口，用于控制发送给模型的消息规模。

```typescript
import { buildMessageContext, type AIMessage } from '@g-ai-ui/utils'

const messages: AIMessage[] = [
  { role: 'system', content: '你是一个前端助手', createdAt: 1 },
  { role: 'user', content: '怎么接入组件库？', createdAt: 2 },
  { role: 'assistant', content: '先安装依赖并引入组件', createdAt: 3 },
]

const context = buildMessageContext(messages, {
  maxMessages: 2,
  includeRoles: ['user', 'assistant'],
})

console.log(context)
// 只保留最近的 user/assistant 消息
```

## pickTopScoredChunks

按 `score` 降序选择 TopK 检索片段，适用于 RAG 前置筛选。

```typescript
import { pickTopScoredChunks } from '@g-ai-ui/utils'

const topChunks = pickTopScoredChunks(
  [
    { id: 'a', content: 'React 组件文档', score: 0.78 },
    { id: 'b', content: 'Turborepo 配置说明', score: 0.91 },
    { id: 'c', content: '样式定制指南', score: 0.64 },
  ],
  2
)

console.log(topChunks)
// [ { id: 'b', ... }, { id: 'a', ... } ]
```

## mergeModelConfig

合并并规范化模型参数（如 `temperature`、`topP`、`maxTokens`、`stop`）。

```typescript
import { mergeModelConfig } from '@g-ai-ui/utils'

const config = mergeModelConfig(
  {
    model: 'gpt-4o-mini',
    temperature: 0.7,
    topP: 1,
    maxTokens: 2048,
    stream: true,
  },
  {
    temperature: 1.8,
    maxTokens: 4096,
    stop: ['\n\n', 'END'],
  }
)

console.log(config)
// { model: 'gpt-4o-mini', temperature: 1.8, topP: 1, maxTokens: 4096, ... }
```

## 使用建议

- 把 Prompt 作为配置资产管理，使用模板与变量驱动，而不是拼接字符串。
- 在请求模型前统一执行上下文裁剪与参数规范化，降低线上不确定性。
- 让工具函数先在 `@g-ai-ui/web` 测试面板验证，再进入业务服务链路。
