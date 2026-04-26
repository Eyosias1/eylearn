'use client'

import { createContext, useContext } from 'react'

interface NotesSidebarPanelContextValue {
  open: boolean
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void
}

const NotesSidebarPanelContext = createContext<NotesSidebarPanelContextValue | null>(null)

export const NotesSidebarPanelProvider = NotesSidebarPanelContext.Provider

export function useNotesSidebarPanel() {
  const context = useContext(NotesSidebarPanelContext)
  if (!context) throw new Error('useNotesSidebarPanel must be used inside NotesSidebarPanelProvider')
  return context
}
