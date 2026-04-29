import 'server-only'
import { getAuthenticatedSupabase } from '@/lib/supabase/auth'
import { toWhiteboard, toWhiteboardMeta } from '@/lib/whiteboards/shape'
import type { Whiteboard, WhiteboardMeta, WhiteboardRow } from '@/types/whiteboard'

type WhiteboardMetaRow = Omit<WhiteboardRow, 'scene'>

const metaColumns = 'id,user_id,title,preview,element_count,raw_excalidraw,created_at,updated_at'

export async function getAllWhiteboards(): Promise<WhiteboardMeta[]> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from('whiteboards')
    .select(metaColumns)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return ((data ?? []) as WhiteboardMetaRow[]).map(toWhiteboardMeta)
}

export async function getWhiteboard(id: string): Promise<Whiteboard | null> {
  const { supabase } = await getAuthenticatedSupabase()
  const { data, error } = await supabase
    .from('whiteboards')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return toWhiteboard(data as WhiteboardRow)
}
