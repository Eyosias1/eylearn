import { getPlanEvents, getCalendarEvents } from "@/lib/studyplan/studyplan"
import { PlanCalendar } from "@/components/studyplan/views/plan-calendar"

export default async function StudyPlanPage() {
  const [events, calendarEvents] = await Promise.all([
    getPlanEvents(),
    getCalendarEvents(),
  ])

  return (
    <div className="h-full flex flex-col">
      <PlanCalendar events={events} calendarEvents={calendarEvents} />
    </div>
  )
}
