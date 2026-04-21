# Socratic Dialogue

**Type:** Study Session Mode (Future)
**Mode key:** `socratic_dialogue`

## What it does
AI plays a curious student and asks follow-up questions while the user explains a concept. Unlike Feynman (which tests clarity of explanation), Socratic tests depth under pressure — the AI keeps probing with "but why?", "what if X were different?", "how does that connect to Y?".

## Flow
1. User selects a concept from their notes
2. User gives an initial explanation (free text)
3. AI responds with a follow-up question based on what was said
4. Back-and-forth continues for 3–5 rounds
5. AI ends the dialogue and delivers feedback:
   - What the user explained well
   - Where reasoning broke down under questioning
   - Concepts the user couldn't defend
6. User self-rates: Weak / OK / Strong → updates spaced repetition

## Difference from Feynman
- **Feynman** — one-shot explanation, AI rates clarity and completeness
- **Socratic** — multi-turn dialogue, AI tests depth by probing weak points

## Why it's valuable
- Forces you to defend reasoning, not just recite it
- Surfaces the difference between "I know this" and "I can explain this under pressure"
- High value for subjects where reasoning matters more than facts (philosophy, law, clinical reasoning)

## Inputs
- Selected concept from notes
- Dialogue depth setting (3 / 5 / 7 rounds)

## Outputs
- Dialogue transcript
- AI feedback on reasoning depth
- Concepts that broke down under questioning → flagged for spaced repetition
- Self-rating → updates spaced repetition

## Edge cases
- User gives very short answers → AI prompts "Can you say more about that?"
- User goes off-topic → AI redirects back to the concept
- User asks the AI for the answer → AI stays in character, redirects with another question

## Related
- [[feynman-mode]] — one-shot explanation; Socratic is the multi-turn version
- [[active-recall]] — factual recall; Socratic tests reasoning
- [[spaced-repetition]] — concepts that broke down get re-queued sooner
