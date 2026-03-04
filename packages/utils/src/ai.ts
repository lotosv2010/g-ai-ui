import {
  clamp,
  compact,
  escapeRegExp,
  isNil,
  isNumber,
  isString,
  orderBy,
  take,
  takeRight,
  toMerged,
  trim,
} from 'es-toolkit'

export type AIMessageRole = 'system' | 'user' | 'assistant' | 'tool'

export interface AIMessage {
  id?: string
  role: AIMessageRole
  content: string
  createdAt?: number
  metadata?: Record<string, unknown>
}

export interface NormalizePromptOptions {
  maxLength?: number
  preserveLineBreaks?: boolean
}

export interface BuildMessageContextOptions {
  maxMessages?: number
  maxCharsPerMessage?: number
  includeRoles?: AIMessageRole[]
}

export interface ScoredChunk<T = string> {
  id: string
  content: T
  score: number
  metadata?: Record<string, unknown>
}

export interface AIModelConfig {
  model?: string
  temperature?: number
  topP?: number
  maxTokens?: number
  stream?: boolean
  stop?: string[]
}

const DEFAULT_NORMALIZE_PROMPT_OPTIONS: Required<NormalizePromptOptions> = {
  maxLength: 4000,
  preserveLineBreaks: false,
}

const DEFAULT_CONTEXT_OPTIONS: Required<BuildMessageContextOptions> = {
  maxMessages: 12,
  maxCharsPerMessage: 600,
  includeRoles: ['system', 'user', 'assistant', 'tool'],
}

function toSafeInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number
): number {
  if (!isNumber(value) || !Number.isFinite(value)) {
    return fallback
  }

  return clamp(Math.floor(value), min, max)
}

function toSafeNumber(value: unknown, fallback: number): number {
  if (!isNumber(value) || !Number.isFinite(value)) {
    return fallback
  }

  return value
}

/**
 * 规范化提示词文本：去除首尾空白、压缩冗余空白并限制长度。
 */
export function normalizePrompt(
  input: unknown,
  options: NormalizePromptOptions = {}
): string {
  const merged = toMerged(DEFAULT_NORMALIZE_PROMPT_OPTIONS, options)
  const maxLength = toSafeInt(
    merged.maxLength,
    DEFAULT_NORMALIZE_PROMPT_OPTIONS.maxLength,
    1,
    200000
  )
  const raw = isString(input) ? input : String(input ?? '')
  const squashed = merged.preserveLineBreaks
    ? raw.replace(/[^\S\r\n]+/g, ' ')
    : raw.replace(/\s+/g, ' ')
  const normalized = trim(squashed)

  if (normalized.length <= maxLength) {
    return normalized
  }

  return normalized.slice(0, maxLength)
}

/**
 * 使用 `{{variable}}` 模板语法渲染提示词。
 */
export function renderPromptTemplate(
  template: string,
  variables: Record<string, string | number | boolean | null | undefined>
): string {
  let rendered = template

  for (const [key, value] of Object.entries(variables)) {
    const token = new RegExp(`{{\\s*${escapeRegExp(key)}\\s*}}`, 'g')
    rendered = rendered.replace(token, isNil(value) ? '' : String(value))
  }

  return normalizePrompt(rendered, {
    maxLength: 200000,
    preserveLineBreaks: true,
  })
}

/**
 * 构建发送给模型的消息上下文窗口。
 */
export function buildMessageContext(
  messages: readonly AIMessage[],
  options: BuildMessageContextOptions = {}
): AIMessage[] {
  const merged = toMerged(DEFAULT_CONTEXT_OPTIONS, {
    maxMessages: options.maxMessages,
    maxCharsPerMessage: options.maxCharsPerMessage,
  })
  const maxMessages = toSafeInt(
    merged.maxMessages,
    DEFAULT_CONTEXT_OPTIONS.maxMessages,
    1,
    200
  )
  const maxCharsPerMessage = toSafeInt(
    merged.maxCharsPerMessage,
    DEFAULT_CONTEXT_OPTIONS.maxCharsPerMessage,
    1,
    20000
  )
  const includeRoles =
    options.includeRoles && options.includeRoles.length > 0
      ? options.includeRoles
      : DEFAULT_CONTEXT_OPTIONS.includeRoles
  const roleSet = new Set(includeRoles)
  const filtered = compact(
    messages.map((message, index) => {
      if (!message || !roleSet.has(message.role)) {
        return null
      }

      const content = normalizePrompt(message.content, {
        maxLength: maxCharsPerMessage,
        preserveLineBreaks: true,
      })

      if (!content) {
        return null
      }

      return {
        ...message,
        id: message.id ?? `${message.role}-${index}`,
        content,
      }
    })
  )
  const ordered = orderBy(
    filtered,
    [
      (message) =>
        toSafeNumber(message.createdAt, Number.MAX_SAFE_INTEGER),
      (message) => message.id ?? '',
    ],
    ['asc', 'asc']
  )

  return takeRight(ordered, maxMessages)
}

/**
 * 按得分降序选择 TopK 检索片段。
 */
export function pickTopScoredChunks<T>(
  chunks: readonly ScoredChunk<T>[],
  topK = 3
): ScoredChunk<T>[] {
  const size = toSafeInt(topK, 3, 1, 100)
  const validChunks = compact(
    chunks.map((chunk) => {
      if (!chunk || !isNumber(chunk.score) || !Number.isFinite(chunk.score)) {
        return null
      }

      return chunk
    })
  )

  return take(orderBy(validChunks, ['score'], ['desc']), size)
}

/**
 * 合并并规范化模型参数。
 */
export function mergeModelConfig(
  base: AIModelConfig,
  override: Partial<AIModelConfig> = {}
): AIModelConfig {
  const merged = toMerged(base, override)
  const rawStop = override.stop ?? base.stop ?? []

  return {
    ...merged,
    temperature: clamp(toSafeNumber(merged.temperature, 0.7), 0, 2),
    topP: clamp(toSafeNumber(merged.topP, 1), 0, 1),
    maxTokens: toSafeInt(merged.maxTokens, 2048, 1, 128000),
    stop: compact(rawStop.map((token) => normalizePrompt(token))),
  }
}
