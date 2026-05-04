"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSubtopic } from "@/lib/actions/subtopics"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"

interface Props {
  open:             boolean
  subjects:         Subject[]
  topicsBySubject:  Record<string, Topic[]>
  onClose:          () => void
}

export function AddSubtopicDialog({ open, subjects, topicsBySubject, onClose }: Props) {
  const [subjectId, setSubjectId] = useState("")
  const [topicId,   setTopicId]   = useState("")
  const [name,      setName]      = useState("")
  const [loading,   setLoading]   = useState(false)

  const topics = subjectId ? (topicsBySubject[subjectId] ?? []) : []

  function handleSubjectChange(id: string) {
    setSubjectId(id)
    setTopicId("")
  }

  function handleOpenChange(o: boolean) {
    if (!o) { setSubjectId(""); setTopicId(""); setName(""); onClose() }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !topicId) return
    setLoading(true)
    await createSubtopic(topicId, name.trim())
    setLoading(false)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Subtopic</DialogTitle>
          <DialogDescription className="sr-only">Add a new subtopic to a topic</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <Select value={subjectId} onValueChange={handleSubjectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={topicId} onValueChange={setTopicId} disabled={!subjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Subtopic name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading || !name.trim() || !topicId}>
              {loading ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
