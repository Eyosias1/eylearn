"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { SectionLayout, SettingRow } from "./section-layout"

export function NotificationsSection() {
  const [email, setEmail] = useState({ daily: true, weekly: true, nudges: false })
  const [push, setPush] = useState({ due: true, streak: true, sessions: false })
  const [quiet, setQuiet] = useState(true)

  return (
    <SectionLayout
      title="Notifications"
      description="Email, push, and quiet hours."
      blocks={[
        {
          title: "Email",
          description: "Sent to eyosias16@gmail.com.",
          children: (
            <>
              <SettingRow
                label="Daily review digest"
                description="A 7 AM summary of what's due today."
              >
                <Switch
                  checked={email.daily}
                  onCheckedChange={(v) => setEmail({ ...email, daily: v })}
                />
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Weekly retention report"
                description="Sundays. Trend lines + topics slipping below 70%."
              >
                <Switch
                  checked={email.weekly}
                  onCheckedChange={(v) => setEmail({ ...email, weekly: v })}
                />
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Product nudges"
                description="Occasional tips on getting more from spaced repetition."
              >
                <Switch
                  checked={email.nudges}
                  onCheckedChange={(v) => setEmail({ ...email, nudges: v })}
                />
              </SettingRow>
            </>
          ),
        },
        {
          title: "Push",
          description: "Delivered to this browser and any installed mobile app.",
          children: (
            <>
              <SettingRow
                label="Cards are due"
                description="Fires when you have 5+ cards ready for review."
              >
                <Switch
                  checked={push.due}
                  onCheckedChange={(v) => setPush({ ...push, due: v })}
                />
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Streak about to break"
                description="Sent at 8 PM if you haven't studied that day."
              >
                <Switch
                  checked={push.streak}
                  onCheckedChange={(v) => setPush({ ...push, streak: v })}
                />
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Scheduled session reminders"
                description="10 minutes before each AI-scheduled block."
              >
                <Switch
                  checked={push.sessions}
                  onCheckedChange={(v) => setPush({ ...push, sessions: v })}
                />
              </SettingRow>
            </>
          ),
        },
        {
          title: "Quiet hours",
          description: "No push notifications during this window.",
          children: (
            <>
              <SettingRow label="Enable quiet hours">
                <Switch checked={quiet} onCheckedChange={setQuiet} />
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Window"
                description="Repeats every day in your local timezone."
              >
                <div className="flex items-center gap-2">
                  <Input type="time" defaultValue="22:00" className="w-28" />
                  <span className="text-xs text-muted-foreground">to</span>
                  <Input type="time" defaultValue="07:00" className="w-28" />
                </div>
              </SettingRow>
            </>
          ),
        },
      ]}
    />
  )
}
