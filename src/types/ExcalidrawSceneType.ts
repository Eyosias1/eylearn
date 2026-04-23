import type { AppState, BinaryFiles, ExcalidrawProps } from '@excalidraw/excalidraw/types'

type SceneElements = Parameters<NonNullable<ExcalidrawProps['onChange']>>[0]

type PersistedAppState = Pick<
  AppState,
  | 'gridSize'
  | 'scrollX'
  | 'scrollY'
  | 'theme'
  | 'viewBackgroundColor'
  | 'zoom'
  | 'currentItemBackgroundColor'
  | 'currentItemFillStyle'
  | 'currentItemFontFamily'
  | 'currentItemFontSize'
  | 'currentItemOpacity'
  | 'currentItemRoundness'
  | 'currentItemRoughness'
  | 'currentItemStrokeColor'
  | 'currentItemStrokeStyle'
  | 'currentItemStrokeWidth'
  | 'currentItemTextAlign'
  | 'currentItemArrowType'
  | 'currentItemStartArrowhead'
  | 'currentItemEndArrowhead'
>

export interface ExcalidrawSceneType {
  elements: SceneElements
  appState: Partial<PersistedAppState>
  files: BinaryFiles
}

export const EMPTY_EXCALIDRAW_SCENE: ExcalidrawSceneType = {
  elements: [],
  appState: {
    viewBackgroundColor: '#ffffff',
  },
  files: {},
}
