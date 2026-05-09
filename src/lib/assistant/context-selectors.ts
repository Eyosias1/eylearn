import type { AssistantContext, AssistantRouteType } from '@/types/AssistantContextType'

function toLabel(routeType: AssistantRouteType) {
  const labels: Record<AssistantRouteType, string> = {
    home: 'Home',
    dashboard: 'Dashboard',
    notes: 'Notes',
    note: 'Note',
    whiteboard: 'Whiteboard',
    plan: 'Plan',
    progress: 'Progress',
    graph: 'Graph',
    settings: 'Settings',
    unknown: 'Page',
  }
  return labels[routeType]
}

export function getAssistantContextFromPathname(pathname: string): AssistantContext {
  const parts = pathname.split('/').filter(Boolean)
  const section = parts[0]
  const entitySlug = parts[1]
  let routeType: AssistantRouteType = 'unknown'

  if (!section) routeType = 'home'
  else if (section === 'notes') routeType = entitySlug ? 'note' : 'notes'
  else if (section === 'whiteboard') routeType = 'whiteboard'
  else if (section === 'dashboard') routeType = 'dashboard'
  else if (section === 'plan') routeType = 'plan'
  else if (section === 'progress') routeType = 'progress'
  else if (section === 'graph') routeType = 'graph'
  else if (section === 'settings') routeType = 'settings'

  return {
    pathname,
    routeType,
    label: toLabel(routeType),
    entitySlug: routeType === 'note' || routeType === 'whiteboard' ? entitySlug : undefined,
  }
}
