export interface NoteMeta {
  slug: string
  title: string
  subject: string
  topic: string
  tags: string[]
  status: string
  difficulty: string
  date: string
  subjectSlug?: string
  path?: string
}

export interface NoteRecord extends NoteMeta {
  content: string
  renderedHtml?: string
}
