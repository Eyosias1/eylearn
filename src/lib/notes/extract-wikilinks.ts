const WIKILINK_RE = /\[\[([^\]]+)\]\]/g

export function extractWikilinks(content: string): string[] {
  const slugs: string[] = []
  let match: RegExpExecArray | null
  while ((match = WIKILINK_RE.exec(content)) !== null) {
    const slug = match[1].trim().toLowerCase().replace(/\s+/g, "-")
    if (slug) slugs.push(slug)
  }
  return [...new Set(slugs)]
}
