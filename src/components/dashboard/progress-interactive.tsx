"use client"

import { DueTodayHeader } from "@/components/session/DueTodayHeader"
import type { DueCard } from "@/types/progress"

interface HeaderProps {
  cards: DueCard[]
}

export function DueTodayHeaderClient({ cards }: HeaderProps) {
  return <DueTodayHeader cards={cards} />
}
