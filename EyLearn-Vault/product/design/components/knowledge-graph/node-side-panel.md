# NodeSidePanel

Part of: [[knowledge-graph]]
Wireframe: [[knowledge-graph#Node Side Panel]]

## What it renders
Right-side panel that opens when a node is clicked. Shows topic details: name, subject, mastery %, last reviewed, Leitner box, connected topics list, and a Start Session CTA.

## Props
```ts
topic: {
  id: string
  name: string
  subject: string
  masteryPercent: number
  lastReviewed: string
  leitnerBox: number
  connectedTopics: { id: string; name: string }[]
} | null
onClose: () => void
onConnectedTopicClick: (id: string) => void   // selects that node in canvas
onStartSession: (topicId: string) => void      // routes to /session with topic pre-filled
```

## Internal state
None — pure display component.

## Child components
- shadcn `Progress` — mastery % bar
- shadcn `Button` — Start Session CTA
- shadcn `Badge` — subject tag

## States
- `null` topic: panel hidden (zero width)
- Topic selected: panel slides in from right
- Connected topic clicked: panel updates to show that topic's details
