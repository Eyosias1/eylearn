# Session Components Index

All components for the `/session` page. Plan each file before building.

## Shell
- `SessionShell` — top-level state machine (setup / session / summary)

## Setup
- `SessionSetup` — full setup screen
- `ModeCard` — individual mode option card
- `TopicPicker` — subject + topic multi-select
- `SessionLengthPicker` — 25 / 50 / custom duration buttons
- `ExamDurationPicker` — 30 / 60 / 90 min (exam mode only)
- `InterleaveToggle` — shown only when 2+ subjects selected
- `ElaborativeToggle` — shown only when Active Recall is selected

## Session (persistent)
- `SessionHeader` — progress bar, timer, subject label, exit button

## Active Recall
- `QuestionCard` — question text + subject badge
- `ConfidenceRating` — Low / Medium / High buttons
- `AnswerInput` — textarea + hint button + submit
- `AnswerReveal` — user answer + correct answer + rating buttons
- `MicroReflection` — "What did you confuse this with?" prompt
- `ElaborativePrompt` — follow-up why/how question + textarea + skip (elaborative toggle only)

## Blurting
- `BlurtingPrompt` — topic title + free recall textarea
- `BlurtingCompare` — side-by-side comparison with gap highlights

## Feynman
- `FeynmanPrompt` — concept name + explanation textarea
- `FeynmanFeedback` — three-category AI feedback (✅ ⚠️ ❌)

## Pre-Test
- Reuses `QuestionCard`, `AnswerInput`, `AnswerReveal` from Active Recall
- No confidence rating, no hint button

## Exam Simulation
- `ExamQuestionNav` — numbered nav bar (● answered / ○ unanswered)
- `ExamQuestionCard` — question text + answer textarea + prev/next buttons
- `ExamSubmitWarning` — 30s countdown banner (non-blocking, bottom of screen)
- `ExamConfirmDialog` — confirmation dialog before manual submit

## Overlays
- `GapPrompt` — 10s pause overlay with auto-countdown
- `SessionCheckpoint` — accuracy snapshot every 10 questions
- `InterleavePrompt` — subject switch notification

## End of Session
- `WeakSpotHeader` — "Re-queue — N questions to revisit" banner
- `MistakeReviewCard` — read-only question + answer + reflection
- `AIGradingLoader` — animated loading state with step descriptions
- `AIGradingResults` — patterns + calibration + per-answer override list
- `AIFeedbackCard` — individual answer row (verdict + feedback + override button)

## Summary
- `SessionSummary` — full results screen
- `TopicResultCard` — per-topic accuracy + health color + next review date
