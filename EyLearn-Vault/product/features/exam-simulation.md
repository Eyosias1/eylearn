# Exam Simulation

**Type:** Study Session Mode
**Mode key:** `exam`

## What it does
Generates a personalized exam from the user's course notes and error history. All questions are shown at once. User navigates freely, answers in any order, and submits in one go. No feedback until submission — then AI grades everything in batch.

## Phase 1 — Setup
1. User selects topics and sets total time (e.g. 30 / 60 / 90 min)
2. AI generates N questions using three data sources:
   - Course notes (from [[note-ingestion]])
   - Weak topics and error history (from [[spaced-repetition]] and [[ai-grading]] reports)
   - Known confusions (from [[micro-reflection]] entries)
3. Question weighting: 60% from weak/red/yellow topics, 40% covering remaining material
4. User reviews question count and hits "Start Exam" — session locks from this point

## Phase 2 — The Exam
1. All questions shown at once, numbered
2. Single countdown timer for the full session
3. User navigates freely between questions (Q1 → Q4 → Q2, etc.)
4. User types answers into each question's answer field
5. Questions can be left blank and returned to
6. Timer hits 0 → auto-submit
7. User can submit early at any point

## Phase 3 — Results
1. All answers locked — no editing after submission
2. AI grades all answers in batch (same mechanism as [[ai-grading]])
3. Results shown:
   - Overall score
   - Per-question verdict + 1–2 sentence feedback
   - Topic breakdown — which areas scored well vs. poorly
   - Comparison to previous exam attempts on the same topics

## AI question generation prompt structure
```
COURSE MATERIAL: [user notes]
WEAK AREAS: [red/yellow topics from spaced repetition]
SPECIFIC ERRORS: [wrong/partial answers from session history]
KNOWN CONFUSIONS: [micro-reflection entries]

Generate [N] exam questions:
- 60% targeting weak areas, 40% covering remaining material
- Mix of recall and inference questions
- Do not reuse questions the user has seen verbatim
- Return as JSON: { id, question, topic, type: 'recall' | 'inference' }
```

## Inputs
- Selected topics
- Total session duration
- User's note content (via [[note-ingestion]])
- User's error and performance history (via [[spaced-repetition]], [[ai-grading]], [[micro-reflection]])

## Outputs
- Personalized question set (JSON)
- Per-question AI verdict + feedback
- Topic breakdown score
- Updated [[spaced-repetition]] schedule based on exam performance

## Edge cases
- No error history yet → AI generates questions from notes only, no weighting
- User submits with blank answers → blanks graded as Wrong
- Timer runs out mid-answer → current text saved, session auto-submits
- Not enough notes for a topic → that topic excluded from question generation, user notified

## Related
- [[active-recall]] — sequential Q&A mode; exam simulation reuses its AI grading mechanism
- [[note-ingestion]] — source material for question generation
- [[spaced-repetition]] — feeds weak topic data into question weighting; updated after exam
- [[ai-grading]] — batch grading call is identical
- [[micro-reflection]] — confusion entries used to generate distractor-style questions
- [[progress-dashboard]] — exam scores tracked over time
