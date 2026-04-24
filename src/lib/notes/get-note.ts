import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface NoteMeta {
  slug: string
  title: string
  subject: string
  topic: string
  tags: string[]
  status: string
  difficulty: string
  date: string
}

export interface Note extends NoteMeta {
  content: string
}

function normalizeData(data: Record<string, unknown>) {
  return {
    ...data,
    date: data.date instanceof Date
      ? data.date.toISOString().split('T')[0]
      : String(data.date ?? ''),
  }
}

export function getAllNotes(): NoteMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const slug = file.replace('.md', '')
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    const { data } = matter(raw)
    return { slug, ...normalizeData(data) } as NoteMeta
  })
}

export function getNote(slug: string): Note | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { slug, content, ...normalizeData(data) } as Note
}
