import Link from 'next/link'
import React from 'react'

export type LabRouteKey = 'components' | 'tools'

interface PlaygroundFrameProps {
  activeRoute: LabRouteKey
  title: string
  description: string
  badge?: string
  children: React.ReactNode
}

const routeItems: Array<{
  key: LabRouteKey
  href: string
  label: string
  description: string
}> = [
  {
    key: 'components',
    href: '/components',
    label: '组件测试',
    description: '验证 UI 库的样式与交互链路',
  },
  {
    key: 'tools',
    href: '/tools',
    label: '工具测试',
    description: '验证 utils 工具函数输入输出',
  },
]

export function PlaygroundFrame({
  activeRoute,
  title,
  description,
  badge = 'Next.js + Turbopack',
  children,
}: PlaygroundFrameProps) {
  return (
    <div className="aix-shell min-h-screen">
      <div className="aix-grid" />
      <div className="aix-glow" />

      <header className="border-b border-white/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              g-ai-ui Playground
            </h1>
            <p className="text-xs text-slate-500">
              Route-based lab for @g-ai-ui/ui and @g-ai-ui/utils
            </p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50/85 px-3 py-1 text-xs font-medium text-blue-700">
            {badge}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="aix-panel space-y-4 p-4">
            <div>
              <p className="aix-kicker">Playground Routes</p>
              <h2 className="mt-1 text-base font-semibold text-slate-900">联调验证入口</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
            </div>

            <nav className="space-y-2">
              {routeItems.map((item) => {
                const active = item.key === activeRoute
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`aix-route-link ${active ? 'is-active' : ''}`}
                  >
                    <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                    <span className="mt-1 block text-xs text-slate-500">
                      {item.description}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="aix-route-current">
              <p className="text-xs text-slate-500">当前路由</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{title}</p>
            </div>
          </aside>

          <section className="space-y-4">{children}</section>
        </div>
      </main>
    </div>
  )
}
