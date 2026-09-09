import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  Command,
  ArrowRight,
  BookText,
  Compass,
  MapIcon,
  Mountain,
  Wrench,
  ScrollText,
  Library,
} from 'lucide-react'
import { primaryNav, secondaryNav } from '../../lib/pages'
import { glossary } from '../../data/glossary'
import { sources } from '../../data/sources'

/*
  Global search modal. ⌘K / Ctrl+K opens it. Escape closes it.
  Indexes:
    - every chapter page (title + intro)
    - every glossary term
    - every bibliography source
  Result rows are clickable and are also driven by ↑ / ↓ / Enter for full
  keyboard use.
*/

type Result =
  | {
      type: 'page'
      label: string
      hint: string
      to: string
      Icon: React.ComponentType<any>
    }
  | {
      type: 'glossary'
      label: string
      hint: string
      to: string
      Icon: React.ComponentType<any>
    }
  | {
      type: 'source'
      label: string
      hint: string
      to: string
      Icon: React.ComponentType<any>
    }

const PAGE_HINTS: Record<string, string> = {
  '/': 'The question the survey set out to answer.',
  '/innovation': 'The problem, how triangulation works, and the instruments.',
  '/impact': 'The framework across a subcontinent, and the people who ran it.',
  '/change': 'Peak XV, what continued afterwards, and why it matters now.',
  '/tools': 'Every interactive model in one place, with its explanation.',
  '/sources': 'Annotated bibliography. Primary and secondary.',
  '/glossary': 'Every technical term used on the site, A to Z.',
  '/process': 'How the site was built. Not part of the exhibit narrative.',
}

const PAGE_ICONS: Record<string, React.ComponentType<any>> = {
  '/': Compass,
  '/innovation': Compass,
  '/impact': MapIcon,
  '/change': Mountain,
  '/tools': Wrench,
  '/sources': Library,
  '/glossary': BookText,
  '/process': ScrollText,
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      // Focus the input on the next tick so it lands in the right place.
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase()
    const pages: Result[] = [...primaryNav, ...secondaryNav].map((p) => ({
      type: 'page' as const,
      label: p.label,
      hint: PAGE_HINTS[p.to] || '',
      to: p.to,
      Icon: PAGE_ICONS[p.to] || Compass,
    }))
    const glossaryRows: Result[] = Object.values(glossary).map((t) => ({
      type: 'glossary' as const,
      label: t.term,
      hint: t.short,
      to: '/glossary',
      Icon: BookText,
    }))
    const sourceRows: Result[] = sources.map((s) => ({
      type: 'source' as const,
      label: s.citation.split('.')[0],
      hint: s.contribution,
      to: '/sources',
      Icon: Library,
    }))
    const all = [...pages, ...glossaryRows, ...sourceRows]
    if (!term) return all.slice(0, 12)
    return all.filter((r) => (r.label + ' ' + r.hint).toLowerCase().includes(term)).slice(0, 20)
  }, [q])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, results.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const r = results[active]
        if (r) {
          nav(r.to)
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, nav, onClose])

  useEffect(() => {
    setActive(0)
  }, [q])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm p-4 flex items-start justify-center animate-page-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mt-[10vh] card-parchment overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-earth-500/25 px-4 py-3">
          <Search className="w-4 h-4 text-earth-600 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages, terms, sources…"
            className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-earth-600/70"
            aria-label="Search"
          />
          <kbd className="hidden sm:inline text-[10px] text-earth-600 border border-earth-500/30 rounded px-1.5 py-0.5">
            ESC
          </kbd>
          <button onClick={onClose} aria-label="Close search" className="text-earth-600 hover:text-ink-900">
            <X className="w-4 h-4" />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto py-2">
          {results.map((r, i) => {
            const Icon = r.Icon
            const isActive = i === active
            return (
              <li key={i}>
                <button
                  onClick={() => {
                    nav(r.to)
                    onClose()
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2 ${
                    isActive ? 'bg-parchment-200/80' : 'hover:bg-parchment-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-brass-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-sm text-ink-900 truncate">{r.label}</div>
                    <div className="text-xs text-earth-600 truncate">{r.hint}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-earth-600">{r.type}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-earth-600 opacity-60" />
                </button>
              </li>
            )
          })}
          {!results.length && <li className="px-4 py-6 text-center text-sm text-earth-600">Nothing matches “{q}”.</li>}
        </ul>
        <div className="border-t border-earth-500/25 px-4 py-2 text-[10px] text-earth-600 flex items-center gap-2">
          <kbd className="border border-earth-500/30 rounded px-1.5">↑ ↓</kbd> navigate
          <kbd className="border border-earth-500/30 rounded px-1.5">↵</kbd> open
          <span className="ml-auto flex items-center gap-1">
            <Command className="w-3 h-3" /> K to reopen
          </span>
        </div>
      </div>
    </div>
  )
}
