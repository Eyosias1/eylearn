import { getAllTopics } from '@/lib/actions/topics'
import { getQuestionCountsByTopicIds } from '@/lib/actions/questions'
import { getQuestionSets } from '@/lib/actions/question-sets'
import { QuestionsStoreProvider } from '@/providers/questions-store-provider'

export default async function LibraryLayout({ children }: { children: React.ReactNode }) {
  const [topics, sets] = await Promise.all([getAllTopics(), getQuestionSets()])
  const topicCounts = await getQuestionCountsByTopicIds(topics.map((t) => t.id))
  const setCounts = Object.fromEntries(sets.map((s) => [s.id, s.question_count]))

  return (
    <QuestionsStoreProvider initialTopicCounts={topicCounts} initialSetCounts={setCounts} initialSets={sets}>
      {children}
    </QuestionsStoreProvider>
  )
}
