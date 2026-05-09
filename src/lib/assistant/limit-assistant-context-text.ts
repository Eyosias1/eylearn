const MAX_ASSISTANT_CONTEXT_CHARS = 12000

export function limitAssistantContextText(content: string) {
  if (content.length <= MAX_ASSISTANT_CONTEXT_CHARS) {
    return { content, truncated: false }
  }

  return {
    content: content.slice(0, MAX_ASSISTANT_CONTEXT_CHARS),
    truncated: true,
  }
}
