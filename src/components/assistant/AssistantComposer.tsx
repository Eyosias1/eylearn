'use client'

import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { AssistantComposerControls } from '@/components/assistant/AssistantComposerControls'
import { AssistantContextBadge } from '@/components/assistant/AssistantContextBadge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useSubmitAssistantMessage } from '@/hooks/useSubmitAssistantMessage'
import { cn } from '@/lib/utils'

export function AssistantComposer() {
  const [draft, setDraft] = useState('')
  const { isLoading, submitAssistantMessage } = useSubmitAssistantMessage()

  function submit() {
    const content = draft.trim()
    if (!content || isLoading) return
    setDraft('')
    void submitAssistantMessage(content)
  }

  return (
    <div className={cn(
      // spacing
      "p-4",
    )}>
      <div className={cn(
        // layout
        "flex flex-col",
        // spacing
        "gap-3 p-3",
        // colors
        "bg-background/80",
        // border
        "rounded-2xl border border-blue-500/80 shadow-[0_0_0_1px_rgba(59,130,246,0.25)]",
        // animation
        "transition-colors focus-within:border-blue-500 focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.25)]",
      )}>
        <AssistantContextBadge />
        <Textarea
          value={draft}
          disabled={isLoading}
          placeholder="Do anything with AI..."
          onChange={event => setDraft(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submit()
            }
          }}
          className={cn(
            // sizing
            "max-h-40 min-h-24",
            // spacing
            "px-0 py-1",
            // typography
            "text-sm",
            // colors
            "border-0 bg-transparent shadow-none focus-visible:ring-0",
            // border
            "resize-none rounded-none",
          )}
        />
        <div className="flex items-center justify-between gap-2">
          <AssistantComposerControls />
          <Button type="button" size="icon-sm" disabled={!draft.trim() || isLoading} onClick={submit} className="rounded-full">
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
