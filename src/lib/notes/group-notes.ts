import type { NoteMeta } from '@/types/NoteRecordType'

export interface NoteGroup {
  subject: string
  notes: NoteMeta[]
}

export function groupNotesBySubject(notes: NoteMeta[]): NoteGroup[] {
  const map = new Map<string, NoteMeta[]>()
  for (const note of notes) {
    const subject = note.subject ?? 'Other'
    if (!map.has(subject)) map.set(subject, [])
    map.get(subject)!.push(note)
  }
  return Array.from(map.entries())
    .map(([subject, notes]) => ({ subject, notes }))
    .sort((a, b) => a.subject.localeCompare(b.subject))
}
