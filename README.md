# g-ai-ui

`g-ai-ui` 是一个基于 `Turborepo + pnpm workspace` 的 AI 前端组件库 monorepo，聚焦会话式产品构建与工程化落地。

项目地址：<https://github.com/lotosv2010/g-ai-ui>

## 项目目标

- 提供 Ant Design X 风格的 AI 交互组件体系
- 提供基于 `es-toolkit` 的 AI 工具函数能力
- 提供可运行的 Playground 作为联调与验证层
- 提供与实现同步的工程化文档体系

## 仓库信息

- Author: `Robin`
- Email: `lotosv2010@163.com`
- Repository: `https://github.com/lotosv2010/g-ai-ui`

## 技术架构

| 模块 | 路径 | 技术栈 | 说明 |
| --- | --- | --- | --- |
| `@g-ai-ui/ui` | `packages/ui` | React 18, TypeScript, Tailwind CSS, tsup | AI 交互组件 |
| `@g-ai-ui/utils` | `packages/utils` | TypeScript, es-toolkit, tsup | AI 工具函数 |
| `@g-ai-ui/web` | `apps/web` | Next.js 15, Turbopack, Tailwind CSS | 组件/工具联调 Playground |
| `@g-ai-ui/doc` | `apps/doc` | Rspress, React, Tailwind CSS | 文档与实践指南 |

依赖关系：

```txt
@g-ai-ui/web  -> @g-ai-ui/ui -> @g-ai-ui/utils
@g-ai-ui/doc  -> @g-ai-ui/ui
```

## 组件能力（@g-ai-ui/ui）

- `Welcome`
- `Conversations`
- `Prompts`
- `Attachments`
- `Bubble`
- `Sender`

设计方向：Ant Design X 风格的浅色卡片体系、蓝青渐变主色、高密度会话交互布局。

## 工具能力（@g-ai-ui/utils）

- `normalizePrompt`
- `renderPromptTemplate`
- `buildMessageContext`
- `pickTopScoredChunks`
- `mergeModelConfig`

## Web Playground（@g-ai-ui/web）

Playground 采用双菜单布局：

- `组件测试`：验证组件样式与交互链路
- `工具测试`：验证工具函数输入输出与参数边界

访问地址：`http://localhost:3010`

## 文档站（@g-ai-ui/doc）

文档内容覆盖：

- 快速开始
- 组件文档与 API
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
├─ apps/
│  ├─ web/                 # Next.js Playground
│  └─ doc/                 # Rspress 文档站
├─ packages/
│  ├─ ui/                  # React 组件库
│  └─ utils/               # AI 工具函数库
├─ pnpm-workspace.yaml
├─ turbo.json
└─ package.json
```

## License

MIT
