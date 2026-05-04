"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createQuestion } from "@/lib/actions/questions"
import { QUESTION_TYPES } from "@/types/QuestionType"
import type { Subtopic } from "@/types/SubtopicType"
import type { Question, QuestionType } from "@/types/QuestionType"

type Props = {
  topicId: string
  subtopicId: string | null
  subtopics?: Subtopic[]
  onSuccess: (question: Question) => void
  onCancel: () => void
}

export function AddQuestionForm({ topicId, subtopicId: initialSubtopicId, subtopics, onSuccess, onCancel }: Props) {
  const [body, setBody]               = useState("")
  const [type, setType]               = useState<QuestionType>("short-answer")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [subtopicId, setSubtopicId]   = useState<string | null>(initialSubtopicId)
  const [loading, setLoading]         = useState(false)

  async function handleSubmit() {
    if (!body.trim() || !correctAnswer.trim()) return
    setLoading(true)
    const question = await createQuestion(topicId, subtopicId, body.trim(), type, correctAnswer.trim())
    setLoading(false)
    onSuccess(question)
  }

  return (
    <div className="flex flex-col gap-4 p-5 rounded-lg border bg-muted/40">
      {subtopics && (
        <Select value={subtopicId ?? "none"} onValueChange={(v) => setSubtopicId(v === "none" ? null : v)}>
          <SelectTrigger className="h-11 text-base">
            <SelectValue placeholder="Select subtopic..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="text-base py-2.5">No subtopic</SelectItem>
            {subtopics.map((s) => (
              <SelectItem key={s.id} value={s.id} className="text-base py-2.5">{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Textarea
        placeholder="What is..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="text-base resize-none h-24"
      />
      <Select value={type} onValueChange={(v) => setType(v as QuestionType)}>
        <SelectTrigger className="h-11 text-base">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {QUESTION_TYPES.map((t) => (
            <SelectItem key={t.value} value={t.value} className="text-base py-2.5">{t.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Correct answer..."
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        className="text-base resize-none h-24"
      />
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading || !body.trim() || !correctAnswer.trim()}>
          Add Question
        </Button>
      </div>
    </div>
  )
}
