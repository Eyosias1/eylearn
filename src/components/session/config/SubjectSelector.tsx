"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"

type Props = {
  subjects: Subject[]
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function SubjectSelector({ subjects, selectedIds, onToggle }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Subjects 
      </p>
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => {
          const isSelected = selectedIds.includes(subject.id)
          return (
            <Button
              key={subject.id}
              type="button"
              variant="pill"
              onClick={() => onToggle(subject.id)}
              className={cn(
                // layout
                "flex items-center gap-1.5",
                // spacing
                "px-4 py-1",
                // typography
                "text-sm font-medium",
                // animation
                "transition-colors duration-150",
                // conditional
                isSelected
                  ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                  : "bg-muted text-foreground",
              )}
            >
              <span className={cn("size-2 rounded-full shrink-0", subject.color)} />
              {subject.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
