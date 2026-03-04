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
} from '@g-ai-ui/ui'
import {
  buildMessageContext,
  mergeModelConfig,
  normalizePrompt,
  pickTopScoredChunks,
  renderPromptTemplate,
  type AIMessage,
} from '@g-ai-ui/utils'
import {
  attachmentSeed,
  chunkSeed,
  conversationSeed,
  initialMessages,
  promptSeed,
  type ChatMessage,
} from './lab-data'

export function ComponentsLab() {
  const [conversations, setConversations] =
    useState<ConversationItem[]>(conversationSeed)
  const [activeConversationId, setActiveConversationId] = useState(
    conversationSeed[0]?.id ?? ''
  )
  const [draft, setDraft] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const [attachments, setAttachments] = useState<AttachmentItem[]>(attachmentSeed)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const conversationItems = useMemo(
    () =>
      conversations.map((item) => ({
        ...item,
        time: item.id === activeConversationId ? '当前会话' : '可切换',
      })),
    [activeConversationId, conversations]
  )

  const handleCreateConversation = () => {
    const id = `conv-${Date.now()}`
    const nextIndex = conversations.length + 1
    const nextConversation: ConversationItem = {
      id,
      title: `新会话 ${nextIndex}`,
      description: '临时测试会话',
    }

    setConversations((prev) => [nextConversation, ...prev])
    setActiveConversationId(id)
  }

  const handleSend = (input: string) => {
    const text = normalizePrompt(input, { preserveLineBreaks: true, maxLength: 500 })
    if (!text) {
      return
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }
    const timeline = [...messages, userMessage]

    setMessages(timeline)
    setDraft('')
    setIsReplying(true)

    setTimeout(() => {
      const aiContext: AIMessage[] = buildMessageContext([
        {
          role: 'system',
          content: '你是一个资深前端架构助手，请给出可执行建议。',
          createdAt: Date.now() - 1000,
        },
        ...timeline.map((item) => ({
          role: item.role,
          content: item.content,
          createdAt: item.createdAt,
        })),
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
        { temperature: 1.1, maxTokens: 4096 }
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
    }, 750)
  }

  const retryAttachment = (id: string) => {
    setAttachments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'uploading' } : item))
    )

    setTimeout(() => {
      setAttachments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'done' } : item))
      )
    }, 900)
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <Conversations
          items={conversationItems}
          activeId={activeConversationId}
          onSelect={setActiveConversationId}
          onCreate={handleCreateConversation}
        />

        <Attachments
          items={attachments}
          onRemove={(id) =>
            setAttachments((prev) => prev.filter((item) => item.id !== id))
          }
          onRetry={retryAttachment}
        />
      </aside>

      <div className="space-y-4">
        <Welcome
          title="你好，今天想构建什么 AI 体验？"
          description="从 Prompt 到多轮会话，再到附件和上下文管理，这里覆盖完整交互链路。"
          extra={<span>Conversation: {activeConversationId}</span>}
        />

        <Prompts items={promptSeed} onSelect={(item) => setDraft(item.title)} />

        <section className="aix-panel p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Messages</h3>
            <span className="rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-xs text-slate-500">
              {messages.length} 条
            </span>
          </div>

          <div className="max-h-[480px] overflow-y-auto pr-1">
            {messages.map((item) => (
              <Bubble
                key={item.id}
                role={item.role}
                avatar={item.role === 'user' ? 'RB' : 'AI'}
                header={item.role === 'user' ? 'Robin' : 'Assistant'}
                content={item.content}
                footer={new Date(item.createdAt).toLocaleTimeString('zh-CN')}
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
        </section>

        <Sender
          value={draft}
          onChange={setDraft}
          onSubmit={handleSend}
          loading={isReplying}
          placeholder="输入需求，比如：请给出一个包含 Welcome、Prompts、Sender 的页面方案。"
        />
      </div>
    </div>
  )
}
