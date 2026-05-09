'use client'

import { useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { LibrarySidebarShell } from '@/components/library/LibrarySidebarShell'

function subscribe(onStoreChange: () => void) {
  const timeout = window.setTimeout(onStoreChange, 0)
  return () => window.clearTimeout(timeout)
}

function getSlot() {
  return document.getElementById('library-sidebar-slot')
}

function getServerSlot() {
  return null
}

export function LibrarySidebarPortal() {
  const slot = useSyncExternalStore(subscribe, getSlot, getServerSlot)

  if (!slot) return null

  return createPortal(<LibrarySidebarShell />, slot)
}
