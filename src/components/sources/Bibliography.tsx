import { sources, type Source } from '../../data/sources'
import { ExternalLink } from 'lucide-react'

const groups: Source['category'][] = ['Primary', 'Secondary', 'Images', 'Data']

export default function Bibliography() {
  return (
    <div className="space-y-10">
      {groups.map(cat => (
        <section key={cat}>
          <h2 className="font-display text-2xl mb-4 border-b border-earth-500/25 pb-2">
            {cat === 'Data' ? 'Data & Reference' : cat + ' Sources'}
          </h2>
          <ul className="space-y-4">
            {sources.filter(s => s.category === cat).map((s, i) => (
              <li key={i} className="card-parchment p-4">
                <p className="text-sm leading-relaxed">{s.citation}</p>
                {s.link && (
                  <a href={s.link} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brass-600 hover:underline mt-1">
                    <ExternalLink className="w-3 h-3" /> {s.link}
                  </a>
                )}
                <p className="text-xs text-earth-600 mt-2"><i>Why it matters:</i> {s.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
