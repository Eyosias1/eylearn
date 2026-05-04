"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuestionsOverview } from "@/components/library/question-bank/QuestionsOverview"
import { SetsOverview } from "@/components/library/exam-sets/SetsOverview"
import { SubjectsTabShell } from "@/components/library/subjects/SubjectsTabShell"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

type Props = {
  subjects: Subject[]
  topicsBySubject: Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
}

export function LibraryShell({ subjects, topicsBySubject, subtopicsByTopic }: Props) {
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)

  const filteredSubjects = subjectFilter
    ? subjects.filter((s) => s.id === subjectFilter)
    : subjects

  return (
    <Tabs defaultValue="subjects">
      <TabsList variant="line">
        <TabsTrigger value="subjects">Subjects</TabsTrigger>
        <TabsTrigger value="bank">Question Bank</TabsTrigger>
        <TabsTrigger value="sets">Exam Sets</TabsTrigger>
      </TabsList>

      <TabsContent value="bank">
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={subjectFilter === null ? "secondary" : "ghost"}
              onClick={() => setSubjectFilter(null)}
              className="h-9 rounded-sm text-sm px-3"
            >
              All
            </Button>
            <Select value={subjectFilter ?? "all"} onValueChange={(v) => setSubjectFilter(v === "all" ? null : v)}>
              <SelectTrigger className="w-48 h-9 text-sm rounded-sm px-3.5">
                <SelectValue placeholder="All subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="pl-3 py-2 cursor-pointer">All subjects</SelectItem>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id} className="pl-3 py-2 cursor-pointer">{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <QuestionsOverview
            subjects={filteredSubjects}
            topicsBySubject={topicsBySubject}
            subtopicsByTopic={subtopicsByTopic}
          />
        </div>
      </TabsContent>

      <TabsContent value="sets">
        <div className="pt-4">
          <SetsOverview subjects={subjects} />
        </div>
      </TabsContent>

      <TabsContent value="subjects">
        <div className="pt-4">
          <SubjectsTabShell
            subjects={subjects}
            topicsBySubject={topicsBySubject}
            subtopicsByTopic={subtopicsByTopic}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
