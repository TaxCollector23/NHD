import { ExternalLink } from 'lucide-react'
import { sources, sourceTypes, tierRank, type Source, type SourceTier } from '../../data/sources'

/*
  Annotated bibliography. Groups by type, sorts Core → Supporting → Consulted
  within each group, and shows each entry's contribution beside its citation so
  the annotation is readable without hovering. MLA 9 conventions on the
  citation string itself; the surrounding UI is the annotation layer.
*/
export default function Bibliography() {
  const grouped = sourceTypes
    .map((type) => ({
      type,
      items: sources
        .filter((s) => s.type === type)
        .sort((a, b) => tierRank[a.tier] - tierRank[b.tier]),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="space-y-14">
      <TierLegend />

      {grouped.map((group) => (
        <section key={group.type} aria-label={group.type}>
          <header className="flex items-baseline justify-between gap-4 border-b border-earth-500/25 pb-2 mb-6">
            <h2 className="font-display text-[1.6rem] text-ink-900">{group.type}</h2>
            <span className="note-text tabular-nums">
              {group.items.length} {group.items.length === 1 ? 'source' : 'sources'}
            </span>
          </header>

          <ol className="space-y-6">
            {group.items.map((s) => (
              <SourceEntry key={s.id} source={s} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function SourceEntry({ source }: { source: Source }) {
  return (
    <li id={source.id} className="grid md:grid-cols-[7.5rem_1fr] gap-x-6 gap-y-2 scroll-mt-28">
      <div className="pt-0.5">
        <TierBadge tier={source.tier} />
      </div>
      <div>
        <p className="text-[0.98rem] leading-relaxed text-ink-900 pl-7 -indent-7">
          {source.citation}
          {source.link && (
            <>
              {' '}
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-1 text-brass-700 hover:underline"
              >
                Open
                <ExternalLink className="w-3 h-3 translate-y-[1px]" aria-hidden />
              </a>
            </>
          )}
        </p>
        <p className="mt-1.5 text-[0.9rem] text-ink-800/85 leading-relaxed border-l-2 border-brass-500/40 pl-3 max-w-[52em]">
          <span className="font-semibold text-earth-700 uppercase tracking-[0.14em] text-[0.7rem] mr-1.5">
            What this gave the project ·
          </span>
          {source.contribution}
        </p>
      </div>
    </li>
  )
}

function TierBadge({ tier }: { tier: SourceTier }) {
  const style: Record<SourceTier, { label: string; className: string; dot: string }> = {
    Core: {
      label: 'Core',
      className: 'border-brass-600/50 bg-brass-500/15 text-brass-700',
      dot: 'bg-brass-600',
    },
    Supporting: {
      label: 'Supporting',
      className: 'border-earth-500/40 bg-parchment-200/60 text-earth-700',
      dot: 'bg-earth-500',
    },
    Consulted: {
      label: 'Consulted',
      className: 'border-earth-500/25 bg-parchment-100/70 text-earth-600',
      dot: 'bg-earth-400',
    },
  }
  const s = style[tier]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${s.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
    </span>
  )
}

function TierLegend() {
  return (
    <div className="card-parchment p-5">
      <div className="page-eyebrow mb-3">How to read this bibliography</div>
      <div className="grid sm:grid-cols-3 gap-4 text-[0.92rem] leading-relaxed">
        <LegendRow tier="Core">
          Load-bearing to the site's argument. Removing one would leave a claim without its footing.
        </LegendRow>
        <LegendRow tier="Supporting">
          Backs a specific fact in the prose — a date, a name, a numeric value.
        </LegendRow>
        <LegendRow tier="Consulted">
          Read for context or cross-check. Not cited by name in the site's prose.
        </LegendRow>
      </div>
    </div>
  )
}

function LegendRow({ tier, children }: { tier: SourceTier; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <TierBadge tier={tier} />
      <p className="text-ink-800/85">{children}</p>
    </div>
  )
}
