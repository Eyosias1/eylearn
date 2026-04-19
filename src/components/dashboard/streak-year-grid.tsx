import { cn } from "@/lib/utils"
import type { StudyDay } from "@/types/study"

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const SHOW_DAYS = ["Mon","Wed","Fri"]
const ALL_DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
const TODAY = "2026-04-19"

function intensityClass(minutes: number, isFuture: boolean): string {
  if (isFuture) return "bg-muted"
  if (minutes === 0) return "bg-muted"
  if (minutes < 30) return "bg-emerald-200"
  if (minutes < 60) return "bg-emerald-400"
  return "bg-emerald-600"
}

function buildYearGrid(data: StudyDay[], year: number) {
  const dataMap = new Map(data.map((d) => [d.date, d.minutesStudied]))
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  const allDays = Array.from({ length: isLeap ? 366 : 365 }, (_, i) => {
    const d = new Date(year, 0, i + 1)
    const date = d.toISOString().split("T")[0]
    return { date, minutesStudied: dataMap.get(date) ?? 0, isFuture: date > TODAY }
  })
  const firstDay = new Date(year, 0, 1).getDay()
  const pad = firstDay === 0 ? 6 : firstDay - 1
  const padded = [...Array(pad).fill(null), ...allDays]
  const weeks: (typeof allDays[0] | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7))
  return { weeks, pad }
}

function getMonthLabels(year: number, pad: number) {
  return Array.from({ length: 12 }, (_, m) => {
    const dayOfYear = Math.floor((new Date(year, m, 1).getTime() - new Date(year, 0, 1).getTime()) / 86400000)
    return { label: MONTHS[m], col: Math.floor((dayOfYear + pad) / 7) }
  })
}

interface Props { data: StudyDay[]; year: number }

export function StreakYearGrid({ data, year }: Props) {
  const { weeks, pad } = buildYearGrid(data, year)
  const monthLabels = getMonthLabels(year, pad)
  const studied = data.filter((d) => d.minutesStudied > 0 && d.date <= TODAY)
  const totalMin = data.reduce((s, d) => s + (d.date <= TODAY ? d.minutesStudied : 0), 0)

  return (
    <div className="flex flex-col gap-3 flex-1 min-w-0">
      <div className="flex gap-1 pl-7">
        {weeks.map((_, i) => {
          const label = monthLabels.find((m) => m.col === i)
          return <div key={i} className="flex-1 max-w-5 text-[9px] text-muted-foreground">{label?.label ?? ""}</div>
        })}
      </div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 w-7 shrink-0">
          {ALL_DAYS.map((d) => (
            <div key={d} className="h-4 text-[9px] text-muted-foreground flex items-center justify-end pr-1">
              {SHOW_DAYS.includes(d) ? d : ""}
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-1 max-w-5">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di]
                return (
                  <div
                    key={di}
                    title={day ? `${day.date}: ${day.minutesStudied}m` : ""}
                    className={cn("w-full h-4 rounded-sm", day ? intensityClass(day.minutesStudied, day.isFuture) : "bg-transparent")}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6 text-xs border-t pt-3">
        <div><span className="font-semibold">{studied.length}</span> <span className="text-muted-foreground">days studied</span></div>
        <div><span className="font-semibold">{Math.floor(totalMin / 60)}h {totalMin % 60}m</span> <span className="text-muted-foreground">total</span></div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-muted-foreground">Less</span>
          {["bg-muted","bg-emerald-200","bg-emerald-400","bg-emerald-600"].map((c) => (
            <div key={c} className={cn("size-3 rounded-sm", c)} />
          ))}
          <span className="text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}
