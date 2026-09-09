import Bibliography from '../components/sources/Bibliography'
import { sources } from '../data/sources'

export default function Sources() {
  const total = sources.length
  const core = sources.filter((s) => s.tier === 'Core').length
  const primary = sources.filter((s) => s.type === 'Primary').length

  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Sources</div>
      <h1 className="page-title max-w-[16em]">Every claim on this site, and where it comes from</h1>

      <p className="lede mt-6">
        Formatted in MLA 9. Every source below is annotated with what it specifically gave the project, so a reader
        can see how a claim in the prose ties back to a document, not just to a booklist.
      </p>

      <dl className="mt-8 grid grid-cols-3 max-w-md gap-6 border-y border-earth-500/20 py-5">
        <Stat n={total} label="sources cited" />
        <Stat n={primary} label="primary" />
        <Stat n={core} label="load-bearing" />
      </dl>

      <div className="mt-12">
        <Bibliography />
      </div>
    </div>
  )
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div>
      <dt className="font-display text-[2.4rem] leading-none text-ink-900 tabular-nums">{n}</dt>
      <dd className="mt-1 note-text">{label}</dd>
    </div>
  )
}
