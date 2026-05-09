'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { limitAssistantContextText } from '@/lib/assistant/limit-assistant-context-text'
import { useAssistant } from '@/providers/assistant-provider'
import type { NoteRecord } from '@/types/NoteRecordType'

export function useRegisterNoteAssistantContext(note: NoteRecord, content: string, isDirty: boolean) {
  const pathname = usePathname()
  const { setPageContext } = useAssistant()

  useEffect(() => {
    const limited = limitAssistantContextText(content)
    setPageContext({
      pathname,
      routeType: 'note',
      label: 'Note',
      entitySlug: note.slug,
      title: note.title,
      subject: note.subject,
      topic: note.topic,
      tags: note.tags,
      status: note.status,
      difficulty: note.difficulty,
      content: limited.content,
      source: 'current-editor',
      isDirty,
      truncated: limited.truncated,
    })

    return () => setPageContext(null)
  }, [content, isDirty, note, pathname, setPageContext])
}
