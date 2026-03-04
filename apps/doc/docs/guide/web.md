---
title: Web 应用
---

# Web 应用

Web 应用是使用 Next.js 和 Turbopack 构建的 Dashboard 页面，展示了如何在实际项目中使用 Turborepo Demo 的组件。

## 访问应用

在开发模式下，访问 `http://localhost:3010` 查看 Web 应用。

```bash
pnpm --filter @g-ai-ui/web dev
```

## 功能特性

### 1. Dashboard 页面

Dashboard 提供了一个完整的管理界面，包含：

- 顶部导航栏
- 项目信息卡片
- 三个子包的介绍卡片
- 聊天演示组件

### 2. 聊天演示

Dashboard 中集成了完整的聊天功能，展示了：

- 使用 `ChatBubble` 组件显示消息
- 使用 `ChatInput` 组件接收用户输入
- 自动回复功能

### 3. UI 组件集成

Web 应用展示了如何在实际项目中使用 UI 组件：

```tsx
import { ChatBubble, ChatInput } from '@g-ai-ui/ui'

export default function Dashboard() {
  const [messages, setMessages] = useState([])

  const handleSendMessage = (text: string) => {
    // 处理消息发送逻辑
  }

  return (
    <div>
      {/* 显示消息列表 */}
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
      ))}

      {/* 输入框 */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  )
}
```

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 15.1.0 | React 框架 |
| Turbopack | - | 打包工具 |
| TypeScript | 5.9.3 | 类型系统 |
| Tailwind CSS | 3.4.0 | 样式框架 |
| @g-ai-ui/ui | workspace:* | UI 组件库 |

## 项目结构

```
apps/web/
├── src/
│   └── app/
│       ├── layout.tsx      # 根布局
│       ├── page.tsx        # Dashboard 页面
│       └── globals.css     # 全局样式
├── package.json
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 开发指南

### 启动开发服务器

```bash
pnpm --filter @g-ai-ui/web dev
```

### 构建生产版本

```bash
pnpm --filter @g-ai-ui/web build
```

### 启动生产服务器

```bash
pnpm --filter @g-ai-ui/web start
```

## Turbopack

Turbopack 是 Next.js 的新一代打包工具，提供了更快的构建速度和热更新。在 `package.json` 中，我们通过 `--turbo` 标志启用它：

```json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

## 依赖配置

Web 应用通过 `workspace:*` 协议引用 UI 组件库：

```json
{
  "dependencies": {
    "@g-ai-ui/ui": "workspace:*"
  }
}
```

这样可以在 monorepo 中直接引用，无需单独安装。

## 样式定制

Web 应用使用 Tailwind CSS，你可以通过修改 `tailwind.config.js` 来自定义主题：

```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 自定义主题
    },
  },
  plugins: [],
}
```

## 下一步

- 查看 [组件文档](../guide/components)了解更多组件详情
- 查看 [快速开始](../guide/getting-started)了解如何使用组件
