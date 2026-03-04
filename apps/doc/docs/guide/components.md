---
title: 组件概览
---

# 组件概览

`@g-ai-ui/ui` 聚焦于 AI 对话场景下的基础交互组件，强调：

- 接口稳定：以简洁 API 覆盖核心场景
- 样式可扩展：默认 Tailwind 样式 + `className` 扩展
- 组合优先：组件只负责 UI 表达，业务状态由上层接管

## 组件清单

### ChatBubble

用于渲染单条对话消息，支持用户/助手两类视觉语义。

```tsx
import { ChatBubble } from '@g-ai-ui/ui'

export default function Example() {
  return (
    <ChatBubble
      message="你好，我可以帮你梳理接入方案。"
      isUser={false}
      timestamp="10:30"
    />
  )
}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| message | `string` | - | 消息内容（必需） |
| isUser | `boolean` | `false` | 是否为用户消息 |
| timestamp | `string` | - | 时间戳 |
| className | `string` | `""` | 外层容器样式扩展 |

### ChatInput

用于采集并发送用户输入，默认支持回车发送（`Shift + Enter` 换行）。

```tsx
import { ChatInput } from '@g-ai-ui/ui'

export default function Example() {
  return (
    <ChatInput
      onSend={(message) => console.log('send:', message)}
      placeholder="请输入问题..."
    />
  )
}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| onSend | `(message: string) => void` | - | 发送回调（必需） |
| placeholder | `string` | `"输入消息..."` | 占位文案 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | `""` | 容器样式扩展 |

## 组合模式（推荐）

建议在业务层维护消息列表与发送逻辑，组件层仅承载交互与展示。

```tsx
import { useState } from 'react'
import { ChatBubble, ChatInput } from '@g-ai-ui/ui'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

export function ConversationPanel() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  return (
    <section className="rounded-lg border p-4">
      <div className="mb-4 space-y-2">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </section>
  )
}
```

## 接入建议

- 将组件作为“基础展示层”，避免在组件内嵌入具体业务流程。
- 对于消息持久化、流式渲染、重试等逻辑，建议在上层状态管理中实现。
- 在设计系统中，优先通过 `className` 与 Tailwind token 做风格统一。
