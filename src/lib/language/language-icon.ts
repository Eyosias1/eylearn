import python from '@/lib/language/icons/python.svg'
import javascript from '@/lib/language/icons/javascript.svg'
import typescript from '@/lib/language/icons/typescript.svg'
import java from '@/lib/language/icons/java.svg'
import c from '@/lib/language/icons/c.svg'
import ruby from '@/lib/language/icons/ruby.svg'
import bash from '@/lib/language/icons/bash.svg'
import css from '@/lib/language/icons/css.svg'
import html from '@/lib/language/icons/html5.svg'
import react from '@/lib/language/icons/react.svg'
import vue from '@/lib/language/icons/vuejs.svg'
import graphql from '@/lib/language/icons/graphql.svg'

const icons: Record<string, string> = {
  python,
  javascript, js: javascript,
  typescript, ts: typescript,
  java,
  c, cpp: c,
  ruby,
  bash, shell: bash, sh: bash, zsh: bash,
  css,
  html,
  jsx: react, tsx: react, react,
  vue,
  graphql,
}

export function getLanguageIcon(lang: string): string | null {
  return icons[lang.toLowerCase()] ?? null
}
