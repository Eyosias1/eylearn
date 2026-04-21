# Elaborative Interrogation

**Type:** Behavior (toggle within [[active-recall]])

## What it does
After the user answers a question, the app asks one follow-up causal question — "Why does this work?" or "How does this connect to X?" The user generates an explanation. AI evaluates both the original answer and the causal explanation together.

Forces understanding, not just memory. A user who recalls the correct answer but can't explain why it's true is flagged as shallowly encoded.

## Per-Question Flow (when toggle is ON)
1. Question shown
2. User picks confidence → [[confidence-rating]]
3. User types answer
4. Submit
5. Correct answer revealed
6. Follow-up prompt shown:
   - "Why does this work?"
   - "How does this connect to [related concept from notes]?"
   - "What would happen if this were not true?"
7. User types causal explanation
8. Submit
9. User self-rates: Correct / Partial / Wrong
10. Next question

## How the follow-up is generated
AI picks the follow-up type based on the question:
- Definitional question → "Why is this true?"
- Process question → "How does each step cause the next?"
- Comparison question → "What makes these two different at a fundamental level?"

The related concept in "How does this connect to X?" is pulled from the user's own notes — not generic knowledge.

## How AI evaluates it
Both the recall answer and the causal explanation are sent together in the end-of-session [[ai-grading]] batch. AI assesses:
- Is the recall answer correct?
- Does the causal explanation show genuine understanding or surface-level rephrasing?
- Depth rating: Surface / Functional / Deep

A correct recall answer with a shallow explanation is flagged — the user knows the what but not the why.

## When to use
- Studying for application or inference exams, not definition recall
- Topics the user keeps getting right but still performs poorly on in practice
- When the user has time — this adds ~30–60 seconds per question

## Toggle behaviour
- OFF by default
- User turns it on in session setup
- Applies to every question in that session
- Cannot be toggled mid-session

## Inputs
- User's answer to the original question
- User's causal explanation
- Related concepts from notes (for "How does this connect to X?" prompts)

## Outputs
- Depth rating per question (Surface / Functional / Deep)
- Included in [[ai-grading]] batch report
- Shallow-but-correct answers flagged in calibration report
- Updated [[spaced-repetition]] schedule (shallow answers treated as Partial)

## Edge cases
- User skips the follow-up (blank) → depth rated Surface, treated as Partial for spaced repetition
- Causal explanation is a verbatim restatement of the answer → flagged as Surface
- Question type has no clear causal follow-up → AI defaults to "What would break if this were false?"

## Related
- [[active-recall]] — this behavior lives inside active recall sessions
- [[ai-grading]] — causal explanation included in the batch grading call
- [[confidence-rating]] — combined with depth rating for calibration report
- [[feynman-mode]] — similar depth focus but at concept level, not question level
- [[spaced-repetition]] — shallow answers scheduled sooner for review
