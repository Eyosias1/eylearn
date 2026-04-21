# DueTodayHeader

Part of: [[progress-dashboard]]
Wireframe: [[progress-dashboard#Pinned Header — Due Today]]

## What it renders
Pinned banner always visible above all tabs on the Progress page. Shows count of cards due today, topic pills with urgency badges, and a Start Review Session CTA.

## Props
```ts
dueCount: number
topics: {
  name: string
  subjectColor: string
  isLate: boolean
}[]
onStartReview: () => void   // launches active recall pre-loaded with due cards
```

## Internal state
None — pure display component.

## Child components
- `TopicPill` — colored dot + topic name + optional LATE badge

## Data source
- SR cards due today, overdue status per card

## States
- Default: count + topic pills + CTA
- Nothing due: "You're all caught up · Next review: [date]" — CTA hidden
- All overdue: all pills show LATE badge, CTA uses urgent color
