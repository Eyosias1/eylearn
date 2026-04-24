import {
  LayoutDashboard,
  Brain,
  Network,
  BookOpen,
  PlusCircle,
  CalendarDays,
  Library,
  Settings,
  FileText,
  Pencil,
} from "lucide-react"
import { NavGroup } from "@/types/nav"

export const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard",       href: "/dashboard", icon: LayoutDashboard },
      { label: "Progress",        href: "/progress",  icon: Brain           },
      { label: "Knowledge Graph", href: "/graph",     icon: Network         },
      { label: "Study Plan",      href: "/plan",      icon: CalendarDays    },
    ],
  },
  {
    title: "Study",
    items: [
      { label: "Notes",         href: "/notes",       icon: FileText  },
      { label: "Whiteboard",    href: "/whiteboard",  icon: Pencil    },
      { label: "Study Session", href: "/session",     icon: BookOpen  },
      { label: "Add Content",   href: "/content/new", icon: PlusCircle },
      { label: "Subjects",      href: "/subjects",    icon: Library   },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
]
