import 'server-only'
import { getAuthenticatedSupabase } from '@/lib/supabase/auth'

export async function fetchGraphRawData() {
  const { supabase: db } = await getAuthenticatedSupabase()

  const [
    { data: subjects },
    { data: topics },
    { data: subtopics },
    { data: notes },
    { data: subtopicNoteLinks },
    { data: noteRefs },
  ] = await Promise.all([
    db.from('subjects').select('id, name'),
    db.from('topics').select('id, subject_id, name'),
    db.from('subtopics').select('id, topic_id, name, leitner_box, leitner_active, next_review_date'),
    db.from('notes').select('id, title, slug, subject'),
    db.from('subtopic_notes').select('subtopic_id, note_id'),
    db.from('note_references').select('source_note_id, target_note_id'),
  ])

  return { subjects, topics, subtopics, notes, subtopicNoteLinks, noteRefs }
}
