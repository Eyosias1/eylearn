# SessionIntentions

Part of: [[study-plan]]
Wireframe: [[study-plan#Section 4 — Session Intentions]]

## What it renders
Small panel showing the current session's stated intention and an input to set the next one. Intentions are shown at session start as a focus reminder and saved to session history.

## Props
```ts
currentIntention: string | null
onEditCurrent: (value: string) => void
onAddNext: (value: string) => void
```

## Internal state
- `isEditingCurrent: boolean` — toggles current intention between display and edit mode
- `nextIntentionDraft: string` — controlled input value for new intention

## Child components
- shadcn `Textarea` — editable intention text
- shadcn `Button` — save / confirm actions

## Data source
- Current and upcoming session intentions per user, stored in session records

## States
- Intention set: shown in display card with edit pencil icon
- Editing: textarea replaces display card
- No intention: "Tap to set a focus for your next session" placeholder
- Next intention input: visible below current, collapses after submission
