import { IndiaBackground, INDIA_VIEWBOX } from './IndiaMap'
import { stations, triangles } from '../../data/locations'

/*
  Two panels of the same real projection, showing two ways of ORGANISING
  measurement rather than two historical maps.

  Left  : the same real places, each fixed by its own local survey, with no
          measured relationship between them. Deliberately not drawn as
          coverage regions, because no verified coverage dataset exists.
  Right : the same places tied into one connected framework.

  Everything drawn comes from the project's existing station coordinates.
  Nothing about who surveyed what, or when, is invented here.
*/
export default function CoverageCompare() {
  return (
    <figure className="card-parchment p-4 md:p-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Panel
          eyebrow="Separately measured"
          title="Good regional work, no shared frame"
          body="Each place fixed accurately by whoever surveyed it. Nothing measured connects one to the next."
        >
          {stations.map(s => (
            <g key={s.id}>
              <circle cx={s.x} cy={s.y} r="9" fill="none" stroke="#7a5230" strokeWidth="0.8"
                      strokeDasharray="2 3" opacity="0.65" />
              <circle cx={s.x} cy={s.y} r="3.4" fill="#0f1a2b" />
            </g>
          ))}
        </Panel>

        <Panel
          eyebrow="One framework"
          title="Every point tied to every other"
          body="The same places, now joined by measured triangles. Any position can be checked against the whole network."
        >
          {triangles.map(([a, b, c], i) => {
            const sa = stations.find(s => s.id === a)!
            const sb = stations.find(s => s.id === b)!
            const sc = stations.find(s => s.id === c)!
            return (
              <polygon key={i}
                points={`${sa.x},${sa.y} ${sb.x},${sb.y} ${sc.x},${sc.y}`}
                fill="rgba(200,155,58,0.10)" stroke="#a8802a" strokeWidth="1.1" strokeLinejoin="round" />
            )
          })}
          {stations.map(s => <circle key={s.id} cx={s.x} cy={s.y} r="3.4" fill="#0f1a2b" />)}
        </Panel>
      </div>

      <figcaption className="caption-text mt-4 border-t border-earth-500/20 pt-3">
        A diagram of two ways to organise measurement, not a map of who surveyed what. The dots are real
        station coordinates; the triangle mesh is a teaching schematic rather than the survey's actual
        network. No historical coverage data is shown, because no verified coverage dataset has been
        assembled for this project.
      </figcaption>
    </figure>
  )
}

function Panel({
  eyebrow, title, body, children,
}: { eyebrow: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="page-eyebrow mb-1">{eyebrow}</div>
      <h3 className="sub-title mb-1.5">{title}</h3>
      <p className="caption-text mb-3">{body}</p>
      <svg viewBox={INDIA_VIEWBOX} className="w-full h-auto rounded border border-earth-500/20"
           role="img" aria-label={`${eyebrow}: ${title}`}>
        <IndiaBackground showLabels={false} />
        {children}
      </svg>
    </div>
  )
}
