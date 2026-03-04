import React from 'react'

export interface ConversationItem {
  id: string
  title: string
  description?: string
  time?: string
  unread?: number
  pinned?: boolean
}

export interface ConversationsProps {
  items: ConversationItem[]
  activeId?: string
  onSelect?: (id: string) => void
  onCreate?: () => void
  className?: string
}

export const Conversations: React.FC<ConversationsProps> = ({
  items,
  activeId,
  onSelect,
  onCreate,
  className = '',
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_22px_52px_rgba(15,23,42,0.1)] backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-cyan-200/35 blur-3xl" />
      <header className="mb-3 flex items-center justify-between">
        <div className="relative z-[1]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-500">
            Session Hub
          </p>
          <h3 className="text-base font-semibold tracking-tight text-slate-900">
            Conversations
          </h3>
          <p className="text-xs text-slate-500">上下文会话管理</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="relative z-[1] rounded-xl border border-blue-200/80 bg-[linear-gradient(135deg,#eff6ff_0%,#ecfeff_100%)] px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_10px_20px_rgba(59,130,246,0.2)]"
        >
          新建会话
        </button>
      </header>

      <div className="relative z-[1] space-y-2">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              className={`w-full rounded-2xl border px-3.5 py-3 text-left transition ${
                active
                  ? 'border-blue-200/90 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_100%)] shadow-[0_12px_24px_rgba(37,99,235,0.2)]'
                  : 'border-transparent bg-slate-50/75 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="truncate text-sm font-semibold text-slate-800">
                  {item.pinned && <span className="mr-1 text-slate-400">📌</span>}
                  {item.title}
                </div>
                {item.unread ? (
                  <span className="ml-2 rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#06b6d4_100%)] px-2 py-0.5 text-[10px] font-semibold text-white shadow-[0_6px_12px_rgba(37,99,235,0.32)]">
                    {item.unread}
                  </span>
                ) : null}
              </div>
              {item.description && (
                <p className="mt-1 truncate text-xs text-slate-500">{item.description}</p>
              )}
              {item.time && (
                <p className="mt-1 text-[11px] font-medium text-slate-400">{item.time}</p>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
