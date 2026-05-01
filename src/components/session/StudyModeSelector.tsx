"use client"

import { studyModes } from "@/lib/sessions/constants"
import { StudyModeCard } from "@/components/session/StudyModeCard"
import type { StudyMode } from "@/types/StudySessionType"

type Props = {
  selected: StudyMode
  onSelect: (mode: StudyMode) => void
}

export function StudyModeSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Select Mode
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {studyModes.map((mode) => (
          <StudyModeCard
            key={mode.id}
            mode={mode}
            selected={selected === mode.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
