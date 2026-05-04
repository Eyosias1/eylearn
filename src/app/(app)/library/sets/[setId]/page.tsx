import { notFound } from "next/navigation"
import { getQuestionSetById } from "@/lib/actions/question-sets"
import { getQuestionsBySetId, getAllBankQuestions } from "@/lib/actions/questions"
import { getAllTopics } from "@/lib/actions/topics"
import { getSubjects } from "@/lib/actions/subjects"
import { SetDetailShell } from "@/components/library/exam-sets/SetDetailShell"

type Props = { params: Promise<{ setId: string }> }

export default async function SetDetailPage({ params }: Props) {
  const { setId } = await params
  const [set, questions, bankQuestions, topics, subjects] = await Promise.all([
    getQuestionSetById(setId),
    getQuestionsBySetId(setId),
    getAllBankQuestions(),
    getAllTopics(),
    getSubjects(),
  ])

  if (!set) notFound()

  return (
    <SetDetailShell
      set={set}
      questions={questions}
      bankQuestions={bankQuestions}
      topics={topics}
      subjects={subjects}
    />
  )
}
