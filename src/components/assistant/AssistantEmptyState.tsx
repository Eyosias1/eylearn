'use client'

import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AssistantEmptyState() {
  return (
    <div className={cn(
      // layout
      "flex h-full flex-col items-center justify-center",
      // spacing
      "gap-3 p-6",
      // typography
      "text-center",
      // colors
      "text-muted-foreground",
    )}>
      <div className="flex size-11 items-center justify-center rounded-full border border-border bg-background">
        <Bot className="size-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground">Ask about this page</h3>
        <p className="text-sm leading-relaxed">For now this is a local chat shell. Page context and AI responses come next.</p>
      </div>
    </div>
  )
}
