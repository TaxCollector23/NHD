import { ExternalLink } from 'lucide-react'
import { sources, sourceTypes, tierRank, type Source, type SourceTier, type SourceType } from '../../data/sources'

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
          <header className="flex items-center gap-3 border-b-2 border-ink-900/12 pb-3 mb-6">
            <TypePill type={group.type} />
            <span className="note-text tabular-nums ml-auto">
              {group.items.length} {group.items.length === 1 ? 'source' : 'sources'}
            </span>
          </header>

          <ol className="space-y-8">
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
  const isPrimary = source.type === 'Primary'
  const borderColor = isPrimary ? 'border-l-brass-500' : 'border-l-earth-400'

  return (
    <li id={source.id} className="scroll-mt-28">
      {/* badges row */}
      <div className="flex items-center gap-2 mb-2">
        <TypeBadge type={source.type} />
        <TierBadge tier={source.tier} />
      </div>

      {/* citation block with colored left rule */}
      <div className={`border-l-[3px] ${borderColor} pl-4`}>
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

        <p className="mt-2 text-[0.9rem] text-ink-800/85 leading-relaxed max-w-[52em]">
          <span className="font-semibold text-earth-700 uppercase tracking-[0.14em] text-[0.7rem] mr-1.5">
            What this gave the project ·
          </span>
          {source.contribution}
        </p>
      </div>
    </li>
  )
}

/* ── TypePill: section heading badge ───────────────────────────────────────── */

const TYPE_STYLE: Record<
  SourceType,
  { label: string; className: string }
> = {
  'Primary': {
    label: 'Primary Sources',
    className: 'bg-brass-900 text-brass-50',
  },
  'Secondary — Institutional': {
    label: 'Secondary Sources — Institutional',
    className: 'bg-ink-900 text-parchment-100',
  },
  'Secondary — Scholarly': {
    label: 'Secondary Sources — Scholarly',
    className: 'bg-ink-800 text-parchment-100',
  },
  'Reference': {
    label: 'Reference Works',
    className: 'bg-earth-800 text-parchment-50',
  },
  'Image': {
    label: 'Images',
    className: 'bg-earth-600 text-parchment-50',
  },
}

function TypePill({ type }: { type: SourceType }) {
  const s = TYPE_STYLE[type]
  return (
    <span
      className={`inline-block rounded px-3 py-1 text-[0.78rem] font-bold uppercase tracking-[0.15em] ${s.className}`}
    >
      {s.label}
    </span>
  )
}

/* ── TypeBadge: inline per-entry badge ─────────────────────────────────────── */

const TYPE_BADGE: Record<SourceType, { short: string; className: string }> = {
  'Primary': {
    short: 'Primary',
    className: 'border-brass-600/60 bg-brass-500/15 text-brass-800',
  },
  'Secondary — Institutional': {
    short: 'Secondary',
    className: 'border-ink-900/20 bg-ink-900/6 text-ink-800',
  },
  'Secondary — Scholarly': {
    short: 'Secondary',
    className: 'border-ink-900/20 bg-ink-900/6 text-ink-800',
  },
  'Reference': {
    short: 'Reference',
    className: 'border-earth-500/40 bg-parchment-200/60 text-earth-700',
  },
  'Image': {
    short: 'Image',
    className: 'border-earth-500/30 bg-parchment-100/70 text-earth-600',
  },
}

function TypeBadge({ type }: { type: SourceType }) {
  const s = TYPE_BADGE[type]
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${s.className}`}
    >
      {s.short}
    </span>
  )
}

/* ── TierBadge ──────────────────────────────────────────────────────────────── */

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

/* ── TierLegend ─────────────────────────────────────────────────────────────── */

function TierLegend() {
  return (
    <div className="card-parchment p-5 space-y-4">
      <div>
        <div className="page-eyebrow mb-1">Source types</div>
        <div className="flex flex-wrap gap-2">
          {(['Primary', 'Secondary — Scholarly', 'Secondary — Institutional', 'Reference', 'Image'] as SourceType[]).map(
            (t) => (
              <span key={t} className="flex items-center gap-1.5">
                <TypeBadge type={t} />
                <span className="text-[0.82rem] text-earth-700">
                  {t === 'Primary'
                    ? '— documents from the period itself'
                    : t === 'Secondary — Scholarly'
                      ? '— academic analysis written later'
                      : t === 'Secondary — Institutional'
                        ? '— official and institutional histories'
                        : t === 'Reference'
                          ? '— technical reference works'
                          : '— images and portraits'}
                </span>
              </span>
            ),
          )}
        </div>
      </div>

      <div className="border-t border-earth-500/20 pt-4">
        <div className="page-eyebrow mb-2">How important each source was</div>
        <div className="grid sm:grid-cols-3 gap-3 text-[0.92rem] leading-relaxed">
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
