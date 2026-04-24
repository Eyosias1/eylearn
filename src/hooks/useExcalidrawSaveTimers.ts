'use client'

import { useCallback, useRef } from 'react'

export function useExcalidrawSaveTimers() {
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAutosave = useCallback(() => {
    if (!autosaveTimeoutRef.current) return
    clearTimeout(autosaveTimeoutRef.current)
    autosaveTimeoutRef.current = null
  }, [])

  const clearSavedReset = useCallback(() => {
    if (!savedResetTimeoutRef.current) return
    clearTimeout(savedResetTimeoutRef.current)
    savedResetTimeoutRef.current = null
  }, [])

  const clearTimers = useCallback(() => {
    clearAutosave()
    clearSavedReset()
  }, [clearAutosave, clearSavedReset])

  const scheduleAutosave = useCallback((callback: () => void, delay: number) => {
    clearAutosave()
    autosaveTimeoutRef.current = setTimeout(callback, delay)
  }, [clearAutosave])

  const scheduleSavedReset = useCallback((callback: () => void, delay: number) => {
    clearSavedReset()
    savedResetTimeoutRef.current = setTimeout(callback, delay)
  }, [clearSavedReset])

  return {
    clearAutosave,
    clearSavedReset,
    clearTimers,
    scheduleAutosave,
    scheduleSavedReset,
  }
}
