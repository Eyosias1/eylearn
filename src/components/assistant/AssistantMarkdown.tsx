'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

export function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className={cn(
      // sizing
      "max-w-none",
      // typography
      "prose prose-sm prose-neutral dark:prose-invert",
      // colors
      "text-foreground",
      // prose spacing
      "prose-p:my-3 prose-li:my-1 prose-ul:my-3 prose-ol:my-3",
      // code
      "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none",
      // pre
      "prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-muted",
    )}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
