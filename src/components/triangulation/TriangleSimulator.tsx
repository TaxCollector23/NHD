import { useEffect, useMemo, useState } from 'react'
import type { Readout } from '../ui/ToolPanel'
import { Link } from 'react-router-dom'
import { ArrowRight, Info, Crosshair } from 'lucide-react'
import EpistemicBadge from '../ui/EpistemicBadge'
import FlashOnChange from '../ui/FlashOnChange'

/*
  TriangleSimulator
  -----------------
  Two linked things:
    1. A live triangle diagram (SVG) auto-fitted to its own vertices.
    2. Three sliders (one measured distance, two measured angles) plus three
       ILLUSTRATIVE worked examples (not the Survey's recorded observations),
       and a plain-English walkthrough of what the Law of Sines computes.

  "Error" mode is the second half: it shows why one measurement's precision
  determines how far you can trust a point you calculated but never visited.
*/

type Preset = {
  id: string
  title: string
  year: number
  c: number
  A: number
  B: number
  blurb: string
}

const PRESETS: Preset[] = [
  {
    id: ‘madras’,
    title: ‘The Madras baseline’,
    year: 1802,
    c: 12.1,
    A: 78,
    B: 72,
    blurb:
      ‘Lambton measured his first baseline near St. Thomas Mount, south of Madras. Every distance in the Great Arc traces back to a measured line like this one. The length here is a teaching value, not the survey\’s own recorded figure.’,
  },
  {
    id: ‘arc’,
    title: ‘One triangle in the Great Arc’,
    year: 1830,
    c: 25,
    A: 74,
    B: 68,
    blurb:
      ‘Most of the arc was chained like this — two ridge stations, one measured baseline in the plains. The surveyors on the ridges never walked to the point they were computing. They just had to aim at it.’,
  },
  {
    id: ‘peakxv’,
    title: ‘Darjeeling toward Peak XV’,
    year: 1852,
    c: 40,
    A: 85,
    B: 88,
    blurb:
      ‘Long, thin triangles from stations in Bengal. Radhanath Sikdar\’s office in Calcutta turned those angles into a height. Nobody went near the mountain — the answer came out of a desk.’,
  },
]

export default function TriangleSimulator({ onReadout }: { onReadout?: (r: Readout[]) => void } = {}) {
  const [baseline, setBaseline] = useState(PRESETS[0].c)
  const [angleA, setAngleARaw] = useState(PRESETS[0].A)
  const [angleB, setAngleBRaw] = useState(PRESETS[0].B)
  const [presetId, setPresetId] = useState<string>('madras')
  const [mode, setMode] = useState<'learn' | 'error'>('learn')

  // Error-mode controls: instrument precision. Baseline precision stays fixed
  // (10 m) rather than as a fourth slider, to keep the mode to two controls.
  const [dTheta, setDTheta] = useState(10) // angle precision, arc-seconds
  const dBase = 10 // baseline precision, metres (fixed)
  const [chainN, setChainN] = useState(1) // triangles carried down the chain

  // Sliders range freely; if A + B ≥ 180 the triangle is impossible and the
  // canvas says so, rather than one slider silently rewriting the other.
  const setAngleA = (a: number) => setAngleARaw(a)
  const setAngleB = (b: number) => setAngleBRaw(b)

  const geom = useMemo(() => solve(baseline, angleA, angleB), [baseline, angleA, angleB])

  // Error propagation to vertex C (illustrative, standard first-order geodesy):
  //   angle error δθ sweeps the far point by  arm · tan δθ  from each station,
  //   combined in quadrature and amplified by 1/sin C (dilution of precision);
  //   baseline scale error adds a radial term; chaining N triangles ~ ×√N.
  const uncertainty = useMemo(() => {
    if (geom.invalid) return null
    const rad = (d: number) => (d * Math.PI) / 180
    const dThetaRad = (dTheta * Math.PI) / (180 * 3600)
    const wA = geom.b * Math.tan(dThetaRad) // km
    const wB = geom.a * Math.tan(dThetaRad) // km
    const rhoAng = Math.sqrt(wA * wA + wB * wB) / Math.max(Math.sin(rad(geom.C)), 1e-3)
    const dC = (geom.a + geom.b) / 2
    const rhoBase = (dBase / 1000 / baseline) * dC // km
    const rhoTotal = Math.sqrt(rhoAng * rhoAng + rhoBase * rhoBase) // km
    const chainMetres = rhoTotal * 1000 * Math.sqrt(chainN)
    return {
      metres: rhoTotal * 1000,
      chainMetres,
      // exaggerated visual half-angle so δθ visibly widens the fans
      visHalfDeg: 0.4 + (dTheta / 60) * 4.2,
      // radius factor folds in δθ, δc AND chain N so the red circle responds to all three
      factor: Math.min(0.55, chainMetres / 4000),
    }
  }, [geom, dTheta, dBase, baseline, chainN])

  // Publish the current solution so a surrounding panel can show it alongside
  // a plain-language explanation.
  useEffect(() => {
    if (!onReadout) return
    if (geom.invalid) {
      onReadout([{ label: 'Triangle', value: 'impossible' }])
      return
    }
    onReadout([
      { label: 'Measured baseline', value: `${baseline.toFixed(1)} km` },
      { label: 'Third angle, calculated', value: `${geom.C.toFixed(1)}°` },
      { label: 'Distance to the far point', value: `${geom.b.toFixed(1)} km` },
      { label: 'Other calculated side', value: `${geom.a.toFixed(1)} km` },
      ...(uncertainty
        ? [
            {
              label: `Doubt after ${chainN} triangle${chainN > 1 ? 's' : ''}`,
              value: `± ${Math.round(uncertainty.chainMetres)} m`,
            },
          ]
        : []),
    ])
  }, [onReadout, geom, baseline, uncertainty, chainN])

  const applyPreset = (p: Preset) => {
    setPresetId(p.id)
    setBaseline(p.c)
    setAngleARaw(p.A)
    setAngleBRaw(p.B)
    setMode('learn')
  }

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]

  return (
    <div className="card-parchment p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-display text-2xl leading-tight">Triangulation Simulator</h3>
            <EpistemicBadge
              kind="illustrative"
              claim="Demonstrates the triangulation method the survey used."
              note="The geometry (Law of Sines) and the error-propagation model are standard and correct. The specific baselines and angles are teaching values, not the Survey's recorded observations."
              sources={[
                {
                  text: 'Method: Law of Sines; first-order error propagation (Bomford, Geodesy)',
                  type: 'Secondary',
                },
                {
                  text: 'Real baseline and angle tables, in the Everest 1847 Account',
                  type: 'Primary',
                  needed: true,
                },
              ]}
            />
          </div>
          <div className="text-xs text-earth-600 mt-1">
            Move a slider or pick an example. Switch to <b>Error</b> to see why precision mattered.
          </div>
        </div>
        <div className="flex text-xs rounded-md border border-earth-500/30 overflow-hidden shrink-0">
          {(['learn', 'error'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 capitalize ${mode === m ? 'bg-ink-900 text-parchment-50' : 'bg-parchment-100 hover:bg-parchment-200'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <TriangleCanvas
            g={geom}
            baseline={baseline}
            A={angleA}
            B={angleB}
            err={
              mode === 'error' && uncertainty
                ? {
                    visHalfDeg: uncertainty.visHalfDeg,
                    metres: uncertainty.chainMetres,
                    factor: uncertainty.factor,
                  }
                : null
            }
          />

          {/* Three worked examples, always visible, so a student can start from a real case rather than blank sliders. */}
          <div className="mt-4">
            <div className="page-eyebrow mb-2">Try an example</div>
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className={`text-left rounded-md border px-3 py-2 text-xs transition-colors ${
                    preset.id === p.id
                      ? 'bg-ink-900 text-parchment-50 border-ink-900'
                      : 'bg-parchment-100 border-earth-500/30 hover:bg-parchment-200'
                  }`}
                >
                  <div className="font-display text-sm leading-tight">{p.title}</div>
                  <div className={`mt-0.5 ${preset.id === p.id ? 'text-parchment-200' : 'text-earth-600'}`}>
                    {p.year}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-800/85 mt-2 leading-relaxed">{preset.blurb}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <Control
            label="Baseline: the one distance you measured (km)"
            value={baseline}
            min={1}
            max={80}
            step={0.5}
            onChange={setBaseline}
            decimals={1}
            help="Drag it and the whole triangle resizes."
          />
          <Control
            label="Angle A, at the left end"
            value={angleA}
            min={5}
            max={170}
            step={0.5}
            onChange={setAngleA}
            decimals={1}
          />
          <Control
            label="Angle B, at the right end"
            value={angleB}
            min={5}
            max={170}
            step={0.5}
            onChange={setAngleB}
            decimals={1}
            help="One distance plus two angles is all it takes to fix the third point."
          />

          <div className="rounded-md border border-earth-500/20 bg-parchment-50 p-3 text-sm">
            <Row k="Angle C (computed)" v={`${geom.C.toFixed(1)}°`} />
            <Row k="Side a (BC)" v={`${geom.a.toFixed(2)} km`} />
            <Row k="Side b (AC)" v={`${geom.b.toFixed(2)} km`} />
            <Row k="Height of C above baseline" v={`${geom.height.toFixed(2)} km`} />
          </div>

          {mode === 'learn' && <GuidedExplanation g={geom} c={baseline} A={angleA} B={angleB} />}
          {mode === 'error' && (
            <ErrorExplanation
              dTheta={dTheta}
              setDTheta={setDTheta}
              chainN={chainN}
              setChainN={setChainN}
              metres={uncertainty?.metres ?? null}
              chainMetres={uncertainty?.chainMetres ?? null}
              narrow={geom.C < 20}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Geometry ───────────────────────────────────────────────────────────────

function solve(c: number, A: number, B: number) {
  const C = 180 - A - B
  const rad = (d: number) => (d * Math.PI) / 180
  const k = c / Math.sin(rad(C))
  const a = k * Math.sin(rad(A))
  const b = k * Math.sin(rad(B))
  const area = 0.5 * a * b * Math.sin(rad(C))
  const height = a * Math.sin(rad(B)) // perpendicular from C to baseline
  return { A, B, C, c, a, b, area, height, invalid: C <= 1 || C >= 179 }
}

// ─── Canvas ─────────────────────────────────────────────────────────────────

function TriangleCanvas({
  g,
  baseline,
  A,
  B,
  err,
}: {
  g: ReturnType<typeof solve>
  baseline: number
  A: number
  B: number
  err?: { visHalfDeg: number; metres: number; factor: number } | null
}) {
  // Layout in KILOMETRE units first, then convert to pixels with a scale that
  // grows with the baseline (so dragging the baseline slider visibly resizes
  // the triangle). If a big triangle would overflow the canvas we fall back to
  // an auto-fit scale.
  const rad = (d: number) => (d * Math.PI) / 180
  const axKm = 0,
    ayKm = 0
  const bxKm = baseline,
    byKm = 0
  const cxKm = axKm + g.b * Math.cos(rad(A))
  const cyKm = ayKm - g.b * Math.sin(rad(A))
  const xsKm = [axKm, bxKm, cxKm],
    ysKm = [ayKm, byKm, cyKm]
  const wKm = Math.max(...xsKm) - Math.min(...xsKm)
  const hKm = Math.max(...ysKm) - Math.min(...ysKm)

  const padX = 90,
    padY = 70,
    W = 700,
    H = 440
  const availW = W - padX * 2,
    availH = H - padY * 2

  // Two constraints, pick the smaller so triangle always fits:
  //   1) proportional to baseline: pxPerKm grows linearly with baseline, so
  //      dragging the slider always visibly resizes the triangle.
  //   2) auto-fit: if the (rare) triangle shape would overflow, shrink it.
  const proportional = 0.35 + baseline * 0.4 // ≈ 4 px/km at c=10; ≈ 32 px/km at c=80 (capped below)
  const autoFitScale = Math.min(availW / (wKm || 1), availH / (hKm || 1))
  const scale = Math.min(proportional, autoFitScale)

  // Centre the (scaled) triangle inside the canvas.
  const bbW = wKm * scale,
    bbH = hKm * scale
  const offX = padX + (availW - bbW) / 2 - Math.min(...xsKm) * scale
  const offY = padY + (availH - bbH) / 2 - Math.min(...ysKm) * scale
  const tx = (xKm: number) => offX + xKm * scale
  const ty = (yKm: number) => offY + yKm * scale
  const Ax = tx(axKm),
    Ay = ty(ayKm),
    Bx = tx(bxKm),
    By = ty(byKm),
    Cx = tx(cxKm),
    Cy = ty(cyKm)
  const cent = { x: (Ax + Bx + Cx) / 3, y: (Ay + By + Cy) / 3 }

  // Uncertainty fans + spread at C (visual; the real ± is printed in the panel).
  let errShapes: {
    fanA: string
    fanB: string
    rC: number
    label: string
  } | null = null
  if (err && !g.invalid) {
    const h = (err.visHalfDeg * Math.PI) / 180
    const fan = (vx: number, vy: number) => {
      const ang = Math.atan2(Cy - vy, Cx - vx)
      const len = Math.hypot(Cx - vx, Cy - vy) * 1.18
      const e1x = vx + Math.cos(ang - h) * len,
        e1y = vy + Math.sin(ang - h) * len
      const e2x = vx + Math.cos(ang + h) * len,
        e2y = vy + Math.sin(ang + h) * len
      return `${vx},${vy} ${e1x},${e1y} ${e2x},${e2y}`
    }
    const armPx = (Math.hypot(Cx - Ax, Cy - Ay) + Math.hypot(Cx - Bx, Cy - By)) / 2
    errShapes = {
      fanA: fan(Ax, Ay),
      fanB: fan(Bx, By),
      rC: Math.max(4, armPx * (0.015 + err.factor)),
      label:
        err.metres >= 1000
          ? `± ${(err.metres / 1000).toFixed(1)} km`
          : `± ${err.metres.toFixed(err.metres < 10 ? 1 : 0)} m`,
    }
  }

  const outward = (x: number, y: number, d: number) => {
    const dx = x - cent.x,
      dy = y - cent.y,
      m = Math.hypot(dx, dy) || 1
    return { x: x + (dx / m) * d, y: y + (dy / m) * d }
  }
  const midAB = { x: (Ax + Bx) / 2, y: (Ay + By) / 2 }
  const midBC = { x: (Bx + Cx) / 2, y: (By + Cy) / 2 }
  const midAC = { x: (Ax + Cx) / 2, y: (Ay + Cy) / 2 }
  const labAB = outward(midAB.x, midAB.y, 22)
  const labBC = outward(midBC.x, midBC.y, 22)
  const labAC = outward(midAC.x, midAC.y, 22)
  const labA = outward(Ax, Ay, 26)
  const labB = outward(Bx, By, 26)
  const labC = outward(Cx, Cy, 28)

  // Angle arcs at each vertex
  const arcPath = (vx: number, vy: number, r: number, from: number, to: number) => {
    const large = Math.abs(to - from) > Math.PI ? 1 : 0
    const sweep = to > from ? 1 : 0
    const x1 = vx + r * Math.cos(from),
      y1 = vy + r * Math.sin(from)
    const x2 = vx + r * Math.cos(to),
      y2 = vy + r * Math.sin(to)
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`
  }
  const angleAt = (vx: number, vy: number, p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const t1 = Math.atan2(p1.y - vy, p1.x - vx)
    const t2 = Math.atan2(p2.y - vy, p2.x - vx)
    return { t1, t2 }
  }
  const aA = angleAt(Ax, Ay, { x: Bx, y: By }, { x: Cx, y: Cy })
  const aB = angleAt(Bx, By, { x: Cx, y: Cy }, { x: Ax, y: Ay })
  const aC = angleAt(Cx, Cy, { x: Ax, y: Ay }, { x: Bx, y: By })

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto bg-parchment-50 rounded border border-earth-500/20">
      <defs>
        <pattern id="tsgrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#b28c50" strokeOpacity="0.10" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#tsgrid)" />

      {g.invalid ? (
        <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="16" fill="#7a2020">
          A + B must sum to less than 180°
        </text>
      ) : (
        <>
          <polygon
            points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
            fill="rgba(200,155,58,0.14)"
            stroke="#a8802a"
            strokeWidth="2"
          />

          <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#5b3a1e" strokeWidth="3.5" />

          {/* Uncertainty fans + spread at C (error mode) */}
          {errShapes && (
            <>
              <polygon
                points={errShapes.fanA}
                fill="rgba(61,107,122,0.14)"
                stroke="#3d6b7a"
                strokeWidth="0.6"
                strokeOpacity="0.5"
              />
              <polygon
                points={errShapes.fanB}
                fill="rgba(61,107,122,0.14)"
                stroke="#3d6b7a"
                strokeWidth="0.6"
                strokeOpacity="0.5"
              />
              <circle cx={Cx} cy={Cy} r={errShapes.rC} fill="rgba(122,32,32,0.18)" stroke="#7a2020" strokeWidth="1.4" />
              <text x={Cx} y={Cy - errShapes.rC - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#7a2020">
                {errShapes.label}
              </text>
              <text x={Cx} y={Cy - errShapes.rC - 20} textAnchor="middle" fontSize="8" fill="#7a5230">
                spread exaggerated
              </text>
            </>
          )}

          {/* Angle arcs */}
          <path d={arcPath(Ax, Ay, 22, aA.t1, aA.t2)} fill="none" stroke="#7a5230" strokeWidth="1.2" />
          <path d={arcPath(Bx, By, 22, aB.t1, aB.t2)} fill="none" stroke="#7a5230" strokeWidth="1.2" />
          <path d={arcPath(Cx, Cy, 22, aC.t1, aC.t2)} fill="none" stroke="#7a5230" strokeWidth="1.2" />

          {/* Side labels */}
          <text
            x={labAB.x}
            y={labAB.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="13"
            fill="#5b3a1e"
            fontWeight="700"
          >
            baseline c = {baseline.toFixed(2)} km
          </text>
          <text x={labBC.x} y={labBC.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#243449">
            a = {g.a.toFixed(2)} km
          </text>
          <text x={labAC.x} y={labAC.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#243449">
            b = {g.b.toFixed(2)} km
          </text>

          {/* Vertices */}
          <circle cx={Ax} cy={Ay} r="5" fill="#0f1a2b" />
          <circle cx={Bx} cy={By} r="5" fill="#0f1a2b" />
          <circle cx={Cx} cy={Cy} r="7" fill="#c89b3a" stroke="#5b3a1e" strokeWidth="1.5" />

          <text
            x={labA.x}
            y={labA.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="15"
            fontWeight="700"
            fill="#0f1a2b"
          >
            A{' '}
            <tspan fontSize="11" fill="#7a5230">
              {A.toFixed(0)}°
            </tspan>
          </text>
          <text
            x={labB.x}
            y={labB.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="15"
            fontWeight="700"
            fill="#0f1a2b"
          >
            B{' '}
            <tspan fontSize="11" fill="#7a5230">
              {B.toFixed(0)}°
            </tspan>
          </text>
          <text
            x={labC.x}
            y={labC.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="15"
            fontWeight="700"
            fill="#0f1a2b"
          >
            C{' '}
            <tspan fontSize="11" fill="#7a5230">
              {g.C.toFixed(0)}°
            </tspan>
          </text>

          {/* Scale bar showing how many pixels represent 10 km at current baseline */}
          <g transform={`translate(20, ${H - 30})`}>
            <line x1="0" y1="0" x2={10 * scale} y2="0" stroke="#0f1a2b" strokeWidth="2" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="#0f1a2b" strokeWidth="2" />
            <line x1={10 * scale} y1="-4" x2={10 * scale} y2="4" stroke="#0f1a2b" strokeWidth="2" />
            <text x={5 * scale} y="16" textAnchor="middle" fontSize="10" fill="#5b3a1e" fontWeight="600">
              10 km
            </text>
          </g>

          {/* Legend */}
          <g transform={`translate(${W - 200}, ${H - 60})`}>
            <rect width="190" height="50" rx="4" fill="#0f1a2b" opacity="0.9" />
            <text x="10" y="16" fontSize="10" fill="#c89b3a" fontWeight="600">
              You measured
            </text>
            <text x="10" y="30" fontSize="10" fill="#f5eddc">
              baseline c and angles A, B
            </text>
            <text x="10" y="42" fontSize="10" fill="#c89b3a" fontWeight="600">
              Math computed everything else
            </text>
          </g>
        </>
      )}
    </svg>
  )
}

// ─── Explanation panel ──────────────────────────────────────────────────────

function GuidedExplanation({ g, c, A, B }: { g: ReturnType<typeof solve>; c: number; A: number; B: number }) {
  const steps = [
    {
      n: 1,
      title: 'Measure one distance on the ground.',
      body: `You measured the baseline, c = ${c.toFixed(2)} km. That is the only thing here anyone actually measured. The rest is computed.`,
    },
    {
      n: 2,
      title: 'Aim a theodolite, an angle-measuring telescope, from each end.',
      body: `From A, the target sits at ${A.toFixed(0)}°. From B, it sits at ${B.toFixed(0)}°.`,
    },
    {
      n: 3,
      title: 'A triangle’s angles always add up to 180°.',
      body: `So the angle at the target, C, has to be 180° − ${A.toFixed(0)}° − ${B.toFixed(0)}° = ${g.C.toFixed(1)}°, and nobody had to stand at C to get it.`,
    },
    {
      n: 4,
      title: 'The Law of Sines turns those angles into distances.',
      body: `A to C is ${g.b.toFixed(2)} km, B to C is ${g.a.toFixed(2)} km, and the target sits ${g.height.toFixed(2)} km beyond the baseline. In 1802 that was worked out by hand off logarithm tables.`,
    },
    {
      n: 5,
      title: 'Reuse a computed side as the next baseline.',
      body: 'Move to the far end of side a and it becomes the known edge of a new triangle, with no new ground measurement. Chained thousands of times, that is how the survey got from Madras to the Himalayas.',
    },
  ]
  return (
    <div className="border-t border-earth-500/20 pt-4">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-4 h-4 text-brass-600" />
        <div className="page-eyebrow">How this triangle was solved</div>
      </div>
      <ol className="space-y-2 text-sm">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-3">
            <span className="w-5 h-5 shrink-0 rounded-full bg-ink-900 text-parchment-50 grid place-items-center text-[11px]">
              {s.n}
            </span>
            <span>
              <b className="text-ink-900">{s.title}</b> <span className="text-ink-800/85">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function fmt(m: number | null) {
  if (m == null) return '·'
  return m >= 1000 ? `± ${(m / 1000).toFixed(1)} km` : `± ${m.toFixed(m < 10 ? 1 : 0)} m`
}

function ErrorExplanation({
  dTheta,
  setDTheta,
  chainN,
  setChainN,
  metres,
  chainMetres,
  narrow,
}: {
  dTheta: number
  setDTheta: (n: number) => void
  chainN: number
  setChainN: (n: number) => void
  metres: number | null
  chainMetres: number | null
  narrow: boolean
}) {
  return (
    <div className="border-t border-earth-500/20 pt-4 space-y-4 text-sm">
      <div className="flex items-center gap-2">
        <Crosshair className="w-4 h-4 text-survey-600" />
        <div className="page-eyebrow">How far can you trust the far point?</div>
      </div>
      <p className="text-ink-800/85 text-xs leading-relaxed">
        A perfect triangle on paper doesn't give you a perfect position on the ground. Every angle carries a small
        reading error, and the further away the point you're fixing, the more that error matters.
      </p>
      <Control
        label="How precisely you can read an angle (arc-seconds)"
        value={dTheta}
        min={1}
        max={60}
        step={1}
        onChange={setDTheta}
        decimals={0}
        help="One arc-second is 1/3600 of a degree, about as fine as the survey's best instruments could read."
      />
      <FlashOnChange value={fmt(metres) ?? ''} className="bg-ink-900 p-3 flex justify-between items-baseline">
        <span className="text-xs text-parchment-200">The far point is fixed to within</span>
        <b className="font-mono text-brass-400 text-base">{fmt(metres)}</b>
      </FlashOnChange>
      <Control
        label={`Chained across ${chainN} triangle${chainN > 1 ? 's' : ''}`}
        value={chainN}
        min={1}
        max={20}
        step={1}
        onChange={setChainN}
        decimals={0}
        help="Each new triangle adds a little more doubt, which is why the survey kept re-checking against the stars."
      />
      <FlashOnChange value={fmt(chainMetres) ?? ''} className="flex justify-between text-xs px-1.5 -mx-1.5 py-0.5">
        <span className="text-ink-700">
          After {chainN} triangle{chainN > 1 ? 's' : ''}
        </span>
        <b className="font-mono text-brass-600">{fmt(chainMetres)}</b>
      </FlashOnChange>
      {narrow && (
        <p className="text-xs text-survey-600 leading-snug border-l-2 border-survey-500/50 pl-2">
          Long, narrow triangles (small angle C) blow the error up, which is why Peak XV, sighted at a shallow angle
          from far away, was the hard case.
        </p>
      )}
    </div>
  )
}

// ─── Controls ───────────────────────────────────────────────────────────────

function Control({
  label,
  value,
  min,
  max,
  step,
  onChange,
  decimals,
  help,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  decimals: number
  help?: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-ink-800">{label}</span>
        <span className="font-mono text-brass-600">{value.toFixed(decimals)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-brass-600"
      />
      {help && <div className="text-[11px] text-earth-600 mt-1 leading-snug">{help}</div>}
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <FlashOnChange value={v} className="flex justify-between px-1.5 -mx-1.5 py-0.5">
      <span className="text-ink-700">{k}</span>
      <b className="font-mono">{v}</b>
    </FlashOnChange>
  )
}

export function TriangleSimulatorNext() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
      <span className="text-ink-800/85">Now that you have angles, what took them? →</span>
      <Link to="/instruments" className="btn-secondary !py-2 !px-4">
        See the theodolite <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
