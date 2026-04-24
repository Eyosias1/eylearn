"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRetentionData } from "@/lib/mock/mock-data"

const COLORS = ["#6366f1", "#f59e0b", "#ef4444"]

export function RetentionChart() {
  const data = getRetentionData()

  const chartData = data[0].history.map((point, i) => {
    const entry: Record<string, string | number> = { date: point.date }
    data.forEach((topic) => {
      entry[topic.topicName] = topic.history[i]?.retention ?? 0
    })
    return entry
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Retention Trends</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">How well each topic is being remembered over time</p>
          </div>
          <div className="flex items-center gap-4">
            {data.map((topic, i) => (
              <div key={topic.topicId} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{topic.topicName}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <ReferenceLine
              y={50}
              stroke="hsl(var(--muted-foreground) / 0.4)"
              strokeDasharray="4 4"
              label={{ value: "50% — review threshold", fontSize: 10, fill: "hsl(var(--muted-foreground))", position: "insideTopLeft" }}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(val) => [`${val}%`, ""]}
            />
            {data.map((topic, i) => (
              <Line
                key={topic.topicId}
                type="monotone"
                dataKey={topic.topicName}
                stroke={COLORS[i]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
