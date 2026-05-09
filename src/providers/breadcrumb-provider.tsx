"use client"

import { createContext, useContext, useState } from "react"

interface BreadcrumbContextValue {
  label: string | null
  setLabel: (label: string | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null)

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [label, setLabel] = useState<string | null>(null)

  return (
    <BreadcrumbContext.Provider value={{ label, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbLabel() {
  const context = useContext(BreadcrumbContext)
  if (!context) throw new Error("useBreadcrumbLabel must be used inside BreadcrumbProvider")
  return context
}
