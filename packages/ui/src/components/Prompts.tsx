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
      className={`rounded-[22px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Prompts</h3>
        <span className="text-xs text-slate-400">快捷提问模板</span>
      </header>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item)}
            disabled={item.disabled}
            className="group rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-3.5 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_10px_20px_rgba(22,119,255,0.14)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-base text-blue-500 transition group-hover:bg-blue-100">
                {item.icon ?? '✦'}
              </span>
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
