'use client'

import { usePathname } from 'next/navigation'
import { getAssistantContextFromPathname } from '@/lib/assistant/context-selectors'

export function useAssistantContext() {
  const pathname = usePathname()
  return getAssistantContextFromPathname(pathname)
}
