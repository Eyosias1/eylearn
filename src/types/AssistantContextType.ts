export type AssistantRouteType =
  | 'home'
  | 'dashboard'
  | 'notes'
  | 'note'
  | 'whiteboard'
  | 'plan'
  | 'progress'
  | 'graph'
  | 'settings'
  | 'unknown'

export interface AssistantContext {
  pathname: string
  routeType: AssistantRouteType
  label: string
  entitySlug?: string
}

export interface AssistantNoteContext extends AssistantContext {
  routeType: 'note'
  entitySlug: string
  title: string
  subject: string
  topic: string
  tags: string[]
  status: string
  difficulty: string
  content: string
  source: 'current-editor'
  isDirty: boolean
  truncated: boolean
}

export type AssistantPageContext = AssistantNoteContext
