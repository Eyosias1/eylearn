"use client"

import { useState, useTransition } from "react"
import { X, Pencil, Trash2, Clock, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateCalendarEvent, deleteCalendarEvent } from "@/lib/actions/plan/calendar"
import type { CalendarEvent } from "@/types/studyplan"

interface Props {
  event: CalendarEvent
  onClose: () => void
}

function ViewContent({ event }: { event: CalendarEvent }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Scheduled</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            <span className="text-sm font-semibold tabular-nums">{event.startTime}</span>
          </div>
          <div className="h-3.5 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Timer className="size-3.5 text-muted-foreground" />
            <span className="text-sm font-semibold">{event.durationMinutes}<span className="text-xs font-normal text-muted-foreground ml-0.5">min</span></span>
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Source</p>
        <p className="text-sm capitalize">{event.source}</p>
      </div>
    </>
  )
}

function EditContent({ event, onSaved, onCancel }: { event: CalendarEvent; onSaved: () => void; onCancel: () => void }) {
  const [title,     setTitle]     = useState(event.title)
  const [startTime, setStartTime] = useState(event.startTime)
  const [duration,  setDuration]  = useState(event.durationMinutes)
  const [isPending, startTransition] = useTransition()

  function save() {
    startTransition(async () => {
      await updateCalendarEvent(event.id, { title, startTime, durationMinutes: duration })
      onSaved()
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-8 text-sm" />
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

export function CalendarEventDetailPanel({ event, onClose }: Props) {
  const [editing, setEditing] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      await deleteCalendarEvent(event.id)
      onClose()
    })
  }

  return (
    <div className={cn(
      // layout
      "flex flex-col gap-4",
      // sizing
      "w-80 shrink-0",
      // spacing
      "p-4",
      // border
      "rounded-xl border",
      // colors
      "bg-card",
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="size-2.5 rounded-full shrink-0 bg-violet-500" />
          <p className="text-sm font-semibold truncate">{event.title}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 -mt-0.5">
          <Button variant="ghost" size="icon-sm" onClick={() => setEditing(e => !e)} className={cn(editing && "bg-muted")}>
            <Pencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={handleDelete} disabled={isPending} className="text-destructive hover:text-destructive">
            <Trash2 className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="h-px bg-border" />

      {editing
        ? <EditContent event={event} onSaved={() => setEditing(false)} onCancel={() => setEditing(false)} />
        : <ViewContent event={event} />
      }
    </div>
  )
}
