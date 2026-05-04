"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createQuestionSet } from "@/lib/actions/question-sets"
import type { Subject } from "@/types/SubjectType"
import type { QuestionSet } from "@/types/QuestionSetType"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  subjects: Subject[]
  onCreate: (set: QuestionSet) => void
}

export function CreateSetDialog({ open, onOpenChange, subjects, onCreate }: Props) {
  const [subjectId, setSubjectId]     = useState("")
  const [name, setName]               = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading]         = useState(false)

  async function handleCreate() {
    if (!name.trim() || !subjectId) return
    setLoading(true)
    const set = await createQuestionSet(subjectId, name.trim(), description.trim() || undefined)
    setLoading(false)
    onCreate(set)
    setSubjectId("")
    setName("")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">New Question Set</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Subject</p>
            <Select value={subjectId} onValueChange={setSubjectId}>
              <SelectTrigger className="h-11 text-base">
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id} className="text-base py-2.5">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Name</p>
            <Input
              placeholder="Midterm Exam, Problem Set 1..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Description (optional)</p>
            <Textarea
              placeholder="What this set covers..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none text-base"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={loading || !name.trim() || !subjectId}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
