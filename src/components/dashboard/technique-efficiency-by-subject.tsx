"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import type { AnalyticsData } from "@/types/progress"

type Technique = AnalyticsData["techniqueEfficiency"][number]

export function TechniqueEfficiencyBySubject({ data }: { data: Technique[] }) {
  const [mode, setMode]       = useState(data[0]?.mode ?? "")
  const [subject, setSubject] = useState("")
  const [topic, setTopic]     = useState("")

  const technique   = data.find(t => t.mode === mode) ?? data[0]
  const subjectData = technique?.bySubject.find(s => s.subject === subject)
  const topicData   = subjectData?.topics.find(t => t.topic === topic)

  const onSubject = (v: string) => { setSubject(v); setTopic("") }

  const items = topicData
    ? topicData.subtopics.map(s => ({ label: s.subtopic, score: s.score }))
    : subjectData
    ? subjectData.topics.map(t => ({ label: t.topic, score: t.score }))
    : technique?.bySubject.map(s => ({ label: s.subject, score: s.score })) ?? []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="p-1">
            {data.map(t => <SelectItem key={t.mode} value={t.mode} className="text-sm py-2">{t.mode}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={subject} onValueChange={onSubject}>
          <SelectTrigger className="h-9 w-40 text-sm">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent className="p-1">
            {technique?.bySubject.map(s => <SelectItem key={s.subject} value={s.subject} className="text-sm py-2">{s.subject}</SelectItem>)}
          </SelectContent>
        </Select>

        {subjectData && (
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="h-9 w-40 text-sm">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent className="p-1">
              {subjectData.topics.map(t => <SelectItem key={t.topic} value={t.topic} className="text-sm py-2">{t.topic}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-semibold tabular-nums">{item.score}%</span>
            </div>
            <Progress value={item.score} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
