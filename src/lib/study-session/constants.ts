import type { StudyModeConfig } from "@/types/StudySessionType"

export const studyModes: StudyModeConfig[] = [
  {
    id: "pre-test",
    label: "Pre-Test",
    description: "Baseline your knowledge with a diagnostic test before you start studying.",
    iconName: "ClipboardCheck",
  },
  {
    id: "immediate-review",
    label: "Immediate Review",
    description: "Answer all questions from your last session while the material is still fresh.",
    iconName: "RefreshCw",
  },
  {
    id: "blurting",
    label: "Blurting Mode",
    description: "Write down everything you remember about a topic in a timed time frame.",
    iconName: "PenLine",
  },
  {
    id: "feynman",
    label: "Feynman Mode",
    description: "Explain complex concepts as if you were teaching a beginner.",
    iconName: "UsersRound",
  },
  {
    id: "exam-simulation",
    label: "Exam Simulation",
    description: "Simulate timed exam conditions to practise under pressure.",
    iconName: "Timer",
  },
  {
    id: "end-of-day-review",
    label: "End of Day Review",
    description: "Consolidate everything you learned today before you sleep.",
    iconName: "MoonStar",
  },
  {
    id: "spaced-review",
    label: "Spaced Review",
    description: "Review cards scheduled by the spaced repetition algorithm.",
    iconName: "CalendarClock",
  },
]
