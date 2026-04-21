# Case-Based Learning

**Type:** Study Session Mode (Future)
**Mode key:** `case_based`

## What it does
AI reads the user's notes, identifies key concepts and the domain, then generates a realistic scenario that requires applying those concepts to solve a problem. Works for any subject — medicine, law, history, CS, economics. User reasons through the case in free text. AI evaluates the reasoning process, not just facts recalled.

## How AI generates cases from any notes

AI extracts:
- Key concepts and their relationships
- Domain (medicine, law, history, CS, economics, etc.)
- Type of knowledge (causal, procedural, definitional)

Then wraps concepts in a plausible scenario:

| Notes contain | AI generates |
|---|---|
| Beta blockers mechanism | "65-year-old hypertensive patient with asthma presents to ED..." |
| WWI causes | "You are a British advisor in July 1914. Germany has just declared..." |
| Binary search | "Your app has 10M users. The search feature is timing out at scale..." |
| Supply and demand | "A drought destroys 40% of midwest wheat crops. Predict what happens..." |

## Flow
1. User selects topic / notes
2. AI generates a scenario + 1–3 targeted questions
3. User reads scenario, can ask one clarifying question
4. User types their reasoning and answer
5. AI evaluates:
   - Concepts applied correctly
   - Concepts missed or misapplied
   - Whether the reasoning chain was sound
   - What the ideal response would add
6. User self-rates: Weak / OK / Strong → updates spaced repetition

## Why it's valuable
- Forces application of knowledge in context, not just recall of facts
- Unique — no competitor does cross-domain case generation from personal notes
- Extremely high value for professional subjects (medicine, law, MBA, engineering)
- Tests whether you can *use* knowledge, not just remember it

## Inputs
- Selected notes / topics
- Case difficulty (Straightforward / Complex / Multi-concept)

## Outputs
- AI-generated case + questions
- User reasoning response
- AI evaluation (concepts applied / missed / misapplied)
- Self-rating → updates spaced repetition

## Edge cases
- Notes too short or lacking relationships → AI flags "Not enough context to generate a case"
- User answer too short → AI prompts "Walk me through your reasoning"
- Domain is abstract (pure math, philosophy) → AI generates a thought experiment instead of a scenario

## Related
- [[note-ingestion]] — concept and relationship extraction happens at ingestion
- [[active-recall]] — recall of facts; case-based tests application of facts
- [[feynman-mode]] — explanation; case-based tests problem-solving
- [[ai-grading]] — reasoning evaluation reuses grading infrastructure
- [[spaced-repetition]] — concepts missed in cases re-queued sooner
