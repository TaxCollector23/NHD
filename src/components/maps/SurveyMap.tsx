import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { IndiaBackground, INDIA_VIEWBOX } from './IndiaMap'
import { stations, triangles } from '../../data/locations'
import { datasetStations, datasetCrossRefs, datasetSources } from '../../data/gtsDataset'
import { GREAT_ARC_PX, projectLL } from '../../lib/projection'
import EpistemicBadge from '../ui/EpistemicBadge'
import FlashOnChange from '../ui/FlashOnChange'

const candidateStations = datasetStations.map((s) => ({
  ...s,
  ...projectLL(s.lng, s.lat),
}))

const YEAR_MIN = 1802
const YEAR_MAX = 1871

const anchor = (x: number, y: number) => {
  const east = x > 340
  return {
    dx: east ? -10 : 10,
    dy: y < 220 ? 14 : y > 500 ? -8 : 4,
    anchor: (east ? 'end' : 'start') as 'start' | 'end',
  }
}

export default function SurveyMap() {
  const [year, setYear] = useState(YEAR_MIN)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>('madras')
  const [playing, setPlaying] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    timerRef.current = window.setInterval(() => {
      setYear((y) => {
        if (y >= YEAR_MAX) {
          setPlaying(false)
          return y
        }
        return y + 1
      })
    }, 110)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [playing])

  const visibleStations = useMemo(() => stations.filter((s) => s.year <= year), [year])
  const visibleTriangles = useMemo(() => triangles.filter(([, , , y]) => y <= year), [year])
  const latestStation = useMemo(() => [...visibleStations].sort((a, b) => b.year - a.year)[0], [visibleStations])
  const focused = hovered
    ? stations.find((s) => s.id === hovered)
    : ((selected ? stations.find((s) => s.id === selected && s.year <= year) : null) ?? latestStation)

  const restart = () => {
    setYear(YEAR_MIN)
    setPlaying(true)
  }

  return (
    <div className="card-parchment p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="sub-title">1802 to 1871, one year at a time</h3>
        </div>
        <EpistemicBadge
          kind="illustrative"
          claim="Real station locations; a schematic triangle mesh growing over seven decades."
          note="Every dot is a real place, cross-checked against the sources below. Some are confirmed survey stations; others (marked probable or provisional in the panel) are candidate locations still awaiting page-level confirmation. The triangle mesh and the year each link appears are a simplified teaching diagram, not the survey's actual network, which had hundreds of principal triangles in a different configuration."
          sources={datasetSources.map((s) => ({
            text: `${s.citation} (${s.date})`,
            type: 'Primary' as const,
            url: s.url,
          }))}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-6">
        <div className="min-w-0">
          <div className="relative rounded-md border border-earth-500/25 overflow-hidden bg-parchment-50">
            <svg
              viewBox={INDIA_VIEWBOX}
              className="w-full h-auto block"
              role="img"
              aria-label="Survey stations appearing over time"
            >
              <IndiaBackground showArc />
              <text
                x={(GREAT_ARC_PX[1]?.x ?? 300) + 14}
                y={(GREAT_ARC_PX[0]?.y + GREAT_ARC_PX[1]?.y) / 2 || 380}
                fontSize="13"
                fill="#5b3a1e"
                opacity="0.8"
                fontFamily="Georgia, serif"
              >
                The Great Arc
              </text>

              {visibleTriangles.map(([a, b, c], i) => {
                const sa = stations.find((s) => s.id === a)!
                const sb = stations.find((s) => s.id === b)!
                const sc = stations.find((s) => s.id === c)!
                return (
                  <motion.polygon
                    key={`${a}-${b}-${c}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
                    points={`${sa.x},${sa.y} ${sb.x},${sb.y} ${sc.x},${sc.y}`}
                    fill="rgba(200,155,58,0.10)"
                    stroke="#a8802a"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                )
              })}

              {visibleStations.map((s) => {
                const isFocus = focused?.id === s.id
                const isSelected = selected === s.id
                const { dx, dy, anchor: ta } = anchor(s.x, s.y)
                return (
                  <g
                    key={s.id}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(s.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={isFocus ? 7.5 : isSelected ? 6 : 4.5}
                      fill={isFocus || isSelected ? '#c89b3a' : '#0f1a2b'}
                      stroke={isFocus || isSelected ? '#5b3a1e' : '#f6efe0'}
                      strokeWidth="1.4"
                    />
                    {(isFocus || isSelected) && (
                      <g>
                        <rect
                          x={s.x + dx - (ta === 'end' ? 138 : 0)}
                          y={s.y + dy - 15}
                          width="138"
                          height="23"
                          rx="4"
                          fill="#0f1a2b"
                          opacity="0.92"
                        />
                        <text
                          x={s.x + dx + (ta === 'end' ? -8 : 8)}
                          y={s.y + dy + 1}
                          textAnchor={ta}
                          fontSize="13"
                          fill="#f5eddc"
                          fontWeight="600"
                        >
                          {s.name}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Candidate stations from the partial research dataset: real coordinates,
                  not yet confirmed as principal stations, so drawn as hollow diamonds. */}
              {candidateStations.map((s) => (
                <g
                  key={s.id}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'default' }}
                >
                  <rect
                    x={s.x - 4}
                    y={s.y - 4}
                    width="8"
                    height="8"
                    transform={`rotate(45 ${s.x} ${s.y})`}
                    fill="none"
                    stroke={s.status === 'probable' ? '#c47c11' : '#7a5230'}
                    strokeWidth="1.6"
                  />
                  {hovered === s.id && (
                    <g>
                      <rect x={s.x + 10} y={s.y - 15} width="160" height="23" rx="4" fill="#0f1a2b" opacity="0.92" />
                      <text x={s.x + 18} y={s.y + 1} fontSize="12" fill="#f5eddc" fontWeight="600">
                        {s.name} · {s.status}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>

            {/* Play control lives on the map itself, labelled, not tucked into a side panel. */}
            <div className="absolute left-4 bottom-4 flex items-center gap-2">
              <button
                onClick={() => (year >= YEAR_MAX ? restart() : setPlaying((p) => !p))}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 text-parchment-50 pl-3 pr-4 py-2.5
                           shadow-lg hover:bg-ink-800 transition-colors text-[0.95rem] font-medium"
                aria-label={playing ? 'Pause the animation' : 'Play the animation'}
              >
                {playing ? (
                  <>
                    <Pause className="w-4 h-4 text-brass-400" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-brass-400" /> {year >= YEAR_MAX ? 'Play again' : 'Play'}
                  </>
                )}
              </button>
              <span className="rounded-full bg-parchment-50/90 border border-earth-500/30 px-3 py-2 font-mono text-[0.95rem] text-ink-900 tabular-nums shadow-sm">
                {year}
              </span>
            </div>
          </div>
          <p className="note-text mt-2">Click any station for its details. Hover for a quick label.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="survey-year" className="page-eyebrow block mb-2">
              Drag to any year
            </label>
            <input
              id="survey-year"
              type="range"
              min={YEAR_MIN}
              max={YEAR_MAX}
              value={year}
              onChange={(e) => {
                setPlaying(false)
                setYear(parseInt(e.target.value))
              }}
              className="w-full accent-brass-600 h-2"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {[1802, 1820, 1840, 1852, 1871].map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    setPlaying(false)
                    setYear(y)
                  }}
                  className={`px-3 py-1.5 rounded-md border text-[0.9rem] transition-colors ${
                    year === y
                      ? 'bg-ink-900 text-parchment-50 border-ink-900'
                      : 'border-earth-500/30 hover:bg-parchment-200'
                  }`}
                >
                  {y}
                </button>
              ))}
              <button
                onClick={() => {
                  setYear(YEAR_MIN)
                  setPlaying(false)
                }}
                className="px-3 py-1.5 rounded-md border border-earth-500/30 hover:bg-parchment-200"
                aria-label="Reset to 1802"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <FlashOnChange
            value={focused?.id ?? 'none'}
            className="border-t border-earth-500/20 pt-4 min-h-[8rem] px-1.5 -mx-1.5"
          >
            <div className="page-eyebrow mb-1.5">
              {hovered
                ? 'Hovered'
                : selected && stations.find((s) => s.id === selected && s.year <= year)
                  ? 'Selected station'
                  : 'Most recent station'}
            </div>
            {focused ? (
              <>
                <div className="font-display text-[1.3rem] text-ink-900">{focused.name}</div>
                <div className="note-text mt-0.5">
                  First shown {focused.year} · {focused.lat.toFixed(1)}° N, {focused.lng.toFixed(1)}° E
                  {datasetCrossRefs[focused.id] && <> · {datasetCrossRefs[focused.id].status}</>}
                </div>
                {focused.note && <p className="caption-text mt-2">{focused.note}</p>}
                {datasetCrossRefs[focused.id] && (
                  <p className="caption-text mt-2">{datasetCrossRefs[focused.id].note}</p>
                )}
              </>
            ) : (
              <div className="caption-text">The survey has not begun yet. Press play.</div>
            )}
          </FlashOnChange>

          <p className="caption-text">
            {visibleStations.length} stations and {visibleTriangles.length} triangles drawn so far. The diamond markers
            on the map are candidate stations from the research dataset that are not part of this teaching mesh; hover
            one for its name and status.
          </p>
        </div>
      </div>
    </div>
  )
}
