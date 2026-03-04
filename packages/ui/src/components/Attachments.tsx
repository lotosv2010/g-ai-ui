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
      return 'bg-emerald-50/85 text-emerald-700 border-emerald-200/90'
    case 'uploading':
      return 'bg-amber-50/85 text-amber-700 border-amber-200/90'
    case 'error':
      return 'bg-rose-50/85 text-rose-700 border-rose-200/90'
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200/90'
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
      className={`relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_22px_52px_rgba(15,23,42,0.1)] backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute -right-16 bottom-0 h-28 w-28 rounded-full bg-emerald-200/30 blur-3xl" />
      <header className="mb-3 flex items-center justify-between">
        <h3 className="relative z-[1] text-base font-semibold tracking-tight text-slate-900">
          Attachments
        </h3>
        <span className="relative z-[1] rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-[11px] text-slate-500">
          {items.length} 个文件
        </span>
      </header>

      <div className="relative z-[1] space-y-2">
        {items.map((item) => {
          const status = item.status ?? 'done'
          const statusLabel =
            status === 'done'
              ? '已完成'
              : status === 'uploading'
              ? '上传中'
              : '失败'
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between rounded-2xl border px-3.5 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.06)] ${statusClassName(status)}`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <span className="rounded-full border border-current/25 px-1.5 py-0.5 text-[10px] font-medium">
                    {statusLabel}
                  </span>
                </div>
                {item.size && <p className="text-xs opacity-80">{item.size}</p>}
              </div>

              <div className="ml-3 inline-flex items-center gap-2 text-xs">
                {status === 'uploading' && <span className="font-medium">上传中...</span>}
                {status === 'error' && (
                  <button
                    type="button"
                    onClick={() => onRetry?.(item.id)}
                    className="rounded-lg border border-current/35 px-2 py-1 transition hover:bg-white/70"
                  >
                    重试
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onRemove?.(item.id)}
                  className="rounded-lg border border-current/35 px-2 py-1 transition hover:bg-white/70"
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
