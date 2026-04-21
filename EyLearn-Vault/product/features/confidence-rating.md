# Confidence Rating

**Type:** Behavior within [[active-recall]]

## What it does
Before typing an answer, the user rates how confident they are (Low / Medium / High). At the end of the session, [[ai-grading]] compares pre-answer confidence against actual performance across all questions to produce a calibration report.

## Per-Question Flow
1. Question shown
2. User picks confidence: Low / Medium / High
3. User types and submits answer
4. User self-rates: Correct / Partial / Wrong
5. Confidence + rating stored, compared at end of session

## End-of-Session (via [[ai-grading]])
- Calibration report generated across all questions
- Overconfident moments flagged: High confidence + Wrong/Partial
- Underconfident moments flagged: Low confidence + Correct
- Pattern: "You were overconfident on process-type questions 4 times"
- Overconfident wrong answers prioritized in [[spaced-repetition]]

## Edge cases
- User skips confidence rating → not penalized, calibration data not recorded for that question

## Related
- [[active-recall]] — the mode this lives in
- [[ai-grading]] — produces the calibration report at end of session
- [[spaced-repetition]] — overconfident wrong answers reviewed sooner
- [[progress-dashboard]] — calibration score surfaced per topic
