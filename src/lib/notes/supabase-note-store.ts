import { createAdminClient } from '@/lib/supabase/admin'
import type { NoteRecord } from '@/types/NoteRecordType'
import type { NoteStore } from '@/lib/notes/note-store'

export const supabaseNoteStore: NoteStore = {
  async list() {
    const db = createAdminClient()
    const { data, error } = await db
      .from('notes')
      .select('*')
      .order('date', { ascending: false })
    if (error) throw new Error(error.message)
    return (data ?? []) as NoteRecord[]
  },

  async get(slug) {
    const db = createAdminClient()
    const { data, error } = await db
      .from('notes')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) return null
    return data as NoteRecord
  },

  async create(note) {
    const db = createAdminClient()
    const { error } = await db.from('notes').insert(note)
    if (error) throw new Error(error.message)
  },

  async update(slug, updates) {
    const db = createAdminClient()
    const { error } = await db.from('notes').update(updates).eq('slug', slug)
    if (error) throw new Error(error.message)
  },

  async remove(slug) {
    const db = createAdminClient()
    const { error } = await db.from('notes').delete().eq('slug', slug)
    if (error) throw new Error(error.message)
  },
}
