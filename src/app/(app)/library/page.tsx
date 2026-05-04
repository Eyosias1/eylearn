import { getSubjects } from "@/lib/actions/subjects"
import { getAllTopics } from "@/lib/actions/topics"
import { getAllSubtopics } from "@/lib/actions/subtopics"
import { LibraryShell } from "@/components/library/LibraryShell"
import { cn } from "@/lib/utils"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

export default async function LibraryPage() {
  const [subjects, topics, subtopics] = await Promise.all([
    getSubjects(), getAllTopics(), getAllSubtopics(),
  ])

  const topicsBySubject = subjects.reduce<Record<string, Topic[]>>((acc, s) => {
    acc[s.id] = topics.filter((t) => t.subject_id === s.id)
    return acc
  }, {})

  const subtopicsByTopic = topics.reduce<Record<string, Subtopic[]>>((acc, t) => {
    acc[t.id] = subtopics.filter((s) => s.topic_id === t.id)
    return acc
  }, {})

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
        <h1 className="text-2xl font-bold">Library</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your subjects, questions, and exam sets in one place.
        </p>
      </div>
      <LibraryShell
        subjects={subjects}
        topicsBySubject={topicsBySubject}
        subtopicsByTopic={subtopicsByTopic}
      />
    </div>
  )
}
