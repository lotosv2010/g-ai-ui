import React from 'react'

export type AttachmentStatus = 'done' | 'uploading' | 'error'

export interface AttachmentItem {
  id: string
  name: string
  size?: string
  status?: AttachmentStatus
}

export interface AttachmentsProps {
  items: AttachmentItem[]
  onRemove?: (id: string) => void
  onRetry?: (id: string) => void
  className?: string
}

function statusClassName(status: AttachmentStatus): string {
  switch (status) {
    case 'done':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'uploading':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'error':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200'
  }
}

export const Attachments: React.FC<AttachmentsProps> = ({
  items,
  onRemove,
  onRetry,
  className = '',
}) => {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${className}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Attachments</h3>
        <span className="text-xs text-slate-400">{items.length} 个文件</span>
      </header>

      <div className="space-y-2">
        {items.map((item) => {
          const status = item.status ?? 'done'
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-xl border px-3 py-2 ${statusClassName(status)}`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.name}</p>
                {item.size && <p className="text-xs opacity-80">{item.size}</p>}
              </div>

              <div className="ml-3 inline-flex items-center gap-2 text-xs">
                {status === 'uploading' && <span>上传中...</span>}
                {status === 'error' && (
                  <button
                    type="button"
                    onClick={() => onRetry?.(item.id)}
                    className="rounded-md border border-current/40 px-2 py-1"
                  >
                    重试
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onRemove?.(item.id)}
                  className="rounded-md border border-current/40 px-2 py-1"
                >
                  移除
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
