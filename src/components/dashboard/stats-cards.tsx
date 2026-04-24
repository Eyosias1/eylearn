import { Flame, BookOpen, CalendarClock, Brain, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getUserStats } from "@/lib/mock/mock-data"
import { cn } from "@/lib/utils"

function daysUntil(dateStr: string): number {
  const today = new Date("2026-04-19")
  const target = new Date(dateStr)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  iconBg: string
}

function StatCard({ icon, label, value, iconBg }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4 px-4">
        <div className={cn("flex items-center justify-center size-8 rounded-md shrink-0", iconBg)}>
          {icon}
        </div>
        <div>
          <p className="text-base font-bold leading-none">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const stats = getUserStats()
  const daysLeft = daysUntil(stats.nextExamDate)

  return (
    <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
      <StatCard
        icon={<Flame className="size-4 text-orange-500" />}
        label="Day Streak"
        value={`${stats.streak} days`}
        iconBg="bg-orange-50"
      />
      <StatCard
        icon={<BookOpen className="size-4 text-blue-500" />}
        label="Sessions Done"
        value={stats.totalSessions}
        iconBg="bg-blue-50"
      />
      <StatCard
        icon={<Brain className="size-4 text-violet-500" />}
        label="Due Today"
        value={4}
        iconBg="bg-violet-50"
      />
      <StatCard
        icon={<Clock className="size-4 text-sky-500" />}
        label="Hours Studied"
        value={`${stats.totalHoursStudied}h`}
        iconBg="bg-sky-50"
      />
      <StatCard
        icon={<CalendarClock className="size-4 text-emerald-500" />}
        label={stats.nextExamLabel}
        value={`${daysLeft} days`}
        iconBg="bg-emerald-50"
      />
    </div>
  )
}
