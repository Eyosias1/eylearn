"use client"

import { useEffect } from "react"
import { useBreadcrumbLabel } from "@/providers/breadcrumb-provider"

interface BreadcrumbLabelProps {
  label: string | null
  fallback: string
}

export function BreadcrumbLabel({ label, fallback }: BreadcrumbLabelProps) {
  const { setLabel } = useBreadcrumbLabel()

  useEffect(() => {
    setLabel(label?.trim() || fallback)
    return () => setLabel(null)
  }, [fallback, label, setLabel])

  return null
}
