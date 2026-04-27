"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RetroTopic } from "@/types/progress"

const ratingColor = {
  strong:  "bg-emerald-500",
  partial: "bg-yellow-400",
  poor:    "bg-red-500",
  null:    "bg-muted",
}

function ScoreCell({ sessions }: { sessions: RetroTopic["sessions"] }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div className="flex gap-1">
      {sessions.map((s) => (
        <div
          key={s.date}
          className="relative"
          onMouseEnter={() => setHovered(s.date)}
          onMouseLeave={() => setHovered(null)}
        >
          <span className={cn(
            // layout
            "block size-4 rounded-sm cursor-default",
            // animation
            "transition-all hover:ring-2 hover:ring-foreground/30",
            // conditional
            ratingColor[s.rating ?? "null"],
          )} />
          {hovered === s.date && (
            <div className={cn(
              // layout
              "absolute bottom-full left-1/2 -translate-x-1/2 z-10",
              // spacing
              "mb-1 px-2 py-1",
              // colors
              "bg-popover",
              // border
              "rounded-md border",
              // typography
              "text-xs whitespace-nowrap",
              // animation
              "shadow-md",
            )}>
              <p className="font-medium">{new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
              <p className="text-muted-foreground capitalize">{s.rating ?? "Not studied"}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface Props {
  topics: RetroTopic[]
  emptyMessage?: string
}

export function RetroTable({ topics, emptyMessage = "No topics found." }: Props) {
  const dates = topics[0]?.sessions.map((s) => s.date) ?? []

  return (
    <Table variant="ruled">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Topic</TableHead>
          <TableHead className="w-[120px]">Subject</TableHead>
          <TableHead>
            <div className="flex gap-1">
              {dates.map((d) => (
                <span key={d} className="w-4 text-center text-[9px] text-muted-foreground leading-none">
                  {new Date(d).getDate()}
                </span>
              ))}
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-sm text-muted-foreground py-8">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          topics.map((t) => (
            <TableRow key={t.topic}>
              <TableCell className="font-medium text-sm">{t.topic}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{t.subject}</TableCell>
              <TableCell><ScoreCell sessions={t.sessions} /></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
