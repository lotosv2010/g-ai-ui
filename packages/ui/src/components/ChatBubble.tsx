import React from 'react'

export interface ChatBubbleProps {
  message: string
  isUser?: boolean
  timestamp?: string
  className?: string
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser = false,
  timestamp,
  className = '',
}) => {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${className}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isUser
            ? 'bg-green-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isUser ? 'text-blue-100' : 'text-gray-500'
            }`}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  )
}
