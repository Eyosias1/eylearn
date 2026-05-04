"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTopic } from "@/lib/actions/topics"
import type { Subject } from "@/types/SubjectType"

interface Props {
  open:     boolean
  subjects: Subject[]
  onClose:  () => void
}

export function AddTopicDialog({ open, subjects, onClose }: Props) {
  const [subjectId, setSubjectId] = useState("")
  const [name,      setName]      = useState("")
  const [loading,   setLoading]   = useState(false)

  function handleOpenChange(o: boolean) {
    if (!o) { setSubjectId(""); setName(""); onClose() }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !subjectId) return
    setLoading(true)
    await createTopic(subjectId, name.trim())
    setLoading(false)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Topic</DialogTitle>
          <DialogDescription className="sr-only">Add a new topic to a subject</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <Select value={subjectId} onValueChange={setSubjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Topic name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading || !name.trim() || !subjectId}>
              {loading ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
