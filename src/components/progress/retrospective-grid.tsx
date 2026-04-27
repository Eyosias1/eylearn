"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RetroTable } from "@/components/progress/retrospective-table"
import { RetroLegend } from "@/components/progress/retro-legend"
import type { RetroTopic } from "@/types/progress"

const LIMIT = 8

interface Props {
  topics: RetroTopic[]
}

export function RetrospectiveGrid({ topics }: Props) {
  const visible = topics.slice(0, LIMIT)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <RetroLegend />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/progress/retrospective">View full</Link>
        </Button>
      </div>
      <RetroTable topics={visible} />
    </div>
  )
}
