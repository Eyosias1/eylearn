"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionLayout, SettingRow } from "./section-layout"

const THEMES = [
  {
    k: "light",
    label: "Light",
    preview: "bg-white ring-foreground/10",
  },
  {
    k: "dark",
    label: "Dark",
    preview: "bg-[oklch(0.145_0_0)] ring-white/15",
  },
  {
    k: "system",
    label: "System",
    preview: "bg-gradient-to-br from-white via-white to-[oklch(0.145_0_0)] ring-foreground/10",
  },
]

const ACCENTS = [
  { k: "neutral", label: "Neutral", color: "bg-[oklch(0.205_0_0)]" },
  { k: "indigo", label: "Indigo", color: "bg-[oklch(0.48_0.18_265)]" },
  { k: "emerald", label: "Emerald", color: "bg-[oklch(0.58_0.14_160)]" },
  { k: "amber", label: "Amber", color: "bg-[oklch(0.74_0.16_75)]" },
  { k: "rose", label: "Rose", color: "bg-[oklch(0.62_0.18_18)]" },
]

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [density, setDensity] = useState("comfortable")
  const [accent, setAccent] = useState("neutral")

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SectionLayout
      title="Appearance"
      description="Theme, density, and accent color."
      blocks={[
        {
          title: "Theme",
          description: "Pick your preferred color mode. 'System' follows your OS.",
          children: (
            <div className="grid grid-cols-3 gap-3 py-3">
              {THEMES.map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTheme(t.k)}
                  className={cn(
                    "flex flex-col items-start gap-3 p-3 rounded-xl border text-left transition-all",
                    mounted && theme === t.k
                      ? "border-foreground/30 ring-1 ring-foreground/10 bg-muted/40"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <div className={cn("h-16 w-full rounded-md ring-1", t.preview)} />
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm font-medium">{t.label}</span>
                    {mounted && theme === t.k && (
                      <span className="inline-flex items-center justify-center size-4 rounded-full bg-primary text-primary-foreground">
                        <Check className="size-2.5" />
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ),
        },
        {
          title: "Accent color",
          description: "Used for highlights, active states, and charts.",
          children: (
            <div className="flex flex-wrap items-center gap-2 py-3">
              {ACCENTS.map((a) => (
                <button
                  key={a.k}
                  onClick={() => setAccent(a.k)}
                  className={cn(
                    "inline-flex items-center gap-2 h-8 pl-1.5 pr-3 rounded-full border text-sm transition-colors",
                    accent === a.k
                      ? "border-foreground/30 bg-muted/60"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <span
                    className={cn("size-5 rounded-full ring-1 ring-foreground/10", a.color)}
                  />
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          ),
        },
        {
          title: "Density",
          description: "How much whitespace to leave between cards and rows.",
          children: (
            <SettingRow
              label="Interface density"
              description="Compact reduces padding by ~20% across the app."
            >
              <div className="flex items-center p-0.5 rounded-lg bg-muted text-xs font-medium">
                {["comfortable", "compact"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDensity(d)}
                    className={cn(
                      "h-7 px-3 rounded-md capitalize transition-colors",
                      density === d
                        ? "bg-background text-foreground shadow-sm ring-1 ring-foreground/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </SettingRow>
          ),
        },
      ]}
    />
  )
}
