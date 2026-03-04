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
    ? 'border border-blue-300/60 bg-[linear-gradient(135deg,#1d4ed8_0%,#0891b2_100%)] text-white shadow-[0_18px_36px_rgba(14,116,144,0.34)] rounded-br-md'
    : 'border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-slate-800 shadow-[0_16px_34px_rgba(15,23,42,0.08)] rounded-bl-md'
  const avatarClass = isEnd
    ? 'border-blue-300/70 bg-[linear-gradient(135deg,#2563eb_0%,#14b8a6_100%)] text-white shadow-[0_8px_20px_rgba(37,99,235,0.32)]'
    : 'border-slate-200/90 bg-[linear-gradient(145deg,#ffffff_0%,#eef4ff_100%)] text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.08)]'

  return (
    <div
      className={`mb-4 flex items-end gap-3.5 ${isEnd ? 'justify-end' : 'justify-start'} ${className}`}
    >
      {!isEnd && avatar && (
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl border text-xs font-semibold ${avatarClass}`}
        >
          {avatar}
        </div>
      )}

      <div className={`max-w-[82%] ${isEnd ? 'text-right' : 'text-left'}`}>
        {header && (
          <div className="mb-1 px-1 text-xs font-medium text-slate-500">{header}</div>
        )}
        <div
          className={`relative overflow-hidden rounded-[22px] px-4 py-3 text-sm leading-6 ${bubbleClass}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_62%)]" />
          {typing ? (
            <div className="relative inline-flex items-center gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-current/85" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-current/65 [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-current/45 [animation-delay:240ms]" />
            </div>
          ) : (
            <div className="relative">{content}</div>
          )}
        </div>
        {footer && (
          <div className="mt-1 px-1 text-[11px] text-slate-400">{footer}</div>
        )}
      </div>

      {isEnd && avatar && (
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl border text-xs font-semibold ${avatarClass}`}
        >
          {avatar}
        </div>
      )}
    </div>
  )
}
