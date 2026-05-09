import { Bell, CreditCard, Paintbrush, User } from "lucide-react"

export const settingsNavItems = [
  {
    href: "/settings/profile",
    label: "Profile",
    description: "Your name, photo, and primary exam goal.",
    icon: User,
    destructive: false,
  },
  {
    href: "/settings/notifications",
    label: "Notifications",
    description: "Email notifications.",
    icon: Bell,
    destructive: false,
  },
  {
    href: "/settings/appearance",
    label: "Appearance",
    description: "Theme and accent color.",
    icon: Paintbrush,
    destructive: false,
  },
  {
    href: "/settings/billing",
    label: "Billing",
    description: "Plan, payment method, and invoices.",
    icon: CreditCard,
    destructive: false,
  },
] as const
