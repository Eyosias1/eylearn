'use server'

import { revalidatePath } from 'next/cache'
import { EMPTY_EXCALIDRAW_SCENE, type ExcalidrawSceneType } from '@/types/ExcalidrawSceneType'
import { buildWhiteboardPreview, getEmptyWhiteboardPreview } from '@/lib/excalidraw/preview'
import { getAuthenticatedSupabase } from '@/lib/supabase/auth'
import { toWhiteboardMeta } from '@/lib/whiteboards/shape'
import type { Json, Tables } from '@/types/database.types'
import type { WhiteboardMeta } from '@/types/whiteboard'

type WhiteboardMetaRow = Omit<Tables<'whiteboards'>, 'scene'>

const metaColumns = 'id,user_id,title,preview,element_count,raw_excalidraw,created_at,updated_at'

export async function createWhiteboardAction(): Promise<WhiteboardMeta> {
  const { supabase, userId } = await getAuthenticatedSupabase()
  const preview = getEmptyWhiteboardPreview()
  const { data, error } = await supabase
    .from('whiteboards')
    .insert({
      user_id: userId,
      title: 'Untitled Board',
      scene: EMPTY_EXCALIDRAW_SCENE as unknown as Json,
      preview: preview as unknown as Json,
      element_count: preview.elementCount,
    })
    .select(metaColumns)
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/whiteboard')
  return toWhiteboardMeta(data as WhiteboardMetaRow)
}

export async function updateWhiteboardTitleAction(id: string, title: string): Promise<WhiteboardMeta | null> {
  const nextTitle = title.trim()
  if (!nextTitle) return null

  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from('whiteboards')
    .update({ title: nextTitle })
    .eq('id', id)
    .select(metaColumns)
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/whiteboard')
  revalidatePath(`/whiteboard/${id}`)
  return toWhiteboardMeta(data as WhiteboardMetaRow)
}

export async function updateWhiteboardSceneAction(id: string, scene: ExcalidrawSceneType): Promise<void> {
  const preview = buildWhiteboardPreview(scene)
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from('whiteboards')
    .update({
      scene: scene as unknown as Json,
      preview: preview as unknown as Json,
      element_count: preview.elementCount,
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/whiteboard')
  revalidatePath(`/whiteboard/${id}`)
}

export async function deleteWhiteboardAction(id: string): Promise<void> {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from('whiteboards')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/whiteboard')
}
