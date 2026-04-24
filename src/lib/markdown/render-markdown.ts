import 'katex/contrib/mhchem'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkWikiLink from 'remark-wiki-link'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { createHighlighter } from 'shiki'
import { sanitizeSchema } from '@/lib/markdown/sanitize-schema'
import { rehypeNarrowDataSrc } from '@/lib/markdown/rehype-narrow-data-src'

const processorPromise = (async () => {
  const highlighter = await createHighlighter({
    themes: ['one-dark-pro', 'github-light'],
    langs: [
      'python', 'typescript', 'javascript', 'tsx', 'jsx',
      'bash', 'shell', 'json', 'css', 'html', 'sql',
      'java', 'c', 'cpp', 'rust', 'go', 'plaintext',
    ],
  })

  const prettyCodeOptions: Options = {
    theme: { dark: 'one-dark-pro', light: 'github-light' },
    defaultLang: 'plaintext',
    getHighlighter: () => Promise.resolve(highlighter),
  }

  return remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkWikiLink, {
      hrefTemplate: (permalink: string) => `/notes/${permalink}`,
      pageResolver: (name: string) => [name.toLowerCase().replace(/\s+/g, '-')],
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeRaw)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeNarrowDataSrc)
    .use(rehypeStringify)
    .freeze()
})()

export async function renderMarkdown(content: string): Promise<string> {
  const processor = await processorPromise
  return String(await processor.process(content))
}
