import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const CONTENT_DIR = path.join(process.cwd(), 'content')

function walkMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walkMarkdownFiles(fullPath)
    return entry.name.endsWith('.md') ? [fullPath] : []
  })
}

function parseNote(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const relativePath = path.relative(CONTENT_DIR, filePath)
  const dirPart = path.dirname(relativePath)
  const subjectSlug = dirPart === '.' ? null : dirPart.split(path.sep)[0]
  const slug = path.basename(filePath, '.md')
  const date = data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : String(data.date ?? '')

  return {
    slug,
    title: String(data.title ?? slug),
    subject: String(data.subject ?? ''),
    topic: String(data.topic ?? ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    status: String(data.status ?? 'draft'),
    difficulty: String(data.difficulty ?? 'beginner'),
    date,
    subject_slug: subjectSlug,
    path: relativePath,
    content,
  }
}

async function main() {
  const files = walkMarkdownFiles(CONTENT_DIR)
  console.log(`Found ${files.length} notes to migrate`)

  const notes = files.map(parseNote)

  const { error } = await supabase.from('notes').upsert(notes, { onConflict: 'slug' })

  if (error) {
    console.error('Migration failed:', error.message)
    process.exit(1)
  }

  console.log(`Successfully migrated ${notes.length} notes`)
}

main()
