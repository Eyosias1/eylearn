# Weak Spot Re-Queue

**Type:** Behavior within [[active-recall]]

## What it does
Any question rated Wrong or Partial is automatically added to a re-queue that runs at the end of the session. The user gets one more pass before the session ends.

## Flow
1. Main session pass completes
2. "5 questions to revisit" shown (if any Wrong/Partial exist)
3. Re-queue runs — same flow as main session
4. Second-pass ratings recorded separately
5. SR interval uses combined result: first-pass Wrong + second-pass Correct = Partial

## Outputs
- Second-pass ratings recorded separately
- Session summary shows first-pass vs. second-pass accuracy
- [[spaced-repetition]] updated using combined rating logic

## Edge cases
- Re-queue empty (perfect session) → skip directly to summary
- User exits during re-queue → first-pass ratings used for SR, re-queue progress lost

## Related
- [[active-recall]] — the mode this lives in
- [[mistake-review]] — after re-queue, still-wrong answers shown read-only
- [[session-checkpoint]] — checkpoint does not fire inside re-queue
- [[spaced-repetition]] — second-pass ratings feed SR intervals
