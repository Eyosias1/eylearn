import { notFound } from "next/navigation"
import { getTopicById } from "@/lib/actions/topics"
import { getSubjects } from "@/lib/actions/subjects"
import { getAllSubtopics } from "@/lib/actions/subtopics"
import { getQuestionsByTopic } from "@/lib/actions/questions"
import { TopicQuestionsShell } from "@/components/library/question-bank/TopicQuestionsShell"

type Props = { params: Promise<{ topicId: string }> }

export default async function TopicQuestionsPage({ params }: Props) {
  const { topicId } = await params
  const [topic, subjects, subtopics, questions] = await Promise.all([
    getTopicById(topicId),
    getSubjects(),
    getAllSubtopics(),
    getQuestionsByTopic(topicId),
  ])

  if (!topic) notFound()

  const subject = subjects.find((s) => s.id === topic.subject_id)
  if (!subject) notFound()

  const topicSubtopics = subtopics.filter((s) => s.topic_id === topicId)

  return (
    <TopicQuestionsShell
      topic={topic}
      subject={subject}
      subtopics={topicSubtopics}
      questions={questions}
    />
  )
}
