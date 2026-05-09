import { getPlanEvents, getCalendarEvents } from "@/lib/studyplan/studyplan"
import { getRetroTopics } from "@/lib/session-history"
import { StudyPlanShell } from "@/components/studyplan/StudyPlanShell"

export default async function StudyPlanPage() {
  const [events, calendarEvents, topics] = await Promise.all([
    getPlanEvents(),
    getCalendarEvents(),
    getRetroTopics(),
  ])

  return (
    <div className="h-full w-full flex flex-col">
      <StudyPlanShell events={events} calendarEvents={calendarEvents} topics={topics} />
    </div>
  )
}
