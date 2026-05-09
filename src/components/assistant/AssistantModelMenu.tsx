'use client'

import { Check, ChevronDown } from 'lucide-react'
import { AssistantModelIcon } from '@/components/assistant/AssistantModelIcon'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAssistant } from '@/providers/assistant-provider'
import { cn } from '@/lib/utils'
import type { AssistantModelId } from '@/types/AssistantChatType'

const models: Array<{ id: AssistantModelId; name: string }> = [
  { id: 'auto', name: 'Auto' },
  { id: 'claude-opus-4.7', name: 'Opus 4.7' },
  { id: 'claude-opus-4.6', name: 'Opus 4.6' },
  { id: 'claude-opus-4.5', name: 'Opus 4.5' },
  { id: 'claude-opus-4.1', name: 'Opus 4.1' },
  { id: 'claude-sonnet-4.6', name: 'Sonnet 4.6' },
  { id: 'claude-sonnet-4.5', name: 'Sonnet 4.5' },
  { id: 'claude-haiku-4.5', name: 'Haiku 4.5' },
  { id: 'gpt-5.5', name: 'GPT-5.5' },
  { id: 'gpt-4.1', name: 'GPT-4.1' },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 mini' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
]

function getModelName(model: AssistantModelId) {
  return models.find(item => item.id === model)?.name ?? 'Auto'
}

export function AssistantModelMenu() {
  const { model, setModel } = useAssistant()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="xs" title="Model" className={cn("gap-1 px-2 text-xs text-muted-foreground")}>
          <AssistantModelIcon model={model} />
          {getModelName(model)}
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={8} className="w-72 p-1.5">
        {models.map(item => (
          <DropdownMenuItem key={item.id} onClick={() => setModel(item.id)} className="gap-2 px-2 py-2">
            <AssistantModelIcon model={item.id} />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{item.name}</span>
            {model === item.id && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
