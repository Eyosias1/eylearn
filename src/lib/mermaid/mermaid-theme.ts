import type { MermaidConfig } from 'mermaid'

function isDark() {
  return document.documentElement.classList.contains('dark')
}

export function getMermaidConfig(): MermaidConfig {
  const dark = isDark()

  return {
    startOnLoad: false,
    theme: 'base',
    themeVariables: dark ? {
      // darkMode OFF — we control all colors manually so it doesn't override background
      darkMode:            false,
      background:          '#0a0a0a',
      primaryColor:        '#1e3a5f',
      primaryBorderColor:  '#60a5fa',
      primaryTextColor:    '#ffffff',
      secondaryColor:      '#3b1f5e',
      tertiaryColor:       '#14432a',
      lineColor:           '#94a3b8',
      titleColor:          '#f1f5f9',
      noteBkgColor:        '#1e293b',
      noteTextColor:       '#f1f5f9',
      fontFamily:          'var(--font-jakarta, sans-serif)',
      fontSize:            '14px',
    } : {
      darkMode:            false,
      background:          '#ffffff',
      // rectangles
      primaryColor:        '#eef2ff',
      primaryBorderColor:  '#6366f1',
      primaryTextColor:    '#1e1b4b',
      // diamonds
      secondaryColor:      '#fdf4ff',
      secondaryBorderColor:'#a855f7',
      secondaryTextColor:  '#3b0764',
      // other shapes
      tertiaryColor:       '#ecfdf5',
      tertiaryBorderColor: '#10b981',
      tertiaryTextColor:   '#064e3b',
      lineColor:           '#94a3b8',
      titleColor:          '#1e1b4b',
      noteBkgColor:        '#eef2ff',
      noteTextColor:       '#1e1b4b',
      fontFamily:          'var(--font-jakarta, sans-serif)',
      fontSize:            '14px',
    },
  }
}
