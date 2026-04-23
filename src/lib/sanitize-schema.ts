import { defaultSchema } from 'rehype-sanitize'

const mathmlTags = [
  'math', 'semantics', 'annotation', 'mrow', 'mi', 'mo', 'mn', 'ms', 'mtext',
  'msup', 'msub', 'msubsup', 'mfrac', 'msqrt', 'mroot', 'munder', 'mover',
  'munderover', 'mpadded', 'mphantom', 'mtable', 'mtr', 'mtd', 'mspace', 'menclose',
]

const svgTags = ['svg', 'path', 'line', 'g', 'rect', 'circle']

// HAST property names (camelCase) for rehype-pretty-code data-* attributes
const prettyCodeProps = [
  'dataRehypePrettyCodeFigure', 'dataRehypePrettyCodeFragment',
  'dataLanguage', 'dataTheme', 'dataLine', 'dataHighlightedLine',
  'dataHighlightedChars', 'dataLineNumbers', 'dataLineNumbersMaxDigits',
]

export const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    ...mathmlTags,
    ...svgTags,
    'figure',
    'figcaption',
  ],
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...(defaultSchema.attributes?.['*'] ?? []),
      'className', 'style', 'ariaHidden', 'mathvariant',
      ...prettyCodeProps,
    ],
    math: [...(defaultSchema.attributes?.math ?? []), 'xmlns', 'display'],
    annotation: [...(defaultSchema.attributes?.annotation ?? []), 'encoding'],
    svg: ['viewBox', 'xmlns', 'width', 'height', 'preserveAspectRatio'],
    path: ['d', 'fill', 'stroke'],
    line: ['x1', 'y1', 'x2', 'y2', 'stroke'],
    g: ['fill', 'stroke'],
    rect: ['x', 'y', 'width', 'height', 'fill', 'stroke'],
    circle: ['cx', 'cy', 'r', 'fill', 'stroke'],
    img: [...(defaultSchema.attributes?.img ?? ['alt', 'src', 'width', 'height']), 'src'],
    th: [...(defaultSchema.attributes?.th ?? []), 'align'],
    td: [...(defaultSchema.attributes?.td ?? []), 'align'],
  },
  protocols: {
    ...defaultSchema.protocols,
    // narrowed further by rehype-narrow-data-src to svg+xml;base64 only
    src: [...(defaultSchema.protocols?.src ?? ['http', 'https']), 'data'],
  },
}
