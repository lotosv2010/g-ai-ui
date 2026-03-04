import React, { useMemo, useRef, useState } from 'react'

export interface SenderProps {
  onSubmit: (message: string) => void
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  maxLength?: number
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  submitLabel?: string
}

export const Sender: React.FC<SenderProps> = ({
  onSubmit,
  value,
  defaultValue = '',
  onChange,
  placeholder = '输入消息，按 Enter 发送，Shift + Enter 换行',
  disabled = false,
  loading = false,
  maxLength = 2000,
  className = '',
  prefix,
  suffix,
  submitLabel = '发送',
}) => {
  const [innerValue, setInnerValue] = useState(defaultValue)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : innerValue
  const canSubmit = useMemo(
    () => !disabled && !loading && currentValue.trim().length > 0,
    [currentValue, disabled, loading]
  )

  const updateValue = (next: string) => {
    if (!isControlled) {
      setInnerValue(next)
    }
    onChange?.(next)
  }

  const handleSubmit = () => {
    const message = currentValue.trim()
    if (!message || !canSubmit) {
      return
    }
    onSubmit(message)
    if (!isControlled) {
      setInnerValue('')
    }
    textAreaRef.current?.focus()
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${className}`}
    >
      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <div className="inline-flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-1">AI Sender</span>
          {prefix}
        </div>
        <span>
          {currentValue.length}/{maxLength}
        </span>
      </div>

      <textarea
        ref={textAreaRef}
        value={currentValue}
        onChange={(event) => updateValue(event.target.value.slice(0, maxLength))}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        rows={3}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            disabled={disabled}
            className="rounded-lg border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:cursor-not-allowed"
          >
            + 附件
          </button>
          <button
            type="button"
            disabled={disabled}
            className="rounded-lg border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:cursor-not-allowed"
          >
            / 指令
          </button>
          {suffix}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:from-blue-600 hover:to-cyan-600 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300"
        >
          {loading ? '发送中...' : submitLabel}
        </button>
      </div>
    </div>
  )
}
