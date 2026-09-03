import { timeline } from '../../data/timeline'

/*
  Compact horizontal date strip. Fills the wide, empty space under a section's
  main figure with something useful: the verified dates that bracket what the
  reader just looked at. Every entry carries the source that supports it, so
  the strip stays inside the one dataset the project can chart as fact.
*/
export default function TimelineStrip({
  from, to, caption,
}: { from: number; to: number; caption: string }) {
  const events = timeline.filter(e => e.year >= from && e.year <= to)
  if (!events.length) return null

  return (
    <div className="mt-6 card-parchment p-4 md:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
        <div className="page-eyebrow">Verified dates · {from} to {to}</div>
        <div className="note-text">Every date below has a named source. See Sources.</div>
      </div>

      <ol className="relative flex gap-4 overflow-x-auto pb-2">
        <span aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-earth-500/30" />
        {events.map(e => (
          <li key={e.year + e.title} className="relative shrink-0 w-[15rem] pt-0">
            <span className="block w-[15px] h-[15px] rounded-full bg-brass-500 ring-4 ring-parchment-100 mb-3" />
            <div className="font-display text-[1.35rem] text-brass-600 leading-none">{e.year}</div>
            <div className="mt-1.5 text-[0.95rem] text-ink-900 leading-snug font-medium">{e.title}</div>
            <div className="mt-1 note-text">{e.source}</div>
          </li>
        ))}
      </ol>

      <p className="caption-text mt-3 border-t border-earth-500/20 pt-3">{caption}</p>
    </div>
  )
}
