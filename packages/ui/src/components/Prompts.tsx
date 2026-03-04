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
      className={`relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_22px_52px_rgba(15,23,42,0.1)] backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute -left-14 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-sky-200/30 blur-3xl" />
      <header className="mb-3 flex items-center justify-between">
        <h3 className="relative z-[1] text-base font-semibold tracking-tight text-slate-900">
          Prompts
        </h3>
        <span className="relative z-[1] rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-[11px] text-slate-500">
          快捷提问模板
        </span>
      </header>

      <div className="relative z-[1] grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item)}
            disabled={item.disabled}
            className="group rounded-2xl border border-slate-200/90 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-3.5 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_12px_24px_rgba(37,99,235,0.16)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-start gap-2">
              <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-blue-100 bg-[linear-gradient(145deg,#eff6ff_0%,#f0fdfa_100%)] text-base text-blue-600 transition group-hover:border-blue-200 group-hover:text-blue-700">
                {item.icon ?? '✦'}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
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
