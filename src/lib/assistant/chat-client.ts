import type { AssistantChatRequest } from '@/types/AssistantChatType'

export async function streamAssistantChat(
  request: AssistantChatRequest,
  onChunk: (chunk: string) => void,
) {
  const response = await fetch('/api/assistant/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok || !response.body) throw new Error('Assistant chat request failed')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    onChunk(decoder.decode(value, { stream: true }))
  }
}
