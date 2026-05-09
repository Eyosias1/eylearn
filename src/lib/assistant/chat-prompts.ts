import type { AssistantPageContext } from '@/types/AssistantContextType'

export const ASSISTANT_SYSTEM_PROMPT = [
  'You are the eyLearn assistant.',
  'Help the user understand, improve, and study the current page.',
  'Be concise, practical, and specific to the available page context.',
  'Do not claim you edited notes or files. You can suggest edits, but tools are not enabled yet.',
].join('\n')

export function formatAssistantPageContext(context: AssistantPageContext | null) {
  if (!context) return 'No registered page context is available.'

  if (context.routeType === 'note') {
    return [
      `Page: ${context.label}`,
      `Slug: ${context.entitySlug}`,
      `Title: ${context.title}`,
      `Subject: ${context.subject}`,
      `Topic: ${context.topic}`,
      `Tags: ${context.tags.join(', ') || 'none'}`,
      `Status: ${context.status}`,
      `Difficulty: ${context.difficulty}`,
      `Source: ${context.source}`,
      `Draft state: ${context.isDirty ? 'unsaved draft' : 'saved/current'}`,
      `Truncated: ${context.truncated ? 'yes' : 'no'}`,
      '',
      'Current note markdown:',
      context.content,
    ].join('\n')
  }

  return `Page: ${context.label}\nPath: ${context.pathname}`
}
