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
      className={`rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-cyan-50 to-sky-50 p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-lg text-blue-600 shadow-sm">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
          </div>
        </div>
        {extra && <div>{extra}</div>}
      </div>
    </section>
  )
}
