'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { getLanguageIcon } from '@/lib/language-icon'

const COLLAPSE_THRESHOLD = 20
const LINE_HEIGHT_PX = 24

export function CodeBlock({ language, preHtml }: { language: string; preHtml: string }) {
  const preRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [lineCount, setLineCount] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const icon = getLanguageIcon(language)

  useEffect(() => {
    if (!preRef.current) return
    setLineCount(preRef.current.innerText.split('\n').length)
  }, [preHtml])

  const collapsible = lineCount > COLLAPSE_THRESHOLD
  const collapsedMaxHeight = COLLAPSE_THRESHOLD * LINE_HEIGHT_PX + 12

  const onCopy = async () => {
    if (!preRef.current) return
    await navigator.clipboard.writeText(preRef.current.innerText)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="note-code-block not-prose group relative my-6 flex w-full flex-col overflow-hidden rounded-xl border border-border bg-[#ffffff] dark:bg-[#0d1117]">
      <div className="flex h-12 items-center justify-between border-b border-border bg-[#eaeef2] px-4 dark:bg-[#161b22]">
        <div className="flex items-center gap-2">
          {icon && <Image src={icon} alt={language} width={20} height={20} />}
          <span className="font-[family-name:var(--font-jakarta)] text-sm font-semibold capitalize text-muted-foreground">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={() => void onCopy()}
          className="flex cursor-pointer items-center gap-1.5 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          {copied ? <Check className="size-5 text-green-400" /> : <Copy className="size-5" />}
        </button>
      </div>
      <div
        className={cn('relative w-full overflow-x-auto', collapsible && !expanded && 'overflow-hidden')}
        style={collapsible && !expanded ? { maxHeight: collapsedMaxHeight } : undefined}
      >
        <div
          ref={preRef}
          className="[&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:py-4 [&_code]:!bg-transparent [&_code]:text-base [&_code]:leading-relaxed [&_code]:[font-family:var(--font-mono)]"
          dangerouslySetInnerHTML={{ __html: preHtml }}
        />
      </div>
      {collapsible && !expanded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-[#0d1117] to-transparent" />
      )}
      {collapsible && (
        <div className="relative z-10 flex justify-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpanded(value => !value)}
            className={cn('relative z-10 gap-1.5 text-xs', expanded ? 'top-0' : '-top-4')}
          >
            {expanded
              ? <><ChevronUp className="size-3.5" /> Show less</>
              : <><ChevronDown className="size-3.5" /> Show more</>
            }
          </Button>
        </div>
      )}
    </div>
  )
}
