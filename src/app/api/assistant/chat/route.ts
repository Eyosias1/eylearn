import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { ASSISTANT_SYSTEM_PROMPT, formatAssistantPageContext } from '@/lib/assistant/chat-prompts'
import { getAnthropicModelId, getAssistantModelProvider, getGoogleModelId, getOpenAIModelId } from '@/lib/assistant/model-map'
import type { AssistantChatRequest } from '@/types/AssistantChatType'

const textHeaders = { 'Content-Type': 'text/plain; charset=utf-8' }

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return 'The model request failed.'
}

function createTextResponse(content: string) {
  return new Response(content, { headers: textHeaders })
}

function createModel(body: AssistantChatRequest, modelId?: string) {
  const provider = getAssistantModelProvider(body.model)
  if (provider === 'anthropic') return anthropic(modelId ?? getAnthropicModelId(body.model))
  if (provider === 'google') return google(modelId ?? getGoogleModelId(body.model))
  return openai(modelId ?? getOpenAIModelId(body.model))
}

function streamToResponse(stream: AsyncIterable<string>) {
  const encoder = new TextEncoder()
  return new Response(new ReadableStream({
    async pull(controller) {
      for await (const chunk of stream) controller.enqueue(encoder.encode(chunk))
      controller.close()
    },
  }), { headers: textHeaders })
}

function streamAssistantText(body: AssistantChatRequest) {
  return streamText({
    model: createModel(body),
    system: `${ASSISTANT_SYSTEM_PROMPT}\n\nPage context:\n${formatAssistantPageContext(body.pageContext)}`,
    messages: body.messages.map(message => ({ role: message.role, content: message.content })),
  })
}

export async function POST(request: Request) {
  const body = await request.json() as AssistantChatRequest
  const provider = getAssistantModelProvider(body.model)
  if (provider === 'openai' && !process.env.OPENAI_API_KEY) return createTextResponse('OPENAI_API_KEY is not set. Add it to `.env.local` to enable real assistant responses.')
  if (provider === 'anthropic' && !process.env.ANTHROPIC_API_KEY) return createTextResponse('ANTHROPIC_API_KEY is not set. Add it to `.env.local` to use Claude.')
  if (provider === 'google' && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) return createTextResponse('GOOGLE_GENERATIVE_AI_API_KEY is not set. Add it to `.env.local` to use Gemini.')

  try {
    return streamToResponse(streamAssistantText(body).textStream)
  } catch (error) {
    return createTextResponse(`Model request failed: ${getErrorMessage(error)}`)
  }
}
