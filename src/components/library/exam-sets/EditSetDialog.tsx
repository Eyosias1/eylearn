"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateQuestionSet } from "@/lib/actions/question-sets"
import type { QuestionSet } from "@/types/QuestionSetType"

type Props = {
  set: QuestionSet
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (updated: QuestionSet) => void
}

export function EditSetDialog({ set, open, onOpenChange, onUpdate }: Props) {
  const [name, setName]               = useState(set.name)
  const [description, setDescription] = useState(set.description ?? "")
  const [loading, setLoading]         = useState(false)

  async function handleSave() {
    if (!name.trim()) return
    setLoading(true)
    const updated = await updateQuestionSet(set.id, name.trim(), description.trim() || undefined)
    setLoading(false)
    onUpdate(updated)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Edit Set</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Name</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 text-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Description (optional)</p>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none text-base"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={loading || !name.trim()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
