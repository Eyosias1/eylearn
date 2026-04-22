'use server'

import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export async function saveNote(slug: string, content: string): Promise<void> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) throw new Error(`Note not found: ${slug}`)
  fs.writeFileSync(filePath, content, 'utf-8')
  revalidatePath(`/notes/${slug}`)
}
