import type { ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'

type SceneElement = ExcalidrawSceneType['elements'][number]

export interface WhiteboardPreviewShape {
  id: string
  type: SceneElement['type']
  x: number
  y: number
  width: number
  height: number
  angle: number
  strokeColor: string
  backgroundColor: string
  opacity: number
}

export interface WhiteboardPreview {
  shapes: WhiteboardPreviewShape[]
  elementCount: number
}

export interface WhiteboardMeta {
  id: string
  title: string
  updatedAt: string
  preview: WhiteboardPreview
}
