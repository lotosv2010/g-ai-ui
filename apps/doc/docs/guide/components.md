---
title: 组件概览
---

# 组件概览

Turborepo Demo UI 组件库提供了一些常用的 React 组件，帮助您快速构建现代化的用户界面。

## 组件列表

### ChatBubble

对话气泡组件，用于显示聊天消息。

#### 基础用法

```tsx
import { ChatBubble } from '@g-ai-ui/ui'

export default function Example() {
  return (
    <ChatBubble
      message="你好！"
      isUser={false}
      timestamp="10:30"
    />
  )
}
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| message | `string` | - | 消息内容（必需） |
| isUser | `boolean` | `false` | 是否为用户消息 |
| timestamp | `string` | - | 时间戳显示 |
| className | `string` | `""` | 自定义类名 |

### ChatInput

对话输入框组件，用于发送聊天消息。

#### 基础用法

```tsx
import { ChatInput } from '@g-ai-ui/ui'

export default function Example() {
  const handleSend = (message: string) => {
    console.log('发送消息:', message)
  }

  return (
    <ChatInput
      onSend={handleSend}
      placeholder="请输入消息..."
    />
  )
}
```

#### API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| onSend | `(message: string) => void` | - | 发送消息的回调函数（必需） |
| placeholder | `string` | `"输入消息..."` | 输入框占位符 |
| disabled | `boolean` | `false` | 是否禁用输入框 |
| className | `string` | `""` | 自定义类名 |

## 完整示例

```tsx
import { useState } from 'react'
import { ChatBubble, ChatInput } from '@g-ai-ui/ui'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

export function ChatExample() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！',
      isUser: false,
      timestamp: '10:00',
    },
  ])

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="space-y-2 mb-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  )
}
```
