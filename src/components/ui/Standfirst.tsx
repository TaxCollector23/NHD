import type { ReactNode } from 'react'

/*
  A museum wall-label deck. One short line between a section heading and its
  prose, so the reader knows what the next few paragraphs are for before
  committing to them. Kept to a single clause on purpose: it orients, it does
  not summarise.
*/
export default function Standfirst({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 mb-6 max-w-[34em] border-l-2 border-brass-500/45 pl-4
                  font-display italic text-[1.1rem] md:text-[1.18rem] leading-snug text-earth-700">
      {children}
    </p>
  )
}
