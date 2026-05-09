"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImmediateReviewConfidencePicker } from "@/components/session/immediate-review/ImmediateReviewConfidencePicker"
import { ImmediateReviewMcqOptions } from "@/components/session/immediate-review/ImmediateReviewMcqOptions"
import { ImmediateReviewTrueFalseOptions } from "@/components/session/immediate-review/ImmediateReviewTrueFalseOptions"
import { cn } from "@/lib/utils"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

type Props = { session: ImmediateReviewSession }

export function ImmediateReviewAnswer({ session }: Props) {
  const {
    studentAnswer, isRevealed, setStudentAnswer,
    selectConfidence, revealAnswer, selectedConfidence,
    skipQuestion, currentQuestion, elaborativeInterrogation,
  } = session

  const isMcq       = currentQuestion?.type === "mcq" && !!currentQuestion?.options?.length
  const isTrueFalse = currentQuestion?.type === "true-false"

  const showConfidence = !isRevealed && ((isMcq || isTrueFalse) ? !!studentAnswer : true)
  const showRevealBtn  = !isRevealed && !!selectedConfidence

  return (
    <div className={cn(
      // layout
      "flex flex-col",
      // spacing
      "gap-4",
    )}>
      {isMcq ? (
        <ImmediateReviewMcqOptions
          options={currentQuestion!.options!}
          selected={studentAnswer}
          onSelect={setStudentAnswer}
          disabled={isRevealed}
          correctAnswer={isRevealed ? currentQuestion!.correct_answer : undefined}
        />
      ) : isTrueFalse ? (
        <ImmediateReviewTrueFalseOptions
          selected={studentAnswer}
          onSelect={setStudentAnswer}
          disabled={isRevealed}
          correctAnswer={isRevealed ? currentQuestion!.correct_answer : undefined}
          showExplanation={elaborativeInterrogation}
        />
      ) : (
        <Textarea
          placeholder="Write your answer..."
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
          disabled={isRevealed}
          className="min-h-48 resize-none md:text-xl p-5"
        />
      )}
      {showConfidence && (
        <ImmediateReviewConfidencePicker
          selected={selectedConfidence}
          onSelect={selectConfidence}
        />
      )}
      {showRevealBtn && (
        <Button onClick={revealAnswer} size="lg" className="w-full">
          Reveal Answer
        </Button>
      )}
      {!isRevealed && (
        <Button  size="lg" onClick={skipQuestion} className="w-full ">
          Skip question
        </Button>
      )}
    </div>
  )
}
