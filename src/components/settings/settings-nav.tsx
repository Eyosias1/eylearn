import { Bell, ChevronRight, CreditCard, Paintbrush, TriangleAlert, User } from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "profile", label: "Profile", description: "Your name, photo, and primary exam goal.", icon: User, destructive: false },
  { id: "notifications", label: "Notifications", description: "Email, push, and quiet hours.", icon: Bell, destructive: false },
  { id: "appearance", label: "Appearance", description: "Theme, density, and accent color.", icon: Paintbrush, destructive: false },
  { id: "billing", label: "Billing", description: "Plan, payment method, and invoices.", icon: CreditCard, destructive: false },
  { id: "danger", label: "Danger zone", description: "Reset progress or delete your account.", icon: TriangleAlert, destructive: true },
] as const

export function SettingsNav() {
  return (
    <nav className="fixed top-[88px] z-10 h-[calc(100vh-104px)] w-56 overflow-auto">
      <div className="flex flex-col gap-0.5">
        <p className="px-2.5 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Settings
        </p>
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex items-start gap-3 rounded-lg px-2.5 py-2 text-left text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <Icon className={cn("mt-0.5 size-4 shrink-0", section.destructive && "text-destructive")} />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium text-foreground">{section.label}</span>
                <span className="truncate text-xs text-muted-foreground">{section.description}</span>
              </div>
              <ChevronRight className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
            </a>
          )
        })}
      </div>
    </nav>
  )
}
