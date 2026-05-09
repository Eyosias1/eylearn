"use client"

import { useState } from "react"
import { Upload, TriangleAlert, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionLayout, SettingRow } from "./section-layout"

export function ProfileSection() {
  const [name, setName] = useState("Eyosias Tefera")
  const [email, setEmail] = useState("eyosias16@gmail.com")
  const [username, setUsername] = useState("eyosias")
  const [tz, setTz] = useState("America/New_York")

  return (
    <SectionLayout
      title="Profile"
      description="Your name, photo, and primary exam goal."
      blocks={[
        {
          title: "Profile photo",
          description: "Shown on your profile and next to reviews you share.",
          children: (
            <div className="flex items-center gap-4 py-3">
              <div className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground font-semibold text-lg shrink-0">
                EY
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="size-4" />
                  Upload new
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Remove
                </Button>
              </div>
            </div>
          ),
        },
        {
          title: "Account details",
          description: "How other learners see you.",
          children: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 py-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tz">Timezone</Label>
                <Select value={tz} onValueChange={setTz}>
                  <SelectTrigger id="tz">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Africa/Addis_Ababa">Addis Ababa (EAT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 pt-1">
                <Button size="sm">Save changes</Button>
              </div>
            </div>
          ),
        },
        {
          title: "Study goal",
          description: "Used to tailor daily due lists and session pacing.",
          children: (
            <>
              <SettingRow
                label="Primary exam"
                description="Appears as a countdown on your dashboard."
              >
                <Input className="w-52" defaultValue="USMLE Step 1" />
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Exam date"
                description="Determines suggested review intensity."
              >
                <Input type="date" defaultValue="2026-07-15" className="w-44" />
              </SettingRow>
            </>
          ),
        },
        {
          title: "Delete account",
          description: "Permanently removes your account and all associated data.",
          children: (
            <div className="flex items-start justify-between gap-6 py-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center size-8 rounded-md bg-destructive/10 text-destructive shrink-0">
                  <TriangleAlert className="size-4" />
                </div>
                <div className="flex flex-col gap-1 max-w-sm">
                  <p className="text-sm font-medium text-foreground">This action is permanent.</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You&apos;ll have 14 days to recover your account from the confirmation
                    email, after which everything is erased from our servers.
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="shrink-0">
                <Trash2 className="size-4" />
                Delete account
              </Button>
            </div>
          ),
        },
      ]}
    />
  )
}
