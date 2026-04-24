'use server'

import { renderMarkdown } from '@/lib/markdown/render-markdown'

export async function renderNote(content: string): Promise<string> {
  return renderMarkdown(content)
}
