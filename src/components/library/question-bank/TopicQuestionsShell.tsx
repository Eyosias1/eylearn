import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { QuestionsGrid } from "@/components/library/question-bank/QuestionsGrid"
import { cn } from "@/lib/utils"
import type { Topic } from "@/types/TopicType"
import type { Subject } from "@/types/SubjectType"
import type { Subtopic } from "@/types/SubtopicType"
import type { Question } from "@/types/QuestionType"

type Props = {
  topic: Topic
  subject: Subject
  subtopics: Subtopic[]
  questions: Question[]
}

export function TopicQuestionsShell({ topic, subject, subtopics, questions }: Props) {
  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // sizing
      "w-full max-w-7xl",
      // spacing
      "mx-auto gap-6",
    )}>
      <div className="flex flex-col gap-3">
        <Link
          href="/library"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="size-3.5" />
          Question Bank
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{topic.name}</h1>
          <span className={cn(
            // spacing
            "px-2 py-0.5",
            // typography
            "text-xs font-medium text-white",
            // border
            "rounded-full",
            // colors
            subject.color,
          )}>
            {subject.name}
          </span>
        </div>
      </div>

      <QuestionsGrid
        topicId={topic.id}
        subtopics={subtopics}
        questions={questions}
      />
    </div>
  )
}
