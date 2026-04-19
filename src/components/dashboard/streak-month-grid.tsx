import { cn } from "@/lib/utils"
import type { StudyDay } from "@/types/study"

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const SHOW_DAYS = ["Mon", "Wed", "Fri", "Sun"]

function intensityClass(minutes: number): string {
  if (minutes === 0) return "bg-muted"
  if (minutes < 30) return "bg-emerald-200"
  if (minutes < 60) return "bg-emerald-400"
  return "bg-emerald-600"
}

function buildWeekGrid(days: StudyDay[], year: number, month: number) {
  const dataMap = new Map(days.map((d) => [d.date, d.minutesStudied]))
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const allDays: StudyDay[] = Array.from({ length: daysInMonth }, (_, i) => {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`
    return { date, minutesStudied: dataMap.get(date) ?? 0 }
  })
  const firstDay = new Date(year, month, 1).getDay()
  const pad = firstDay === 0 ? 6 : firstDay - 1
  const padded: (StudyDay | null)[] = [...Array(pad).fill(null), ...allDays]
  const weeks: (StudyDay | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7))
  return weeks
}

interface Props {
  days: StudyDay[]
  year: number
  month: number
}

export function StreakMonthGrid({ days, year, month }: Props) {
  const weeks = buildWeekGrid(days, year, month)
  const studied = days.filter((d) => d.minutesStudied > 0)
  const totalMin = days.reduce((s, d) => s + d.minutesStudied, 0)
  const bestMin = Math.max(...days.map((d) => d.minutesStudied))

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1.5 w-7 shrink-0">
          {ALL_DAYS.map((d) => (
            <div key={d} className="h-6 text-[10px] text-muted-foreground flex items-center justify-end pr-1">
              {SHOW_DAYS.includes(d) ? d : ""}
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-1.5 max-w-11">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di]
                return (
                  <div
                    key={di}
                    title={day ? `${day.date}: ${day.minutesStudied}min` : ""}
                    className={cn("w-full h-6 rounded-sm", day ? intensityClass(day.minutesStudied) : "bg-transparent")}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6 text-xs border-t pt-3">
        <div><span className="font-semibold">{studied.length}</span> <span className="text-muted-foreground">days studied</span></div>
        <div><span className="font-semibold">{Math.round(totalMin / 60)}h {totalMin % 60}m</span> <span className="text-muted-foreground">total</span></div>
        <div><span className="font-semibold">{bestMin}m</span> <span className="text-muted-foreground">best day</span></div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-muted-foreground">Less</span>
          {["bg-muted","bg-emerald-200","bg-emerald-400","bg-emerald-600"].map((c) => (
            <div key={c} className={cn("size-3.5 rounded-sm", c)} />
          ))}
          <span className="text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}
