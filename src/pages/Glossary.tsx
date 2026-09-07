import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { glossary } from '../data/glossary'

export default function Glossary() {
  const [q, setQ] = useState('')

  const groups = useMemo(() => {
    const filtered = Object.values(glossary).filter((t) => {
      if (!q.trim()) return true
      const s = q.trim().toLowerCase()
      return t.term.toLowerCase().includes(s) || t.short.toLowerCase().includes(s) || t.full.toLowerCase().includes(s)
    })
    const byLetter: Record<string, typeof filtered> = {}
    for (const t of filtered) {
      const first = t.term[0].toUpperCase()
      if (!byLetter[first]) byLetter[first] = []
      byLetter[first].push(t)
    }
    return Object.entries(byLetter).sort(([a], [b]) => a.localeCompare(b))
  }, [q])

  return (
    <div className="container-museum py-8 md:py-10">
      <h1 className="page-title">Glossary</h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-800/85 leading-relaxed">
        Technical terms used in the exhibit. Alphabetical. Also available as tooltips on any dotted-underlined term in a
        chapter.
      </p>

      <div className="mt-8 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-earth-600" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms…"
            className="w-full rounded-md border border-earth-500/30 bg-parchment-50 pl-9 pr-9 py-2 text-sm focus:border-brass-500 focus:outline-none"
            aria-label="Search glossary"
          />
          {q && (
            <button
              onClick={() => setQ('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-earth-600 hover:text-ink-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="text-xs text-earth-600 mt-2">
          {groups.reduce((n, [, arr]) => n + arr.length, 0)} of {Object.keys(glossary).length} terms
        </div>
      </div>

      <div className="mt-10 md:columns-2 md:gap-x-8">
        {groups.map(([letter, terms]) => (
          <div key={letter} className="mb-6 break-inside-avoid">
            <div className="font-display text-3xl text-brass-600 border-b border-earth-500/20 pb-1 mb-3">{letter}</div>
            <dl className="space-y-4">
              {terms.map((t) => (
                <div key={t.term}>
                  <dt className="font-display text-lg text-ink-900">{t.term}</dt>
                  <dd className="text-sm text-ink-800/85 mt-0.5 leading-relaxed">{t.short}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        {!groups.length && (
          <div className="text-earth-600">No terms match "{q}". Try a shorter query, or clear the search.</div>
        )}
      </div>
    </div>
  )
}
