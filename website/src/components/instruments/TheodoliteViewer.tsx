import { useEffect, useState } from 'react'
import type { Readout } from '../ui/ToolPanel'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Ruler } from 'lucide-react'

type Part = 'telescope' | 'scale' | 'mount' | 'screws'

type InstrumentProfile = {
  id: string
  name: string
  size: string
  use: string
  note: string
}

const INSTRUMENTS: InstrumentProfile[] = [
  {
    id: 'great',
    name: 'Great theodolite',
    size: '36-inch circle',
    use: 'large primary-instrument example',
    note: 'The 1851 report lists two great theodolites with 36-inch circles.',
  },
  {
    id: 'vernier',
    name: 'Vernier theodolite',
    size: '14-inch circle',
    use: 'smaller instrument example',
    note: 'The 1851 report also lists 14-inch Vernier theodolites.',
  },
]

const info: Record<Part, { n: number; title: string; short: string; body: string }> = {
  telescope: {
    n: 1,
    title: 'Sighting scope',
    short: 'Aims the theodolite',
    body: 'A telescope pointed at a distant flag or heliotrope mirror; crosshairs are brought onto the target before the angle is read off.',
  },
  scale: {
    n: 2,
    title: 'Graduated horizontal circle',
    short: 'Reads the bearing',
    body: 'A large graduated brass circle. Verniers spaced around its rim let the observer read the bearing very finely.',
  },
  screws: {
    n: 3,
    title: 'Adjustment screws',
    short: 'Fine aim + level',
    body: 'Tangent screws for fine aiming, and levelling screws to keep the instrument horizontal. A misaligned theodolite spoils every reading.',
  },
  mount: {
    n: 4,
    title: 'Cast-iron mount & tripod',
    short: 'Holds it steady',
    body: 'A massive brass base and tripod; the weight resists the vibration that would ruin a precise reading.',
  },
}

export default function TheodoliteViewer({ onReadout }: { onReadout?: (r: Readout[]) => void } = {}) {
  const [active, setActive] = useState<Part>('telescope')
  const [rot, setRot] = useState(0)
  const [instrumentId, setInstrumentId] = useState('great')

  const isActive = (p: Part) => active === p
  const strokeFor = (p: Part) => (isActive(p) ? '#c89b3a' : '#5b3a1e')
  const widthFor = (p: Part) => (isActive(p) ? 2.5 : 1.4)

  const cur = info[active]
  const instrument = INSTRUMENTS.find((item) => item.id === instrumentId) ?? INSTRUMENTS[0]

  useEffect(() => {
    if (!onReadout) return
    onReadout([
      { label: 'Part selected', value: cur.title },
      { label: 'What it does', value: cur.short },
      { label: 'Telescope swung to', value: `${rot.toFixed(0)}°` },
      { label: 'Instrument context', value: `${instrument.name}, ${instrument.size}` },
    ])
  }, [onReadout, cur, rot, instrument])

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
        {/* Schematic */}
        <div className="card-parchment p-4">
          <svg
            viewBox="0 0 400 520"
            className="w-full h-auto"
            role="img"
            aria-label={`Schematic theodolite with ${cur.title.toLowerCase()} selected`}
          >
            <defs>
              <linearGradient id="brassGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#eccb84" />
                <stop offset="50%" stopColor="#c89b3a" />
                <stop offset="100%" stopColor="#a8802a" />
              </linearGradient>
            </defs>

            <text x="200" y="510" textAnchor="middle" fontSize="11" fill="#7a5230">
              Schematic based on the instrument parts in the survey record. Click a number.
            </text>

            {/* Tripod + Mount = part 4 */}
            <g onClick={() => setActive('mount')} style={{ cursor: 'pointer' }}>
              <line
                x1="200"
                y1="370"
                x2="115"
                y2="475"
                stroke={strokeFor('mount')}
                strokeWidth={widthFor('mount') + 2}
              />
              <line
                x1="200"
                y1="370"
                x2="285"
                y2="475"
                stroke={strokeFor('mount')}
                strokeWidth={widthFor('mount') + 2}
              />
              <line
                x1="200"
                y1="370"
                x2="200"
                y2="480"
                stroke={strokeFor('mount')}
                strokeWidth={widthFor('mount') + 2}
              />
              <rect
                x="155"
                y="345"
                width="90"
                height="28"
                rx="4"
                fill="url(#brassGrad)"
                stroke={strokeFor('mount')}
                strokeWidth={widthFor('mount')}
              />
            </g>

            {/* Graduated circle = part 2 */}
            <g onClick={() => setActive('scale')} style={{ cursor: 'pointer' }}>
              <ellipse
                cx="200"
                cy="325"
                rx="115"
                ry="20"
                fill="url(#brassGrad)"
                stroke={strokeFor('scale')}
                strokeWidth={widthFor('scale')}
              />
              {Array.from({ length: 36 }).map((_, i) => {
                const ang = (i / 36) * Math.PI * 2
                const x1 = 200 + Math.cos(ang) * 115
                const y1 = 325 + Math.sin(ang) * 20
                const x2 = 200 + Math.cos(ang) * 105
                const y2 = 325 + Math.sin(ang) * 18
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5b3a1e" strokeWidth="0.6" />
              })}
              {/* red pointer, rotates with telescope */}
              <g
                style={{
                  transformOrigin: '200px 325px',
                  transform: `rotate(${rot}deg)`,
                }}
              >
                <line x1="200" y1="325" x2="200" y2="300" stroke="#7a2020" strokeWidth="2" />
                <polygon points="200,298 195,308 205,308" fill="#7a2020" />
              </g>
            </g>

            {/* Screws = part 3 */}
            <g onClick={() => setActive('screws')} style={{ cursor: 'pointer' }}>
              <circle
                cx="115"
                cy="325"
                r="8"
                fill="url(#brassGrad)"
                stroke={strokeFor('screws')}
                strokeWidth={widthFor('screws')}
              />
              <circle
                cx="285"
                cy="325"
                r="8"
                fill="url(#brassGrad)"
                stroke={strokeFor('screws')}
                strokeWidth={widthFor('screws')}
              />
              <circle
                cx="200"
                cy="360"
                r="8"
                fill="url(#brassGrad)"
                stroke={strokeFor('screws')}
                strokeWidth={widthFor('screws')}
              />
            </g>

            {/* Telescope = part 1 */}
            <motion.g
              animate={{ rotate: rot }}
              style={{
                transformOrigin: '200px 265px',
                transformBox: 'view-box' as any,
              }}
              transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            >
              <rect
                x="182"
                y="215"
                width="36"
                height="90"
                rx="6"
                fill="url(#brassGrad)"
                stroke="#5b3a1e"
                strokeWidth="1"
              />
              <g onClick={() => setActive('telescope')} style={{ cursor: 'pointer' }}>
                <rect
                  x="70"
                  y="255"
                  width="260"
                  height="22"
                  rx="11"
                  fill="url(#brassGrad)"
                  stroke={strokeFor('telescope')}
                  strokeWidth={widthFor('telescope')}
                />
                <circle
                  cx="70"
                  cy="266"
                  r="15"
                  fill="#243449"
                  stroke={strokeFor('telescope')}
                  strokeWidth={widthFor('telescope')}
                />
                <circle
                  cx="330"
                  cy="266"
                  r="11"
                  fill="#243449"
                  stroke={strokeFor('telescope')}
                  strokeWidth={widthFor('telescope')}
                />
                <line
                  x1="70"
                  y1="266"
                  x2="52"
                  y2="266"
                  stroke={strokeFor('telescope')}
                  strokeWidth={widthFor('telescope')}
                />
              </g>
            </motion.g>

            {/* Numeric callout circles — visible always, click to select the part */}
            {[
              { n: 1, cx: 45, cy: 266, part: 'telescope' as Part },
              { n: 2, cx: 335, cy: 340, part: 'scale' as Part },
              { n: 3, cx: 100, cy: 305, part: 'screws' as Part },
              { n: 4, cx: 105, cy: 470, part: 'mount' as Part },
            ].map((c) => (
              <g key={c.n} onClick={() => setActive(c.part)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r="13"
                  fill={isActive(c.part) ? '#c89b3a' : '#0f1a2b'}
                  stroke="#0f1a2b"
                  strokeWidth="1.5"
                />
                <text
                  x={c.cx}
                  y={c.cy + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={isActive(c.part) ? '#0f1a2b' : '#f5eddc'}
                >
                  {c.n}
                </text>
              </g>
            ))}
          </svg>

          <div className="flex items-center gap-3 mt-3">
            <label htmlFor="telescope-rotation" className="text-xs text-ink-700 whitespace-nowrap">Rotate telescope</label>
            <input
              id="telescope-rotation"
              type="range"
              min={-45}
              max={45}
              value={rot}
              onChange={(e) => setRot(parseInt(e.target.value))}
              className="flex-1 accent-brass-600"
            />
            <span className="font-mono text-xs w-10 text-right">{rot}°</span>
          </div>
          <p className="text-xs text-earth-600 mt-2 leading-snug">
            Drag the slider to swing the telescope. The red pointer on the graduated circle tracks its bearing.
          </p>
        </div>

        {/* Info panel */}
        <div className="card-parchment p-6">
          <div className="page-eyebrow mb-1">What is a theodolite?</div>
          <p className="text-sm text-ink-800/90 leading-relaxed">
            It measures the angle between two directions. Read the circle toward target A, swing to target B, and read
            again. The difference is your angle. Everything else on the instrument exists to make that reading
            trustworthy to a tiny fraction of a degree.
          </p>

          <div className="mt-4 border-t border-earth-500/20 pt-4">
            <div className="page-eyebrow mb-2">Instrument sizes in the record</div>
            <div className="grid grid-cols-2 gap-2">
              {INSTRUMENTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInstrumentId(item.id)}
                  aria-pressed={instrument.id === item.id}
                  className={`text-left rounded-md border px-3 py-2 text-xs transition-colors ${
                    instrument.id === item.id
                      ? 'bg-ink-900 text-parchment-50 border-ink-900'
                      : 'bg-parchment-100 border-earth-500/30 hover:bg-parchment-200'
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  <span className={instrument.id === item.id ? 'text-parchment-200' : 'text-earth-600'}>{item.size}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-earth-600 mt-2 leading-snug">{instrument.note} The selector gives context, not a claim about one specific reading.</p>
          </div>

          <div className="mt-4 border-t border-earth-500/20 pt-4">
            <div className="page-eyebrow mb-2">The four parts</div>
            <div className="grid grid-cols-4 gap-1.5">
              {(Object.keys(info) as Part[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setActive(p)}
                  aria-pressed={isActive(p)}
                  className={`rounded-md border py-2 text-xs font-medium transition-colors ${
                    isActive(p)
                      ? 'bg-ink-900 text-parchment-50 border-ink-900'
                      : 'bg-parchment-100 border-earth-500/30 hover:bg-parchment-200'
                  }`}
                >
                  <span className="block font-mono opacity-70 text-[10px]">0{info[p].n}</span>
                  {info[p].short}
                </button>
              ))}
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-md bg-parchment-50/70 border border-earth-500/20 p-4"
            >
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-ink-900 text-parchment-50 grid place-items-center text-xs font-bold shrink-0">
                  {cur.n}
                </span>
                <h4 className="font-display text-lg text-ink-900">{cur.title}</h4>
              </div>
              <p className="text-sm text-ink-800/90 leading-relaxed">{cur.body}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Eyepiece + Vernier reading demo */}
      <EyepieceAndVernier instrument={instrument} />
    </div>
  )
}

// ─── Eyepiece + Vernier reading demo ────────────────────────────────────────

function EyepieceAndVernier({ instrument }: { instrument: InstrumentProfile }) {
  const [target, setTarget] = useState(23.5) // observer's angular direction, °
  const [aim, setAim] = useState(23.499) // where the crosshairs sit, °
  const [secondAim, setSecondAim] = useState(23.500) // second simulated reading, °
  const firstErrorArcsec = (target - aim) * 3600
  const secondErrorArcsec = (target - secondAim) * 3600
  const meanAim = (aim + secondAim) / 2
  const errArcsec = (target - meanAim) * 3600
  const locked = Math.abs(errArcsec) < 60

  // Vernier reading: split the mean of two simulated readings into degrees,
  // minutes, and seconds. The readings are teaching inputs, not field data.
  const deg = Math.floor(meanAim)
  const minutes = Math.floor((meanAim - deg) * 60)
  const seconds = Math.round(((meanAim - deg) * 60 - minutes) * 60)

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Eyepiece */}
      <div className="card-parchment p-4">
        <div className="page-eyebrow mb-1 flex items-center gap-2">
          <Eye className="w-3 h-3" /> Look through the eyepiece
        </div>
        <p className="text-xs text-ink-800/85 mb-3 leading-snug">
          A distant target sits in the crosshairs of the {instrument.name.toLowerCase()}. Move each simulated reading,
          then use their mean as the angle that goes into the calculation. The lock marker is only a teaching threshold.
        </p>
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto rounded overflow-hidden"
          role="img"
          aria-label={`Simulated telescope view with two readings averaging ${meanAim.toFixed(2)} degrees`}
        >
          <defs>
            <radialGradient id="sky" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#d5e4f0" />
              <stop offset="100%" stopColor="#8aa3ba" />
            </radialGradient>
            <clipPath id="scope">
              <circle cx="200" cy="150" r="130" />
            </clipPath>
          </defs>
          <rect width="400" height="300" fill="#1a1207" />
          <circle cx="200" cy="150" r="130" fill="url(#sky)" />
          <g clipPath="url(#scope)">
            <polygon
              points={`${200 + (target - meanAim) * 25 - 90},220 ${200 + (target - meanAim) * 25 - 40},110 ${200 + (target - meanAim) * 25 + 10},175 ${200 + (target - meanAim) * 25 + 60},95 ${200 + (target - meanAim) * 25 + 130},220`}
              fill="#4a3620"
              opacity="0.85"
            />
            <polygon
              points={`${200 + (target - meanAim) * 25 - 20},135 ${200 + (target - meanAim) * 25 - 5},108 ${200 + (target - meanAim) * 25 + 10},135`}
              fill="#f5eddc"
              opacity="0.9"
            />
            <circle
              cx={200 + (target - meanAim) * 25 - 5}
              cy={108}
              r="2.5"
              fill={locked ? '#c89b3a' : '#f5eddc'}
              stroke="#7a2020"
              strokeWidth={locked ? 1.4 : 0}
            />
          </g>
          <line x1="200" y1="30" x2="200" y2="270" stroke={locked ? '#c89b3a' : '#7a2020'} strokeWidth="1" />
          <line x1="70" y1="150" x2="330" y2="150" stroke={locked ? '#c89b3a' : '#7a2020'} strokeWidth="1" />
          <circle cx="200" cy="150" r="8" fill="none" stroke={locked ? '#c89b3a' : '#7a2020'} strokeWidth="1" />
          <circle cx="200" cy="150" r="130" fill="none" stroke="#0f1a2b" strokeWidth="6" />
          <text x="200" y="290" textAnchor="middle" fontSize="11" fill="#eccb84">
            mean reading {meanAim.toFixed(4)}° · target{' '}
            {locked ? 'ON (locked)' : `OFF by ${Math.abs(errArcsec).toFixed(0)}″`}
          </text>
        </svg>
        <div className="mt-3 space-y-2">
          <Range
            label="Where the peak actually is (simulated drift)"
            v={target}
            setV={setTarget}
            min={22}
            max={25}
            step={0.001}
            decimals={4}
          />
          <Range
            label="Adjust the crosshair (fine tangent screw)"
            v={aim}
            setV={setAim}
            min={22}
            max={25}
            step={0.0001}
            decimals={4}
          />
          <Range
            label="Second reading"
            v={secondAim}
            setV={setSecondAim}
            min={22}
            max={25}
            step={0.0001}
            decimals={4}
          />
          <div className="text-xs text-earth-600 leading-snug">
            Round 1: {Math.abs(firstErrorArcsec).toFixed(0)}″ off · Round 2: {Math.abs(secondErrorArcsec).toFixed(0)}″ off · mean: {Math.abs(errArcsec).toFixed(0)}″ off
          </div>
        </div>
      </div>

      {/* Vernier reading */}
      <div className="card-parchment p-4">
        <div className="page-eyebrow mb-1 flex items-center gap-2">
          <Ruler className="w-3 h-3" /> Read the angle · vernier scale
        </div>
        <p className="text-xs text-ink-800/85 mb-3 leading-snug">
          Once the crosshair is on target, the angle is read here. The <b>main scale</b> gives degrees and 5-minute
          marks. The <b>vernier</b> (highlighted brass strip) slides along it. Whichever vernier tick lines up with a
          main-scale tick tells you the extra seconds. The full reading is shown below.
        </p>
        <svg
          viewBox="0 0 500 200"
          className="w-full h-auto"
          role="img"
          aria-label={`Vernier scale showing ${deg} degrees, ${minutes} minutes, and ${seconds} seconds`}
        >
          <rect width="500" height="200" fill="#f5eddc" />
          <text x="20" y="30" fontSize="11" fill="#5b3a1e" fontWeight="600">
            Main scale (° and 5′)
          </text>
          {Array.from({ length: 60 }).map((_, i) => {
            const tickX = 20 + i * 7.5
            const long = i % 12 === 0
            return (
              <g key={i}>
                <line
                  x1={tickX}
                  y1={50}
                  x2={tickX}
                  y2={long ? 74 : 66}
                  stroke="#0f1a2b"
                  strokeWidth={long ? 1.4 : 0.8}
                />
                {long && (
                  <text x={tickX} y={90} textAnchor="middle" fontSize="10" fill="#243449">
                    {deg - 2 + i / 12}°
                  </text>
                )}
              </g>
            )
          })}
          <g transform={`translate(${20 + (aim - (deg - 2)) * 12 * 7.5 - 45}, 100)`}>
            <rect
              x="0"
              y="0"
              width="90"
              height="34"
              rx="3"
              fill="rgba(200,155,58,0.35)"
              stroke="#a8802a"
              strokeWidth="1.5"
            />
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <line
                  x1={i * 9}
                  y1={0}
                  x2={i * 9}
                  y2={i === Math.round(seconds / 6) ? 20 : 12}
                  stroke="#7a2020"
                  strokeWidth={i === Math.round(seconds / 6) ? 1.8 : 0.8}
                />
                {i % 5 === 0 && (
                  <text x={i * 9} y={30} textAnchor="middle" fontSize="9" fill="#7a2020">
                    {i * 6}″
                  </text>
                )}
              </g>
            ))}
            <line x1={45} y1={-6} x2={45} y2={0} stroke="#7a2020" strokeWidth="1.6" />
          </g>
          <text x="20" y="170" fontSize="13" fill="#0f1a2b" fontWeight="700">
            Reading: {deg}° {minutes.toString().padStart(2, '0')}′ {seconds.toString().padStart(2, '0')}″
          </text>
          <text x="20" y="188" fontSize="10" fill="#5b3a1e">
            The tallest red vernier line marks the coincident tick.
          </text>
        </svg>
        <p className="text-xs text-earth-600 mt-2 leading-relaxed">
          The two readings are averaged before the result is carried into the{' '}
          <Link to="/tools#triangulation" className="underline decoration-dotted">
            Triangulation
          </Link>{' '}
          model. The 1851 equipment list supplies the instrument context above, but not these simulated readings.
        </p>
      </div>
    </div>
  )
}

function Range({
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
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-ink-800">{label}</span>
        <span className="font-mono text-brass-600">{v.toFixed(decimals)}°</span>
      </div>
      <input
        type="range"
        aria-label={label}
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
