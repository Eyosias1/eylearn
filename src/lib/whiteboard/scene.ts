import type { AppState, BinaryFiles, ExcalidrawProps } from '@excalidraw/excalidraw/types'
import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'

type SceneElements = Parameters<NonNullable<ExcalidrawProps['onChange']>>[0]
type SceneElement = ExcalidrawSceneType['elements'][number]
type FileElement = SceneElement & { fileId?: string | null }

export function pickPersistedAppState(appState: AppState): ExcalidrawSceneType['appState'] {
  return {
    gridSize: appState.gridSize,
    theme: appState.theme,
    viewBackgroundColor: appState.viewBackgroundColor,
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
  }
}

export function createScene(
  elements: SceneElements,
  appState: AppState,
  files: BinaryFiles
): ExcalidrawSceneType {
  return {
    elements,
    appState: pickPersistedAppState(appState),
    files,
  }
}

export function sanitizeSceneForStorage(scene: ExcalidrawSceneType): ExcalidrawSceneType {
  const elements = scene.elements.filter(element => !element.isDeleted)
  const referencedFileIds = new Set(
    elements
      .map(element => (element as FileElement).fileId)
      .filter((fileId): fileId is string => Boolean(fileId))
  )

  const files = Object.fromEntries(
    Object.entries(scene.files).filter(([fileId]) => referencedFileIds.has(fileId))
  ) as BinaryFiles

  return {
    elements,
    appState: scene.appState,
    files,
  }
}

export function getSceneSignature(scene: ExcalidrawSceneType) {
  const appState = scene.appState
  const elementSignature = scene.elements
    .filter(element => !element.isDeleted)
    .map(element => {
      const fileId = (element as FileElement).fileId ?? ''
      return `${element.id}:${element.version}:${element.versionNonce}:${fileId}`
    })
    .join('|')

  return [
    elementSignature,
    appState.gridSize ?? '',
    appState.theme ?? '',
    appState.viewBackgroundColor ?? EMPTY_EXCALIDRAW_SCENE.appState.viewBackgroundColor,
  ].join(';')
}
