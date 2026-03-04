'use client'

import { useMemo, useState } from 'react'
import { Welcome } from '@g-ai-ui/ui'
import {
  buildMessageContext,
  mergeModelConfig,
  normalizePrompt,
  pickTopScoredChunks,
  renderPromptTemplate,
} from '@g-ai-ui/utils'
import { chunkSeed, toolContextSeed } from './lab-data'

function JsonBlock({ value }: { value: unknown }) {
  return <pre className="aix-json-block">{JSON.stringify(value, null, 2)}</pre>
}

export function ToolsLab() {
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
      buildMessageContext: buildMessageContext(toolContextSeed, {
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
    promptInput,
    templateText,
    templateVariables.error,
    templateVariables.value,
    temperature,
    topK,
  ])

  return (
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
                onChange={(event) => setTemperature(Number(event.target.value) || 0)}
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
                onChange={(event) => setMaxTokens(Number(event.target.value) || 1)}
                className="aix-number-input"
              />
            </label>
          </div>
          <JsonBlock value={toolResults.mergeModelConfig} />
        </div>
      </div>
    </div>
  )
}
