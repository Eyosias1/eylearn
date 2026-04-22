import 'katex/contrib/mhchem'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkWikiLink from 'remark-wiki-link'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkWikiLink, {
      hrefTemplate: (permalink: string) => `/notes/${permalink}`,
      pageResolver: (name: string) => [name.toLowerCase().replace(/\s+/g, '-')],
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: { dark: 'one-dark-pro', light: 'github-light' },
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return result.toString()
}
