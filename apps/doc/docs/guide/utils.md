---
title: 工具函数
order: 2
---

# 工具函数

`@g-ai-ui/utils` 当前聚焦于 AI 场景下的工具函数（底层基于 `es-toolkit`）。

## normalizePrompt

规范化提示词文本（去首尾空白、压缩冗余空白、长度限制）。

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

渲染 `{{变量}}` 模板。

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

按角色过滤、排序并截取上下文窗口，适合发送给模型前做预处理。

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
// 最终只保留最近的 user/assistant 消息
```

## pickTopScoredChunks

对检索结果按 `score` 降序选择 TopK 片段。

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

合并并规范化模型参数（例如 `temperature`、`topP`、`maxTokens`）。

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
