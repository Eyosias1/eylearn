'use client'

import { AssistantRobotIcon } from '@/components/icons/AssistantRobotIcon'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssistant } from '@/providers/assistant-provider'
import { cn } from '@/lib/utils'

export function AssistantHeader() {
  const { messages, clearMessages } = useAssistant()

  return (
    <div className={cn(
      // layout
      "flex items-center justify-between gap-3",
      // sizing
      "h-(--header-height)",
      // spacing
      "px-4",
      // border
      "border-b border-border",
    )}>
      <div className="flex min-w-0 items-center gap-2">
        <AssistantRobotIcon
          className={cn(
            // sizing
            "size-6 shrink-0",
          )}
        />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">Assistant</h2>
          <p className="truncate text-xs text-muted-foreground">Page-aware chat</p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        disabled={messages.length === 0}
        onClick={clearMessages}
        title="Clear chat"
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}
