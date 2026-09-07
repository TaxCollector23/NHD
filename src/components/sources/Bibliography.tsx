import { worksCited, imageCredits } from '../../data/worksCited'

// Plain MLA 9 Works Cited: alphabetical, hanging indent, nothing else. No
// cards, no per-entry notes, no icons: citations are stated once, correctly.
export default function Bibliography() {
  return (
    <div className="space-y-10">
      <section>
        <ol className="space-y-4 text-[0.95rem] leading-relaxed">
          {worksCited.map((c, i) => (
            <li key={i} className="pl-7 -indent-7">
              {c}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-xl mb-3 border-t border-earth-500/20 pt-6">Image credits</h2>
        <ol className="space-y-4 text-[0.95rem] leading-relaxed">
          {imageCredits.map((c, i) => (
            <li key={i} className="pl-7 -indent-7">
              {c}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
