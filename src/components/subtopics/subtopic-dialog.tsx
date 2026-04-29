"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createSubtopic, updateSubtopic } from "@/lib/actions/subtopics"
import type { Subtopic } from "@/types/SubtopicType"

interface Props {
  open:    boolean
  topicId: string
  subtopic: Subtopic | null
  onClose: () => void
}

export function SubtopicDialog({ open, topicId, subtopic, onClose }: Props) {
  const [name,    setName]    = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName(subtopic ? subtopic.name : "")
  }, [subtopic, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    if (subtopic) await updateSubtopic(subtopic.id, name.trim())
    else          await createSubtopic(topicId, name.trim())
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{subtopic ? "Edit Subtopic" : "New Subtopic"}</DialogTitle>
          <DialogDescription className="sr-only">
            {subtopic ? "Edit subtopic name" : "Add a new subtopic"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <Input
            placeholder="Subtopic name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "Saving…" : subtopic ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
