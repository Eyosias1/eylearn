# Spaced Repetition System

**Type:** Session Infrastructure (all modes)

## What it does
Tracks how well the user knows each topic based on session performance and schedules the next review at the optimal interval — just before the brain would forget it.

## Logic
- Correct → interval doubles (1d → 2d → 4d → 8d)
- Partial → interval stays the same
- Wrong → interval resets to 1 day

## Visual — 4 Sub-Method Views

All four views live inside the **Spaced Repetition Panel** on [[progress-dashboard]], grouped as tabs. A pinned "Due Today" summary sits above the tabs as the primary action.

| Tab | View | What it shows |
|---|---|---|
| Leitner | 5-box card distribution | Colored dots per card across 5 boxes |
| Retrospective | Topic grid by date | 🟢🟡🔴 recall quality per topic over time |
| Prospective | Calendar | Upcoming review dates per topic |
| Due Today | Actionable list | Cards due now → launches review session |

See [[progress-dashboard]] wireframe for full layout and data requirements.

- Forgetting curve per topic → [[forgetting-curve]]

## Updated by
- [[active-recall]] — per-question self-rating
- [[blurting-mode]] — overall session rating (Strong / OK / Weak)
- [[feynman-mode]] — AI evaluation outcome
- [[weak-spot-requeue]] — second-pass ratings recorded separately

## Related
- [[forgetting-curve]] — visualizes the projected decay between reviews
- [[progress-dashboard]] — surfaces overdue topics
- [[ai-study-plan]] — uses SR schedule to prioritize sessions
