'use client'

import { createContext, useContext, useState } from 'react'
import type { AssistantPageContext } from '@/types/AssistantContextType'
import type { AssistantModelId } from '@/types/AssistantChatType'
import type { AssistantMessage } from '@/types/AssistantMessageType'

interface AssistantContextValue {
  open: boolean
  messages: AssistantMessage[]
  model: AssistantModelId
  pageContext: AssistantPageContext | null
  isLoading: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
  setModel: (model: AssistantModelId) => void
  setMessages: (messages: AssistantMessage[] | ((messages: AssistantMessage[]) => AssistantMessage[])) => void
  setPageContext: (context: AssistantPageContext | null) => void
  setIsLoading: (isLoading: boolean) => void
  toggleOpen: () => void
  clearMessages: () => void
}

const AssistantContext = createContext<AssistantContextValue | null>(null)

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([])
  const [model, setModel] = useState<AssistantModelId>('auto')
  const [pageContext, setPageContext] = useState<AssistantPageContext | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AssistantContext.Provider
      value={{
        open,
        messages,
        model,
        pageContext,
        isLoading,
        setOpen,
        setModel,
        setMessages,
        setPageContext,
        setIsLoading,
        toggleOpen: () => setOpen(value => !value),
        clearMessages: () => setMessages([]),
      }}
    >
      {children}
    </AssistantContext.Provider>
  )
}

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (!context) throw new Error('useAssistant must be used inside AssistantProvider')
  return context
}
