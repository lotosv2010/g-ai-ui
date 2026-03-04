import React from 'react'

export interface PromptItem {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface PromptsProps {
  items: PromptItem[]
  onSelect?: (item: PromptItem) => void
  className?: string
}

export const Prompts: React.FC<PromptsProps> = ({
  items,
  onSelect,
  className = '',
}) => {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${className}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Prompts</h3>
        <span className="text-xs text-slate-400">快捷提问模板</span>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item)}
            disabled={item.disabled}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-base text-blue-500">{item.icon ?? '✦'}</span>
              <div>
                <p className="text-sm font-medium text-slate-800">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
