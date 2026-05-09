"use client"

import { useState } from "react"
import { CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImportCalendarModal } from "@/components/plan/calendar/import/import-calendar-modal"

export function ImportCalendarButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <CalendarPlus className="size-4 mr-2" />
        Import Calendar
      </Button>
      {open && <ImportCalendarModal onClose={() => setOpen(false)} />}
    </>
  )
}
