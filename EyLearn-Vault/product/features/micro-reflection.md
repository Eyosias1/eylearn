# Micro-Reflection Prompt

**Type:** Behavior within [[active-recall]]

## What it does
After any question rated Wrong, the user sees a one-line prompt: "What did you confuse this with?" They type a short answer or skip. Forces active error analysis rather than passive exposure to the correct answer.

## Flow
1. User rates question as Wrong
2. Prompt appears: "What did you confuse this with?"
3. User types a short reflection or skips
4. Reflection saved, session continues

## Outputs
- Reflection saved alongside session question record
- Patterns surfaced in session summary ("You confused X with Y twice")
- No impact on [[spaced-repetition]] schedule — purely reflective

## Edge cases
- User skips → no penalty, question proceeds normally
- User wants to reflect on a Partial → not auto-prompted, optional "reflect" button available

## Related
- [[active-recall]] — the mode this lives in
- [[mistake-review]] — read-only re-exposure at session end
- [[weak-spot-requeue]] — Wrong answers re-queued regardless of reflection
