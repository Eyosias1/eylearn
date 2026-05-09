import type { KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface WhiteboardCardTitleInputProps {
  value: string
  disabled: boolean
  onChange: (value: string) => void
  onBlur: () => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}

export function WhiteboardCardTitleInput({
  value,
  disabled,
  onBlur,
  onChange,
  onKeyDown,
}: WhiteboardCardTitleInputProps) {
  return (
    <Input
      autoFocus
      value={value}
      onChange={event => onChange(event.target.value)}
      onBlur={onBlur}
      onClick={event => event.preventDefault()}
      onPointerDown={event => event.stopPropagation()}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className={cn(
        // sizing
        "h-8",
        // spacing
        "px-0",
        // typography
        "text-base font-medium",
        // border
        "border-transparent",
        // animation
        "shadow-none",
        // focus
        "focus-visible:border-input focus-visible:px-2.5",
      )}
      aria-label="Board title"
    />
  )
}
