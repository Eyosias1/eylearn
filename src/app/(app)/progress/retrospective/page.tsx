import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getRetroTopics } from "@/lib/progress/progress"
import { RetrospectiveFull } from "@/components/progress/retrospective-full"

export default async function RetrospectivePage() {
  const topics = await getRetroTopics()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/progress"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="size-3.5" /> Progress
        </Link>
        <h1 className="text-2xl font-bold">Retrospective</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Full session history across all your subjects and topics.
        </p>
      </div>

      <RetrospectiveFull topics={topics} />
    </div>
  )
}
