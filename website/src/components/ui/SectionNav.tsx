import { useEffect, useState } from 'react'
import type { SectionMeta } from '../../lib/pages'
import { cn } from '../../lib/utils'

/*
  Sticky in-page tab strip for the three merged pages. Highlights whichever
  section is currently under the top of the viewport, so a reader always knows
  where they are inside a long page and can jump without scrolling past it.
*/
export default function SectionNav({ sections }: { sections: SectionMeta[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const onScroll = () => {
      let current = sections[0]?.id ?? ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 160) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  return (
    <div
      className="sticky top-[3.5rem] z-30 -mx-6 md:-mx-10 lg:-mx-14 mb-8
                    border-b border-earth-500/20 bg-parchment-50/95 backdrop-blur-sm"
    >
      <nav className="container-museum flex gap-1 overflow-x-auto py-2" aria-label="Sections on this page">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              'whitespace-nowrap rounded-md px-3 py-1.5 text-[0.95rem] transition-colors flex items-center gap-2',
              active === s.id
                ? 'bg-ink-900 text-parchment-50'
                : 'text-ink-800/75 hover:bg-parchment-200/70 hover:text-ink-900',
            )}
          >
            <span className={cn('font-mono text-[0.75rem]', active === s.id ? 'text-brass-300' : 'text-brass-600')}>
              0{i + 1}
            </span>
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
