import { getSubjects } from '@/lib/actions/subjects'
import { getAllTopics } from '@/lib/actions/topics'
import { getAllSubtopics } from '@/lib/actions/subtopics'
import { QuestionBankShell } from '@/components/library/question-bank/QuestionBankShell'
import type { Topic } from '@/types/TopicType'
import type { Subtopic } from '@/types/SubtopicType'

export default async function QuestionBankPage() {
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
    <QuestionBankShell
      subjects={subjects}
      topicsBySubject={topicsBySubject}
      subtopicsByTopic={subtopicsByTopic}
    />
  )
}
