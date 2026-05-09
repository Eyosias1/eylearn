import Link from "next/link"
import { redirect } from "next/navigation"
import { getQuestionsBySubtopicId } from "@/lib/actions/questions"
import { ImmediateReviewSession } from "@/components/session/immediate-review/ImmediateReviewSession"
import { cn } from "@/lib/utils"

type Props = {
  searchParams: Promise<{ subtopic?: string; duration?: string; count?: string; requeue?: string; elaborative?: string; t?: string }>
}

export default async function ImmediateReviewPage({ searchParams }: Props) {
  const params      = await searchParams
  const subtopicId  = params.subtopic
  const duration    = Math.max(1, Number(params.duration ?? 20))
  const count       = Math.max(1, Number(params.count ?? 10))
  const enableRound2            = params.requeue === "1"
  const elaborativeInterrogation = params.elaborative === "1"
  const t                       = params.t ?? ""

  if (!subtopicId) redirect("/session")

  const allQuestions = await getQuestionsBySubtopicId(subtopicId)
  const questions    = allQuestions.slice(0, count)

  if (allQuestions.length === 0) {
    return (
      <div className={cn(
        // layout
        "flex flex-col items-center justify-center",
        // sizing
        "min-h-96",
        // spacing
        "gap-3",
      )}>
        <p className="text-lg font-semibold">No questions found</p>
        <p className="text-sm text-muted-foreground">
          This subtopic has no questions yet. Add some in the Library first.
        </p>
        <Link href="/session" className="text-sm text-primary underline underline-offset-4 mt-2">
          ← Back to session config
        </Link>
      </div>
    )
  }

  return <ImmediateReviewSession key={`${subtopicId}-${duration}-${count}-${t}`} questions={questions} durationMinutes={duration} subtopicId={subtopicId} enableRound2={enableRound2} elaborativeInterrogation={elaborativeInterrogation} />
}
