import type { LucideIcon } from 'lucide-react'

/*
  Compact horizontal band that goes directly above every interactive.
  All information sits on one row on desktop:
    [icon] [title + what] | [Try 1] [Try 2] [Try 3]
*/
export default function ToolIntro({
  icon: Icon,
  title,
  what,
  tryThis,
}: {
  icon: LucideIcon
  title: string
  what: string
  tryThis: string[]
}) {
  return (
    <div className="mb-5 rounded-xl border border-earth-500/20 bg-parchment-100/50 p-4 md:p-5">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-6 gap-y-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-lg bg-ink-900 text-brass-400 grid place-items-center shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg md:text-xl font-semibold text-ink-900 leading-tight">{title}</h3>
            <p className="mt-1 text-sm text-ink-800/85 leading-snug">{what}</p>
          </div>
        </div>
        {tryThis.length > 0 && (
          <ul className="grid sm:grid-cols-3 gap-x-4 gap-y-2 self-center">
            {tryThis.map((t, i) => (
              <li key={i} className="text-xs text-ink-800/85 leading-snug flex gap-1.5">
                <span className="font-mono text-brass-600 shrink-0">0{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
