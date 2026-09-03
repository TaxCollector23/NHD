import { useState } from 'react'

/*
  A four-step walkthrough of the geometry, with the diagram redrawn for each
  step so the picture and the sentence always agree. Static teaching values;
  nothing here is presented as a survey observation.
*/
const STEPS = [
  { k: 'Measure one line',
    body: 'Measure between two points you can walk. This is the only distance anyone measures.' },
  { k: 'Sight the far point twice',
    body: 'From each end, aim at the same hilltop and record the angle off the baseline.' },
  { k: 'Calculate the rest',
    body: 'One side and its two end angles fix the triangle. The distances follow.' },
  { k: 'Use it as the next baseline',
    body: 'A calculated side starts the next triangle. Chained far enough, it crosses anything.' },
]

export default function BaselineSteps() {
  const [step, setStep] = useState(0)

  // Fixed teaching geometry. A and B are the baseline ends; C is the far point.
  const A = { x: 90,  y: 250 }
  const B = { x: 330, y: 250 }
  const C = { x: 250, y: 70 }
  const D = { x: 470, y: 120 }   // the next triangle's third point

  return (
    <div className="card-parchment p-5 md:p-6">
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-6 items-center">
        <svg viewBox="0 0 540 320" className="w-full h-auto" role="img"
             aria-label={`Triangulation step ${step + 1}: ${STEPS[step].k}`}>
          <rect width="540" height="320" fill="#f6efe0" rx="6" />

          {/* ground line */}
          <line x1="40" y1="250" x2="500" y2="250" stroke="#7a5230" strokeWidth="1" opacity="0.35" strokeDasharray="4 5" />

          {/* the next triangle appears only on the last step */}
          {step >= 3 && (
            <>
              <polygon points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
                       fill="rgba(75,122,138,0.10)" stroke="#3d6b7a" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx={D.x} cy={D.y} r="5" fill="#3d6b7a" />
              <text x={D.x + 10} y={D.y + 4} fontSize="13" fill="#3d6b7a" fontFamily="Georgia, serif">next station</text>
            </>
          )}

          {/* computed sides appear from step 3 */}
          {step >= 2 && (
            <>
              <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#a8802a" strokeWidth="2.4" />
              <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#a8802a" strokeWidth="2.4" />
              <text x={150} y={158} fontSize="13" fill="#a8802a" fontFamily="Georgia, serif">calculated</text>
              <text x={300} y={158} fontSize="13" fill="#a8802a" fontFamily="Georgia, serif">calculated</text>
            </>
          )}

          {/* sight lines and angle marks on step 2 */}
          {step === 1 && (
            <>
              <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#3d6b7a" strokeWidth="1.6" strokeDasharray="5 4" />
              <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#3d6b7a" strokeWidth="1.6" strokeDasharray="5 4" />
              <path d={`M ${A.x + 40} ${A.y} A 40 40 0 0 0 ${A.x + 26} ${A.y - 30}`} fill="none" stroke="#3d6b7a" strokeWidth="1.6" />
              <path d={`M ${B.x - 40} ${B.y} A 40 40 0 0 1 ${B.x - 30} ${B.y - 27}`} fill="none" stroke="#3d6b7a" strokeWidth="1.6" />
              <text x={A.x + 44} y={A.y - 22} fontSize="15" fill="#3d6b7a" fontFamily="Georgia, serif">angle</text>
              <text x={B.x - 88} y={B.y - 22} fontSize="15" fill="#3d6b7a" fontFamily="Georgia, serif">angle</text>
            </>
          )}

          {/* the baseline itself, always present, emphasised on step 1 */}
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={step === 0 ? '#0f1a2b' : '#5b3a1e'} strokeWidth={step === 0 ? 5 : 3} strokeLinecap="round" />
          <text x={(A.x + B.x) / 2} y={A.y + 26} textAnchor="middle" fontSize="15"
                fill="#0f1a2b" fontFamily="Georgia, serif">
            baseline · the one measured distance
          </text>

          <circle cx={A.x} cy={A.y} r="6" fill="#0f1a2b" />
          <circle cx={B.x} cy={B.y} r="6" fill="#0f1a2b" />
          <circle cx={C.x} cy={C.y} r="6" fill={step >= 1 ? '#0f1a2b' : '#a07044'} />
          <text x={C.x - 6} y={C.y - 14} textAnchor="middle" fontSize="15" fill="#0f1a2b" fontFamily="Georgia, serif">
            far point
          </text>
        </svg>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {STEPS.map((s, i) => (
              <button key={s.k} onClick={() => setStep(i)}
                className={`rounded-md px-3 py-1.5 text-[0.9rem] border transition-colors ${
                  i === step
                    ? 'bg-ink-900 text-parchment-50 border-ink-900'
                    : 'bg-parchment-100 border-earth-500/30 text-ink-800 hover:bg-parchment-200'
                }`}>
                <span className={`font-mono text-[0.75rem] mr-1.5 ${i === step ? 'text-brass-300' : 'text-brass-600'}`}>
                  0{i + 1}
                </span>
                {s.k}
              </button>
            ))}
          </div>
          <p className="body-text">{STEPS[step].body}</p>
        </div>
      </div>
    </div>
  )
}
