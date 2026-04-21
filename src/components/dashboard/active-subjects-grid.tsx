import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { SubjectWithMastery } from "@/types/dashboard"

function masteryColor(pct: number) {
  if (pct >= 75) return "text-emerald-600 dark:text-emerald-400"
  if (pct >= 50) return "text-yellow-600 dark:text-yellow-400"
  return "text-red-600 dark:text-red-400"
}

function SubjectCard({ subject }: { subject: SubjectWithMastery }) {
  return (
    <div className={cn(
      // layout
      "flex flex-col gap-1",
      // spacing
      "p-3",
      // border
      "rounded-lg border",
      // hover
      "hover:bg-muted/50 transition-colors cursor-pointer",
    )}>
      <p className="text-sm font-medium truncate">{subject.name}</p>
      <p className={cn("text-2xl font-bold tabular-nums leading-none", masteryColor(subject.masteryPercent))}>
        {subject.masteryPercent}%
      </p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Mastery Level</p>
    </div>
  )
}

interface Props {
  subjects: SubjectWithMastery[]
}

export function ActiveSubjectsGrid({ subjects }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Active Subjects</CardTitle>
          <p className="text-xs text-muted-foreground">{subjects.length} Enrolled</p>
        </div>
      </CardHeader>
      <CardContent>
        {subjects.length === 0
          ? <p className="text-sm text-muted-foreground text-center py-4">No subjects enrolled yet</p>
          : (
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((s) => <SubjectCard key={s.id} subject={s} />)}
            </div>
          )
        }
      </CardContent>
    </Card>
  )
}
