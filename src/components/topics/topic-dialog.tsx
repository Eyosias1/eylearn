"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createTopic, updateTopic } from "@/lib/actions/topics"
import type { Topic } from "@/types/TopicType"

interface Props {
  open:      boolean
  subjectId: string
  topic:     Topic | null
  onClose:   () => void
}

export function TopicDialog({ open, subjectId, topic, onClose }: Props) {
  const [name,    setName]    = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName(topic ? topic.name : "")
  }, [topic, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    if (topic) await updateTopic(topic.id, name.trim(), subjectId)
    else       await createTopic(subjectId, name.trim())
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{topic ? "Edit Topic" : "New Topic"}</DialogTitle>
          <DialogDescription className="sr-only">
            {topic ? "Edit topic name" : "Add a new topic to this subject"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <Input
            placeholder="Topic name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "Saving…" : topic ? "Save" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
