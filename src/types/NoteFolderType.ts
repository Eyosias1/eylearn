export interface NoteFolder {
  id: string
  name: string
  slug: string
  parentId: string | null
  emoji?: string | null
  createdAt: string
  updatedAt: string
}
