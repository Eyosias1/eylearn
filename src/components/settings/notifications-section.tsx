"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { SectionLayout, SettingRow } from "./section-layout"

const ALWAYS_ON = (
  <span className="text-xs text-muted-foreground">Always sent</span>
)

export function NotificationsSection() {
  const [productUpdates, setProductUpdates] = useState(true)

  return (
    <SectionLayout
      title="Notifications"
      description="Emails sent by EyLearn."
      blocks={[
        {
          title: "Transactional",
          description: "Required emails. Cannot be turned off.",
          children: (
            <>
              <SettingRow
                label="Welcome"
                description="Sent once when you create your account."
              >
                {ALWAYS_ON}
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Email verification"
                description="Sent when you sign up or change your email."
              >
                {ALWAYS_ON}
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Password reset"
                description="Sent when you request a password reset."
              >
                {ALWAYS_ON}
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Billing receipts"
                description="Sent after every successful payment."
              >
                {ALWAYS_ON}
              </SettingRow>
              <div className="h-px bg-border" />
              <SettingRow
                label="Payment failed"
                description="Sent if a charge fails on your account."
              >
                {ALWAYS_ON}
              </SettingRow>
            </>
          ),
        },
        {
          title: "Marketing",
          description: "Optional emails you can opt out of.",
          children: (
            <SettingRow
              label="Product updates"
              description="New features, improvements, and changelog highlights."
            >
              <Switch
                checked={productUpdates}
                onCheckedChange={setProductUpdates}
              />
            </SettingRow>
          ),
        },
      ]}
    />
  )
}
