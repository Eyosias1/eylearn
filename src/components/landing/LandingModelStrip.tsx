import Image from "next/image"
import claudeIcon from "@/assets/models/claude-color.svg"
import deepseekIcon from "@/assets/models/deepseek-color.svg"
import geminiIcon from "@/assets/models/gemini-color.svg"
import grokIcon from "@/assets/models/grok.svg"
import mistralIcon from "@/assets/models/mistral-color.svg"
import openaiIcon from "@/assets/models/openai.svg"
import { cn } from "@/lib/utils"

const models = [
  ["OpenAI", openaiIcon],
  ["Claude", claudeIcon],
  ["Gemini", geminiIcon],
  ["Grok", grokIcon],
  ["Mistral", mistralIcon],
  ["DeepSeek", deepseekIcon],
]

export function LandingModelStrip() {
  return (
    <div className={cn("flex flex-wrap gap-2")}>
      {models.map(([name, icon]) => (
        <div
          key={name as string}
          className={cn("flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs")}
        >
          <Image src={icon} alt="" width={16} height={16} className={cn("size-4")} />
          {name}
        </div>
      ))}
    </div>
  )
}
