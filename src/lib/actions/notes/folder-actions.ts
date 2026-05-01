'use server'

import { updateTag } from 'next/cache'
import { getAuthenticatedSupabase } from '@/lib/supabase/auth'
import { slugify } from '@/lib/slugify'
import type { Database } from '@/types/database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

type DbClient = SupabaseClient<Database>

export async function createNoteFolderAction(name: string, parentId: string | null) {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from('note_folders').insert({
    name,
    emoji: '📁',
    slug: slugify(name),
    parent_id: parentId,
  })
  if (error) throw new Error(error.message)
  updateTag('note-folders')
}

export async function deleteNoteFolderAction(id: string) {
  const { supabase } = await getAuthenticatedSupabase()
  const folderIds = await getFolderTreeIds(supabase, id)

  const { data: notes, error: notesError } = await supabase
    .from('notes')
    .select('slug')
    .in('folder_id', folderIds)
  if (notesError) throw new Error(notesError.message)

  if (notes?.length) {
    const { error } = await supabase.from('notes').delete().in('slug', notes.map(note => note.slug))
    if (error) throw new Error(error.message)
  }

  for (const folderId of folderIds.toReversed()) {
    const { error } = await supabase.from('note_folders').delete().eq('id', folderId)
    if (error) throw new Error(error.message)
  }

  notes?.forEach(note => updateTag(`note:${note.slug}`))
  updateTag('notes')
  updateTag('note-folders')
}

async function getFolderTreeIds(supabase: DbClient, rootId: string) {
  const ids = [rootId]

  for (let index = 0; index < ids.length; index += 1) {
    const { data, error } = await supabase
      .from('note_folders')
      .select('id')
      .eq('parent_id', ids[index])
    if (error) throw new Error(error.message)
    ids.push(...(data ?? []).map(folder => folder.id))
  }

  return ids
}

export async function moveNoteFolderAction(id: string, parentId: string | null) {
  if (id === parentId) throw new Error('A folder cannot contain itself')

  const { supabase } = await getAuthenticatedSupabase()
  let cursor = parentId
  while (cursor) {
    const { data, error } = await supabase
      .from('note_folders')
      .select('parent_id')
      .eq('id', cursor)
      .single()
    if (error) throw new Error(error.message)
    if (data.parent_id === id) throw new Error('A folder cannot move into its child')
    cursor = data.parent_id
  }

  const { error } = await supabase.from('note_folders').update({ parent_id: parentId }).eq('id', id)
  if (error) throw new Error(error.message)
  updateTag('note-folders')
}

export async function updateNoteFolderAction(id: string, name: string) {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase
    .from('note_folders')
    .update({ name, slug: slugify(name) })
    .eq('id', id)
  if (error) throw new Error(error.message)
  updateTag('note-folders')
}

export async function updateNoteFolderEmojiAction(id: string, emoji: string) {
  const { supabase } = await getAuthenticatedSupabase()
  const { error } = await supabase.from('note_folders').update({ emoji }).eq('id', id)
  if (error) throw new Error(error.message)
  updateTag('note-folders')
}
