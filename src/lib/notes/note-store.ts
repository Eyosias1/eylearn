import type { NoteRecord } from '@/types/NoteRecordType'

export interface NoteStore {
  list(): Promise<NoteRecord[]>
  get(slug: string): Promise<NoteRecord | null>
  create(note: NoteRecord): Promise<void>
  update(slug: string, updates: Partial<NoteRecord>): Promise<void>
  remove(slug: string): Promise<void>
}
