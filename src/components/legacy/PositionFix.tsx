import { useEffect, useMemo, useState } from 'react'
import type { Readout } from '../ui/ToolPanel'
import { Play, RotateCcw, MapPin, Satellite } from 'lucide-react'
import EpistemicBadge from '../ui/EpistemicBadge'

/*
  Side-by-side position-fix simulator.
  ------------------------------------
  Both panels solve the same problem — "where am I?" — by intersecting
  measurements from known reference points.

    Left  (1850s resection): user's position is where three *bearing lines*
          from known hill stations cross. Each bearing carries a small angle
          error; the crossings form a triangle of uncertainty. Simulated
          computation time is minutes (compressed).

    Right (GPS trilateration): three (later four) satellites broadcast their
          distance. The user's position is where the three range circles
          intersect. Each range carries a small clock error; the resulting
          uncertainty is metres. Simulated computation time is milliseconds.

  A "Take a fix" button animates both panels in parallel with a running
  timer, making the century-and-a-half difference in speed tangible.
*/

const W = 340,
  H = 340
const CENTER = { x: W / 2, y: H / 2 }

// Three known landmarks (1850s scenario)
const HILLS = [
  { name: 'Hill A', x: 70, y: 70 },
  { name: 'Hill B', x: 275, y: 90 },
  { name: 'Hill C', x: 170, y: 285 },
]

// Three satellites overhead (GPS scenario)
const SATS = [
  { name: 'PRN 12', x: 60, y: 60 },
  { name: 'PRN 23', x: 280, y: 90 },
  { name: 'PRN 07', x: 170, y: 290 },
]

const TRUE_POS = { x: 170, y: 170 }

export default function PositionFix({ onReadout }: { onReadout?: (r: Readout[]) => void } = {}) {
  // The bearings/rings are ALWAYS drawn, so dragging a slider changes the
  // geometry live. "Take a fix" reveals where the crossing lands vs the truth.
  const [revealed, setRevealed] = useState(false)
  const [angleErr, setAngleErr] = useState(0.5) // ° of arc, 1850s bearing noise
  const [rangeErr, setRangeErr] = useState(3) // metres, GPS

  const takeFix = () => setRevealed(true)
  const reset = () => setRevealed(false)

  // Bearings from truth to each hill, drawn as lines from each hill in the
  // direction of the observer with a small noise added.
  const bearings = useMemo(() => {
    return HILLS.map((h, i) => {
      const dx = TRUE_POS.x - h.x,
        dy = TRUE_POS.y - h.y
      const trueAng = Math.atan2(dy, dx)
      // Repeatable pseudo-noise per hill so the drawing is stable.
      const noise = ((((i * 37) % 7) - 3) / 3) * ((angleErr * Math.PI) / 180)
      const ang = trueAng + noise
      return { hill: h, angle: ang, length: Math.hypot(dx, dy) * 3 }
    })
  }, [angleErr])

  // Position fix (1850s) — intersection point of the noisy bearing lines.
  // Approximated as the centroid of pairwise intersections.
  const fix1850 = useMemo(() => centroidOfIntersections(bearings), [bearings])

  // GPS distance rings with a small metre-scale error each; here "metres"
  // are represented in canvas units at ~1:1.
  const ranges = useMemo(() => {
    return SATS.map((s, i) => {
      const trueR = Math.hypot(TRUE_POS.x - s.x, TRUE_POS.y - s.y)
      const noise = ((((i * 41) % 5) - 2) * rangeErr) / 5
      return { sat: s, r: trueR + noise }
    })
  }, [rangeErr])

  // GPS fix — approximate least-squares intersection of three circles.
  const fixGPS = useMemo(() => circleIntersection(ranges), [ranges])

  useEffect(() => {
    if (!onReadout) return
    const off = (f: { x: number; y: number } | null) =>
      f ? Math.hypot(f.x - TRUE_POS.x, f.y - TRUE_POS.y).toFixed(1) : 'no crossing'
    onReadout([
      { label: 'Bearing noise, left panel', value: `${angleErr.toFixed(2)}°` },
      {
        label: 'Range noise, right panel',
        value: `${rangeErr.toFixed(1)} units`,
      },
      { label: 'Bearings miss the truth by', value: `${off(fix1850)}` },
      { label: 'Ranges miss the truth by', value: `${off(fixGPS)}` },
    ])
  }, [onReadout, angleErr, rangeErr, fix1850, fixGPS])

  return (
    <div className="card-parchment p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-display text-2xl leading-tight">Where am I?</h3>
            <EpistemicBadge
              kind="illustrative"
              claim="A geometry comparison of two ways to fix a position."
              note="Both panels show the same idea: intersect measurements taken from references whose positions you already know. The shapes are real geometry. There are no timing or accuracy numbers, because a like-for-like comparison of the two eras is not supported by the evidence, and this is not a claim that satellite positioning descends from the survey."
              sources={[
                {
                  text: 'Resection and trilateration are standard positioning methods',
                  type: 'Secondary',
                },
              ]}
            />
          </div>
          <div className="text-xs text-earth-600 mt-1">
            Same problem, two eras, different references. Press <b>Take a fix</b>.
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={takeFix} className="btn-primary !py-2 !px-4">
            <Play className="w-4 h-4" /> {revealed ? 'Re-fix' : 'Take a fix'}
          </button>
          <button onClick={reset} className="btn-secondary !py-2 !px-3">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* 1850s panel */}
        <Panel
          era="1850s · Resection from known hills"
          badge="References: hilltops · Measurement: a bearing · Solved: by hand"
          methodNote="Sight three known hill stations and draw the back-bearings on a plane table. Where the three lines cross is your position. A bearing's uncertainty is angular: a wedge that widens with distance."
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-parchment-50 rounded">
            {/* frame */}
            <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#5b3a1e" strokeOpacity="0.3" />

            {/* hills */}
            {HILLS.map((h) => (
              <g key={h.name}>
                <polygon
                  points={`${h.x - 10},${h.y + 6} ${h.x},${h.y - 8} ${h.x + 10},${h.y + 6}`}
                  fill="rgba(91,58,30,0.25)"
                  stroke="#5b3a1e"
                  strokeWidth="1"
                />
                <text x={h.x} y={h.y + 22} textAnchor="middle" fontSize="10" fill="#5b3a1e" fontWeight="600">
                  {h.name}
                </text>
              </g>
            ))}

            {/* bearing lines that grow with phase */}
            {bearings.map((b, i) => {
              const endX = b.hill.x + Math.cos(b.angle) * b.length
              const endY = b.hill.y + Math.sin(b.angle) * b.length
              return (
                <line
                  key={i}
                  x1={b.hill.x}
                  y1={b.hill.y}
                  x2={endX}
                  y2={endY}
                  stroke="#a8802a"
                  strokeWidth="1.3"
                  strokeDasharray="4 3"
                  opacity={0.85}
                />
              )
            })}

            {/* true position — only revealed after the fix, showing error */}
            {revealed && (
              <>
                <circle cx={TRUE_POS.x} cy={TRUE_POS.y} r="5" fill="#0f1a2b" />
                <text x={TRUE_POS.x + 10} y={TRUE_POS.y - 8} fontSize="10" fill="#0f1a2b">
                  true
                </text>
              </>
            )}

            {/* computed fix — a small brass circle */}
            {revealed && fix1850 && (
              <>
                <circle cx={fix1850.x} cy={fix1850.y} r="6" fill="none" stroke="#c89b3a" strokeWidth="2" />
                <text x={fix1850.x + 10} y={fix1850.y + 12} fontSize="10" fill="#7a5230" fontWeight="600">
                  fix
                </text>
              </>
            )}
          </svg>
        </Panel>

        {/* GPS panel */}
        <Panel
          era="Today · GNSS trilateration"
          badge="References: satellites · Measurement: a timed range · Solved: by a chip"
          methodNote="Each satellite broadcasts its position and the time. The receiver times the signal to get a distance. Three or more range circles intersect at your position. A range's uncertainty is a fixed-width ring, a different shape of doubt."
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-parchment-50 rounded">
            <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke="#5b3a1e" strokeOpacity="0.3" />

            {/* satellites */}
            {SATS.map((s) => (
              <g key={s.name}>
                <circle cx={s.x} cy={s.y} r="6" fill="#243449" />
                <line x1={s.x - 8} y1={s.y - 8} x2={s.x + 8} y2={s.y + 8} stroke="#243449" strokeWidth="2" />
                <line x1={s.x + 8} y1={s.y - 8} x2={s.x - 8} y2={s.y + 8} stroke="#243449" strokeWidth="2" />
                <text x={s.x} y={s.y - 12} textAnchor="middle" fontSize="9" fill="#243449" fontWeight="600">
                  {s.name}
                </text>
              </g>
            ))}

            {/* range circles */}
            {ranges.map((r, i) => (
              <circle
                key={i}
                cx={r.sat.x}
                cy={r.sat.y}
                r={r.r}
                fill="none"
                stroke="#4b7a8a"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity={0.7}
              />
            ))}

            {/* true + fix */}
            {revealed && (
              <>
                <circle cx={TRUE_POS.x} cy={TRUE_POS.y} r="5" fill="#0f1a2b" />
                <text x={TRUE_POS.x + 10} y={TRUE_POS.y - 8} fontSize="10" fill="#0f1a2b">
                  true
                </text>
              </>
            )}
            {revealed && fixGPS && (
              <>
                <circle cx={fixGPS.x} cy={fixGPS.y} r="6" fill="none" stroke="#c89b3a" strokeWidth="2" />
                <text x={fixGPS.x + 10} y={fixGPS.y + 12} fontSize="10" fill="#7a5230" fontWeight="600">
                  fix
                </text>
              </>
            )}
          </svg>
        </Panel>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="rounded-md border border-earth-500/20 bg-parchment-50 p-3 space-y-3 text-sm">
          <Field
            label="Bearing measurement error (°)"
            v={angleErr}
            setV={setAngleErr}
            min={0}
            max={2}
            step={0.05}
            decimals={2}
          />
          <p className="text-xs text-earth-600">
            A hand compass is coarse. A tripod-mounted instrument read carefully and averaged over repeated sightings is
            far finer. This site prints no figure for the survey's own instruments, because none could be traced to a
            document.
          </p>
          {revealed && fix1850 && (
            <div className="text-xs text-earth-600 leading-snug">
              The three bearings rarely cross at a single point. The small triangle between them is the uncertainty.
              Wider bearing error → larger triangle.
            </div>
          )}
        </div>

        <div className="rounded-md border border-earth-500/20 bg-parchment-50 p-3 space-y-3 text-sm">
          <Field
            label="Range measurement error (m)"
            v={rangeErr}
            setV={setRangeErr}
            min={0.5}
            max={15}
            step={0.5}
            decimals={1}
          />
          <p className="text-xs text-earth-600">
            Move the slider to see how noise in a distance measurement moves the fix. The units here are canvas units,
            not metres: this is geometry, not a benchmark.
          </p>
          {revealed && fixGPS && (
            <div className="text-xs text-earth-600 leading-snug">
              The range circles overlap in a small region, and its size is the uncertainty. Same idea as the bearings,
              but the doubt is ring-shaped, not wedge-shaped.
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-earth-600 mt-4 leading-relaxed">
        Same idea, different references: hilltops and a compass then, satellites and a timed signal now. The technology
        changed completely; the geometry of fixing yourself by intersection did not.
      </p>
    </div>
  )
}

// ─── helpers ────────────────────────────────────────────────────────────────

function Panel({
  era,
  badge,
  methodNote,
  children,
}: {
  era: string
  badge: string
  methodNote: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-earth-500/20 rounded-md p-3 bg-parchment-100/60">
      <div className="mb-2">
        <div className="page-eyebrow flex items-center gap-1">
          {era.startsWith('185') ? <MapPin className="w-3 h-3" /> : <Satellite className="w-3 h-3" />}
          {era}
        </div>
        <div className="text-[11px] text-earth-600 mt-0.5">{badge}</div>
      </div>
      {children}
      <p className="text-xs text-ink-800/80 mt-2 leading-relaxed">{methodNote}</p>
    </div>
  )
}

function Field({
  label,
  v,
  setV,
  min,
  max,
  step,
  decimals,
}: {
  label: string
  v: number
  setV: (n: number) => void
  min: number
  max: number
  step: number
  decimals: number
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="font-mono text-brass-600">{v.toFixed(decimals)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => setV(parseFloat(e.target.value))}
        className="w-full accent-brass-600"
      />
    </div>
  )
}

function distancePx(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

// Rough intersection of pairs of half-lines → centroid.
function centroidOfIntersections(bearings: { hill: { x: number; y: number }; angle: number }[]) {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < bearings.length; i++) {
    for (let j = i + 1; j < bearings.length; j++) {
      const p = lineLineIntersection(bearings[i], bearings[j])
      if (p) pts.push(p)
    }
  }
  if (!pts.length) return null
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length
  return { x: cx, y: cy }
}

function lineLineIntersection(
  a: { hill: { x: number; y: number }; angle: number },
  b: { hill: { x: number; y: number }; angle: number },
) {
  const dx1 = Math.cos(a.angle),
    dy1 = Math.sin(a.angle)
  const dx2 = Math.cos(b.angle),
    dy2 = Math.sin(b.angle)
  const denom = dx1 * dy2 - dy1 * dx2
  if (Math.abs(denom) < 1e-6) return null
  const t = ((b.hill.x - a.hill.x) * dy2 - (b.hill.y - a.hill.y) * dx2) / denom
  return { x: a.hill.x + dx1 * t, y: a.hill.y + dy1 * t }
}

// Approximate least-squares intersection of three circles → centroid of the
// pairwise circle intersections nearest to the map centre.
function circleIntersection(rings: { sat: { x: number; y: number }; r: number }[]) {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < rings.length; i++) {
    for (let j = i + 1; j < rings.length; j++) {
      const p = circleCircle(rings[i], rings[j])
      if (p) pts.push(...p)
    }
  }
  if (!pts.length) return null
  const scored = pts.map((p) => ({ p, d: distancePx(p, CENTER) })).sort((a, b) => a.d - b.d)
  const top = scored.slice(0, 3).map((x) => x.p)
  const cx = top.reduce((s, p) => s + p.x, 0) / top.length
  const cy = top.reduce((s, p) => s + p.y, 0) / top.length
  return { x: cx, y: cy }
}

function circleCircle(
  a: { sat: { x: number; y: number }; r: number },
  b: { sat: { x: number; y: number }; r: number },
) {
  const dx = b.sat.x - a.sat.x,
    dy = b.sat.y - a.sat.y
  const d = Math.hypot(dx, dy)
  if (d > a.r + b.r || d < Math.abs(a.r - b.r) || d === 0) return null
  const aa = (a.r * a.r - b.r * b.r + d * d) / (2 * d)
  const h2 = a.r * a.r - aa * aa
  if (h2 < 0) return null
  const h = Math.sqrt(h2)
  const px = a.sat.x + (aa * dx) / d
  const py = a.sat.y + (aa * dy) / d
  return [
    { x: px + (h * dy) / d, y: py - (h * dx) / d },
    { x: px - (h * dy) / d, y: py + (h * dx) / d },
  ]
}
