'use client'

import { useMemo, useState } from 'react'
import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  type AttachmentItem,
  type ConversationItem,
  type PromptItem,
} from '@g-ai-ui/ui'
import {
  buildMessageContext,
  mergeModelConfig,
  normalizePrompt,
  pickTopScoredChunks,
  renderPromptTemplate,
  type AIMessage,
} from '@g-ai-ui/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
}

const conversationSeed: ConversationItem[] = [
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

const promptSeed: PromptItem[] = [
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

const attachmentSeed: AttachmentItem[] = [
  { id: 'a1', name: 'prd-v2.md', size: '128 KB', status: 'done' },
  { id: 'a2', name: 'qa-report.pdf', size: '2.1 MB', status: 'uploading' },
]

export default function Dashboard() {
  const [activeConversationId, setActiveConversationId] = useState('conv-1')
  const [draft, setDraft] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const [attachments, setAttachments] = useState<AttachmentItem[]>(attachmentSeed)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content:
        '你好，我是 g-ai-ui 助手。你可以直接选择提示词，或者在下方 Sender 中输入需求。',
      createdAt: Date.now(),
    },
  ])

  const handleSend = (input: string) => {
    const text = normalizePrompt(input, { preserveLineBreaks: true, maxLength: 500 })
    if (!text) {
      return
    }

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setDraft('')
    setIsReplying(true)

    setTimeout(() => {
      const aiContext: AIMessage[] = buildMessageContext([
        {
          role: 'system',
          content: '你是一个资深前端架构助手，请给出可执行建议。',
          createdAt: Date.now() - 1000,
        },
        ...messages.map((item) => ({
          role: item.role,
          content: item.content,
          createdAt: item.createdAt,
        })),
        {
          role: 'user',
          content: text,
          createdAt: Date.now(),
        },
      ])

      const topChunks = pickTopScoredChunks(
        [
          { id: 'doc-1', content: '组件 API 契约文档', score: 0.91 },
          { id: 'doc-2', content: 'monorepo 开发规范', score: 0.87 },
          { id: 'doc-3', content: 'Tailwind 主题策略', score: 0.66 },
        ],
        2
      )

      const config = mergeModelConfig(
        {
          model: 'gpt-4o-mini',
          temperature: 0.7,
          topP: 1,
          maxTokens: 2048,
          stream: false,
        },
        { temperature: 1.2, maxTokens: 4096 }
      )

      const assistantReply = renderPromptTemplate(
        '已收到你的请求：「{{question}}」。\n建议先从「{{focus}}」开始，当前上下文消息 {{contextSize}} 条，配置温度 {{temperature}}。',
        {
          question: text,
          focus: topChunks[0]?.content ?? '组件接入',
          contextSize: aiContext.length,
          temperature: config.temperature ?? 0.7,
        }
      )

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: assistantReply,
          createdAt: Date.now(),
        },
      ])
      setIsReplying(false)
    }, 900)
  }

  const aiToolTestResult = useMemo(() => {
    const context = buildMessageContext(
      messages.map((item) => ({
        role: item.role,
        content: item.content,
        createdAt: item.createdAt,
      }))
    )

    return {
      normalizePrompt: normalizePrompt('  g-ai-ui 是一个 AI 组件库。  '),
      renderPromptTemplate: renderPromptTemplate('你好，{{name}}', { name: 'Robin' }),
      contextSize: context.length,
      topChunks: pickTopScoredChunks(
        [
          { id: 'x1', content: 'Bubble 组件说明', score: 0.9 },
          { id: 'x2', content: 'Sender 组件说明', score: 0.8 },
          { id: 'x3', content: 'Prompts 组件说明', score: 0.6 },
        ],
        2
      ),
      modelConfig: mergeModelConfig(
        { model: 'gpt-4o-mini', temperature: 0.7, topP: 1, maxTokens: 2048 },
        { temperature: 1.1 }
      ),
    }
  }, [messages])

  return (
    <div className="aix-shell min-h-screen">
      <div className="aix-grid" />

      <header className="border-b border-white/70 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">g-ai-ui Playground</h1>
            <p className="text-xs text-slate-500">Inspired by Ant Design X interaction model</p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700">
            Next.js + Turbopack
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <Conversations
              items={conversationSeed.map((item) => ({
                ...item,
                time: item.id === activeConversationId ? '当前会话' : '可切换',
              }))}
              activeId={activeConversationId}
              onSelect={setActiveConversationId}
            />

            <Attachments
              items={attachments}
              onRemove={(id) =>
                setAttachments((prev) => prev.filter((item) => item.id !== id))
              }
              onRetry={(id) =>
                setAttachments((prev) =>
                  prev.map((item) =>
                    item.id === id ? { ...item, status: 'uploading' } : item
                  )
                )
              }
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">AI 工具函数测试</h3>
              <pre className="overflow-x-auto rounded-xl bg-slate-900 p-3 text-[11px] text-slate-100">
                {JSON.stringify(aiToolTestResult, null, 2)}
              </pre>
            </div>
          </aside>

          <section className="space-y-4">
            <Welcome
              title="你好，今天想构建什么 AI 体验？"
              description="从 Prompt 到多轮会话，再到附件与上下文管理，这里展示完整交互链路。"
              extra={
                <span className="rounded-lg bg-white/80 px-2 py-1 text-xs text-slate-600">
                  Conversation: {activeConversationId}
                </span>
              }
            />

            <Prompts
              items={promptSeed}
              onSelect={(item) => setDraft(item.title)}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Messages</h3>
                <span className="text-xs text-slate-500">{messages.length} 条</span>
              </div>

              <div className="max-h-[460px] overflow-y-auto pr-1">
                {messages.map((item) => (
                  <Bubble
                    key={item.id}
                    role={item.role}
                    header={item.role === 'user' ? 'Robin' : 'Assistant'}
                    content={item.content}
                    footer={new Date(item.createdAt).toLocaleTimeString()}
                  />
                ))}
                {isReplying && (
                  <Bubble
                    role="assistant"
                    header="Assistant"
                    content=""
                    typing
                    footer="生成中..."
                  />
                )}
              </div>
            </div>

            <Sender
              value={draft}
              onChange={setDraft}
              onSubmit={handleSend}
              loading={isReplying}
              placeholder="输入需求，比如：请输出一个包含 Bubble、Sender、Prompts 的页面方案。"
            />
          </section>
        </div>
      </main>
    </div>
  )
}
