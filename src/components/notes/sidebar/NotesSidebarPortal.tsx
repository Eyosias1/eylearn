'use client'

import { createPortal } from 'react-dom'
import { NotesSidebarShell } from '@/components/notes/sidebar/NotesSidebarShell'

export function NotesSidebarPortal() {
  const slot = typeof document === 'undefined'
    ? null
    : document.getElementById('notes-sidebar-slot')

  if (!slot) return null

  return createPortal(<NotesSidebarShell />, slot)
}
