import type { ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { Tables } from '@/types/database.types'

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

export type WhiteboardRow = Tables<'whiteboards'>

export type WhiteboardMeta = Omit<WhiteboardRow, 'preview' | 'scene'> & {
  preview: WhiteboardPreview
}

export type Whiteboard = WhiteboardMeta & {
  scene: ExcalidrawSceneType
}
