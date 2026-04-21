# Feynman Mode

**Type:** Study Session Mode
**Mode key:** `feynman`

## What it does
User selects a concept and types an explanation as if teaching it to a 5th grader. AI evaluates for clarity, completeness, and jargon — then returns specific feedback on gaps.

## Flow
1. Concept selected
2. Prompt: "Explain this as if teaching a 5th grader"
3. User types explanation (source material hidden)
4. Submit
5. AI returns feedback in three categories:
   - ✅ Explained well
   - ⚠️ Present but unclear or jargon-heavy
   - ❌ Key concepts missing entirely
6. User reviews gaps → option to re-attempt
7. [[spaced-repetition]] interval updated

## Behaviors active in this mode
- [[session-timer]] — Pomodoro + gap effect prompts

## Inputs
- Selected concept / topic
- User's written explanation

## Outputs
- Three-category AI feedback
- Option to re-attempt after reviewing gaps
- Updated [[spaced-repetition]] schedule

## Edge cases
- Very short explanation → AI asks clarifying questions before evaluating
- Verbatim copy of source material → flagged as not genuine, user prompted to rephrase

## Related
- [[blurting-mode]] — similar free-recall, but no AI evaluation of explanation quality
- [[active-recall]] — question-driven alternative
- [[spaced-repetition]] — drives next review dates
- [[note-ingestion]] — source material used for AI evaluation
