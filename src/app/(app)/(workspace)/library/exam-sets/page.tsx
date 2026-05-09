import { getSubjects } from '@/lib/actions/subjects'
import { SetsOverview } from '@/components/library/exam-sets/SetsOverview'

export default async function ExamSetsPage() {
  const subjects = await getSubjects()
  return <SetsOverview subjects={subjects} />
}
