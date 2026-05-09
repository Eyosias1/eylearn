"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ConsistencyDay } from "@/types/dashboard"

interface Props {
  data: ConsistencyDay[]
}

const chartConfig = {
  minutes: {
    label: "Minutes studied",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

const RANGES = [
  { label: "7d",  days: 7  },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
] as const

type Range = typeof RANGES[number]["days"]

export function ConsistencyChart({ data }: Props) {
  const [range, setRange] = React.useState<Range>(14)

  const chartData = data
    .slice(-range)
    .map((d) => ({
      date: d.date,
      minutes: d.minutes,
    }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col gap-0.5">
          <CardTitle className="text-base font-semibold">Consistency</CardTitle>
          <p className="text-xs text-muted-foreground">Daily study activity</p>
        </div>
        <div className={cn("flex items-center gap-1")}>
          {RANGES.map(({ label, days }) => (
            <Button
              key={days}
              variant={range === days ? "default" : "ghost"}
              size="sm"
              onClick={() => setRange(days)}
              className="h-7 px-2.5 text-xs"
            >
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-3">
        <ChartContainer config={chartConfig} className="h-[100px] w-full">
          <BarChart
            data={chartData}
            barSize={range === 7 ? 18 : range === 14 ? 12 : 7}
            margin={{ left: 4, right: 4 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              minTickGap={range === 7 ? 0 : 20}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              className="text-[10px]"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />
            <Bar dataKey="minutes" fill="var(--color-minutes)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
