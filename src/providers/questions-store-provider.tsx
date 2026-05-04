"use client"

import { createContext, useContext, useState } from "react"
import type { QuestionSetWithCount } from "@/types/QuestionSetType"

interface QuestionsStore {
  topicCounts: Record<string, number>
  setCounts: Record<string, number>
  sets: QuestionSetWithCount[]
  incrementTopicCount: (topicId: string) => void
  decrementTopicCount: (topicId: string) => void
  incrementSetCount: (setId: string, by?: number) => void
  decrementSetCount: (setId: string) => void
  addSet: (set: QuestionSetWithCount) => void
  removeSet: (id: string) => void
}

const Ctx = createContext<QuestionsStore | null>(null)

export function QuestionsStoreProvider({
  initialTopicCounts,
  initialSetCounts,
  initialSets,
  children,
}: {
  initialTopicCounts: Record<string, number>
  initialSetCounts: Record<string, number>
  initialSets: QuestionSetWithCount[]
  children: React.ReactNode
}) {
  const [topicCounts, setTopicCounts] = useState(initialTopicCounts)
  const [setCounts, setSetCounts]     = useState(initialSetCounts)
  const [sets, setSets]               = useState(initialSets)

  function incrementTopicCount(topicId: string) {
    setTopicCounts((prev) => ({ ...prev, [topicId]: (prev[topicId] ?? 0) + 1 }))
  }

  function decrementTopicCount(topicId: string) {
    setTopicCounts((prev) => ({ ...prev, [topicId]: Math.max(0, (prev[topicId] ?? 0) - 1) }))
  }

  function incrementSetCount(setId: string, by = 1) {
    setSetCounts((prev) => ({ ...prev, [setId]: (prev[setId] ?? 0) + by }))
  }

  function decrementSetCount(setId: string) {
    setSetCounts((prev) => ({ ...prev, [setId]: Math.max(0, (prev[setId] ?? 0) - 1) }))
  }

  function addSet(set: QuestionSetWithCount) {
    setSets((prev) => [set, ...prev])
  }

  function removeSet(id: string) {
    setSets((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <Ctx.Provider value={{ topicCounts, setCounts, sets, incrementTopicCount, decrementTopicCount, incrementSetCount, decrementSetCount, addSet, removeSet }}>
      {children}
    </Ctx.Provider>
  )
}

export function useQuestionsStore(): QuestionsStore {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useQuestionsStore must be used inside QuestionsStoreProvider")
  return ctx
}
