'use client'

import { streamAssistantChat } from '@/lib/assistant/chat-client'
import { useAssistant } from '@/providers/assistant-provider'
import type { AssistantMessage } from '@/types/AssistantMessageType'

function createMessage(role: AssistantMessage['role'], content: string): AssistantMessage {
  return { id: crypto.randomUUID(), role, content, createdAt: new Date().toISOString() }
}

export function useSubmitAssistantMessage() {
  const { isLoading, messages, model, pageContext, setIsLoading, setMessages } = useAssistant()

  async function submitAssistantMessage(content: string) {
    const userMessage = createMessage('user', content)
    const assistantMessage = createMessage('assistant', '')
    const nextMessages = [...messages, userMessage]
    setMessages([...nextMessages, assistantMessage])
    setIsLoading(true)

    try {
      await streamAssistantChat({
        messages: nextMessages,
        pageContext,
        model,
        toolSettings: { webAccess: true, useSources: false },
      }, (chunk) => {
        setMessages(current => current.map(message => (
          message.id === assistantMessage.id
            ? { ...message, content: message.content + chunk }
            : message
        )))
      })
    } catch {
      setMessages(current => current.map(message => (
        message.id === assistantMessage.id
          ? { ...message, content: 'The assistant request failed. Try again.' }
          : message
      )))
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, submitAssistantMessage }
}
