import { getPlanEvents, getCalendarEvents } from "@/lib/plan/studyplan"
import { getRetroTopics } from "@/lib/plan/session-history"
import { PlanShell } from "@/components/plan/PlanShell"

export default async function StudyPlanPage() {
  const [events, calendarEvents, topics] = await Promise.all([
    getPlanEvents(),
    getCalendarEvents(),
    getRetroTopics(),
  ])

  return (
    <div className="h-full w-full flex flex-col">
      <PlanShell events={events} calendarEvents={calendarEvents} topics={topics} />
    </div>
  )
}
