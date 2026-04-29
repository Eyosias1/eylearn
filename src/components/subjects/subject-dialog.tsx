"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SubjectColorPicker, SUBJECT_COLORS } from "@/components/subjects/subject-color-picker"
import { createSubject, updateSubject } from "@/lib/actions/subjects"
import type { Subject } from "@/types/SubjectType"

interface Props {
  open:    boolean
  subject: Subject | null
  onClose: () => void
}

export function SubjectDialog({ open, subject, onClose }: Props) {
  const [name,    setName]    = useState("")
  const [color,   setColor]   = useState(SUBJECT_COLORS[0])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (subject) { setName(subject.name); setColor(subject.color) }
    else         { setName("");           setColor(SUBJECT_COLORS[0]) }
  }, [subject, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    if (subject) await updateSubject(subject.id, name.trim(), color)
    else         await createSubject(name.trim(), color)
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{subject ? "Edit Subject" : "New Subject"}</DialogTitle>
          <DialogDescription className="sr-only">
            {subject ? "Edit subject name and color" : "Add a new subject to your study plan"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <Input
            placeholder="Subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">Color</p>
            <SubjectColorPicker value={color} onChange={setColor} />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "Saving…" : subject ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
