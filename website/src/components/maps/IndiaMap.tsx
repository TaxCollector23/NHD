import {
  INDIA_PATH_D,
  SRI_LANKA_PATH_D,
  ANDAMAN_PATH_D,
  NICOBAR_PATH_D,
  GREAT_ARC_PX,
  INDIA_VIEWBOX,
  RIVER_PATHS,
  HIMALAYAN_CREST_D,
  projectLL,
} from '../../lib/projection'
import { oceanLabels } from '../../data/india'

/*
  Re-usable India map background. Now shows:
    - accurate coastline (India, Sri Lanka, Andaman, Nicobar)
    - Himalayan crest as a shaded ridge along the top
    - the seven major rivers of the subcontinent as pale blue polylines
    - optional Great Arc dashed spine along the 78° meridian
    - optional ocean-name labels
    - a paper grid and warm gradient background so it reads as a chart
*/

export { INDIA_PATH_D as INDIA_PATH, INDIA_VIEWBOX, GREAT_ARC_PX }

type Props = {
  showArc?: boolean
  showRivers?: boolean
  showLabels?: boolean
  showHimalayas?: boolean
}

export function IndiaBackground({
  showArc = false,
  showRivers = true,
  showLabels = true,
  showHimalayas = true,
}: Props) {
  return (
    <>
      <defs>
        <pattern id="paperGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#b28c50" strokeOpacity="0.08" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="himShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b3a1e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#5b3a1e" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="500" height="600" fill="#f6efe0" />
      <rect x="0" y="0" width="500" height="600" fill="url(#paperGrid)" />

      {/* Landmasses. Land fill first so rivers can be drawn on top. */}
      <path d={INDIA_PATH_D} fill="rgba(160,112,68,0.09)" stroke="#5b3a1e" strokeWidth="1.4" />
      <path d={SRI_LANKA_PATH_D} fill="rgba(160,112,68,0.09)" stroke="#5b3a1e" strokeWidth="1.4" />
      <path d={ANDAMAN_PATH_D} fill="rgba(160,112,68,0.09)" stroke="#5b3a1e" strokeWidth="1.2" />
      <path d={NICOBAR_PATH_D} fill="rgba(160,112,68,0.09)" stroke="#5b3a1e" strokeWidth="1.2" />

      {/* Himalayan ridge — a soft brown swath above the crest line. */}
      {showHimalayas && (
        <>
          <path d={HIMALAYAN_CREST_D + ' L 500 0 L 0 0 Z'} fill="url(#himShade)" opacity="0.55" />
          <path d={HIMALAYAN_CREST_D} stroke="#5b3a1e" strokeWidth="1" fill="none" opacity="0.7" strokeDasharray="0" />
        </>
      )}

      {/* Rivers */}
      {showRivers &&
        RIVER_PATHS.map((r) => (
          <path
            key={r.name}
            d={r.d}
            stroke="#4b7a8a"
            strokeWidth="1.1"
            fill="none"
            opacity="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

      {/* Great Arc, dashed spine along meridian */}
      {showArc && GREAT_ARC_PX.length === 2 && (
        <line
          x1={GREAT_ARC_PX[0].x}
          y1={GREAT_ARC_PX[0].y}
          x2={GREAT_ARC_PX[1].x}
          y2={GREAT_ARC_PX[1].y}
          stroke="#a8802a"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.7"
        />
      )}

      {/* Ocean labels — subtle, serif, spaced with a wide tracking. */}
      {showLabels &&
        oceanLabels.map((l) => {
          const p = projectLL(l.lng, l.lat)
          return (
            <text
              key={l.name}
              x={p.x}
              y={p.y}
              fontSize="9"
              fill="#4b7a8a"
              fontFamily="Playfair Display, serif"
              fontStyle="italic"
              letterSpacing="3"
              textAnchor="middle"
              opacity="0.55"
            >
              {l.name}
            </text>
          )
        })}
    </>
  )
}
