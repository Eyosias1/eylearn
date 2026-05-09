"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { navSearchItems } from "@/components/layout/nav-config"
import { useBreadcrumbLabel } from "@/providers/breadcrumb-provider"
import { cn } from "@/lib/utils"

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getBreadcrumbItems(pathname: string) {
  const currentItem = navSearchItems.find((item) => {
    return pathname === item.href || pathname.startsWith(`${item.href}/`)
  })
  const baseHref = currentItem?.href ?? `/${pathname.split("/")[1]}`
  const extraSegments = pathname
    .replace(baseHref, "")
    .split("/")
    .filter(Boolean)

  return {
    baseHref,
    currentLabel: currentItem?.label ?? formatSegment(baseHref.replace("/", "")),
    extraLabels: extraSegments.map(formatSegment),
  }
}

function waitsForDynamicLabel(pathname: string) {
  return pathname.startsWith("/whiteboard/")
}

export function AppBreadcrumb() {
  const pathname = usePathname()
  const { label } = useBreadcrumbLabel()
  const { baseHref, currentLabel, extraLabels } = getBreadcrumbItems(pathname)
  const waitsForLabel = waitsForDynamicLabel(pathname)
  const leafLabel = label ?? (waitsForLabel ? null : extraLabels.at(-1)) ?? currentLabel

  return (
    <Breadcrumb
      className={cn(
        // layout
        "hidden min-w-0 md:block",
      )}
    >
      <BreadcrumbList className="min-w-0 flex-nowrap">
        {extraLabels.length > 0 && leafLabel !== currentLabel ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={baseHref}>{currentLabel}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {leafLabel && (
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-48 truncate">
              {leafLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
