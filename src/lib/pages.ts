export type PageMeta = { to: string; label: string; blurb?: string }

export const NHD_THEME = 'Innovation in History: Impact, Influence, Change'
export const SITE_NAME = 'The Great Trigonometrical Survey'
export const SITE_NAME_FULL = 'The Great Trigonometrical Survey of India'

/*
  Five top-level destinations, named after the theme's own words.
  The old nine-chapter list was consolidated: Problem + Triangulation +
  Instruments -> Innovation; Survey + People -> Impact; Everest + Legacy +
  Synthesis -> Change. Tools, Glossary, and the build-notes page are reachable
  from in-page links and the footer, not the primary nav.
*/
export const primaryNav: PageMeta[] = [
  { to: '/', label: 'Home', blurb: 'The question the survey set out to answer.' },
  { to: '/innovation', label: 'Innovation', blurb: 'What the survey built, and why it counted as new.' },
  { to: '/impact', label: 'Impact', blurb: 'One framework across a subcontinent, and the workforce that ran it.' },
  { to: '/change', label: 'Change', blurb: 'A mountain measured from a desk, and what came after.' },
  { to: '/sources', label: 'Sources', blurb: 'Every claim, and the evidence behind it.' },
]

// Secondary destinations: linked from the pages and the footer.
export const secondaryNav: PageMeta[] = [
  { to: '/tools', label: 'Try the tools', blurb: 'Every interactive model in one place.' },
  { to: '/glossary', label: 'Glossary', blurb: 'Technical terms, defined plainly.' },
  {
    to: '/process',
    label: 'Process & build notes',
    blurb: 'How the site was made. Not part of the exhibit narrative.',
  },
]

// Reading order for the prev/next arrows at the foot of each page.
export const pageOrder: PageMeta[] = [
  ...primaryNav.slice(0, 4),
  { to: '/tools', label: 'Try the tools' },
  { to: '/sources', label: 'Sources' },
]

export function neighbours(pathname: string) {
  const idx = pageOrder.findIndex((p) => p.to === pathname)
  if (idx < 0) return { idx: 0, prev: null, next: null, current: null, total: pageOrder.length }
  return {
    idx,
    prev: idx > 0 ? pageOrder[idx - 1] : null,
    next: idx < pageOrder.length - 1 ? pageOrder[idx + 1] : null,
    current: pageOrder[idx],
    total: pageOrder.length,
  }
}

// In-page section maps, used by SectionNav and by the search index.
export type SectionMeta = { id: string; label: string }

export const pageSections: Record<string, SectionMeta[]> = {
  '/innovation': [
    { id: 'problem', label: 'The problem' },
    { id: 'method', label: 'How it worked' },
    { id: 'instruments', label: 'The instruments' },
  ],
  '/impact': [
    { id: 'framework', label: 'The framework' },
    { id: 'people', label: 'Who did the work' },
  ],
  '/change': [
    { id: 'peak', label: 'Peak XV' },
    { id: 'after', label: 'What continued' },
    { id: 'today', label: 'Why it matters now' },
  ],
}
