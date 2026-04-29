"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSubjectTopicChain } from "@/hooks/useSubjectTopicChain"
import { updateScheduledStudy } from "@/lib/actions/studyplan-actions"
import type { PlanTopic } from "@/types/studyplan"

const NONE = "__none__"

interface Props {
  topic: PlanTopic
  onSaved: () => void
  onCancel: () => void
}

export function TopicEditForm({ topic, onSaved, onCancel }: Props) {
  const [name,      setName]      = useState(topic.name)
  const [startTime, setStartTime] = useState(topic.startTime)
  const [duration,  setDuration]  = useState(topic.durationMinutes)
  const [isPending, startTransition] = useTransition()

  const chain = useSubjectTopicChain({
    subjectId:    topic.subjectId,
    topicId:      topic.topicId,
    subtopicId:   topic.subtopicId,
    subjectName:  topic.subject,
    topicName:    topic.topicName,
    subtopicName: topic.name,
  })

  function save() {
    startTransition(async () => {
      await updateScheduledStudy(topic.id, {
        title:           name,
        subtopicId:      chain.subtopicId && chain.subtopicId !== NONE ? chain.subtopicId : null,
        startTime,
        durationMinutes: duration,
      })
      onSaved()
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8 text-sm" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Subject</Label>
        <Select value={chain.subjectId || NONE} onValueChange={(v) => chain.selectSubject(v === NONE ? "" : v)}>
          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="None" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>None</SelectItem>
            {chain.subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Topic</Label>
        <Select value={chain.topicId || NONE} onValueChange={(v) => chain.selectTopic(v === NONE ? "" : v)} disabled={!chain.subjectId}>
          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="None" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>None</SelectItem>
            {chain.topics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Subtopic</Label>
        <Select value={chain.subtopicId || NONE} onValueChange={(v) => chain.setSubtopicId(v === NONE ? "" : v)} disabled={!chain.topicId}>
          <SelectTrigger className="h-8 text-sm"><SelectValue placeholder="None" /></SelectTrigger>
          <SelectContent>
            <SelectItem value={NONE}>None</SelectItem>
            {chain.subtopics.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Start Time</Label>
        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="h-8 text-sm" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Duration (min)</Label>
        <Input type="number" min={5} step={5} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="h-8 text-sm" />
      </div>

      <div className="flex gap-2 pt-1">
        <Button size="sm" className="flex-1" onClick={save} disabled={isPending}>{isPending ? "Saving…" : "Save"}</Button>
        <Button size="sm" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
      </div>
    </div>
  )
}
