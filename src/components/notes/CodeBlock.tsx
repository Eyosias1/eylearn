'use client'

import * as React from 'react'
import Image from 'next/image'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { getLanguageIcon } from '@/lib/language-icon'

const COLLAPSE_THRESHOLD = 20
const LINE_HEIGHT_PX = 24

interface CodeBlockProps {
  children: React.ReactNode
  language: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const preRef = React.useRef<HTMLDivElement>(null)
  const [copied, setCopied] = React.useState(false)
  const [lineCount, setLineCount] = React.useState(0)
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    if (!preRef.current) return
    setLineCount(preRef.current.innerText.split('\n').length)
  }, [])

  const collapsible = lineCount > COLLAPSE_THRESHOLD
  const collapsedMaxHeight = COLLAPSE_THRESHOLD * LINE_HEIGHT_PX + 12

  const onCopy = () => {
    if (!preRef.current) return
    navigator.clipboard.writeText(preRef.current.innerText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn(
      // layout
      "not-prose group relative flex flex-col",
      // sizing
      "w-full",
      // spacing
      "my-6",
      // border
      "rounded-xl border border-border overflow-hidden",
      // colors
      "bg-[#ffffff] dark:bg-[#0d1117]",
    )}>
      {/* header */}
      <div className={cn(
        "flex items-center justify-between",
        "h-12 px-4",
        "border-b border-border",
        "bg-[#eaeef2] dark:bg-[#161b22]",
      )}>
        <div className="flex items-center gap-2">
          {getLanguageIcon(language) && (
            <Image src={getLanguageIcon(language)!} alt={language} width={20} height={20} />
          )}
          <span className={cn(
            "font-[family-name:var(--font-jakarta)] text-sm font-semibold capitalize",
            "text-muted-foreground",
          )}>
            {language}
          </span>
        </div>
        <button
          onClick={onCopy}
          className={cn(
            "flex items-center gap-1.5 rounded-md p-1.5",
            "text-muted-foreground transition-colors cursor-pointer",
            "hover:bg-white/10 hover:text-foreground",
          )}
        >
          {copied
            ? <Check className="size-5 text-green-400" />
            : <Copy className="size-5" />
          }
        </button>
      </div>

      {/* code area */}
      <div
        className={cn("relative overflow-x-auto w-full", collapsible && !expanded && "overflow-hidden")}
        style={collapsible && !expanded ? { maxHeight: collapsedMaxHeight } : undefined}
      >
        <div
          ref={preRef}
          className="[&_pre]:!bg-transparent [&_pre]:m-0 [&_pre]:py-4 [&_code]:!bg-transparent [&_code]:[font-family:var(--font-mono)] [&_code]:text-base [&_code]:leading-relaxed"
        >
          {children}
        </div>
      </div>

      {/* fade + collapse */}
      {collapsible && !expanded && (
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none z-10" />
      )}
      {collapsible && (
        <div className="relative flex justify-center z-10">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setExpanded(p => !p)}
            className={cn("relative z-10 gap-1.5 text-xs", expanded ? "top-0" : "-top-4")}
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
