"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { McqAnswerSection } from "@/components/library/question-bank/McqAnswerSection"
import { TrueFalseAnswerSection } from "@/components/library/question-bank/TrueFalseAnswerSection"
import { QuestionImageUpload } from "@/components/library/question-bank/QuestionImageUpload"
import { createQuestion } from "@/lib/actions/questions"
import { QUESTION_TYPES } from "@/types/QuestionType"
import type { Subtopic } from "@/types/SubtopicType"
import type { Question, QuestionType, McqOption } from "@/types/QuestionType"

const DEFAULT_OPTIONS: McqOption[] = [
  { label: "A", text: "" }, { label: "B", text: "" },
  { label: "C", text: "" }, { label: "D", text: "" },
]

type Props = {
  topicId: string
  subtopicId: string | null
  subtopics?: Subtopic[]
  onSuccess: (question: Question) => void
  onCancel: () => void
}

export function AddQuestionForm({ topicId, subtopicId: initialSubtopicId, subtopics, onSuccess, onCancel }: Props) {
  const [body, setBody]             = useState("")
  const [type, setType]             = useState<QuestionType>("short-answer")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [options, setOptions]       = useState<McqOption[]>(DEFAULT_OPTIONS)
  const [imageUrl, setImageUrl]     = useState<string | null>(null)
  const [subtopicId, setSubtopicId] = useState<string | null>(initialSubtopicId)
  const [loading, setLoading]       = useState(false)

  function handleTypeChange(v: QuestionType) {
    setType(v)
    setCorrectAnswer("")
    if (v === "mcq") setOptions(DEFAULT_OPTIONS)
  }

  const isMcq       = type === "mcq"
  const isTrueFalse = type === "true-false"
  const canSubmit = body.trim() && correctAnswer.trim() && !loading

  async function handleSubmit() {
    if (!canSubmit) return
    setLoading(true)
    const question = await createQuestion(topicId, subtopicId, body.trim(), type, correctAnswer.trim(), isMcq ? options : null, imageUrl)
    setLoading(false)
    onSuccess(question)
  }

  return (
    <div className="flex flex-col gap-4 p-5 rounded-lg border bg-muted/40">
      {subtopics && (
        <Select value={subtopicId ?? "none"} onValueChange={(v) => setSubtopicId(v === "none" ? null : v)}>
          <SelectTrigger className="h-11 text-base"><SelectValue placeholder="Select subtopic..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="text-base py-2.5">No subtopic</SelectItem>
            {subtopics.map((s) => (
              <SelectItem key={s.id} value={s.id} className="text-base py-2.5">{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Textarea placeholder="What is..." value={body} onChange={(e) => setBody(e.target.value)} className="text-base resize-none h-24" />
      <QuestionImageUpload value={imageUrl} onChange={setImageUrl} />
      <Select value={type} onValueChange={(v) => handleTypeChange(v as QuestionType)}>
        <SelectTrigger className="h-11 text-base"><SelectValue /></SelectTrigger>
        <SelectContent>
          {QUESTION_TYPES.map((t) => (
            <SelectItem key={t.value} value={t.value} className="text-base py-2.5">{t.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isMcq ? (
        <McqAnswerSection options={options} correctAnswer={correctAnswer} onOptionsChange={setOptions} onCorrectAnswerChange={setCorrectAnswer} />
      ) : isTrueFalse ? (
        <TrueFalseAnswerSection value={correctAnswer} onChange={setCorrectAnswer} />
      ) : (
        <Textarea placeholder="Correct answer..." value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="text-base resize-none h-24" />
      )}
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>Add Question</Button>
      </div>
    </div>
  )
}
