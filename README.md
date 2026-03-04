# Turborepo Demo

一个基于 Turborepo 构建的 monorepo 演示项目，展示了如何高效管理多个子包。

## 项目结构

```
turborepo-demo/
├── apps/
│   ├── utils/          # 工具函数库
│   │   ├── src/
│   │   │   └── index.ts # merge, shallowCopy
│   │   ├── tsup.config.ts
│   │   └── package.json
│   ├── ui/             # UI 组件库
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── components/
│   │   │       ├── ChatBubble.tsx
│   │   │       └── ChatInput.tsx
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── package.json
│   ├── web/            # Dashboard 页面
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       └── globals.css
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   └── doc/            # 文档站点
│       ├── docs/
│       │   ├── index.md
│       │   └── guide/
│       │       ├── getting-started.md
│       │       ├── components.md
│       │       └── web.md
│       ├── rspress.config.ts
│       └── package.json
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 子包说明

### 1. Utils (@g-ai-ui/utils)

- **打包工具**: tsup
- **输出格式**: ESM, CJS, IIFE
- **功能**: 通用工具函数
  - `merge()`: 对象合并
  - `shallowCopy()`: 浅拷贝

### 2. UI (@g-ai-ui/ui)

- **打包工具**: Vite
- **输出格式**: ESM, CJS, IIFE
- **技术栈**: React, TypeScript, Tailwind CSS
- **组件**:
  - `ChatBubble`: 对话气泡
  - `ChatInput`: 对话输入框
- **依赖**: 引用 utils 子包

### 3. Web (@g-ai-ui/web)

- **打包工具**: Turbopack (Next.js 15)
- **技术栈**: Next.js, TypeScript, Tailwind CSS
- **功能**: Dashboard 页面
- **依赖**: 引用 ui 子包
- **端口**: 3000

### 4. Doc (doc)

- **打包工具**: RSPress
- **技术栈**: Markdown, TypeScript
- **功能**: 文档站点
- **依赖**: 引用 ui 子包
- **端口**: 3001

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

启动所有子包：

```bash
pnpm dev
```

单独启动某个子包：

```bash
# Utils
pnpm --filter @g-ai-ui/utils dev

# UI
pnpm --filter @g-ai-ui/ui dev

# Web
pnpm --filter @g-ai-ui/web dev

# Doc
pnpm --filter doc dev
```

### 构建

构建所有子包：

```bash
pnpm build
```

单独构建某个子包：

```bash
pnpm --filter @g-ai-ui/utils build
pnpm --filter @g-ai-ui/ui build
pnpm --filter @g-ai-ui/web build
pnpm --filter doc build
```

## 技术栈

| 子包 | 打包工具 | 主要技术 | 端口 |
|------|---------|---------|------|
| Utils | tsup | TypeScript | - |
| UI | Vite | React, TS, Tailwind CSS | - |
| Web | Turbopack | Next.js, TS, Tailwind CSS | 3000 |
| Doc | RSPress | Markdown, TS | 3001 |

## 功能特性

### Turborepo 优势

- 🚀 **增量构建**: 只构建改变的包
- 💾 **缓存优化**: 跨包缓存任务结果
- 🔄 **并行执行**: 同时执行多个任务
- 📦 **依赖管理**: 自动处理包之间的依赖关系

### Monorepo 优势

- 🔗 **共享代码**: 轻松在不同包之间共享代码
- 🛠️ **统一工具**: 所有包使用相同的工具链
- 📊 **版本管理**: 统一管理依赖版本
- 🎯 **原子提交**: 跨包的原子性代码变更

## 访问地址

- **Web 应用**: http://localhost:3000
- **文档站点**: http://localhost:3001

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
