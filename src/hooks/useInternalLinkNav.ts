'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useInternalLinkNav(ref: React.RefObject<HTMLDivElement | null>, html: string) {
  const router = useRouter()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href?.startsWith('/notes/')) return
      e.preventDefault()
      router.push(href)
    }

    el.addEventListener('click', onClick)
    return () => {
      el.removeEventListener('click', onClick)
    }
  }, [html, ref, router])
}
