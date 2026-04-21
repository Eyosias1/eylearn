# Pre-Test Engine

**Type:** Study Session Mode
**Mode key:** `pretest`

## What it does
Before studying new material, the app quizzes the user on the upcoming topic. They are expected to get most questions wrong — the point is to prime the brain for correction (hypercorrection effect).

## Flow
1. User selects topic for upcoming session
2. AI generates questions from that topic's material
3. Questions presented — user answers (same flow as [[active-recall]])
4. Wrong answers flagged and surfaced first in the actual study session
5. Pre-test score saved as baseline to measure improvement

## Behaviors active in this mode
- [[session-timer]] — Pomodoro + gap effect prompts
- [[interleaved-practice]] — if multiple subjects selected

## Inputs
- Upcoming topic / subject
- Questions from that topic's material

## Outputs
- Flagged wrong answers → surfaced first in the subsequent [[active-recall]] session
- Pre-test score saved as baseline

## Edge cases
- User hasn't added material for the topic yet → prompt to add notes first via [[note-ingestion]]

## Related
- [[active-recall]] — the session that follows pre-test
- [[note-ingestion]] — source material needed before pre-test can run
- [[spaced-repetition]] — pre-test score used as baseline, not for SR scheduling
