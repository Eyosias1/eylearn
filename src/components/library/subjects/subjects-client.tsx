"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubjectSection } from "@/components/library/subjects/subject-section"
import { SubjectDialog } from "@/components/library/subjects/subject-dialog"
import { TopicDialog } from "@/components/library/subjects/topic-dialog"
import { SubtopicPanel } from "@/components/library/subjects/subtopic-panel"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

interface Props {
  subjects:          Subject[]
  topicsBySubject:   Record<string, Topic[]>
  subtopicsByTopic:  Record<string, Subtopic[]>
}

export function SubjectsClient({ subjects, topicsBySubject, subtopicsByTopic }: Props) {
  const [expanded,        setExpanded]        = useState<Record<string, boolean>>({})
  const [subjectDialog,   setSubjectDialog]   = useState(false)
  const [editingSubject,  setEditingSubject]  = useState<Subject | null>(null)
  const [topicDialog,     setTopicDialog]     = useState(false)
  const [topicSubject,    setTopicSubject]    = useState<Subject | null>(null)
  const [editingTopic,    setEditingTopic]    = useState<Topic | null>(null)
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null)

  function openAddTopic(subject: Subject) {
    setTopicSubject(subject); setEditingTopic(null); setTopicDialog(true)
  }
  function openEditTopic(topic: Topic) {
    const subject = subjects.find((s) => s.id === topic.subject_id) ?? null
    setTopicSubject(subject); setEditingTopic(topic); setTopicDialog(true)
  }
  function closeSubjectDialog() { setSubjectDialog(false); setEditingSubject(null) }
  function closeTopicDialog()   { setTopicDialog(false); setTopicSubject(null); setEditingTopic(null) }

  const panelTopic   = selectedSubtopic ? Object.values(topicsBySubject).flat().find((t) => t.id === selectedSubtopic.topic_id) ?? null : null
  const panelSubject = panelTopic ? subjects.find((s) => s.id === panelTopic.subject_id) ?? null : null

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Subjects</h1>
            <p className="text-sm text-muted-foreground">Organise what you are studying</p>
          </div>
          <Button size="sm" onClick={() => setSubjectDialog(true)}>
            <Plus className="size-4 mr-1.5" /> Add Subject
          </Button>
        </div>

        <div className="flex items-start gap-4">
          {/* Subject list */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {subjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm font-medium">No subjects yet</p>
                <p className="text-xs text-muted-foreground mt-1">Add your first subject to get started</p>
              </div>
            ) : subjects.map((s) => (
              <SubjectSection
                key={s.id}
                subject={s}
                topics={topicsBySubject[s.id] ?? []}
                subtopicsByTopic={subtopicsByTopic}
                expanded={!!expanded[s.id]}
                onToggle={() => setExpanded((prev) => ({ ...prev, [s.id]: !prev[s.id] }))}
                onEdit={(sub) => { setEditingSubject(sub); setSubjectDialog(true) }}
                onAddTopic={openAddTopic}
                onEditTopic={openEditTopic}
                onSelectSubtopic={setSelectedSubtopic}
              />
            ))}
          </div>

          {/* Subtopic panel — always visible */}
          {selectedSubtopic && panelTopic && panelSubject ? (
            <SubtopicPanel
              subtopic={selectedSubtopic}
              topic={panelTopic}
              subject={panelSubject}
              onClose={() => setSelectedSubtopic(null)}
            />
          ) : (
            <SubtopicPanel subtopic={null} topic={null} subject={null} onClose={() => {}} />
          )}
        </div>
      </div>

      <SubjectDialog open={subjectDialog} subject={editingSubject} onClose={closeSubjectDialog} />
      {topicSubject && (
        <TopicDialog open={topicDialog} subjectId={topicSubject.id} topic={editingTopic} onClose={closeTopicDialog} />
      )}
    </>
  )
}
