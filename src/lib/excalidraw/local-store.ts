import type { ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { DrawingStore } from '@/lib/excalidraw/store'
import { syncBoardMetaFromScene } from '@/lib/excalidraw/board-store'

const STORAGE_PREFIX = 'excalidraw:drawing:'

function getStorageKey(id: string) {
  return `${STORAGE_PREFIX}${id}`
}

function isScene(value: unknown): value is ExcalidrawSceneType {
  if (!value || typeof value !== 'object') return false

  const scene = value as Partial<ExcalidrawSceneType>
  return Array.isArray(scene.elements) && !!scene.appState && !!scene.files
}

export const localDrawingStore: DrawingStore = {
  async load(id) {
    if (typeof window === 'undefined') return null

    const raw = window.localStorage.getItem(getStorageKey(id))
    if (!raw) return null

    try {
      const parsed: unknown = JSON.parse(raw)
      if (!isScene(parsed)) return null
      return parsed
    } catch {
      window.localStorage.removeItem(getStorageKey(id))
      return null
    }
  },

  async save(id, scene) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(getStorageKey(id), JSON.stringify(scene))
    await syncBoardMetaFromScene(id, scene)
  },
}
