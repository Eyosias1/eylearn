import { createClient } from '@/lib/supabase/client'
import { buildWhiteboardPreview } from '@/lib/excalidraw/preview'
import { asExcalidrawScene } from '@/lib/whiteboards/shape'
import type { Json } from '@/types/database.types'
import type { ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import type { DrawingStore } from '@/lib/excalidraw/store'

export const supabaseDrawingStore: DrawingStore = {
  async load(id) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('whiteboards')
      .select('scene')
      .eq('id', id)
      .single()

    if (error) return null
    return asExcalidrawScene(data.scene)
  },

  async save(id, scene: ExcalidrawSceneType) {
    const preview = buildWhiteboardPreview(scene)
    const supabase = createClient()
    const { error } = await supabase
      .from('whiteboards')
      .update({
        scene: scene as unknown as Json,
        preview: preview as unknown as Json,
        element_count: preview.elementCount,
      })
      .eq('id', id)

    if (error) throw new Error(error.message)
  },
}
