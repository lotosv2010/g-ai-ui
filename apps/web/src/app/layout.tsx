import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'g-ai-ui Playground',
  description: 'Ant Design X 风格的组件测试与工具测试 Playground',
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
