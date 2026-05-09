"use client"

import { useRouter } from "next/navigation"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { navSearchItems } from "@/components/layout/nav-config"

interface SearchPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchPalette({ open, onOpenChange }: SearchPaletteProps) {
  const router = useRouter()

  function handleSelect(href: string) {
    router.push(href)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search">
      <Command>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {navSearchItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => handleSelect(item.href)}
                >
                  <Icon className="size-4" />
                  {item.label}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
