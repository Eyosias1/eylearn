"use client"

import { useRouter } from "next/navigation"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StudyModeSelector } from "@/components/session/config/StudyModeSelector"
import { SubjectSelector } from "@/components/session/config/SubjectSelector"
import { ImmediateReviewSubtopicPicker } from "@/components/session/immediate-review/ImmediateReviewSubtopicPicker"
import { ImmediateReviewQuestionSlider } from "@/components/session/immediate-review/ImmediateReviewQuestionSlider"
import { InterleaveToggle } from "@/components/session/config/InterleaveToggle"
import { ElaborativeToggle } from "@/components/session/config/ElaborativeToggle"
import { SessionLengthPicker } from "@/components/session/config/SessionLengthPicker"
import { useSessionConfig } from "@/hooks/useSessionConfig"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"
import type { StudyMode } from "@/types/StudySessionType"

const INTENSITY: Record<StudyMode, Record<string, string>> = {
  "active-recall":     { short: "Focused Recall",   long: "High Performance" },
  "immediate-review":  { short: "Consolidation",    long: "Consolidation"    },
  "blurting":          { short: "Focused Recall",   long: "Deep Focus"       },
  "feynman":           { short: "Conceptual Depth", long: "Conceptual Depth" },
  "pre-test":          { short: "Diagnostic",       long: "Diagnostic"       },
  "exam-simulation":   { short: "High Performance", long: "High Performance" },
  "end-of-day-review": { short: "Consolidation",    long: "Consolidation"    },
  "spaced-review":     { short: "Retention",        long: "Retention"        },
}

type Props = { subjects: Subject[]; topics: Topic[]; subtopics: Subtopic[]; subtopicQuestionCounts: Record<string, number> }

export function SessionConfigForm({ subjects, topics, subtopics, subtopicQuestionCounts }: Props) {
  const router = useRouter()
  const { config, setMode, toggleSubject, setSubtopicId, setQuestionCount, setInterleave, setElaborativeInterrogation, setLength } = useSessionConfig()

  const isImmediate    = config.mode === "immediate-review"
  const subtopicMax    = config.subtopicId ? (subtopicQuestionCounts[config.subtopicId] ?? 1) : 1
  const isLong      = config.length === 30 || config.length === "custom"
  const label       = INTENSITY[config.mode][isLong ? "long" : "short"]
  const canStart    = isImmediate ? !!config.subtopicId : config.subjectIds.length > 0

  function handleStart() {
    if (!canStart) return
    const duration = config.length === "custom" ? config.customMinutes : config.length
    if (isImmediate) {
      router.push(`/session/immediate-review?subtopic=${config.subtopicId}&duration=${duration}&count=${config.questionCount}`)
    }
  }

  return (
    <div className={cn("flex flex-col", "gap-8")}>
      <StudyModeSelector selected={config.mode} onSelect={setMode} />

      {isImmediate
        ? <ImmediateReviewSubtopicPicker subjects={subjects} topics={topics} subtopics={subtopics} value={config.subtopicId} onChange={setSubtopicId} />
        : <SubjectSelector subjects={subjects} selectedIds={config.subjectIds} onToggle={toggleSubject} />
      }
      {isImmediate && config.subtopicId && subtopicMax > 0 && (
        <ImmediateReviewQuestionSlider value={Math.min(config.questionCount, subtopicMax)} max={subtopicMax} onChange={setQuestionCount} />
      )}

      <InterleaveToggle enabled={config.interleave} onChange={setInterleave} />
      <ElaborativeToggle enabled={config.elaborativeInterrogation} onChange={setElaborativeInterrogation} />
      <SessionLengthPicker selected={config.length} onSelect={setLength} />

      <div className={cn("flex flex-col items-center", "gap-2")}>
        <Button type="button" size="lg" onClick={handleStart} disabled={!canStart}
          className={cn("w-full", "h-14", "text-base font-semibold")}
        >
          <Play className="size-4" />
          Start Session
        </Button>
        <p className="text-xs text-muted-foreground">
          Estimated focus intensity:{" "}
          <span className="font-medium text-foreground">{label}</span>
        </p>
      </div>
    </div>
  )
}
