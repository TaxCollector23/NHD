import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IndiaBackground, INDIA_VIEWBOX } from '../maps/IndiaMap'
import { stations, triangles } from '../../data/locations'

/*
  Hero. Names the subject plainly, asks the historical question, answers it in
  one paragraph. The diagram on the right uses the same real d3-geo projection
  as every other map on the site.
*/
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-earth-500/15">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="container-museum relative grid lg:grid-cols-[1.12fr_1fr] gap-10 lg:gap-14 items-center py-14 md:py-20">
        <div>
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-x-3 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-brass-600"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span>National History Day 2027</span>
            <span className="text-earth-600">Innovation in History: Impact, Influence, Change</span>
          </motion.div>

          <motion.h1
            className="mt-5 font-display font-semibold text-ink-900 text-balance
                       text-[2.6rem] leading-[1.05] sm:text-[3.4rem] lg:text-[4.1rem] lg:leading-[1.02]"
            style={{ letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            The Great Trigonometrical <span className="text-brass-600">Survey of India</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[34em] font-display text-[1.3rem] md:text-[1.45rem] text-ink-800 leading-[1.45] text-pretty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            From 1802 to 1871, British and Indian surveyors fixed the exact position of places across India. Most of
            that ground they never set foot on.
          </motion.p>

          <motion.p
            className="mt-5 body-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            The math behind it was already two hundred years old — the hard part was holding one plan together across
            a whole subcontinent for seventy years.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <Link to="/innovation" className="btn-primary">
              Start with the problem <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tools" className="btn-secondary">
              Try the tools
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-x-7 gap-y-1 note-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>
              <b className="text-ink-800">1802</b> first baseline measured
            </span>
            <span>
              <b className="text-ink-800">1818</b> named the Great Trigonometrical Survey
            </span>
            <span>
              <b className="text-ink-800">Peak XV</b> calculated, not climbed
            </span>
          </motion.div>
        </div>

        <div className="relative">
          <div className="relative rounded-lg border border-earth-500/20 bg-parchment-50/40 p-4 shadow-sm">
            <svg
              viewBox={INDIA_VIEWBOX}
              className="w-full h-auto"
              role="img"
              aria-label="A network of survey triangles built across a projection of India"
            >
              <IndiaBackground showArc />

              {triangles.map(([a, b, c], i) => {
                const sa = stations.find((s) => s.id === a)!
                const sb = stations.find((s) => s.id === b)!
                const sc = stations.find((s) => s.id === c)!
                return (
                  <motion.polygon
                    key={i}
                    points={`${sa.x},${sa.y} ${sb.x},${sb.y} ${sc.x},${sc.y}`}
                    fill="none"
                    stroke="#a8802a"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.85, pathLength: 1 }}
                    transition={{
                      delay: 0.9 + i * 0.1,
                      duration: 0.55,
                      ease: 'easeOut',
                    }}
                  />
                )
              })}

              {stations.map((s, i) => (
                <motion.g
                  key={s.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + i * 0.05,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  <circle cx={s.x} cy={s.y} r="3.2" fill="#0f1a2b" />
                </motion.g>
              ))}
            </svg>
            <p className="note-text mt-2">
              The station coordinates are real places. The mesh drawn between them is a teaching diagram, not the
              historical network.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
