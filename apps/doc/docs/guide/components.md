---
title: 组件概览
---

# 组件概览

`@g-ai-ui/ui` 面向会话式 AI 产品构建，提供 6 个核心组件并保持统一的视觉与交互语义。

## 组件清单

- `Welcome`：首屏欢迎与任务引导
- `Conversations`：会话列表、状态和切换
- `Prompts`：快捷提示词模板入口
- `Attachments`：附件状态与操作反馈
- `Bubble`：消息流渲染单元
- `Sender`：输入与发送控制

## 设计语言（Ant Design X 风格参考）

- 卡片系统：大圆角、浅边框、轻量浮层阴影
- 主色策略：`#1677ff` 与 `#36cfc9` 形成蓝青品牌梯度
- 交互反馈：悬浮抬升、边框高亮、状态显式化
- 组合原则：左侧结构化信息，右侧主交互工作区

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

export default function ChatWorkspace() {
  return (
    <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <Conversations items={[]} />
        <Attachments items={[]} />
      </aside>
      <main className="space-y-4">
        <Welcome title="你好，今天想构建什么 AI 体验？" />
        <Prompts items={[]} />
        <Bubble role="assistant" content="已准备好，请输入你的任务。" />
        <Sender onSubmit={() => {}} />
      </main>
    </div>
  )
}
```

## 接入建议

1. 先使用默认样式完成业务联调，确保交互链路正确。
2. 再通过 `className` 和项目级 token 做品牌化微调。
3. 复杂页面优先在 `@g-ai-ui/web` Playground 中验证，再沉淀到业务仓库。
