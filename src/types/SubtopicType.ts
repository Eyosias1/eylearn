export type Subtopic = {
  id:               string
  topic_id:         string
  name:             string
  leitner_box:      number | null
  leitner_active:   boolean
  next_review_date: string | null
  last_reviewed_at: string | null
  created_at:       string
}
