import 'server-only'
import { getAuthenticatedSupabase } from '@/lib/supabase/auth'
import type { GraphData, GraphDataNode, GraphDataEdge, NodeHealth } from '@/types/graph'

// Fixed color per node type — instantly identifies hierarchy level
const TYPE_COLOR = {
  subject:  '#f97316',  // orange-500
  topic:    '#60a5fa',  // blue-400
  subtopic: '#a78bfa',  // violet-400
  note:     '#1e293b',  // slate-900
}

const NODE_SIZE = { subject: 13, topic: 10, subtopic: 9, note: 7 }

function deriveHealth(active: boolean | null, box: number | null, nextReview: string | null): NodeHealth {
  if (!active || !box)  return 'gray'
  if (box === 5)        return 'green'
  if (nextReview && nextReview < new Date().toISOString().slice(0, 10)) return 'red'
  return 'yellow'
}

function aggregateHealth(healths: NodeHealth[]): NodeHealth {
  if (!healths.length)                return 'gray'
  if (healths.some(h => h === 'red')) return 'red'
  if (healths.every(h => h === 'green')) return 'green'
  if (healths.every(h => h === 'gray'))  return 'gray'
  return 'yellow'
}

export async function getGraphData(): Promise<GraphData> {
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

  const nodes: GraphDataNode[] = []
  const edges: GraphDataEdge[] = []

  const topicToSubject  = new Map((topics    ?? []).map(t => [t.id, t.subject_id]))
  const subtopicToTopic = new Map((subtopics ?? []).map(s => [s.id, s.topic_id]))

  const subtopicToSubject = new Map(
    (subtopics ?? []).map(s => [s.id, topicToSubject.get(s.topic_id) ?? ''])
  )

  // Subtopic health per node + aggregation maps
  const subtopicHealth      = new Map<string, NodeHealth>()
  const topicHealthBuckets  = new Map<string, NodeHealth[]>()

  ;(subtopics ?? []).forEach(s => {
    const health = deriveHealth(s.leitner_active, s.leitner_box, s.next_review_date)
    subtopicHealth.set(s.id, health)
    const bucket = topicHealthBuckets.get(s.topic_id) ?? []
    bucket.push(health)
    topicHealthBuckets.set(s.topic_id, bucket)

    nodes.push({
      id:     `subtopic:${s.id}`,
      type:   'subtopic',
      label:  s.name,
      health,
      color:  TYPE_COLOR.subtopic,
      size:   NODE_SIZE.subtopic,
      meta:   { subtopicId: s.id, topicId: s.topic_id, subjectId: subtopicToSubject.get(s.id) },
    })
    edges.push({ source: `topic:${s.topic_id}`, target: `subtopic:${s.id}` })
  })

  const subjectHealthBuckets = new Map<string, NodeHealth[]>()

  ;(topics ?? []).forEach(t => {
    const health = aggregateHealth(topicHealthBuckets.get(t.id) ?? [])
    const bucket = subjectHealthBuckets.get(t.subject_id) ?? []
    bucket.push(health)
    subjectHealthBuckets.set(t.subject_id, bucket)

    nodes.push({
      id:     `topic:${t.id}`,
      type:   'topic',
      label:  t.name,
      health,
      color:  TYPE_COLOR.topic,
      size:   NODE_SIZE.topic,
      meta:   { topicId: t.id, subjectId: t.subject_id },
    })
    edges.push({ source: `subject:${t.subject_id}`, target: `topic:${t.id}` })
  })

  ;(subjects ?? []).forEach(s => {
    const health = aggregateHealth(subjectHealthBuckets.get(s.id) ?? [])
    nodes.push({
      id:     `subject:${s.id}`,
      type:   'subject',
      label:  s.name,
      health,
      color:  TYPE_COLOR.subject,
      size:   NODE_SIZE.subject,
      meta:   { subjectId: s.id },
    })
  })

  ;(notes ?? []).forEach(n => {
    nodes.push({
      id:     `note:${n.id}`,
      type:   'note',
      label:  n.title,
      health: 'gray',
      color:  TYPE_COLOR.note,
      size:   NODE_SIZE.note,
      meta:   { noteId: n.id, slug: n.slug, subject: n.subject },
    })
  })

  ;(subtopicNoteLinks ?? []).forEach(link => {
    edges.push({ source: `subtopic:${link.subtopic_id}`, target: `note:${link.note_id}` })
  })

  ;(noteRefs ?? []).forEach(ref => {
    edges.push({ source: `note:${ref.source_note_id}`, target: `note:${ref.target_note_id}` })
  })

  const stats = { green: 0, yellow: 0, red: 0, gray: 0 }
  subtopicHealth.forEach(h => stats[h]++)

  return { nodes, edges, stats }
}
