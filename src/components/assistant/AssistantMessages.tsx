'use client'

import { AssistantEmptyState } from '@/components/assistant/AssistantEmptyState'
import { AssistantMessage } from '@/components/assistant/AssistantMessage'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAssistant } from '@/providers/assistant-provider'
import { cn } from '@/lib/utils'

export function AssistantMessages() {
  const { messages, isLoading } = useAssistant()

  if (messages.length === 0) return <AssistantEmptyState />

  return (
    <ScrollArea className="h-full">
      <div className={cn(
        // layout
        "flex flex-col",
        // spacing
        "gap-4 p-4",
      )}>
        {messages.map(message => <AssistantMessage key={message.id} message={message} />)}
        {isLoading && <p className="px-3 text-xs text-muted-foreground">Assistant is thinking...</p>}
      </div>
    </ScrollArea>
  )
}
