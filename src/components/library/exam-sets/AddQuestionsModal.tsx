"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BankQuestionRow } from "@/components/library/exam-sets/BankQuestionRow"
import { addQuestionsToSet } from "@/lib/actions/question-sets"
import { cn } from "@/lib/utils"
import { QUESTION_TYPES } from "@/types/QuestionType"
import type { Question, QuestionType } from "@/types/QuestionType"
import type { Topic } from "@/types/TopicType"
import type { Subject } from "@/types/SubjectType"

type Props = {
  setId:          string
  open:           boolean
  onOpenChange:   (open: boolean) => void
  subjects:       Subject[]
  topics:         Topic[]
  bankQuestions:  Question[]
  onAdd:          (questions: Question[]) => void
}

export function AddQuestionsModal({ setId, open, onOpenChange, subjects, topics, bankQuestions, onAdd }: Props) {
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)
  const [topicFilter,   setTopicFilter]   = useState<string | null>(null)
  const [typeFilter,    setTypeFilter]    = useState<QuestionType | null>(null)
  const [selected,      setSelected]      = useState<Set<string>>(new Set())
  const [loading,       setLoading]       = useState(false)

  const filteredTopics = subjectFilter ? topics.filter((t) => t.subject_id === subjectFilter) : topics
  const filtered = bankQuestions
    .filter((q) => subjectFilter ? filteredTopics.some((t) => t.id === q.topic_id) : true)
    .filter((q) => topicFilter ? q.topic_id === topicFilter : true)
    .filter((q) => typeFilter ? q.type === typeFilter : true)

  function toggle(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  async function handleAdd() {
    if (selected.size === 0) return
    setLoading(true)
    await addQuestionsToSet(setId, Array.from(selected))
    onAdd(bankQuestions.filter((q) => selected.has(q.id)))
    setLoading(false)
    setSelected(new Set())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-base">Add Questions</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Select value={subjectFilter ?? "all"} onValueChange={(v) => { setSubjectFilter(v === "all" ? null : v); setTopicFilter(null) }}>
            <SelectTrigger className="h-9 text-sm flex-1"><SelectValue placeholder="All subjects" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={topicFilter ?? "all"} onValueChange={(v) => setTopicFilter(v === "all" ? null : v)}>
            <SelectTrigger className="h-9 text-sm flex-1"><SelectValue placeholder="All topics" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All topics</SelectItem>
              {filteredTopics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter ?? "all"} onValueChange={(v) => setTypeFilter(v === "all" ? null : v as QuestionType)}>
            <SelectTrigger className="h-9 text-sm w-40"><SelectValue placeholder="All types" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {QUESTION_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className={cn("flex flex-col gap-2", "max-h-[28rem] overflow-y-auto")}>
          {filtered.length === 0
            ? <p className="text-sm text-muted-foreground text-center py-8">No questions available</p>
            : filtered.map((q) => <BankQuestionRow key={q.id} question={q} selected={selected.has(q.id)} onToggle={() => toggle(q.id)} />)
          }
        </div>

        <DialogFooter>
          <Button size="sm" onClick={handleAdd} disabled={loading || selected.size === 0}>
            Add {selected.size > 0 ? `${selected.size} ` : ""}Question{selected.size !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
