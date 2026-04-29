import type { CalendarEventInsert } from "@/types/studyplan"

function extractField(block: string, field: string): string | null {
  const match = block.match(new RegExp(`${field}[^:]*:([^\r\n]+)`))
  return match ? match[1].trim() : null
}

function parseDateTime(raw: string): { date: string; time: string; hasTime: boolean } {
  // DATE-TIME: 20260505T100000Z or 20260505T100000
  // DATE only:  20260505
  const clean = raw.replace("Z", "").replace(/[TZ]/g, "")
  if (raw.includes("T")) {
    const date = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`
    const time = `${raw.slice(9, 11)}:${raw.slice(11, 13)}`
    return { date, time, hasTime: true }
  }
  const date = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`
  return { date, time: "00:00", hasTime: false }
}

function durationBetween(start: string, end: string): number {
  const [sh, sm] = start.slice(9, 15).split(/(.{2})/).filter(Boolean).map(Number)
  const [eh, em] = end.slice(9, 15).split(/(.{2})/).filter(Boolean).map(Number)
  const startMins = (sh ?? 0) * 60 + (sm ?? 0)
  const endMins   = (eh ?? 0) * 60 + (em ?? 0)
  return Math.max(endMins - startMins, 0)
}

export function parseIcs(raw: string): CalendarEventInsert[] {
  const events: CalendarEventInsert[] = []
  const blocks = raw.split("BEGIN:VEVENT").slice(1)

  blocks.forEach(block => {
    const dtstart = extractField(block, "DTSTART")
    const dtend   = extractField(block, "DTEND")
    const summary = extractField(block, "SUMMARY")
    const uid     = extractField(block, "UID")

    if (!dtstart || !summary) return

    const start = parseDateTime(dtstart)
    if (!start.hasTime) return // skip all-day events

    const duration = dtend ? durationBetween(dtstart, dtend) : 60

    events.push({
      title:           summary,
      scheduledDate:   start.date,
      startTime:       start.time,
      durationMinutes: duration || 60,
      source:          "ics",
      externalId:      uid ?? undefined,
    })
  })

  return events
}
