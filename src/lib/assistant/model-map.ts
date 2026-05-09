import type { AssistantModelId } from '@/types/AssistantChatType'

export function getAssistantModelProvider(model: AssistantModelId) {
  if (model.startsWith('claude')) return 'anthropic'
  if (model.startsWith('gemini')) return 'google'
  return 'openai'
}

export function getOpenAIModelId(model: AssistantModelId) {
  if (process.env.ASSISTANT_OPENAI_MODEL) return process.env.ASSISTANT_OPENAI_MODEL
  if (model === 'auto') return 'gpt-4.1'
  if (model === 'gpt-5.5') return 'gpt-4.1'
  if (model === 'gpt-4.1') return 'gpt-4.1'
  if (model === 'gpt-4.1-mini') return 'gpt-4.1-mini'
  return 'gpt-4.1'
}

export function getAnthropicModelId(model: AssistantModelId) {
  if (process.env.ASSISTANT_ANTHROPIC_MODEL) return process.env.ASSISTANT_ANTHROPIC_MODEL
  if (model === 'claude-opus-4.7') return 'claude-opus-4-7'
  if (model === 'claude-opus-4.6') return 'claude-opus-4-6'
  if (model === 'claude-opus-4.5') return 'claude-opus-4-5'
  if (model === 'claude-sonnet-4.5') return 'claude-sonnet-4-5'
  if (model === 'claude-sonnet-4.6') return 'claude-sonnet-4-6'
  if (model === 'claude-opus-4.1') return 'claude-opus-4-1'
  if (model === 'claude-haiku-4.5') return 'claude-haiku-4-5'
  return 'claude-sonnet-4-5'
}

export function getGoogleModelId(model: AssistantModelId) {
  if (process.env.ASSISTANT_GOOGLE_MODEL) return process.env.ASSISTANT_GOOGLE_MODEL
  if (model === 'gemini-2.5-pro') return 'gemini-2.5-pro'
  if (model === 'gemini-2.5-flash') return 'gemini-2.5-flash'
  return 'gemini-2.5-pro'
}
