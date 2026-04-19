# Data Model

---

## Entities Overview

```
User
 └── Subject (many)
      └── Topic (many)
           └── Question (many)
           └── TopicSession (many)

StudySession
 └── SessionQuestion (many)

StudyPlan
 └── ScheduledSession (many)

EnergyLog (for peak window detection)
```

---

## User

Stores authentication and profile data.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `email` | string | Unique |
| `name` | string | |
| `peak_window_start` | time | e.g., "06:00" — set after energy tracking |
| `peak_window_end` | time | e.g., "08:00" |
| `created_at` | timestamp | |

---

## Subject

A top-level container (e.g., "Calculus", "Biology").

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → User |
| `name` | string | e.g., "Biomedical Statistics" |
| `exam_date` | date | Optional — used by study plan builder |
| `created_at` | timestamp | |

---

## Topic

A concept within a subject (e.g., "Active Recall", "Derivatives").

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `subject_id` | uuid | FK → Subject |
| `name` | string | |
| `source_material` | text | Raw notes/content the user inputted |
| `health` | enum | `green` / `yellow` / `red` |
| `retention_score` | float | 0–100, updated after each session |
| `last_reviewed_at` | timestamp | |
| `next_review_at` | timestamp | Calculated by spaced repetition logic |
| `created_at` | timestamp | |

---

## Question

An active recall question generated from a topic.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `topic_id` | uuid | FK → Topic |
| `text` | string | The question |
| `type` | enum | `definition` / `application` / `comparison` / `process` |
| `concept` | string | The underlying concept being tested |
| `source` | enum | `ai_generated` / `user_created` |
| `created_at` | timestamp | |

---

## StudySession

A single study session the user completed.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → User |
| `mode` | enum | `active_recall` / `blurting` / `feynman` / `pretest` |
| `subjects` | uuid[] | Subjects included in the session |
| `started_at` | timestamp | |
| `ended_at` | timestamp | |
| `duration_minutes` | int | |
| `gap_prompts_fired` | int | Number of gap effect prompts during session |

---

## SessionQuestion

One question attempt within a session.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `session_id` | uuid | FK → StudySession |
| `question_id` | uuid | FK → Question |
| `user_answer` | text | What the user typed |
| `rating` | enum | `correct` / `partial` / `wrong` |
| `time_spent_seconds` | int | |
| `ai_feedback` | jsonb | For blurting/feynman modes |

---

## TopicSession

Tracks per-topic performance within a session (used to update spaced repetition schedule).

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `session_id` | uuid | FK → StudySession |
| `topic_id` | uuid | FK → Topic |
| `questions_attempted` | int | |
| `correct` | int | |
| `partial` | int | |
| `wrong` | int | |
| `new_retention_score` | float | Calculated post-session |
| `next_review_at` | timestamp | Updated by spaced rep logic |

---

## StudyPlan

An AI-generated study plan for a user.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → User |
| `generated_at` | timestamp | |
| `valid_until` | date | Plan covers up to this date |
| `is_active` | boolean | Only one active plan at a time |

---

## ScheduledSession

An individual session within a study plan.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `plan_id` | uuid | FK → StudyPlan |
| `day` | date | |
| `time` | time | Recommended start time |
| `duration_minutes` | int | |
| `subjects` | uuid[] | FK → Subject |
| `focus_topics` | uuid[] | FK → Topic |
| `is_completed` | boolean | |

---

## EnergyLog

Used during onboarding week to identify peak productivity window.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → User |
| `logged_at` | timestamp | |
| `hour_of_day` | int | 0–23 |
| `energy_level` | int | 1–5 scale |

---

## Key Relationships Summary

```
User → many Subjects → many Topics → many Questions
User → many StudySessions → many SessionQuestions
Topic → many TopicSessions (tracks spaced rep per topic)
User → StudyPlan → many ScheduledSessions
User → many EnergyLogs (onboarding only)
```
