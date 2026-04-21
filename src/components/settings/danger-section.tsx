"use client"

import { TriangleAlert, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLayout, SettingRow } from "./section-layout"

export function DangerSection() {
  return (
    <SectionLayout
      title="Danger zone"
      description="Reset progress or delete your account."
      blocks={[
        {
          title: "Reset progress",
          description: "Clear all review history but keep your content and account.",
          children: (
            <>
              <SettingRow
                label="Reset all spaced-repetition intervals"
                description="Every card returns to 'new'. Retention trends are archived, not deleted."
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  Reset intervals
                </Button>
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Clear streak history"
                description="Removes your current and longest streaks. Can't be undone."
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  Clear streak
                </Button>
              </SettingRow>
            </>
          ),
        },
        {
          title: "Delete account",
          description:
            "Permanently removes your subjects, cards, reviews, and subscription. We keep nothing.",
          children: (
            <div className="flex items-start justify-between gap-6 py-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center size-8 rounded-md bg-destructive/10 text-destructive shrink-0">
                  <TriangleAlert className="size-4" />
                </div>
                <div className="flex flex-col gap-1 max-w-sm">
                  <p className="text-sm font-medium text-foreground">
                    This action is permanent.
                  </p>
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
