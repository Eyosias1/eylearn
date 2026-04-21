"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { RetroTopic } from "@/types/progress"

const ratingColor = {
  strong:  "bg-emerald-500",
  partial: "bg-yellow-400",
  poor:    "bg-red-500",
  null:    "bg-muted",
}

interface Props {
  topics: RetroTopic[]
}

export function RetrospectiveGrid({ topics }: Props) {
  const [hovered, setHovered] = useState<{ topic: string; date: string } | null>(null)

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-2 min-w-[600px]">
        <div className="flex items-center gap-3 mb-1 ml-[140px]">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" /> Strong
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="size-2 rounded-full bg-yellow-400" /> Partial
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="size-2 rounded-full bg-red-500" /> Poor
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="size-2 rounded-full bg-muted border" /> Not studied
          </div>
        </div>
        {topics.map((t) => (
          <div key={t.topic} className="flex items-center gap-2">
            <div className="w-[132px] shrink-0 text-right">
              <p className="text-xs font-medium truncate">{t.topic}</p>
              <p className="text-[10px] text-muted-foreground">{t.subject}</p>
            </div>
            <div className="flex gap-1">
              {t.sessions.map((s) => {
                const isHovered = hovered?.topic === t.topic && hovered?.date === s.date
                return (
                  <div
                    key={s.date}
                    className="relative"
                    onMouseEnter={() => setHovered({ topic: t.topic, date: s.date })}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className={cn(
                      "block size-4 rounded-sm cursor-default hover:ring-2 hover:ring-foreground/30 transition-all",
                      ratingColor[s.rating ?? "null"],
                    )} />
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 whitespace-nowrap rounded-md border bg-popover px-2 py-1 text-xs shadow-md">
                        <p className="font-medium">{new Date(s.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                        <p className="text-muted-foreground capitalize">{s.rating ?? "Not studied"}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
