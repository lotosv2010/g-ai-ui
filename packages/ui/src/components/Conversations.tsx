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
      className={`rounded-[22px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-500">
            Session
          </p>
          <h3 className="text-sm font-semibold text-slate-900">Conversations</h3>
          <p className="text-xs text-slate-500">上下文会话管理</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
        >
          新建
        </button>
      </header>

      <div className="space-y-2">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect?.(item.id)}
              className={`w-full rounded-2xl border px-3.5 py-3 text-left transition ${
                active
                  ? 'border-blue-200 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_100%)] shadow-[0_8px_20px_rgba(22,119,255,0.15)]'
                  : 'border-transparent bg-slate-50/90 hover:border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="truncate text-sm font-medium text-slate-800">
                  {item.pinned && <span className="mr-1 text-slate-400">📌</span>}
                  {item.title}
                </div>
                {item.unread ? (
                  <span className="ml-2 rounded-full bg-[linear-gradient(135deg,#1677ff_0%,#36cfc9_100%)] px-2 py-0.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(22,119,255,0.28)]">
                    {item.unread}
                  </span>
                ) : null}
              </div>
              {item.description && (
                <p className="mt-1 truncate text-xs text-slate-500">{item.description}</p>
              )}
              {item.time && <p className="mt-1 text-[11px] text-slate-400">{item.time}</p>}
            </button>
          )
        })}
      </div>
    </section>
  )
}
