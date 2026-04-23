'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function useInternalLinkNav(ref: React.RefObject<HTMLDivElement | null>, html: string) {
  const router = useRouter()
  const prefetched = useRef(new Set<string>())

  useEffect(() => {
    const el = ref.current
    if (!el) return
    prefetched.current.clear()

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href?.startsWith('/notes/')) return
      e.preventDefault()
      router.push(href)
    }

    const onHover = (e: MouseEvent | FocusEvent) => {
      const a = (e.target as Element).closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href?.startsWith('/notes/')) return
      if (prefetched.current.has(href)) return
      prefetched.current.add(href)
      router.prefetch(href)
    }

    el.addEventListener('click', onClick)
    el.addEventListener('mouseover', onHover as EventListener)
    el.addEventListener('focus', onHover as EventListener, true)
    return () => {
      el.removeEventListener('click', onClick)
      el.removeEventListener('mouseover', onHover as EventListener)
      el.removeEventListener('focus', onHover as EventListener, true)
    }
  }, [html, router])
}
