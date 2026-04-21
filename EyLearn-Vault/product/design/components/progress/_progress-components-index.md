# Progress Components Index

All components for the `/progress` page. Plan each file before building.
Wireframe: [[progress-dashboard]]

## Pinned Header
- `DueTodayHeader` — topic pills with urgency badges + Start Review Session CTA

## SR Tabs
- `LeitnerBoard` — 5 boxes with card counts, colored dots per subject, click-to-filter
- `RetrospectiveGrid` — 30-day topic × day dot grid, sorted weakest first
- `ProspectiveCalendar` — monthly calendar with due date dots + day detail panel
- `DueTodayTable` — full table with checkboxes, bulk select, confidence dot history

## Analytics Tab
- `MasteryHeatmap` — GitHub-style yearly grid (intensity × success rate)
- `EvidenceOfWork` — consecutive days + verified badge
- `MasteryBySubject` — progress bars per subject sorted by mastery %
- `RetentionCurves` — Ebbinghaus theoretical vs actual retention line chart
- `TechniqueEfficiency` — mastery gain per hour per mode, ranked bars + AI insight

## Always Visible
- `SessionHistoryTable` — past sessions log, click row for detail modal
