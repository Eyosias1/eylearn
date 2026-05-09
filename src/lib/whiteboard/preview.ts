import type { ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { WhiteboardPreview, WhiteboardPreviewShape } from '@/types/whiteboard'

const MAX_PREVIEW_SHAPES = 12

const DEFAULT_PREVIEW: WhiteboardPreview = {
  shapes: [],
  elementCount: 0,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function normalizeDimension(value: number) {
  return Math.max(Math.abs(value), 8)
}

function isPreviewableElement(element: ExcalidrawSceneType['elements'][number]) {
  return !element.isDeleted
}

export function buildWhiteboardPreview(scene: ExcalidrawSceneType): WhiteboardPreview {
  const elements = scene.elements.filter(isPreviewableElement)
  if (elements.length === 0) return DEFAULT_PREVIEW

  const sourceShapes = elements.slice(0, MAX_PREVIEW_SHAPES)

  const minX = Math.min(...sourceShapes.map(element => Math.min(element.x, element.x + element.width)))
  const minY = Math.min(...sourceShapes.map(element => Math.min(element.y, element.y + element.height)))
  const maxX = Math.max(...sourceShapes.map(element => Math.max(element.x, element.x + element.width)))
  const maxY = Math.max(...sourceShapes.map(element => Math.max(element.y, element.y + element.height)))

  const width = Math.max(maxX - minX, 1)
  const height = Math.max(maxY - minY, 1)

  const shapes: WhiteboardPreviewShape[] = sourceShapes.map(element => {
    const elementMinX = Math.min(element.x, element.x + element.width)
    const elementMinY = Math.min(element.y, element.y + element.height)

    return {
      id: element.id,
      type: element.type,
      x: clamp(((elementMinX - minX) / width) * 100, 0, 100),
      y: clamp(((elementMinY - minY) / height) * 100, 0, 100),
      width: clamp((normalizeDimension(element.width) / width) * 100, 6, 100),
      height: clamp((normalizeDimension(element.height) / height) * 100, 6, 100),
      angle: element.angle ?? 0,
      strokeColor: element.strokeColor,
      backgroundColor: element.backgroundColor,
      opacity: element.opacity ?? 100,
    }
  })

  return {
    shapes,
    elementCount: elements.length,
  }
}

export function getEmptyWhiteboardPreview(): WhiteboardPreview {
  return DEFAULT_PREVIEW
}
