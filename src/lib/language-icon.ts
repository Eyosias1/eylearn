import python from '@/lib/icons/python.svg'
import javascript from '@/lib/icons/javascript.svg'
import typescript from '@/lib/icons/typescript.svg'
import java from '@/lib/icons/java.svg'
import c from '@/lib/icons/c.svg'
import ruby from '@/lib/icons/ruby.svg'
import bash from '@/lib/icons/bash.svg'
import css from '@/lib/icons/css.svg'
import html from '@/lib/icons/html5.svg'
import react from '@/lib/icons/react.svg'
import vue from '@/lib/icons/vuejs.svg'
import graphql from '@/lib/icons/graphql.svg'

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
