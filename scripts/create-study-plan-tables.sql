-- ============================================================
-- CALENDAR EVENTS
-- The user's real calendar — imported from ICS, Google, Apple.
-- Used to find free slots for scheduling study.
-- ============================================================
CREATE TABLE IF NOT EXISTS calendar_events (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID        REFERENCES auth.users NOT NULL,
  title            TEXT        NOT NULL,
  scheduled_date   DATE        NOT NULL,
  start_time       TIME        NOT NULL,
  duration_minutes INTEGER     NOT NULL,
  source           TEXT        NOT NULL DEFAULT 'manual'
                               CHECK (source IN ('manual', 'ics', 'google', 'apple')),
  external_id      TEXT        UNIQUE,   -- UID from ICS/calendar API, prevents duplicates on re-import
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own calendar events"
  ON calendar_events FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ============================================================
-- SCHEDULED STUDY
-- The study plan — what the app (or AI) schedules into free
-- slots. This is what the calendar page displays.
-- ============================================================
CREATE TABLE IF NOT EXISTS scheduled_study (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID        REFERENCES auth.users NOT NULL,
  subtopic_id      UUID        REFERENCES subtopics(id) ON DELETE CASCADE NOT NULL,
  scheduled_date   DATE        NOT NULL,
  start_time       TIME        NOT NULL,
  duration_minutes INTEGER     NOT NULL DEFAULT 30,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE scheduled_study ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own scheduled study"
  ON scheduled_study FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_scheduled_study_user_date
  ON scheduled_study (user_id, scheduled_date);


-- ============================================================
-- STUDY SESSIONS  (future — active recall metrics)
-- Created when the user sits down and actually studies.
-- Records what happened: time spent, cards reviewed, rating.
-- Links back to scheduled_study if the session was planned.
-- ============================================================
CREATE TABLE IF NOT EXISTS study_sessions (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID        REFERENCES auth.users NOT NULL,
  subtopic_id      UUID        REFERENCES subtopics(id) ON DELETE CASCADE NOT NULL,
  scheduled_id     UUID        REFERENCES scheduled_study(id) ON DELETE SET NULL,
  started_at       TIMESTAMPTZ NOT NULL,
  ended_at         TIMESTAMPTZ,
  duration_minutes INTEGER,            -- actual time, not planned
  rating           TEXT        CHECK (rating IN ('strong', 'partial', 'poor')),
  cards_reviewed   INTEGER,
  cards_correct    INTEGER,
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own study sessions"
  ON study_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
