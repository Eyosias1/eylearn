import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

type GradeItem   = { id: string; round: 1 | 2; body: string; correctAnswer: string; studentAnswer: string }
type GradeResult = { id: string; round: 1 | 2; rating: "correct" | "partial" | "missed"; feedback: string }

const SYSTEM = `You are grading student answers for a study session.
Rate each answer as "correct", "partial", or "missed".
- "correct": correct and captures the key idea
- "partial": shows understanding but misses important details
- "missed": wrong, blank, or completely off-track
Keep feedback to 1–2 sentences. Focus on what was missing, not what was right.
Return only valid JSON, no other text.`

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 })
  }
  const { items } = await request.json() as { items: GradeItem[] }
  if (!items?.length) return Response.json({ grades: [] })

  const prompt = `Grade these answers and return JSON: {"grades": [{"id": "...", "round": 1, "rating": "...", "feedback": "..."}]}

${items.map(item => `ID: ${item.id}
Round: ${item.round}
Question: ${item.body}
Correct: ${item.correctAnswer}
Student: ${item.studentAnswer || "(no answer)"}`).join("\n\n")}`

  try {
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: SYSTEM,
      prompt,
    })
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim()
    const parsed  = JSON.parse(cleaned) as { grades: GradeResult[] }
    return Response.json(parsed)
  } catch (err) {
    console.error("[grade route]", err)
    return Response.json({ grades: [] })
  }
}
