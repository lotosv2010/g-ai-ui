import React from 'react'

export interface WelcomeProps {
  title: string
  description?: string
  icon?: React.ReactNode
  extra?: React.ReactNode
  className?: string
}

export const Welcome: React.FC<WelcomeProps> = ({
  title,
  description,
  icon = '✦',
  extra,
  className = '',
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(125deg,#f9fbff_0%,#eef4ff_40%,#ecfeff_100%)] p-6 shadow-[0_24px_64px_rgba(15,23,42,0.1)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-blue-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_48%)]" />

      <div className="relative z-[1] flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/90 bg-[linear-gradient(145deg,#ffffff_0%,#f3f8ff_100%)] text-base font-semibold text-blue-600 shadow-[0_12px_26px_rgba(24,144,255,0.2)]">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
              AI Workspace
            </p>
            <h2 className="mt-1 text-[24px] font-semibold leading-tight tracking-tight text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {description}
              </p>
            )}
          </div>
        </div>
        {extra && (
          <div className="shrink-0 rounded-xl border border-white/80 bg-white/80 px-2.5 py-1.5 text-xs text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.08)] backdrop-blur">
            {extra}
          </div>
        )}
      </div>
    </section>
  )
}
