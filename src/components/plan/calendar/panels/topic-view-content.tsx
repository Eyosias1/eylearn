"use client"

import { Clock, Timer } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PlanTopic, SessionRating } from "@/types/studyplan"

const ratingColor: Record<NonNullable<SessionRating> | "null", string> = {
  strong:  "bg-emerald-500",
  partial: "bg-yellow-400",
  poor:    "bg-red-500",
  null:    "bg-muted border",
}

const BOX_LABEL: Record<number, string> = {
  1: "Daily",
  2: "Every 3 days",
  3: "Weekly",
  4: "Bi-weekly",
  5: "Mastered",
}

function SessionDot({ rating }: { rating: SessionRating }) {
  return <span className={cn("block size-4 rounded-sm shrink-0", ratingColor[rating ?? "null"])} />
}

function formatTotalTime(minutes: number) {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export function TopicViewContent({ topic }: { topic: PlanTopic }) {
  const studiedSessions = topic.lastSessions.filter(Boolean).length
  const totalMinutes    = studiedSessions * topic.durationMinutes

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Scheduled</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            <span className="text-sm font-semibold tabular-nums">{topic.startTime}</span>
          </div>
          <div className="h-3.5 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <Timer className="size-3.5 text-muted-foreground" />
            <span className="text-sm font-semibold">{topic.durationMinutes}<span className="text-xs font-normal text-muted-foreground ml-0.5">min</span></span>
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Time Studied</p>
        <div className="flex items-center gap-1.5">
          <Timer className="size-3.5 text-muted-foreground" />
          <span className="text-sm font-semibold">{formatTotalTime(totalMinutes)}</span>
          <span className="text-xs text-muted-foreground">total</span>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Leitner Box</p>
        <p className="text-sm font-semibold">Box {topic.box}</p>
        <p className="text-xs text-muted-foreground">{BOX_LABEL[topic.box]}</p>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Last 5 Sessions</p>
        <div className="flex gap-1.5">
          {topic.lastSessions.map((r, i) => <SessionDot key={i} rating={r} />)}
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Today</p>
        <div className="flex items-center gap-2">
          <SessionDot rating={topic.todayProgress} />
          <span className="text-xs text-muted-foreground capitalize">
            {topic.todayProgress ?? "Not yet studied"}
          </span>
        </div>
      </div>
    </>
  )
}
