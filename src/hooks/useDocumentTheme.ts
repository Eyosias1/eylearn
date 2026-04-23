'use client'
import { useSyncExternalStore } from 'react'

// module-level singleton — one observer regardless of how many Mermaid blocks are mounted
let observer: MutationObserver | null = null
const subscribers = new Set<() => void>()

function subscribe(fn: () => void): () => void {
  if (subscribers.size === 0) {
    observer = new MutationObserver(() => subscribers.forEach(cb => cb()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  }
  subscribers.add(fn)
  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0) {
      observer?.disconnect()
      observer = null
    }
  }
}

function getSnapshot(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useDocumentTheme(): 'dark' | 'light' {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'light')
}
