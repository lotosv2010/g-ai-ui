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

type LabMenuKey = 'components' | 'tools'

const menuItems: Array<{ key: LabMenuKey; label: string; description: string }> = [
  {
    key: 'components',
    label: '组件测试',
    description: '验证 Welcome / Bubble / Sender 等交互体验',
  },
  {
    key: 'tools',
    label: '工具测试',
    description: '验证 normalizePrompt 等 AI 工具函数输出',
  },
]

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

const chunkSeed = [
  { id: 'doc-1', content: '组件 API 契约文档', score: 0.91 },
  { id: 'doc-2', content: 'monorepo 开发规范', score: 0.87 },
  { id: 'doc-3', content: 'Tailwind 主题策略', score: 0.66 },
  { id: 'doc-4', content: '工具函数输入输出基线', score: 0.93 },
]

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="aix-json-block">{JSON.stringify(value, null, 2)}</pre>
  )
}

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<LabMenuKey>('components')
  const [activeConversationId, setActiveConversationId] = useState('conv-1')
  const [draft, setDraft] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const [attachments, setAttachments] = useState<AttachmentItem[]>(attachmentSeed)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content:
        '你好，我是 g-ai-ui 助手。你可以在组件测试中验证交互，也可以切到工具测试查看函数输出。',
      createdAt: Date.now(),
    },
  ])

  const [promptInput, setPromptInput] = useState(
    '  你是一个企业级 AI 助手，请输出可执行的迭代计划。  '
  )
  const [templateText, setTemplateText] = useState(
    '你是 {{role}}，请完成：{{task}}，优先级：{{priority}}。'
  )
  const [templateVarsText, setTemplateVarsText] = useState(
    '{"role":"前端架构师","task":"优化 Playground 布局","priority":"P1"}'
  )
  const [contextMaxMessages, setContextMaxMessages] = useState(4)
  const [topK, setTopK] = useState(2)
  const [temperature, setTemperature] = useState(1.1)
  const [maxTokens, setMaxTokens] = useState(4096)

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

      const topChunks = pickTopScoredChunks(chunkSeed, 2)
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
        '已收到你的请求：「{{question}}」。建议先从「{{focus}}」开始，当前上下文消息 {{contextSize}} 条，配置温度 {{temperature}}。',
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
    }, 800)
  }

  const templateVariables = useMemo(() => {
    try {
      const parsed = JSON.parse(templateVarsText) as Record<string, unknown>
      return {
        value: parsed,
        error: '',
      }
    } catch {
      return {
        value: {} as Record<string, unknown>,
        error: '变量 JSON 解析失败，请检查格式。',
      }
    }
  }, [templateVarsText])

  const toolResults = useMemo(() => {
    const contextInput: AIMessage[] = [
      {
        role: 'system',
        content: '你是一个严谨的 AI 产品助手。',
        createdAt: Date.now() - 3000,
      },
      ...messages.map((item) => ({
        role: item.role,
        content: item.content,
        createdAt: item.createdAt,
      })),
    ]

    const renderedTemplate = renderPromptTemplate(
      templateText,
      templateVariables.value as Record<
        string,
        string | number | boolean | null | undefined
      >
    )

    return {
      normalizePrompt: normalizePrompt(promptInput, {
        preserveLineBreaks: true,
        maxLength: 120,
      }),
      renderPromptTemplate: templateVariables.error
        ? templateVariables.error
        : renderedTemplate,
      buildMessageContext: buildMessageContext(contextInput, {
        maxMessages: contextMaxMessages,
        includeRoles: ['system', 'user', 'assistant'],
      }),
      pickTopScoredChunks: pickTopScoredChunks(chunkSeed, topK),
      mergeModelConfig: mergeModelConfig(
        { model: 'gpt-4o-mini', temperature: 0.7, topP: 1, maxTokens: 2048 },
        { temperature, maxTokens }
      ),
    }
  }, [
    contextMaxMessages,
    maxTokens,
    messages,
    promptInput,
    templateText,
    templateVariables.error,
    templateVariables.value,
    temperature,
    topK,
  ])

  return (
    <div className="aix-shell min-h-screen">
      <div className="aix-grid" />
      <div className="aix-glow" />

      <header className="border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              g-ai-ui Playground
            </h1>
            <p className="text-xs text-slate-500">
              Ant Design X inspired interaction lab
            </p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            Next.js + Turbopack
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="aix-panel space-y-4 p-4">
            <div>
              <p className="aix-kicker">Playground Menu</p>
              <h2 className="mt-1 text-base font-semibold text-slate-900">
                联调验证入口
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                组件测试与工具测试采用分菜单管理，便于按职责验证迭代改动。
              </p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const active = item.key === activeMenu
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveMenu(item.key)}
                    className={`aix-menu-btn ${active ? 'is-active' : ''}`}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="mt-1 block text-xs text-slate-500">
                      {item.description}
                    </span>
                  </button>
                )
              })}
            </nav>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/85 p-3">
              <p className="text-xs text-slate-500">当前视图</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {activeMenu === 'components' ? '组件测试' : '工具测试'}
              </p>
            </div>
          </aside>

          <section>
            {activeMenu === 'components' ? (
              <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
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
                </aside>

                <div className="space-y-4">
                  <Welcome
                    title="你好，今天想构建什么 AI 体验？"
                    description="从 Prompt 到多轮会话，再到附件和上下文管理，这里覆盖完整交互链路。"
                    extra={<span>Conversation: {activeConversationId}</span>}
                  />

                  <Prompts items={promptSeed} onSelect={(item) => setDraft(item.title)} />

                  <div className="aix-panel p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">Messages</h3>
                      <span className="text-xs text-slate-500">{messages.length} 条</span>
                    </div>

                    <div className="max-h-[460px] overflow-y-auto pr-1">
                      {messages.map((item) => (
                        <Bubble
                          key={item.id}
                          role={item.role}
                          avatar={item.role === 'user' ? 'RB' : 'AI'}
                          header={item.role === 'user' ? 'Robin' : 'Assistant'}
                          content={item.content}
                          footer={new Date(item.createdAt).toLocaleTimeString()}
                        />
                      ))}
                      {isReplying && (
                        <Bubble
                          role="assistant"
                          avatar="AI"
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
                    placeholder="输入需求，比如：请给出一个包含 Welcome、Prompts、Sender 的页面方案。"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Welcome
                  title="AI 工具函数测试面板"
                  description="通过参数输入和结果输出，验证工具函数在真实业务中的行为稳定性。"
                  icon="🧪"
                  extra={<span>@g-ai-ui/utils</span>}
                />

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="aix-tool-card">
                    <h3 className="aix-tool-title">normalizePrompt</h3>
                    <textarea
                      className="aix-input"
                      value={promptInput}
                      onChange={(event) => setPromptInput(event.target.value)}
                      rows={4}
                    />
                    <JsonBlock value={toolResults.normalizePrompt} />
                  </div>

                  <div className="aix-tool-card">
                    <h3 className="aix-tool-title">renderPromptTemplate</h3>
                    <textarea
                      className="aix-input"
                      value={templateText}
                      onChange={(event) => setTemplateText(event.target.value)}
                      rows={2}
                    />
                    <textarea
                      className="aix-input mt-2"
                      value={templateVarsText}
                      onChange={(event) => setTemplateVarsText(event.target.value)}
                      rows={3}
                    />
                    <JsonBlock value={toolResults.renderPromptTemplate} />
                  </div>

                  <div className="aix-tool-card">
                    <h3 className="aix-tool-title">buildMessageContext</h3>
                    <label className="aix-label">
                      上下文条数
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={contextMaxMessages}
                        onChange={(event) =>
                          setContextMaxMessages(Number(event.target.value) || 1)
                        }
                        className="aix-number-input"
                      />
                    </label>
                    <JsonBlock value={toolResults.buildMessageContext} />
                  </div>

                  <div className="aix-tool-card">
                    <h3 className="aix-tool-title">pickTopScoredChunks</h3>
                    <label className="aix-label">
                      TopK
                      <input
                        type="number"
                        min={1}
                        max={4}
                        value={topK}
                        onChange={(event) => setTopK(Number(event.target.value) || 1)}
                        className="aix-number-input"
                      />
                    </label>
                    <JsonBlock value={toolResults.pickTopScoredChunks} />
                  </div>

                  <div className="aix-tool-card lg:col-span-2">
                    <h3 className="aix-tool-title">mergeModelConfig</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="aix-label">
                        temperature
                        <input
                          type="number"
                          step={0.1}
                          min={0}
                          max={2}
                          value={temperature}
                          onChange={(event) =>
                            setTemperature(Number(event.target.value) || 0)
                          }
                          className="aix-number-input"
                        />
                      </label>
                      <label className="aix-label">
                        maxTokens
                        <input
                          type="number"
                          min={1}
                          max={8192}
                          value={maxTokens}
                          onChange={(event) =>
                            setMaxTokens(Number(event.target.value) || 1)
                          }
                          className="aix-number-input"
                        />
                      </label>
                    </div>
                    <JsonBlock value={toolResults.mergeModelConfig} />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
