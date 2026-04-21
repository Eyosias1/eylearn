# Hint Request with Penalty

**Type:** Behavior within [[active-recall]]

## What it does
User can request a hint before submitting. Requesting a hint auto-caps the question rating at Partial — no exceptions — even if the user then gives a perfect answer.

## Flow
1. Question shown
2. User can tap "Hint" before submitting
3. First sentence of source material for that concept revealed
4. Question flagged as hint-assisted
5. Rating locked to maximum of Partial

## Edge cases
- Hint requested + blank submission → still counts as Wrong (hint penalty doesn't override blank penalty)

## Related
- [[active-recall]] — the mode this lives in
- [[spaced-repetition]] — Partial rating means interval stays the same
- [[confidence-rating]] — hint request likely correlates with Low confidence
