import { useEffect, useRef, useState } from 'react'
import { CircleCheck, Compass, FlaskConical, X } from 'lucide-react'

/*
  EpistemicBadge — the site's evidence-transparency primitive.

  Every simulation, chart, and strong claim carries one of three honest labels:
    - verified        VERIFIED HISTORICAL DATA   (traceable to a cited source)
    - reconstruction  HISTORICAL RECONSTRUCTION  (built from documented method/values)
    - illustrative    ILLUSTRATIVE MODEL         (teaches the method; values invented)

  The badge is small and quiet by default. Click it to open a source note that
  states the claim, its classification, and where the evidence comes from — so
  the strongest interactive features are auditable without a wall of citations.
*/

export type EpistemicKind = 'verified' | 'reconstruction' | 'illustrative'

const META: Record<
  EpistemicKind,
  {
    label: string
    Icon: typeof Compass
    ring: string
    text: string
    dot: string
  }
> = {
  verified: {
    label: 'Verified historical record',
    Icon: CircleCheck,
    ring: 'border-emerald-800/30 bg-emerald-900/5 text-emerald-900/90',
    text: 'text-emerald-900',
    dot: 'bg-emerald-700',
  },
  reconstruction: {
    label: 'Reconstruction from records',
    Icon: Compass,
    ring: 'border-brass-600/40 bg-brass-500/10 text-brass-700',
    text: 'text-brass-700',
    dot: 'bg-brass-600',
  },
  illustrative: {
    label: 'Example model',
    Icon: FlaskConical,
    ring: 'border-earth-500/40 bg-parchment-200/50 text-earth-700',
    text: 'text-earth-700',
    dot: 'bg-earth-500',
  },
}

export type SourceRef = {
  text: string
  type?: 'Primary' | 'Secondary'
  needed?: boolean
  url?: string
}

export default function EpistemicBadge({
  kind,
  claim,
  note,
  sources,
  className = '',
}: {
  kind: EpistemicKind
  claim: string
  note: string
  sources?: SourceRef[]
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const m = META[kind]

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={ref} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Evidence: ${m.label}. Open source note.`}
        className={`group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${m.ring} hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-brass-500 focus:ring-offset-1 focus:ring-offset-parchment-50`}
      >
        <m.Icon className="w-3 h-3" />
        {m.label}
        <span className="ml-0.5 text-[9px] opacity-60 group-hover:opacity-100">ⓘ</span>
      </button>

      {open && (
        <span
          role="dialog"
          aria-label="Source note"
          className="absolute left-0 top-full z-50 mt-2 w-80 max-w-[86vw] rounded-lg border border-ink-900/15 bg-parchment-50 p-4 text-left shadow-2xl animate-page-in"
        >
          <span className="flex items-start justify-between gap-3">
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${m.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
              {m.label}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-earth-600 hover:text-ink-900 -mt-1 -mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>

          <span className="mt-2 block font-display text-sm text-ink-900 leading-snug">{claim}</span>
          <span className="mt-1.5 block text-xs text-ink-800/85 leading-relaxed">{note}</span>

          {sources && sources.length > 0 && (
            <span className="mt-3 block border-t border-earth-500/20 pt-2">
              <span className="block text-[10px] uppercase tracking-widest text-earth-600 mb-1">
                {kind === 'illustrative' ? 'Method sources' : 'Sources'}
              </span>
              <ul className="space-y-1">
                {sources.map((s, i) => (
                  <li key={i} className="text-[11px] leading-snug text-ink-800/85 flex gap-1.5">
                    <span className="text-brass-600 shrink-0">{s.needed ? '○' : '•'}</span>
                    <span>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brass-700 hover:underline"
                        >
                          {s.text}
                        </a>
                      ) : (
                        s.text
                      )}
                      {s.type && <span className="text-earth-600"> · {s.type}</span>}
                      {s.needed && <span className="text-earth-600 italic"> · needs a direct citation</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </span>
          )}
        </span>
      )}
    </span>
  )
}
