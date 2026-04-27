"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TableVariant = "default" | "ruled"
const TableContext = React.createContext<TableVariant>("default")

function Table({ className, variant = "default", ...props }: React.ComponentProps<"table"> & { variant?: TableVariant }) {
  return (
    <TableContext.Provider value={variant}>
      <div
        data-slot="table-container"
        className={cn(
          // layout
          "relative w-full overflow-x-auto",
          // conditional
          variant === "ruled" && "rounded-xl border overflow-hidden",
        )}
      >
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    </TableContext.Provider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  const variant = React.useContext(TableContext)
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b",
        variant === "ruled" && "bg-muted/30",
        className,
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const variant = React.useContext(TableContext)
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors",
        variant === "default" && "hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        variant === "ruled" && "last:border-0 hover:bg-muted/20",
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  const variant = React.useContext(TableContext)
  return (
    <th
      data-slot="table-head"
      className={cn(
        variant === "default" && "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        variant === "ruled" && "px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  const variant = React.useContext(TableContext)
  return (
    <td
      data-slot="table-cell"
      className={cn(
        variant === "default" && "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        variant === "ruled" && "px-3 py-2.5 align-middle whitespace-nowrap",
        className,
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
