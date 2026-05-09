'use client'

import { Mic, Paperclip } from 'lucide-react'
import { AssistantModelMenu } from '@/components/assistant/AssistantModelMenu'
import { AssistantPersonalizeMenu } from '@/components/assistant/AssistantPersonalizeMenu'
import { Button } from '@/components/ui/button'

export function AssistantComposerControls() {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <Button type="button" variant="ghost" size="icon-xs" title="Attach files" className="text-muted-foreground">
          <Paperclip className="size-4" />
        </Button>
        <AssistantPersonalizeMenu />
      </div>
      <div className="flex items-center gap-1">
        <AssistantModelMenu />
        <Button type="button" variant="ghost" size="icon-xs" title="Voice" className="text-muted-foreground">
          <Mic className="size-4" />
        </Button>
      </div>
    </div>
  )
}
