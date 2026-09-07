import type { ReactNode } from 'react'
import EpistemicBadge, { type EpistemicKind, type SourceRef } from './EpistemicBadge'
import FlashOnChange from './FlashOnChange'

export type Readout = { label: string; value: string }

/*
  Two-column frame used by every tool on the Try the tools page.
    left  : the interactive itself, its controls and its live diagram
    right : plain-language explanation, the live calculated output, and the
            epistemic label, which stays on screen rather than hiding in a
            tooltip.
  On narrow screens the columns stack, tool first, explanation underneath.
*/
export default function ToolPanel({
  id,
  n,
  title,
  question,
  kind,
  claim,
  note,
  sources,
  explain,
  readouts,
  footer,
  children,
}: {
  id: string
  n: number
  title: string
  question: string
  kind: EpistemicKind
  claim: string
  note: string
  sources?: SourceRef[]
  explain: ReactNode
  readouts?: Readout[]
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-earth-500/20 pt-10 mt-10 first:border-0 first:pt-0 first:mt-0"
    >
      <div className="flex items-baseline gap-3 mb-1">
        <span className="field-num">{String(n).padStart(2, '0')}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <p className="lede mb-6">{question}</p>

      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 items-start">
        <div className="min-w-0">{children}</div>

        <aside className="lg:sticky lg:top-24 space-y-4 min-w-0">
          <div className="card-parchment p-5">
            <EpistemicBadge kind={kind} claim={claim} note={note} sources={sources} />
            <div className="mt-4 space-y-3 body-text max-w-none">{explain}</div>
          </div>

          {readouts && readouts.length > 0 && (
            <div className="rounded-md border border-ink-900/15 bg-ink-900 text-parchment-50 p-5">
              <div className="text-[0.75rem] uppercase tracking-[0.2em] text-brass-400 mb-3">Live result</div>
              <dl className="space-y-2.5">
                {readouts.map((r) => (
                  <FlashOnChange
                    key={r.label}
                    value={r.value}
                    className="flex items-baseline justify-between gap-4 px-1.5 -mx-1.5 py-0.5 -my-0.5"
                  >
                    <dt className="text-[0.92rem] text-parchment-200/85">{r.label}</dt>
                    <dd className="font-mono text-[1.05rem] text-brass-300 tabular-nums text-right">{r.value}</dd>
                  </FlashOnChange>
                ))}
              </dl>
            </div>
          )}

          {footer}
        </aside>
      </div>
    </section>
  )
}
