'use client'

import { useCallback, useRef, useState } from 'react'
import type { AppState, BinaryFiles, ExcalidrawProps } from '@excalidraw/excalidraw/types'
import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import { createScene, getSceneSignature, sanitizeSceneForStorage } from '@/lib/excalidraw/scene'
import { useExcalidrawSceneLoader } from '@/hooks/useExcalidrawSceneLoader'
import { useExcalidrawSaveTimers } from '@/hooks/useExcalidrawSaveTimers'
import type { DrawingStore } from '@/lib/excalidraw/store'

const AUTOSAVE_DELAY_MS = 800
const SAVED_RESET_DELAY_MS = 1500

type SceneElements = Parameters<NonNullable<ExcalidrawProps['onChange']>>[0]

export type DrawingSaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface Args { drawingId: string; store: DrawingStore }

export function useExcalidrawDrawing({ drawingId, store }: Args) {
  const [initialScene, setInitialScene] = useState<ExcalidrawSceneType>(EMPTY_EXCALIDRAW_SCENE)
  const [loadedDrawingId, setLoadedDrawingId] = useState<string | null>(null)
  const [status, setStatus] = useState<DrawingSaveStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const sceneRef = useRef<ExcalidrawSceneType>(EMPTY_EXCALIDRAW_SCENE)
  const lastSavedSignatureRef = useRef(getSceneSignature(EMPTY_EXCALIDRAW_SCENE))
  const { clearAutosave, clearSavedReset, clearTimers, scheduleAutosave, scheduleSavedReset } =
    useExcalidrawSaveTimers()

  const saveScene = useCallback(async () => {
    const scene = sanitizeSceneForStorage(sceneRef.current)
    const signature = getSceneSignature(scene)
    if (signature === lastSavedSignatureRef.current) {
      setHasUnsavedChanges(false)
      return
    }

    setStatus('saving')
    setErrorMessage(null)

    try {
      await store.save(drawingId, scene)
      sceneRef.current = scene
      lastSavedSignatureRef.current = signature
      setHasUnsavedChanges(false)
      setStatus('saved')
      scheduleSavedReset(() => setStatus('idle'), SAVED_RESET_DELAY_MS)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save drawing'
      setErrorMessage(message)
      setStatus('error')
    }
  }, [drawingId, scheduleSavedReset, store])

  useExcalidrawSceneLoader({
    clearTimers, drawingId, lastSavedSignatureRef, sceneRef, setErrorMessage,
    setHasUnsavedChanges, setInitialScene, setLoadedDrawingId, setStatus, store,
  })

  const handleChange = useCallback((elements: SceneElements, appState: AppState, files: BinaryFiles) => {
    const nextScene = createScene(elements, appState, files)
    sceneRef.current = nextScene

    const changed = getSceneSignature(nextScene) !== lastSavedSignatureRef.current

    setHasUnsavedChanges(changed)
    if (!changed) return

    clearSavedReset()
    setStatus('idle')
    setErrorMessage(null)

    scheduleAutosave(() => void saveScene(), AUTOSAVE_DELAY_MS)
  }, [clearSavedReset, saveScene, scheduleAutosave])

  const saveNow = useCallback(async () => {
    clearAutosave()
    await saveScene()
  }, [clearAutosave, saveScene])

  return { errorMessage, handleChange, hasUnsavedChanges, initialScene,
    isReady: loadedDrawingId === drawingId, saveNow, status }
}
