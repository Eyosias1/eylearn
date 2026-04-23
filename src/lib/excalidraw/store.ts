import type { ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'

export interface DrawingStore {
  load(id: string): Promise<ExcalidrawSceneType | null>
  save(id: string, scene: ExcalidrawSceneType): Promise<void>
}
