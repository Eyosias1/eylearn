import { getSubjects } from "@/lib/actions/subjects"
import { getAllTopics } from "@/lib/actions/topics"
import { getAllSubtopics } from "@/lib/actions/subtopics"
import { getQuestionCountsBySubtopicIds } from "@/lib/actions/questions"
import { getDueCards } from "@/lib/mock/progress"
import { SessionConfigForm } from "@/components/session/config/SessionConfigForm"
import { DueTodayHeaderClient } from "@/components/dashboard/progress-interactive"
import { cn } from "@/lib/utils"

export default async function SessionPage() {
  const [subjects, topics, subtopics, dueCards] = await Promise.all([
    getSubjects(),
    getAllTopics(),
    getAllSubtopics(),
    getDueCards(),
  ])
  const subtopicQuestionCounts = await getQuestionCountsBySubtopicIds(subtopics.map(s => s.id))

  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // sizing
      "w-full max-w-7xl",
      // spacing
      "mx-auto gap-6",
    )}>
      <div>
        <h1 className="text-2xl font-bold">Start a session</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your cognitive sanctuary. Choose your study mode and topics to optimise your deep work session.
        </p>
      </div>
      <DueTodayHeaderClient cards={dueCards} />
      <SessionConfigForm subjects={subjects} topics={topics} subtopics={subtopics} subtopicQuestionCounts={subtopicQuestionCounts} />
    </div>
  )
}
