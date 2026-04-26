'use client'

import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { NotesSidebarShell } from '@/components/notes/sidebar/NotesSidebarShell'

function subscribe(onStoreChange: () => void) {
  const timeout = window.setTimeout(onStoreChange, 0)
  return () => window.clearTimeout(timeout)
}

function getSlot() {
  return document.getElementById('notes-sidebar-slot')
}

function getServerSlot() {
  return null
}

export function NotesSidebarPortal() {
  const slot = useSyncExternalStore(subscribe, getSlot, getServerSlot)

  if (!slot) return null

  return createPortal(<NotesSidebarShell />, slot)
}
