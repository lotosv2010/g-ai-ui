---
title: 工具函数
order: 2
---

# 工具函数

`@g-ai-ui/utils` 聚焦 AI 场景中的“输入规范化、上下文组织、检索选择、模型参数治理”。

底层依赖 `es-toolkit`，在保持轻量的同时提供稳定类型与可预测行为。

## 能力地图

- Prompt 处理：`normalizePrompt`、`renderPromptTemplate`
- 上下文窗口：`buildMessageContext`
- 检索排序：`pickTopScoredChunks`
- 参数治理：`mergeModelConfig`

## 示例

### normalizePrompt

```ts
import { normalizePrompt } from '@g-ai-ui/utils'

const prompt = normalizePrompt('  你是一个客服助手。\n\n请回答用户问题。  ', {
  preserveLineBreaks: true,
  maxLength: 120,
})
```

### renderPromptTemplate

```ts
import { renderPromptTemplate } from '@g-ai-ui/utils'

const text = renderPromptTemplate('你是 {{role}}，请处理：{{task}}', {
  role: 'AI 助手',
  task: '输出组件接入方案',
})
```

### buildMessageContext

```ts
import { buildMessageContext, type AIMessage } from '@g-ai-ui/utils'

const messages: AIMessage[] = [
  { role: 'system', content: '你是前端助手', createdAt: 1 },
  { role: 'user', content: '怎么接入组件库？', createdAt: 2 },
  { role: 'assistant', content: '先安装依赖再引入组件', createdAt: 3 },
]

const context = buildMessageContext(messages, {
  maxMessages: 2,
  includeRoles: ['user', 'assistant'],
})
```

### pickTopScoredChunks

```ts
import { pickTopScoredChunks } from '@g-ai-ui/utils'

const topChunks = pickTopScoredChunks(
  [
    { id: 'a', content: 'React 组件文档', score: 0.78 },
    { id: 'b', content: 'Turborepo 配置说明', score: 0.91 },
    { id: 'c', content: '样式定制指南', score: 0.64 },
  ],
  2
)
```

### mergeModelConfig

```ts
import { mergeModelConfig } from '@g-ai-ui/utils'

const config = mergeModelConfig(
  { model: 'gpt-4o-mini', temperature: 0.7, topP: 1, maxTokens: 2048 },
  { temperature: 1.1, maxTokens: 4096 }
)
```

## 验证建议

优先在 `@g-ai-ui/web` 的 `工具测试` 菜单中验证这些函数，再将其接入业务服务链路。
