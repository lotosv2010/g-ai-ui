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
      className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${className}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Conversations</h3>
          <p className="text-xs text-slate-500">上下文会话管理</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
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
              className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                active
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="truncate text-sm font-medium text-slate-800">
                  {item.pinned && <span className="mr-1 text-slate-400">📌</span>}
                  {item.title}
                </div>
                {item.unread ? (
                  <span className="ml-2 rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white">
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
