"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ConsistencyDay } from "@/types/dashboard"

interface Props {
  data: ConsistencyDay[]
}

interface TooltipPayload {
  active?: boolean
  payload?: { payload: { label: string; minutes: number } }[]
}

function ChartTooltip({ active, payload }: TooltipPayload) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-md border bg-popover px-2 py-1.5 text-xs shadow-sm">
      <p className="font-medium">{d.label}</p>
      <p className="text-muted-foreground">{d.minutes} min</p>
    </div>
  )
}

export function ConsistencyChart({ data }: Props) {
  const chartData = data.map((d) => ({
    label: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    minutes: d.minutes,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Consistency (14d)</CardTitle>
        <p className="text-xs text-muted-foreground">Daily study activity</p>
      </CardHeader>
      <CardContent className="px-2 pb-3">
        <div className="h-[72px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={10} barGap={2}>
              <Tooltip content={<ChartTooltip />} cursor={false} />
              <Bar dataKey="minutes" radius={[2, 2, 0, 0]} className="fill-primary opacity-80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-1 px-1">
          <p className="text-[10px] text-muted-foreground">14 days ago</p>
          <p className="text-[10px] text-muted-foreground">Today</p>
        </div>
      </CardContent>
    </Card>
  )
}
