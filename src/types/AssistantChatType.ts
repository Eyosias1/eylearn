import type { AssistantPageContext } from '@/types/AssistantContextType'
import type { AssistantMessage } from '@/types/AssistantMessageType'

export type AssistantModelId =
  | 'auto'
  | 'claude-opus-4.7'
  | 'claude-opus-4.6'
  | 'claude-opus-4.5'
  | 'claude-opus-4.1'
  | 'claude-sonnet-4.6'
  | 'claude-sonnet-4.5'
  | 'claude-haiku-4.5'
  | 'gpt-5.5'
  | 'gpt-4.1'
  | 'gpt-4.1-mini'
  | 'gemini-2.5-pro'
  | 'gemini-2.5-flash'

export interface AssistantToolSettings {
  webAccess: boolean
  useSources: boolean
}

export interface AssistantChatRequest {
  messages: AssistantMessage[]
  pageContext: AssistantPageContext | null
  model: AssistantModelId
  toolSettings: AssistantToolSettings
}

export interface AssistantChatResponse {
  message: AssistantMessage
}
