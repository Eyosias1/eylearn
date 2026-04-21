"use client"

import { DueTodayHeader } from "@/components/progress/due-today-header"
import { DueTodayTable } from "@/components/progress/due-today-table"
import type { DueCard } from "@/types/progress"

interface HeaderProps {
  cards: DueCard[]
}

export function DueTodayHeaderClient({ cards }: HeaderProps) {
  return <DueTodayHeader cards={cards} onStartReview={() => {}} />
}

interface TableProps {
  cards: DueCard[]
}

export function DueTodayTableClient({ cards }: TableProps) {
  return <DueTodayTable cards={cards} onStartSession={() => {}} />
}
