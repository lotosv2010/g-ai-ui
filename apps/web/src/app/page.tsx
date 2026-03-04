'use client'

import { useMemo, useState } from 'react'
import { ChatBubble, ChatInput } from '@g-ai-ui/ui'
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
  text: string
  isUser: boolean
  timestamp: string
}

export default function Dashboard() {
  const aiToolTestResult = useMemo(() => {
    const sampleMessages: AIMessage[] = [
      {
        role: 'system',
        content: '  你是一个严谨的 AI 前端助手。  ',
        createdAt: 1,
      },
      {
        role: 'user',
        content: '请告诉我如何在 Turborepo 中共享组件库？',
        createdAt: 2,
      },
      {
        role: 'assistant',
        content: '可以通过 workspace:* 依赖 + transpilePackages 实现。',
        createdAt: 3,
      },
      {
        role: 'tool',
        content: '检索到 3 条文档片段。',
        createdAt: 4,
      },
    ]

    return {
      normalizedPrompt: normalizePrompt(
        '  你是一个代码助手。  \n\n请输出最小可用方案。   ',
        { preserveLineBreaks: true, maxLength: 80 }
      ),
      renderedPrompt: renderPromptTemplate('你是{{role}}，请回答：{{question}}', {
        role: 'AI 助手',
        question: '如何新增通用工具函数？',
      }),
      contextWindow: buildMessageContext(sampleMessages, {
        maxMessages: 3,
        maxCharsPerMessage: 60,
        includeRoles: ['system', 'user', 'assistant'],
      }),
      topChunks: pickTopScoredChunks(
        [
          { id: 'doc-1', content: 'pnpm workspace 说明', score: 0.82 },
          { id: 'doc-2', content: '组件库接入示例', score: 0.95 },
          { id: 'doc-3', content: 'Tailwind 配置', score: 0.7 },
        ],
        2
      ),
      modelConfig: mergeModelConfig(
        {
          model: 'gpt-4o-mini',
          temperature: 0.7,
          topP: 1,
          maxTokens: 2048,
          stream: true,
        },
        {
          temperature: 1.4,
          maxTokens: 4096,
          stop: ['\n\n', 'END'],
        }
      ),
    }
  }, [])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '欢迎使用 Turborepo Demo Dashboard！这是一个使用 Next.js 和 Turbopack 构建的仪表板。',
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, newMessage])

    // 模拟自动回复
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: `收到你的消息："${text}"`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, reply])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <div className="text-sm text-gray-500">Powered by Turbopack</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            欢迎使用 Turborepo Demo
          </h2>
          <p className="text-gray-600 mb-6">
            这个项目展示了如何使用 Turborepo 构建一个 monorepo，包含多个子包。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Utils</h3>
              <p className="text-sm text-blue-700">
                通用工具函数库，使用 tsup 打包
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">UI</h3>
              <p className="text-sm text-purple-700">
                通用组件库，使用 Vite 打包
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Web</h3>
              <p className="text-sm text-green-700">
                Dashboard 页面，使用 Next.js + Turbopack
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">聊天演示</h2>
          <div className="border border-gray-200 rounded-lg p-4 mb-4 h-96 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
          </div>
          <ChatInput onSend={handleSendMessage} placeholder="输入消息..." />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-2 text-gray-900">AI 工具函数测试</h2>
          <p className="text-sm text-gray-600 mb-4">
            下面的数据由 @g-ai-ui/utils 在页面内实时计算，可用于联调验证。
          </p>
          <pre className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800 overflow-x-auto">
            {JSON.stringify(aiToolTestResult, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  )
}
