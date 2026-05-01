import type { StudyModeConfig } from "@/types/StudySessionType"

export const studyModes: StudyModeConfig[] = [
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
    id: "pre-test",
    label: "Pre-Test",
    description: "Baseline your knowledge with a diagnostic test before you start studying.",
    iconName: "ClipboardCheck",
  },
  {
    id: "exam-simulation",
    label: "Exam Simulation",
    description: "Simulate timed exam conditions to practise under pressure.",
    iconName: "Timer",
  },
]
