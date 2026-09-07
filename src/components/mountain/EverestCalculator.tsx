import { useEffect, useMemo, useState } from 'react'
import type { Readout } from '../ui/ToolPanel'
import { BookOpen, Info } from 'lucide-react'
import EpistemicBadge from '../ui/EpistemicBadge'

/*
  EverestCalculator — ILLUSTRATIVE MODEL, not a historical reconstruction.
  -----------------------------------------------------------------------
  Demonstrates the TYPE of trigonometric height calculation used in
  nineteenth-century geodetic surveying. The inputs below are illustrative,
  NOT the Survey's actual Peak XV stations, angles, or corrections — those
  raw observation tables are not reproduced here and were not verified.

  h_true (m) = h_observer + d · tan(θ)         (line-of-sight geometry)
             + d² / (2R) · (1 − k) · 1000       (curvature drop + atmospheric refraction)
*/

type Station = {
  id: string
  name: string
  distance: number // km to Peak XV
  angle: number // apparent elevation angle, °
  observer: number // observer altitude above sea level, km
  blurb: string
}

// ILLUSTRATIVE worked examples — NOT historical observation records.
// The values show how distance, angle, and observer height interact; they are
// not the Survey's actual Peak XV readings.
const STATIONS: Station[] = [
  {
    id: 'long',
    name: 'Long low-angle sight-line',
    distance: 174,
    angle: 2.18,
    observer: 0.137,
    blurb:
      'A distant lowland station: an apparent angle of just over 2° across ~170 km still resolves a ~9 km peak. Illustrative values, not a historical record.',
  },
  {
    id: 'long2',
    name: 'Neighbouring low station',
    distance: 176,
    angle: 2.13,
    observer: 0.137,
    blurb: 'Averaging several such readings from different stations cancels random error. Illustrative values.',
  },
  {
    id: 'ridge',
    name: 'High ridge station',
    distance: 130,
    angle: 3.1,
    observer: 2.13,
    blurb: 'A higher observer shortens the curvature correction. Illustrative values.',
  },
  {
    id: 'demo',
    name: 'Nearby hill',
    distance: 40,
    angle: 5.0,
    observer: 0.6,
    blurb: 'Short baseline, large angle: the corrections are small. Illustrative values.',
  },
]

export default function EverestCalculator({ onReadout }: { onReadout?: (r: Readout[]) => void } = {}) {
  const [stationId, setStationId] = useState<string>('long')
  const seed = STATIONS.find((s) => s.id === stationId)!
  const [distance, setDistance] = useState(seed.distance)
  const [angle, setAngle] = useState(seed.angle)
  const [observer, setObserver] = useState(seed.observer)
  const [refraction, setRefraction] = useState(0.13) // standard geodetic value ≈ 0.13 (Bomford, Geodesy)

  const applyStation = (s: Station) => {
    setStationId(s.id)
    setDistance(s.distance)
    setAngle(s.angle)
    setObserver(s.observer)
  }

  const { heightMeters, correctedM, curvatureDrop } = useMemo(() => {
    const rad = (angle * Math.PI) / 180
    const heightKm = distance * Math.tan(rad) + observer
    const R = 6371 // Earth radius, km
    const curvKm = ((distance * distance) / (2 * R)) * (1 - refraction)
    return {
      heightMeters: heightKm * 1000,
      correctedM: (heightKm + curvKm) * 1000,
      curvatureDrop: curvKm * 1000,
    }
  }, [distance, angle, observer, refraction])

  useEffect(() => {
    if (!onReadout) return
    onReadout([
      { label: 'Distance to the peak', value: `${distance.toFixed(0)} km` },
      { label: 'Angle up to the summit', value: `${angle.toFixed(2)}°` },
      {
        label: 'Height from the raw sight line',
        value: `${Math.round(heightMeters).toLocaleString()} m`,
      },
      {
        label: 'Curvature and refraction correction',
        value: `+ ${Math.round(curvatureDrop).toLocaleString()} m`,
      },
      {
        label: 'Corrected height',
        value: `${Math.round(correctedM).toLocaleString()} m`,
      },
    ])
  }, [onReadout, distance, angle, heightMeters, curvatureDrop, correctedM])

  // Diagram — FIXED vertical scale (exaggerated) so every slider visibly moves the drawing.
  const canvasW = 640,
    canvasH = 320
  const padL = 60,
    padR = 56,
    padT = 26,
    padB = 66
  const plotW = canvasW - padL - padR
  const plotH = canvasH - padT - padB
  const rad = (angle * Math.PI) / 180
  const MAX_KM = 11 // top of the drawn scale
  const yScale = plotH / MAX_KM
  const obsX = padL
  const peakX = padL + plotW
  const groundY = padT + plotH // sea level
  const obsY = groundY - Math.min(observer, 3) * yScale // observer altitude raises the eye point
  const apparentKm = Math.min(distance * Math.tan(rad), MAX_KM - 0.3)
  const peakY = Math.max(padT + 12, obsY - apparentKm * yScale) // apparent (line-of-sight) peak
  const curvPx = Math.min(70, (curvatureDrop / 1000) * yScale) // curvature+refraction, moves with k
  const correctedPeakY = Math.max(padT + 4, peakY - curvPx) // corrected (true) peak, higher
  const losAng = Math.atan2(obsY - peakY, peakX - obsX) // line-of-sight angle above horizontal
  const arcR = 36
  const arcEndX = obsX + arcR * Math.cos(losAng)
  const arcEndY = obsY - arcR * Math.sin(losAng)

  return (
    <div className="space-y-6">
      {/* Preset stations */}
      <div>
        <div className="mb-2 flex items-center gap-3 flex-wrap">
          <span className="page-eyebrow flex items-center gap-2">
            <BookOpen className="w-3 h-3" /> Worked examples
          </span>
          <EpistemicBadge
            kind="illustrative"
            claim="Demonstrates how a peak's height is derived from a distant angle."
            note="The geometry and the curvature-and-refraction correction are standard and correct. The inputs are teaching values, not the survey's real Peak XV stations, angles, or corrections, and this does not reproduce Sikdar's computation. The modern figure of 8,848 m is shown for scale only; the model is not tuned to reproduce it."
            sources={[
              {
                text: 'Trig heighting + curvature/refraction (Bomford, Geodesy)',
                type: 'Secondary',
              },
              {
                text: 'The real Peak XV observation table, in Waugh 1851',
                type: 'Primary',
                needed: true,
              },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          {STATIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => applyStation(s)}
              className={`text-left rounded-md border px-3 py-2 text-xs transition-colors ${
                stationId === s.id
                  ? 'bg-ink-900 text-parchment-50 border-ink-900'
                  : 'bg-parchment-100 border-earth-500/30 hover:bg-parchment-200'
              }`}
            >
              <div className="font-display text-sm leading-tight">{s.name}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-800/85 mt-2 leading-relaxed">{seed.blurb}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-parchment p-4">
          <svg viewBox={`0 0 ${canvasW} ${canvasH}`} className="w-full h-auto">
            {/* sea level */}
            <line
              x1={obsX - 12}
              y1={groundY}
              x2={peakX + 40}
              y2={groundY}
              stroke="#7a5230"
              strokeWidth="1"
              opacity="0.5"
            />
            <text x={obsX - 12} y={groundY + 14} fontSize="9" fill="#7a5230">
              sea level
            </text>

            {/* observer eye-level horizontal (the naive reference) */}
            <line
              x1={obsX}
              y1={obsY}
              x2={peakX}
              y2={obsY}
              stroke="#c2a06a"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.7"
            />
            {/* curved horizon — Earth bending away, driven by distance & k */}
            <path
              d={`M ${obsX} ${obsY} Q ${(obsX + peakX) / 2} ${obsY + curvPx * 0.6} ${peakX} ${obsY + curvPx}`}
              fill="none"
              stroke="#7a5230"
              strokeDasharray="2 4"
              opacity="0.7"
            />

            {/* observer altitude bracket — moves with the observer slider */}
            {obsY < groundY - 2 && (
              <>
                <line x1={obsX} y1={groundY} x2={obsX} y2={obsY} stroke="#243449" strokeWidth="1.4" />
                <text x={obsX - 6} y={(groundY + obsY) / 2} fontSize="10" fill="#243449" textAnchor="end">
                  h₀
                </text>
              </>
            )}

            {/* mountain — apex at the CORRECTED (true) peak, base at sea level */}
            <polygon
              points={`${peakX - 52},${groundY} ${peakX},${correctedPeakY} ${peakX + 52},${groundY}`}
              fill="rgba(91,58,30,0.14)"
              stroke="#5b3a1e"
              strokeWidth="1.5"
            />
            <polygon
              points={`${peakX - 20},${correctedPeakY + (groundY - correctedPeakY) * 0.26} ${peakX},${correctedPeakY} ${peakX + 20},${correctedPeakY + (groundY - correctedPeakY) * 0.26}`}
              fill="#f5eddc"
              opacity="0.85"
            />

            {/* line of sight from observer to APPARENT peak */}
            <line x1={obsX} y1={obsY} x2={peakX} y2={peakY} stroke="#c89b3a" strokeWidth="1.8" />
            <circle cx={obsX} cy={obsY} r="5" fill="#0f1a2b" />

            {/* angle arc at the observer */}
            <path
              d={`M ${obsX + arcR} ${obsY} A ${arcR} ${arcR} 0 0 0 ${arcEndX} ${arcEndY}`}
              fill="none"
              stroke="#a8802a"
              strokeWidth="1.4"
            />
            <text x={obsX + arcR + 6} y={obsY - 6} fontSize="11" fill="#7a5230">
              θ = {angle.toFixed(2)}°
            </text>

            {/* apparent → corrected marker at the peak — the correction, moves with k */}
            {curvPx > 3 && (
              <>
                <line x1={peakX} y1={peakY} x2={peakX} y2={correctedPeakY} stroke="#7a2020" strokeWidth="2" />
                <line x1={peakX - 5} y1={peakY} x2={peakX + 5} y2={peakY} stroke="#7a2020" strokeWidth="1.4" />
                <text x={peakX + 8} y={(peakY + correctedPeakY) / 2 + 3} fontSize="9" fill="#7a2020">
                  +curve &amp; refraction
                </text>
              </>
            )}

            {/* distance label */}
            <text
              x={(obsX + peakX) / 2}
              y={groundY + 26}
              textAnchor="middle"
              fontSize="12"
              fill="#243449"
              fontWeight="600"
            >
              d = {distance.toFixed(0)} km
            </text>

            <text x={canvasW / 2} y={canvasH - 6} textAnchor="middle" fontSize="9" fill="#7a5230" opacity="0.7">
              vertical scale exaggerated · every slider moves the drawing
            </text>
          </svg>
        </div>

        <div className="space-y-4">
          <Field
            label="Distance to peak (km)"
            v={distance}
            setV={setDistance}
            min={10}
            max={250}
            step={1}
            decimals={0}
            help="Chained-triangle distance from your observation station to the peak."
          />
          <Field
            label="Apparent elevation angle (°)"
            v={angle}
            setV={setAngle}
            min={0.05}
            max={10}
            step={0.005}
            decimals={3}
            help="What the theodolite reads. Tiny angles carry huge heights across long baselines."
          />
          <Field
            label="Observer altitude (km)"
            v={observer}
            setV={setObserver}
            min={0}
            max={5}
            step={0.01}
            decimals={2}
            help="Your altitude above sea level. Peak height is measured from sea level, not from your feet."
          />
          <Field
            label="Refraction coefficient k"
            v={refraction}
            setV={setRefraction}
            min={0.1}
            max={0.2}
            step={0.01}
            decimals={2}
            help="Atmospheric bending of light. The Survey used k ≈ 0.13; higher near hot ground, lower at altitude."
          />

          <div className="rounded-md border border-earth-500/20 bg-parchment-50 p-4 text-sm space-y-1.5">
            <div className="flex justify-between">
              <span>
                <span className="field-num mr-1">①</span> Basic geometry{' '}
                <span className="text-earth-600 text-xs">(flat, airless Earth)</span>
              </span>
              <b>
                {heightMeters.toFixed(0)} m · {(heightMeters * 3.28084).toFixed(0)} ft
              </b>
            </div>
            <div className="flex justify-between">
              <span>
                <span className="field-num mr-1">②</span> + Earth's curve & refraction{' '}
                <span className="text-earth-600 text-xs">(+{curvatureDrop.toFixed(0)} m)</span>
              </span>
              <b className="text-brass-600">
                {correctedM.toFixed(0)} m · {(correctedM * 3.28084).toFixed(0)} ft
              </b>
            </div>
            <div className="flex justify-between border-t border-earth-500/15 pt-1.5 mt-1.5 text-xs">
              <span className="text-earth-600">Modern surveyed height (for scale only)</span>
              <b className="text-earth-600">8,848.86 m · 29,032 ft</b>
            </div>
          </div>

          <div className="bg-ink-900 text-parchment-50 rounded p-3 font-mono text-[11px] leading-relaxed">
            h = h₀ + d · tan(θ) + d² · (1 − k) / (2R)
          </div>
        </div>
      </div>

      {/* Curvature/refraction explainer */}
      <div className="card-parchment p-5">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-brass-600" />
          <div className="page-eyebrow">Why the correction matters</div>
        </div>
        <p className="text-sm text-ink-800/90 leading-relaxed">
          Over long distances the Earth curves away, hiding the peak's base below the observer's straight-line horizon;
          atmospheric refraction bends light the other way and cancels part of it. Both fold into one coefficient{' '}
          <em>k</em> ≈ 0.13 (Bomford, <i>Geodesy</i>), and getting it wrong throws the height by hundreds of metres.
          Move the <em>k</em> slider to see it.
        </p>
      </div>
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
  help,
}: {
  label: string
  v: number
  setV: (n: number) => void
  min: number
  max: number
  step: number
  decimals: number
  help?: string
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
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
      {help && <div className="text-[11px] text-earth-600 mt-1 leading-snug">{help}</div>}
    </div>
  )
}
