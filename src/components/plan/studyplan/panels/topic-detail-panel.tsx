"use client"

import { useState } from "react"
import { X, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TopicViewContent } from "@/components/studyplan/panels/topic-view-content"
import { TopicEditForm } from "@/components/studyplan/panels/topic-edit-form"
import type { PlanTopic } from "@/types/studyplan"

interface Props {
  topic: PlanTopic
  onClose: () => void
}

export function TopicDetailPanel({ topic, onClose }: Props) {
  const [editing, setEditing] = useState(false)

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
          <span className={cn("size-2.5 rounded-full shrink-0", topic.subjectColor)} />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{topic.name}</p>
            <p className="text-xs text-muted-foreground">{topic.subject}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 -mt-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditing((e) => !e)}
            className={cn(editing && "bg-muted")}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="h-px bg-border" />

      {editing
        ? <TopicEditForm topic={topic} onSaved={() => setEditing(false)} onCancel={() => setEditing(false)} />
        : <TopicViewContent topic={topic} />
      }
    </div>
  )
}
