# g-ai-ui

`g-ai-ui` 是一个基于 `Turborepo + pnpm workspace` 的 AI 前端组件与工具函数 monorepo，聚焦会话式产品的快速搭建与工程化验证。

项目地址：<https://github.com/lotosv2010/g-ai-ui>

## 项目目标

- 提供面向 AI 场景的 UI 组件库（`@g-ai-ui/ui`）
- 提供可复用的 AI 工具函数库（`@g-ai-ui/utils`）
- 提供路由化 Playground（`@g-ai-ui/web`）用于联调验证
- 提供与实现同步的工程化文档（`@g-ai-ui/doc`）

## 技术架构

| 模块 | 路径 | 技术栈 | 说明 |
| --- | --- | --- | --- |
| `@g-ai-ui/ui` | `packages/ui` | React 18, TypeScript, Tailwind CSS, tsup | AI 交互组件 |
| `@g-ai-ui/utils` | `packages/utils` | TypeScript, es-toolkit, tsup | AI 工具函数 |
| `@g-ai-ui/web` | `apps/web` | Next.js 15, Turbopack, Tailwind CSS | 组件/工具路由化测试场 |
| `@g-ai-ui/doc` | `apps/doc` | Rspress, React, Tailwind CSS | 文档站 |

依赖关系：

```txt
@g-ai-ui/web  -> @g-ai-ui/ui -> @g-ai-ui/utils
@g-ai-ui/doc  -> @g-ai-ui/ui
```

## UI 组件（@g-ai-ui/ui）

- `Welcome`
- `Conversations`
- `Prompts`
- `Attachments`
- `Bubble`
- `Sender`

当前视觉方向：更接近市场常见 AI 产品的浅色玻璃卡片、蓝青渐变主色、强状态反馈与高密度会话布局。

## 工具函数（@g-ai-ui/utils）

- `normalizePrompt`
- `renderPromptTemplate`
- `buildMessageContext`
- `pickTopScoredChunks`
- `mergeModelConfig`

## Web Playground（@g-ai-ui/web）

Playground 采用路由拆分，入口如下：

- `http://localhost:3010/components`：组件测试路由，验证 UI 组件样式与交互链路
- `http://localhost:3010/tools`：工具测试路由，验证 utils 输入输出与参数边界
- `http://localhost:3010`：自动重定向到 `/components`

## 文档站（@g-ai-ui/doc）

文档覆盖：

- 快速开始
- 组件说明与 API
- 工具函数指南
- Web Playground 工程实践
- 样式定制建议

访问地址：`http://localhost:3020`

## 快速开始

```bash
pnpm install
pnpm dev
```

## 常用命令

```bash
# 根任务
pnpm dev
pnpm build
pnpm lint
pnpm format

# 按包运行
pnpm --filter @g-ai-ui/ui dev
pnpm --filter @g-ai-ui/utils dev
pnpm --filter @g-ai-ui/web dev
pnpm --filter @g-ai-ui/doc dev
```

## 目录结构

```txt
g-ai-ui/
├── apps/
│   ├── web/                 # Next.js 路由化 Playground
│   └── doc/                 # Rspress 文档站
├── packages/
│   ├── ui/                  # React 组件库
│   └── utils/               # AI 工具函数库
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## License

MIT
