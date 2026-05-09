"use client"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCalendarEvent } from "@/lib/actions/studyplan/calendar"

interface Props {
  dateStr: string
  startTime: string
  onClose: () => void
}

export function CreateEventDialog({ dateStr, startTime, onClose }: Props) {
  const [title,    setTitle]    = useState("")
  const [time,     setTime]     = useState(startTime)
  const [duration, setDuration] = useState(60)
  const [isPending, startTransition] = useTransition()

  function handleSubmit() {
    if (!title.trim()) return
    startTransition(async () => {
      await createCalendarEvent({ title: title.trim(), scheduledDate: dateStr, startTime: time, durationMinutes: duration })
      onClose()
    })
  }

  const formatted = new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  })

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>New Event — {formatted}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Title</Label>
            <Input
              autoFocus
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit() }}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">Start time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">Duration (min)</Label>
              <Input type="number" min={5} step={5} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button className="flex-1" onClick={handleSubmit} disabled={isPending || !title.trim()}>
              {isPending ? "Creating…" : "Create"}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isPending}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
