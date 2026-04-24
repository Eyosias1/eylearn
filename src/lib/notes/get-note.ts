import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { NoteMeta, NoteRecord } from '@/types/NoteRecordType'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function normalizeData(data: Record<string, unknown>) {
  return {
    ...data,
    date: data.date instanceof Date
      ? data.date.toISOString().split('T')[0]
      : String(data.date ?? ''),
  }
}

function walkMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkMarkdownFiles(fullPath)
    return entry.name.endsWith('.md') ? [fullPath] : []
  })
}

function getNoteFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return walkMarkdownFiles(CONTENT_DIR)
}

function toRelativeNotePath(filePath: string) {
  return path.relative(CONTENT_DIR, filePath)
}

function parseNoteFile(filePath: string): NoteRecord {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const relativePath = toRelativeNotePath(filePath)
  const subjectSlug = path.dirname(relativePath) === '.'
    ? undefined
    : path.dirname(relativePath).split(path.sep)[0]
  const slug = path.basename(filePath, '.md')

  return {
    slug,
    content,
    path: relativePath,
    subjectSlug,
    ...normalizeData(data),
  } as NoteRecord
}

let notesCache: Map<string, NoteRecord> | null = null

function getNotesBySlug() {
  if (notesCache) return notesCache

  notesCache = new Map<string, NoteRecord>()
  for (const filePath of getNoteFiles()) {
    const note = parseNoteFile(filePath)
    const existing = notesCache.get(note.slug)
    if (existing) {
      throw new Error(`Duplicate note slug detected: ${note.slug} in ${existing.path} and ${note.path}`)
    }
    notesCache.set(note.slug, note)
  }

  return notesCache
}

export function getAllNoteRecords(): NoteRecord[] {
  return Array.from(getNotesBySlug().values())
}

export function getAllNotes(): NoteMeta[] {
  return getAllNoteRecords().map(note => ({
    slug: note.slug,
    title: note.title,
    subject: note.subject,
    topic: note.topic,
    tags: note.tags,
    status: note.status,
    difficulty: note.difficulty,
    date: note.date,
    subjectSlug: note.subjectSlug,
    path: note.path,
  }))
}

export function getNote(slug: string): NoteRecord | null {
  return getNotesBySlug().get(slug) ?? null
}
