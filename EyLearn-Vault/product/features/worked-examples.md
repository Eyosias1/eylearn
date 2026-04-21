# Worked Examples

**Type:** Study Session Mode
**Mode key:** `worked_examples`

## What it does
Shows a fully solved example extracted from your notes — a derivation, proof, case study, or step-by-step solution. The user studies it, then the solution is hidden and they reproduce the reasoning chain from memory. AI compares their reproduction against the original and flags missing or wrong steps.

Best suited for procedural knowledge: how to solve a class of problem, not just what the answer is.

## Flow
1. App detects worked examples in selected notes (solved problems, derivations, case studies)
2. Session setup shows mode card — greyed out with "No worked examples found" if none detected
3. Example shown in full — user studies at their own pace, no time limit
4. User taps "Hide & Reproduce" → solution is hidden
5. User types their reproduction of the reasoning chain step by step
6. Submit → AI compares against original:
   - Steps reproduced correctly
   - Steps missed or incomplete
   - Steps with wrong reasoning
7. Completeness score shown (e.g. 7 / 9 steps)
8. User self-rates: Weak / OK / Strong → updates [[spaced-repetition]]

## Inputs
- Selected subjects / topics
- Notes must contain worked examples (AI detects these during [[note-ingestion]])
- Session length (user-defined or AI-recommended)

## Outputs
- Per-step comparison (correct / missed / wrong)
- Completeness score
- User self-rating (Weak / OK / Strong)
- Updated [[spaced-repetition]] schedule

## Edge cases
- No worked examples in notes → mode card greyed out in session setup
- Blank reproduction → counts as Weak, full solution re-shown
- User reproduces steps in different order → AI evaluates by meaning, not sequence
- Very short reproduction (< 20 words) → AI prompts "Try to be more detailed" before evaluating

## Related
- [[note-ingestion]] — detects and tags worked examples during upload
- [[blurting-mode]] — similar reproduce-then-compare mechanic, but for declarative knowledge
- [[active-recall]] — follows worked examples in the learning loop
- [[spaced-repetition]] — drives next review dates
- [[ai-grading]] — step-level comparison and feedback
