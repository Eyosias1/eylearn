'use client'

import { User } from 'lucide-react'
import { AssistantMarkdown } from '@/components/assistant/AssistantMarkdown'
import { AssistantModelIcon } from '@/components/assistant/AssistantModelIcon'
import { useAssistant } from '@/providers/assistant-provider'
import { cn } from '@/lib/utils'
import type { AssistantMessage as AssistantMessageType } from '@/types/AssistantMessageType'

interface AssistantMessageProps {
  message: AssistantMessageType
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  const { model } = useAssistant()
  const isUser = message.role === 'user'

  return (
    <article className={cn(
      // layout
      "flex gap-3",
      // conditional
      isUser && "flex-row-reverse",
    )}>
      <div className={cn(
        // layout
        "flex shrink-0 items-center justify-center",
        // sizing
        "size-8",
        // colors
        isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        // border
        "rounded-full",
      )}>
        {isUser ? <User className="size-4" /> : <AssistantModelIcon model={model} className="size-4" />}
      </div>
      <div className={cn(
        // sizing
        isUser ? "max-w-[85%]" : "max-w-[calc(100%-2.75rem)] flex-1",
        // spacing
        isUser && "px-3 py-2",
        // typography
        isUser && "text-sm leading-relaxed whitespace-pre-wrap",
        // colors
        isUser && "bg-primary text-primary-foreground",
        // border
        isUser && "rounded-2xl",
        // conditional
        isUser && "rounded-tr-sm",
      )}>
        {isUser ? message.content : <AssistantMarkdown content={message.content} />}
      </div>
    </article>
  )
}
