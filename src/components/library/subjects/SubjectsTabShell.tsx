"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubjectsOverview } from "@/components/library/subjects/SubjectsOverview"
import { SubjectsPanel } from "@/components/library/subjects/SubjectsPanel"
import { SubjectDialog } from "@/components/library/subjects/subject-dialog"
import { AddTopicDialog } from "@/components/library/subjects/AddTopicDialog"
import { AddSubtopicDialog } from "@/components/library/subjects/AddSubtopicDialog"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  subjects:         Subject[]
  topicsBySubject:  Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
}

export function SubjectsTabShell({ subjects, topicsBySubject, subtopicsByTopic }: Props) {
  const router = useRouter()
  const [subjectFilter,   setSubjectFilter]   = useState<string | null>(null)
  const [topicFilter,     setTopicFilter]     = useState<string | null>(null)
  const [selected,        setSelected]        = useState<Subtopic | null>(null)
  const [managing,        setManaging]        = useState(false)
  const [addSubjectOpen,  setAddSubjectOpen]  = useState(false)
  const [addTopicOpen,    setAddTopicOpen]    = useState(false)
  const [addSubtopicOpen, setAddSubtopicOpen] = useState(false)

  const allTopics     = Object.values(topicsBySubject).flat()
  const visibleTopics = subjectFilter ? (topicsBySubject[subjectFilter] ?? []) : allTopics
  const selectedTopic   = selected ? allTopics.find((t) => t.id === selected.topic_id) ?? null : null
  const selectedSubject = selectedTopic ? subjects.find((s) => s.id === selectedTopic.subject_id) ?? null : null
  const panelMode       = managing ? "manage" : selected ? "subtopic" : null
  const filtered        = subjectFilter ? subjects.filter((s) => s.id === subjectFilter) : subjects
  const filteredTopics  = topicFilter
    ? Object.fromEntries(Object.entries(topicsBySubject).map(([sid, ts]) => [sid, ts.filter((t) => t.id === topicFilter)]))
    : topicsBySubject

  function handlePanelClose() { setSelected(null); setManaging(false) }
  function handleAddClose()   { setAddSubjectOpen(false); setAddTopicOpen(false); setAddSubtopicOpen(false); router.refresh() }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button size="sm" variant={subjectFilter === null ? "secondary" : "ghost"}
            onClick={() => setSubjectFilter(null)} className="h-9 rounded-sm text-sm px-3">All</Button>
          <Select value={subjectFilter ?? "all"} onValueChange={(v) => { setSubjectFilter(v === "all" ? null : v); setTopicFilter(null) }}>
            <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id} className="pl-3 py-2 cursor-pointer">{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={topicFilter ?? "all"} onValueChange={(v) => setTopicFilter(v === "all" ? null : v)}>
            <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
              <SelectValue placeholder="All topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All topics</SelectItem>
              {visibleTopics.map((t) => (
                <SelectItem key={t.id} value={t.id} className="pl-3 py-2 cursor-pointer">{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setAddSubjectOpen(true)}>New Subject</Button>
          <Button size="sm" variant="outline" onClick={() => setAddTopicOpen(true)}>New Topic</Button>
          <Button size="sm" variant="outline" onClick={() => setAddSubtopicOpen(true)}>New Subtopic</Button>
          <Button size="sm" variant={managing ? "secondary" : "outline"}
            onClick={() => { setManaging((v) => !v); setSelected(null) }}>
            <Settings2 className="size-3.5" />Manage
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <SubjectsOverview
          subjects={filtered}
          topicsBySubject={filteredTopics}
          subtopicsByTopic={subtopicsByTopic}
          selected={selected}
          onSelect={(s) => { setSelected(s); setManaging(false) }}
        />
        <SubjectsPanel
          mode={panelMode}
          subtopic={selected}
          topic={selectedTopic}
          subject={selectedSubject}
          subjects={subjects}
          topicsBySubject={topicsBySubject}
          subtopicsByTopic={subtopicsByTopic}
          onClose={handlePanelClose}
        />
      </div>

      <SubjectDialog open={addSubjectOpen} subject={null} onClose={handleAddClose} />
      <AddTopicDialog open={addTopicOpen} subjects={subjects} onClose={handleAddClose} />
      <AddSubtopicDialog open={addSubtopicOpen} subjects={subjects} topicsBySubject={topicsBySubject} onClose={handleAddClose} />
    </div>
  )
}
