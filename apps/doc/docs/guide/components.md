---
title: 组件概览
---

# 组件概览

`@g-ai-ui/ui` 参考 Ant Design X 的会话式产品模型，围绕 AI 交互主路径提供 6 个核心组件：

- `Welcome`：首屏欢迎与引导
- `Conversations`：会话列表与切换
- `Prompts`：快捷提示词推荐
- `Attachments`：附件展示与状态反馈
- `Bubble`：消息气泡渲染
- `Sender`：输入与发送控制

## 设计目标

- 低耦合组合：每个组件只关心单一职责，方便自由拼装页面
- 风格一致：统一浅色高亮、圆角卡片、蓝青渐变主色
- 工程友好：支持 TypeScript，适配 monorepo 下跨包联调

## 典型组合

```tsx
import {
  Welcome,
  Conversations,
  Prompts,
  Bubble,
  Sender,
  Attachments,
} from '@g-ai-ui/ui'

export default function ChatPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <Conversations items={[]} />
      <div className="space-y-4">
        <Welcome title="你好，今天想构建什么 AI 体验？" />
        <Prompts items={[]} />
        <Bubble role="assistant" content="已准备好，请输入你的任务。" />
        <Attachments items={[]} />
        <Sender onSubmit={() => {}} />
      </div>
    </div>
  )
}
```
