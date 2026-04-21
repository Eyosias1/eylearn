# Mistake Review

**Type:** Behavior within [[active-recall]]

## What it does
Immediately before the final session summary, every question still rated Wrong is shown in read-only mode — question + correct answer side by side. No rating, no input. Pure re-exposure before the session closes.

## Flow
1. [[weak-spot-requeue]] completes
2. Any still-wrong questions shown read-only (question + answer)
3. User taps "Done" after each
4. Proceeds to session summary

## Outputs
- No rating or SR impact — purely re-exposure
- "Done" advances to summary

## Edge cases
- No wrong answers → mistake review skipped entirely
- More than 10 wrong answers → capped at 10, prioritized by topic health (reddest topics first)

## Related
- [[active-recall]] — the mode this lives in
- [[weak-spot-requeue]] — runs before mistake review
- [[micro-reflection]] — reflections visible alongside the read-only card
- [[spaced-repetition]] — not affected by mistake review
