import Image from 'next/image'
import claudeIcon from '@/assets/models/claude-color.svg'
import geminiIcon from '@/assets/models/gemini-color.svg'
import openaiIcon from '@/assets/models/openai.svg'
import { cn } from '@/lib/utils'
import type { AssistantModelId } from '@/types/AssistantChatType'

function getModelIcon(model: AssistantModelId) {
  if (model.startsWith('claude')) return claudeIcon
  if (model.startsWith('gemini')) return geminiIcon
  return openaiIcon
}

export function AssistantModelIcon({ model, className }: { model: AssistantModelId; className?: string }) {
  return <Image src={getModelIcon(model)} alt="" width={16} height={16} className={cn("size-4 shrink-0", className)} />
}
