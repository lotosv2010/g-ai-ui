import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'g-ai-ui Playground',
  description: 'AI 组件与工具函数集成验证页面',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
