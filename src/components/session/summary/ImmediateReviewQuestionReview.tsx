"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImmediateReviewFeedbackRow } from "@/components/session/summary/ImmediateReviewFeedbackRow"
import type { ImmediateReviewResult } from "@/types/ImmediateReviewType"
import type { Question } from "@/types/QuestionType"
import type { GradeData } from "@/hooks/useSessionGrading"

type Tab    = "all" | "correct" | "partial" | "missed" | "overconfident" | "underconfident" | "skipped"
type Round  = "all" | "round1" | "round2"

type TabDef = {
  id:          Tab
  label:       string
  needsGrades: boolean
  filter:      (r: ImmediateReviewResult, i: number, g: Record<string, GradeData>) => boolean
}

const TABS: TabDef[] = [
  { id: "all",            label: "All",            needsGrades: false, filter: ()         => true },
  { id: "correct",        label: "Correct",        needsGrades: true,  filter: (_, i, g) => g[i]?.aiRating === "correct" },
  { id: "partial",        label: "Partial",        needsGrades: true,  filter: (_, i, g) => g[i]?.aiRating === "partial" },
  { id: "missed",         label: "Missed",         needsGrades: true,  filter: (_, i, g) => g[i]?.aiRating === "missed"  },
  { id: "overconfident",  label: "Overconfident",  needsGrades: true,  filter: (r, i, g) => r.confidence === "high" && !!g[i] && g[i].aiRating !== "correct" },
  { id: "underconfident", label: "Underconfident", needsGrades: true,  filter: (r, i, g) => r.confidence === "low"  && g[i]?.aiRating === "correct" },
  { id: "skipped",        label: "Skipped",        needsGrades: false, filter: (r)        => r.selfRating === "skipped" },
]

const SECTION_LABEL = "text-xs font-semibold uppercase tracking-widest text-muted-foreground"

type Props = {
  results:       ImmediateReviewResult[]
  round2Results: ImmediateReviewResult[]
  questions:     Question[]
  grades:        Record<string, GradeData>
  loading:       boolean
}

export function ImmediateReviewQuestionReview({ results, round2Results, questions, grades, loading }: Props) {
  const [round, setRound] = useState<Round>("all")
  const allResults = [...results, ...round2Results]
  const hasRound2  = round2Results.length > 0

  const roundFiltered = allResults.map((r, i) => ({ result: r, index: i })).filter(({ index }) =>
    round === "round1" ? index < results.length :
    round === "round2" ? index >= results.length : true
  )

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-xl font-bold uppercase">Question Review</p>
      <Tabs defaultValue="all">
        <div className="flex items-center gap-3">
          <div className="overflow-x-auto flex-1">
            <TabsList>
              {TABS.map(t => {
                const isLocked = t.needsGrades && loading
                const count    = roundFiltered.filter(({ result, index }) => t.filter(result, index, grades)).length
                if (count === 0 && !isLocked) return null
                return (
                  <TabsTrigger key={t.id} value={t.id} disabled={isLocked}>
                    {t.label}
                    {!isLocked && (
                      <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-sm text-muted-foreground">
                        {count}
                      </span>
                    )}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>
          {hasRound2 && (
            <Select value={round} onValueChange={(v) => setRound(v as Round)}>
              <SelectTrigger className="w-36 !h-11 !px-4 text-sm shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"    className="py-2.5 pl-3">All rounds</SelectItem>
                <SelectItem value="round1" className="py-2.5 pl-3">Round 1</SelectItem>
                <SelectItem value="round2" className="py-2.5 pl-3">Round 2</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        {TABS.map(t => {
          const items  = roundFiltered.filter(({ result, index }) => t.filter(result, index, grades))
          const r1     = items.filter(({ index }) => index < results.length)
          const r2     = items.filter(({ index }) => index >= results.length)
          const hasAny = items.length > 0

          return (
            <TabsContent key={t.id} value={t.id} className="flex flex-col gap-4 mt-4">
              {!hasAny ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {loading ? "Loading AI grades…" : "No questions match this filter."}
                </p>
              ) : (
                <>
                  {r1.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {hasRound2 && round === "all" && <p className={SECTION_LABEL}>Round 1</p>}
                      {r1.map(({ result, index }) => (
                        <ImmediateReviewFeedbackRow key={index} result={result} question={questions.find(q => q.id === result.questionId)} grade={grades[String(index)]} isLoading={loading} />
                      ))}
                    </div>
                  )}
                  {r2.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {round === "all" && <p className={SECTION_LABEL}>Round 2</p>}
                      {r2.map(({ result, index }) => (
                        <ImmediateReviewFeedbackRow key={index} result={result} question={questions.find(q => q.id === result.questionId)} grade={grades[String(index)]} isLoading={loading} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
