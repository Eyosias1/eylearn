'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AppState, BinaryFiles, ExcalidrawProps } from '@excalidraw/excalidraw/types'
import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { DrawingStore } from '@/lib/excalidraw/store'

const AUTOSAVE_DELAY_MS = 800
const SAVED_RESET_DELAY_MS = 1500

type SceneElements = Parameters<NonNullable<ExcalidrawProps['onChange']>>[0]

export type DrawingSaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface Args {
  drawingId: string
  store: DrawingStore
}

export function useExcalidrawDrawing({ drawingId, store }: Args) {
  const [initialScene, setInitialScene] = useState<ExcalidrawSceneType>(EMPTY_EXCALIDRAW_SCENE)
  const [loadedDrawingId, setLoadedDrawingId] = useState<string | null>(null)
  const [status, setStatus] = useState<DrawingSaveStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const sceneRef = useRef<ExcalidrawSceneType>(EMPTY_EXCALIDRAW_SCENE)
  const lastSavedSnapshotRef = useRef(JSON.stringify(EMPTY_EXCALIDRAW_SCENE))
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current)
      autosaveTimeoutRef.current = null
    }
    if (savedResetTimeoutRef.current) {
      clearTimeout(savedResetTimeoutRef.current)
      savedResetTimeoutRef.current = null
    }
  }, [])

  const saveScene = useCallback(async () => {
    const snapshot = JSON.stringify(sceneRef.current)
    if (snapshot === lastSavedSnapshotRef.current) {
      setHasUnsavedChanges(false)
      return
    }

    setStatus('saving')
    setErrorMessage(null)

    try {
      await store.save(drawingId, sceneRef.current)
      lastSavedSnapshotRef.current = snapshot
      setHasUnsavedChanges(false)
      setStatus('saved')

      if (savedResetTimeoutRef.current) clearTimeout(savedResetTimeoutRef.current)
      savedResetTimeoutRef.current = setTimeout(() => {
        setStatus('idle')
      }, SAVED_RESET_DELAY_MS)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save drawing'
      setErrorMessage(message)
      setStatus('error')
    }
  }, [drawingId, store])

  useEffect(() => {
    let cancelled = false

    clearTimers()

    async function loadScene() {
      try {
        const loaded = (await store.load(drawingId)) ?? EMPTY_EXCALIDRAW_SCENE
        if (cancelled) return

        sceneRef.current = loaded
        setInitialScene(loaded)
        lastSavedSnapshotRef.current = JSON.stringify(loaded)
        setStatus('idle')
        setErrorMessage(null)
        setHasUnsavedChanges(false)
      } catch (error) {
        if (cancelled) return

        const message = error instanceof Error ? error.message : 'Unable to load drawing'
        sceneRef.current = EMPTY_EXCALIDRAW_SCENE
        setInitialScene(EMPTY_EXCALIDRAW_SCENE)
        lastSavedSnapshotRef.current = JSON.stringify(EMPTY_EXCALIDRAW_SCENE)
        setErrorMessage(message)
        setStatus('error')
      } finally {
        if (!cancelled) setLoadedDrawingId(drawingId)
      }
    }

    void loadScene()

    return () => {
      cancelled = true
      clearTimers()
    }
  }, [clearTimers, drawingId, store])

  const handleChange = useCallback((
    elements: SceneElements,
    appState: AppState,
    files: BinaryFiles
  ) => {
    const nextScene: ExcalidrawSceneType = {
      elements,
      appState: {
        gridSize: appState.gridSize,
        scrollX: appState.scrollX,
        scrollY: appState.scrollY,
        theme: appState.theme,
        viewBackgroundColor: appState.viewBackgroundColor,
        zoom: appState.zoom,
        currentItemArrowType: appState.currentItemArrowType,
        currentItemBackgroundColor: appState.currentItemBackgroundColor,
        currentItemEndArrowhead: appState.currentItemEndArrowhead,
        currentItemFillStyle: appState.currentItemFillStyle,
        currentItemFontFamily: appState.currentItemFontFamily,
        currentItemFontSize: appState.currentItemFontSize,
        currentItemOpacity: appState.currentItemOpacity,
        currentItemRoughness: appState.currentItemRoughness,
        currentItemRoundness: appState.currentItemRoundness,
        currentItemStartArrowhead: appState.currentItemStartArrowhead,
        currentItemStrokeColor: appState.currentItemStrokeColor,
        currentItemStrokeStyle: appState.currentItemStrokeStyle,
        currentItemStrokeWidth: appState.currentItemStrokeWidth,
        currentItemTextAlign: appState.currentItemTextAlign,
      },
      files,
    }

    sceneRef.current = nextScene

    const nextSnapshot = JSON.stringify(nextScene)
    const changed = nextSnapshot !== lastSavedSnapshotRef.current

    setHasUnsavedChanges(changed)
    if (!changed) return

    if (savedResetTimeoutRef.current) {
      clearTimeout(savedResetTimeoutRef.current)
      savedResetTimeoutRef.current = null
    }

    setStatus('idle')
    setErrorMessage(null)

    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current)
    autosaveTimeoutRef.current = setTimeout(() => {
      void saveScene()
    }, AUTOSAVE_DELAY_MS)
  }, [saveScene])

  const saveNow = useCallback(async () => {
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current)
      autosaveTimeoutRef.current = null
    }
    await saveScene()
  }, [saveScene])

  return {
    errorMessage,
    handleChange,
    hasUnsavedChanges,
    initialScene,
    isReady: loadedDrawingId === drawingId,
    saveNow,
    status,
  }
}
