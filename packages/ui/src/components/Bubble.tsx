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
    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white border border-blue-400/60 rounded-br-md'
    : 'bg-white text-slate-800 border border-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.06)] rounded-bl-md'

  return (
    <div
      className={`mb-4 flex items-end gap-3 ${isEnd ? 'justify-end' : 'justify-start'} ${className}`}
    >
      {!isEnd && avatar && (
        <div className="h-9 w-9 shrink-0 rounded-full bg-slate-900 text-white grid place-items-center text-xs font-semibold">
          {avatar}
        </div>
      )}

      <div className={`max-w-[78%] ${isEnd ? 'text-right' : 'text-left'}`}>
        {header && <div className="mb-1 text-xs text-slate-500">{header}</div>}
        <div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${bubbleClass}`}>
          {typing ? (
            <div className="inline-flex items-center gap-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-current/80" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-current/60 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-current/40 [animation-delay:300ms]" />
            </div>
          ) : (
            content
          )}
        </div>
        {footer && <div className="mt-1 text-xs text-slate-400">{footer}</div>}
      </div>

      {isEnd && avatar && (
        <div className="h-9 w-9 shrink-0 rounded-full bg-blue-500 text-white grid place-items-center text-xs font-semibold">
          {avatar}
        </div>
      )}
    </div>
  )
}
