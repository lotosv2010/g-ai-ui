import type { AttachmentItem, ConversationItem, PromptItem } from '@g-ai-ui/ui'
import type { AIMessage } from '@g-ai-ui/utils'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

const LAB_BASE_TIME = Date.parse('2026-03-04T10:00:00+08:00')

export const conversationSeed: ConversationItem[] = [
  {
    id: 'conv-1',
    title: '产品文档问答',
    description: '需求分析与接口说明',
    unread: 2,
    pinned: true,
  },
  {
    id: 'conv-2',
    title: 'AI 客服流程优化',
    description: '提示词与上下文窗口策略',
  },
  {
    id: 'conv-3',
    title: '组件库 API 评审',
    description: 'UI 契约与可维护性',
  },
]

export const promptSeed: PromptItem[] = [
  {
    id: 'p1',
    title: '生成迭代发布说明',
    description: '根据变更记录输出版本公告',
    icon: '📝',
  },
  {
    id: 'p2',
    title: '梳理组件接入步骤',
    description: '面向业务项目给出落地清单',
    icon: '🧩',
  },
  {
    id: 'p3',
    title: '给出性能优化建议',
    description: '聚焦渲染与状态管理成本',
    icon: '⚡',
  },
  {
    id: 'p4',
    title: '输出测试用例模板',
    description: '覆盖边界场景与错误恢复',
    icon: '✅',
  },
]

export const attachmentSeed: AttachmentItem[] = [
  { id: 'a1', name: 'prd-v2.md', size: '128 KB', status: 'done' },
  { id: 'a2', name: 'qa-report.pdf', size: '2.1 MB', status: 'uploading' },
]

export const chunkSeed = [
  { id: 'doc-1', content: '组件 API 契约文档', score: 0.91 },
  { id: 'doc-2', content: 'monorepo 开发规范', score: 0.87 },
  { id: 'doc-3', content: 'Tailwind 主题策略', score: 0.66 },
  { id: 'doc-4', content: '工具函数输入输出基线', score: 0.93 },
]

export const initialMessages: ChatMessage[] = [
  {
    id: 'm-1',
    role: 'assistant',
    content:
      '你好，我是 g-ai-ui 助手。你可以在组件测试里验证会话交互，也可以切到工具测试查看函数输出。',
    createdAt: LAB_BASE_TIME,
  },
  {
    id: 'm-2',
    role: 'user',
    content: '请总结本次迭代要点。',
    createdAt: LAB_BASE_TIME - 2000,
  }
]

export const toolContextSeed: AIMessage[] = [
  {
    role: 'system',
    content: '你是一个严谨的 AI 产品助手。',
    createdAt: LAB_BASE_TIME - 3000,
  },
  {
    role: 'user',
    content: '请总结本次迭代要点。',
    createdAt: LAB_BASE_TIME - 2000,
  },
  {
    role: 'assistant',
    content: '已收到请求，我会先整理组件改动与工具行为差异。',
    createdAt: LAB_BASE_TIME - 1000,
  },
]
