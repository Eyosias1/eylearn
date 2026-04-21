# TechniqueEfficiency

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Tab 5 — Analytics]]

## What it renders
Ranked bar chart showing mastery gain per hour for each study mode the user has used. Bars sorted highest to lowest. AI insight shown below as a 1–2 sentence recommendation.

## Props
```ts
techniques: {
  mode: string             // e.g. "Spaced Repetition", "Feynman Technique"
  masteryGainPerHour: number
}[]
aiInsight: string          // e.g. "Spaced Repetition shows highest ROI..."
```

## Internal state
None — pure display component.

## Child components
- shadcn `Progress` — bar per technique

## Data source
- Mastery gain per hour computed per mode: (mastery delta) / (total hours in that mode)
- AI insight generated server-side from same data

## States
- Default: all used modes shown, sorted by efficiency
- Only one mode used: single bar shown, no ranking context
- No data yet: "Use multiple modes to compare their effectiveness"
