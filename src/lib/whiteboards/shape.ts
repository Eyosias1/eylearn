import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { Whiteboard, WhiteboardMeta, WhiteboardPreview, WhiteboardRow } from '@/types/whiteboard'

const EMPTY_PREVIEW: WhiteboardPreview = {
  shapes: [],
  elementCount: 0,
}

type WhiteboardMetaRow = Omit<WhiteboardRow, 'scene'>

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

export function asWhiteboardPreview(value: unknown): WhiteboardPreview {
  if (!isObject(value) || !Array.isArray(value.shapes)) return EMPTY_PREVIEW
  return {
    shapes: value.shapes as WhiteboardPreview['shapes'],
    elementCount: typeof value.elementCount === 'number' ? value.elementCount : value.shapes.length,
  }
}

export function asExcalidrawScene(value: unknown): ExcalidrawSceneType {
  if (!isObject(value) || !Array.isArray(value.elements)) return EMPTY_EXCALIDRAW_SCENE
  return {
    elements: value.elements as ExcalidrawSceneType['elements'],
    appState: isObject(value.appState) ? value.appState : EMPTY_EXCALIDRAW_SCENE.appState,
    files: isObject(value.files) ? value.files as ExcalidrawSceneType['files'] : {},
  }
}

export function toWhiteboardMeta(row: WhiteboardMetaRow): WhiteboardMeta {
  return {
    ...row,
    preview: asWhiteboardPreview(row.preview),
  }
}

export function toWhiteboard(row: WhiteboardRow): Whiteboard {
  return {
    ...toWhiteboardMeta(row),
    scene: asExcalidrawScene(row.scene),
  }
}
