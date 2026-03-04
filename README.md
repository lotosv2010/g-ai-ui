# g-ai-ui

`g-ai-ui` 是一个基于 `Turborepo + pnpm workspace` 的 AI 组件库 monorepo，包含组件库、工具函数、文档站点和 Next.js 示例应用。

## 项目定位

- 在一个仓库中维护可复用的 UI 组件与工具函数
- 通过 `workspace:*` 实现本地包联调
- 借助 Turborepo 做增量构建、任务编排和缓存复用

## 技术架构

| 模块 | 路径 | 技术栈 | 作用 |
| --- | --- | --- | --- |
| `@g-ai-ui/utils` | `packages/utils` | TypeScript, tsup | 通用工具函数 |
| `@g-ai-ui/ui` | `packages/ui` | React 18, TypeScript, Tailwind CSS, tsup | 对话 UI 组件库 |
| `@g-ai-ui/web` | `apps/web` | Next.js 15, Turbopack, Tailwind CSS | 组件集成示例（Dashboard） |
| `@g-ai-ui/doc` | `apps/doc` | Rspress, React, Tailwind CSS | 组件与指南文档站 |

依赖关系：

```txt
@g-ai-ui/web  -> @g-ai-ui/ui -> @g-ai-ui/utils
@g-ai-ui/doc  -> @g-ai-ui/ui
```

## 目录结构

```txt
g-ai-ui/
├─ apps/
│  ├─ web/                 # Next.js 示例应用（端口 3010）
│  └─ doc/                 # Rspress 文档站（端口 3020）
├─ packages/
│  ├─ ui/                  # React 组件库（ChatBubble / ChatInput）
│  └─ utils/               # AI 工具函数库（基于 es-toolkit）
├─ turbo.json              # Turborepo 任务流水线
├─ pnpm-workspace.yaml     # workspace 声明
└─ package.json            # 根脚本
```

## 环境要求

- Node.js >= 18
- pnpm（仓库锁定：`pnpm@10.14.0`）

## 快速开始

```bash
pnpm install
pnpm dev
```

执行 `pnpm dev` 后会通过 Turborepo 启动工作区内的开发任务，常用访问地址：

- Web 示例：`http://localhost:3010`
- 文档站：`http://localhost:3020`

## 常用命令

### 根命令

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm changeset
```

### 按包运行

```bash
# 示例应用
pnpm --filter @g-ai-ui/web dev

# 文档站
pnpm --filter @g-ai-ui/doc dev

# 组件库
pnpm --filter @g-ai-ui/ui dev

# 工具库
pnpm --filter @g-ai-ui/utils dev
```

### 类型检查（按包）

```bash
pnpm --filter @g-ai-ui/ui typecheck
pnpm --filter @g-ai-ui/utils typecheck
```

## 包能力说明

### `@g-ai-ui/utils`

- `normalizePrompt`: 规范化提示词
- `renderPromptTemplate`: 渲染提示词模板
- `buildMessageContext`: 构建对话上下文窗口
- `pickTopScoredChunks`: 检索结果 TopK 选择
- `mergeModelConfig`: 合并并规范化模型参数
- `tsup` 输出格式：`esm` / `cjs` / `iife`

### `@g-ai-ui/ui`

- 导出组件：`ChatBubble`、`ChatInput`
- 依赖 `@g-ai-ui/utils`
- `react` / `react-dom` 作为 `peerDependencies`
- `tsup` 输出格式：`esm` / `cjs`

### `@g-ai-ui/web`

- 基于 Next.js 15 + Turbopack 的 Dashboard 示例
- 展示 `ChatBubble` + `ChatInput` 的组合使用
- 通过 `transpilePackages` 直接消费工作区包

### `@g-ai-ui/doc`

- 基于 Rspress 的中文文档站
- 包含快速开始、组件文档、工具函数、Web 集成说明

## 使用示例

### 使用 UI 组件

```tsx
import { useState } from "react";
import { ChatBubble, ChatInput } from "@g-ai-ui/ui";

export default function Demo() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <div>
      {messages.map((text, i) => (
        <ChatBubble key={i} message={text} isUser={i % 2 === 0} />
      ))}
      <ChatInput onSend={(message) => setMessages((prev) => [...prev, message])} />
    </div>
  );
}
```

### 使用工具函数

```ts
import { normalizePrompt, renderPromptTemplate } from "@g-ai-ui/utils";

const prompt = normalizePrompt("  你是一个助手，请回答问题。  ");
const rendered = renderPromptTemplate("回答：{{q}}", { q: "如何复用组件库？" });
```

## Turborepo 任务说明

- `build`：依赖上游包的 `build`，缓存 `dist/**` 和 `.next/**`
- `dev`：`persistent` + `no cache`，并依赖上游 `build`
- `lint`：依赖上游包的 `lint`

## 备注

- 当前所有包均为 `private: true`，更偏向内部协作与演示。
- 文档中的旧示例仓库名若与本仓库不一致，请以当前目录结构和包名为准。
