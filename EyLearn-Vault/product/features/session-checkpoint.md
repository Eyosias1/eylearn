# Session Checkpoint

**Type:** Behavior within [[active-recall]]

## What it does
Every 10 questions the session pauses briefly to show a lightweight accuracy snapshot per topic. The user can continue or end the session early.

## Flow
1. Every 10 questions, checkpoint card appears
2. Shows: topic name + correct/partial/wrong counts so far
3. User picks: "Keep going" or "End session"
4. If ended early, [[spaced-repetition]] updated based on questions completed

## Edge cases
- Fewer than 10 questions total → no checkpoint fires, goes straight to summary
- Checkpoint fires mid re-queue → skipped ([[weak-spot-requeue]] is treated as one unit)

## Related
- [[active-recall]] — the mode this lives in
- [[weak-spot-requeue]] — checkpoint skipped during re-queue pass
- [[spaced-repetition]] — partial session still updates intervals
