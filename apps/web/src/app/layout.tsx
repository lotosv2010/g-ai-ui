import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'g-ai-ui Playground',
  description:
    'Route-based playground for @g-ai-ui/ui components and @g-ai-ui/utils tools',
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
