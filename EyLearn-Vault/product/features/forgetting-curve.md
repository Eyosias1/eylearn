# Forgetting Curve Visualizer

**Type:** Progress & Tracking

## What it does
Shows a live graph of predicted memory retention per topic over time — based on Ebbinghaus's forgetting curve and actual review history. Makes the cost of not reviewing visible before it's too late.

## Inputs
- Last review date per topic
- Retention score from last session
- Spaced repetition interval history

## Outputs
- Line graph per topic showing retention % over time
- Current retention score marked on the curve
- Projected drop-off if user does not review
- "Review Now" prompt when retention predicted to fall below 50%

## Displayed on
- Topic detail view (individual curve per topic)
- [[progress-dashboard]] (summary curves for all at-risk topics)

## Edge cases
- Topic never reviewed → shows default steep forgetting curve as a warning
- Topic reviewed today → curve starts at 100% and projects forward
- Multiple topics at risk → highlights most urgent first

## Related
- [[spaced-repetition]] — interval history drives the curve
- [[progress-dashboard]] — curves shown in summary view
- [[ai-study-plan]] — topics near forgetting threshold scheduled first
