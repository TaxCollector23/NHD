import type { ReactNode } from 'react'

/*
  An authorial aside, kept visually distinct from the evidence badges on
  purpose. The dashed border and the label say plainly that the comparison is
  the author's framing device rather than a sourced historical claim, so it can
  never be mistaken for the Verified / Illustrative labels used for sourcing.
*/
export default function ForScale({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 max-w-[40em] rounded-md border border-dashed border-earth-500/55 bg-parchment-100/50 p-4 md:p-5">
      <div className="flex flex-wrap items-baseline gap-x-2 mb-2">
        <span className="text-brass-600 text-[0.85rem] leading-none">◇</span>
        <span className="page-eyebrow">Scale comparison</span>
        <span className="note-text">· comparison by the author</span>
      </div>
      <p className="body-text">{children}</p>
    </aside>
  )
}
