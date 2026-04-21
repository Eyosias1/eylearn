"use client"

import { Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionLayout, SettingRow } from "./section-layout"

const INVOICES = [
  { date: "Apr 14, 2026", amount: "$12.00", status: "Paid" },
  { date: "Mar 14, 2026", amount: "$12.00", status: "Paid" },
  { date: "Feb 14, 2026", amount: "$12.00", status: "Paid" },
]

export function BillingSection() {
  return (
    <SectionLayout
      title="Billing"
      description="Plan, payment method, and invoices."
      blocks={[
        {
          title: "Plan",
          description: "Your subscription and what's included.",
          children: (
            <div className="flex flex-col gap-3 py-3">
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Zap className="size-[18px]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">EyLearn Pro</p>
                      <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-foreground/5 text-[11px] font-medium text-foreground/80 ring-1 ring-foreground/10">
                        Current
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Unlimited subjects · AI session scheduling · Obsidian vault sync
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold leading-none">
                      $12{" "}
                      <span className="text-xs font-normal text-muted-foreground">/ month</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Renews May 14, 2026</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change plan
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>Switch to yearly and save 20% — $115/yr.</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-primary text-xs">
                  See comparison
                </Button>
              </div>
            </div>
          ),
        },
        {
          title: "Payment method",
          description: "Used for your next invoice on May 14.",
          children: (
            <SettingRow
              label="Visa ending in 4242"
              description="Expires 08 / 28  ·  Eyosias Tefera"
            >
              <Button variant="outline" size="sm">
                Update
              </Button>
            </SettingRow>
          ),
        },
        {
          title: "Billing history",
          description: "Last 3 months. Download invoices as PDF.",
          children: (
            <div className="flex flex-col">
              {INVOICES.map((inv, i) => (
                <div
                  key={inv.date}
                  className={`flex items-center justify-between gap-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">{inv.date}</p>
                    <p className="text-xs text-muted-foreground">EyLearn Pro · Monthly</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {inv.status}
                    </span>
                    <span className="text-sm tabular-nums">{inv.amount}</span>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ExternalLink className="size-3.5" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
