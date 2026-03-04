import React from 'react'

export type BubbleRole = 'assistant' | 'user' | 'system'
export type BubblePlacement = 'start' | 'end'

export interface BubbleProps {
  content: React.ReactNode
  role?: BubbleRole
  placement?: BubblePlacement
  avatar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  typing?: boolean
  className?: string
}

export const Bubble: React.FC<BubbleProps> = ({
  content,
  role = 'assistant',
  placement,
  avatar,
  header,
  footer,
  typing = false,
  className = '',
}) => {
  const resolvedPlacement: BubblePlacement =
    placement ?? (role === 'user' ? 'end' : 'start')
  const isEnd = resolvedPlacement === 'end'
  const bubbleClass = isEnd
    ? 'border border-blue-400/70 bg-[linear-gradient(135deg,#1677ff_0%,#36cfc9_100%)] text-white shadow-[0_14px_32px_rgba(22,119,255,0.28)] rounded-br-md'
    : 'border border-slate-200 bg-white text-slate-800 shadow-[0_12px_28px_rgba(15,23,42,0.06)] rounded-bl-md'

  return (
    <div
      className={`mb-4 flex items-end gap-3 ${isEnd ? 'justify-end' : 'justify-start'} ${className}`}
    >
      {!isEnd && avatar && (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-[linear-gradient(145deg,#ffffff_0%,#eef2f7_100%)] text-xs font-semibold text-slate-700">
          {avatar}
        </div>
      )}

      <div className={`max-w-[82%] ${isEnd ? 'text-right' : 'text-left'}`}>
        {header && <div className="mb-1 text-xs text-slate-500">{header}</div>}
        <div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${bubbleClass}`}>
          {typing ? (
            <div className="inline-flex items-center gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-current/80" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-current/60 [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-current/50 [animation-delay:240ms]" />
            </div>
          ) : (
            content
          )}
        </div>
        {footer && <div className="mt-1 text-xs text-slate-400">{footer}</div>}
      </div>

      {isEnd && avatar && (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-blue-300/70 bg-[linear-gradient(135deg,#1677ff_0%,#36cfc9_100%)] text-xs font-semibold text-white shadow-[0_6px_15px_rgba(22,119,255,0.28)]">
          {avatar}
        </div>
      )}
    </div>
  )
}
