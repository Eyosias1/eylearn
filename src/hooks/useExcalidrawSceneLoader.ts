'use client'

import { useEffect, type RefObject } from 'react'
import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import { getSceneSignature, sanitizeSceneForStorage } from '@/lib/whiteboard/scene'
import type { DrawingSaveStatus } from '@/hooks/useExcalidrawDrawing'
import type { DrawingStore } from '@/lib/whiteboard/store'

interface Args {
  clearTimers: () => void
  drawingId: string
  lastSavedSignatureRef: RefObject<string>
  sceneRef: RefObject<ExcalidrawSceneType>
  setErrorMessage: (message: string | null) => void
  setHasUnsavedChanges: (hasChanges: boolean) => void
  setInitialScene: (scene: ExcalidrawSceneType) => void
  setLoadedDrawingId: (id: string) => void
  setStatus: (status: DrawingSaveStatus) => void
  store: DrawingStore
}
export function useExcalidrawSceneLoader(args: Args) {
  const {
    clearTimers,
    drawingId,
    lastSavedSignatureRef,
    sceneRef,
    setErrorMessage,
    setHasUnsavedChanges,
    setInitialScene,
    setLoadedDrawingId,
    setStatus,
    store,
  } = args

  useEffect(() => {
    let cancelled = false
    const loadArgs = {
      clearTimers,
      drawingId,
      lastSavedSignatureRef,
      sceneRef,
      setErrorMessage,
      setHasUnsavedChanges,
      setInitialScene,
      setLoadedDrawingId,
      setStatus,
      store,
    }

    clearTimers()

    async function loadScene() {
      try {
        const scene = sanitizeSceneForStorage(
          (await store.load(drawingId)) ?? EMPTY_EXCALIDRAW_SCENE
        )
        if (!cancelled) setLoadedScene(loadArgs, scene)
      } catch (error) {
        if (!cancelled) setLoadError(loadArgs, error)
      } finally {
        if (!cancelled) setLoadedDrawingId(drawingId)
      }
    }

    void loadScene()
    return () => {
      cancelled = true
      clearTimers()
    }
  }, [
    clearTimers,
    drawingId,
    lastSavedSignatureRef,
    sceneRef,
    setErrorMessage,
    setHasUnsavedChanges,
    setInitialScene,
    setLoadedDrawingId,
    setStatus,
    store,
  ])
}

function setLoadedScene(args: Args, scene: ExcalidrawSceneType) {
  args.sceneRef.current = scene
  args.setInitialScene(scene)
  args.lastSavedSignatureRef.current = getSceneSignature(scene)
  args.setStatus('idle')
  args.setErrorMessage(null)
  args.setHasUnsavedChanges(false)
}

function setLoadError(args: Args, error: unknown) {
  const message = error instanceof Error ? error.message : 'Unable to load drawing'
  args.sceneRef.current = EMPTY_EXCALIDRAW_SCENE
  args.setInitialScene(EMPTY_EXCALIDRAW_SCENE)
  args.lastSavedSignatureRef.current = getSceneSignature(EMPTY_EXCALIDRAW_SCENE)
  args.setErrorMessage(message)
  args.setStatus('error')
}
