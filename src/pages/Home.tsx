import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/hero/HeroSection'

// Three narrative destinations plus the evidence. Each hook is the question
// that page answers, not a summary of it.
const path = [
  { n: '01', to: '/innovation', label: 'Innovation',
    hook: 'What was actually new.' },
  { n: '02', to: '/impact',     label: 'Impact',
    hook: 'One framework, and who ran it.' },
  { n: '03', to: '/change',     label: 'Change',
    hook: 'A mountain measured from a desk.' },
  { n: '04', to: '/sources',    label: 'Sources',
    hook: 'The document behind every claim.' },
]

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Cold open. The thesis and the hook in one breath, before any navigation. */}
      <section className="container-museum pt-12 pb-10">
        <p className="max-w-[42em] font-display text-[1.8rem] md:text-[2.35rem] leading-[1.2] text-ink-900 text-balance">
          Your phone finds you in one second. <span className="text-brass-600">Doing the same for a
          subcontinent took seventy years and a small army of surveyors.</span>
        </p>
      </section>

      <section className="container-museum pt-2 pb-16">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <div className="field-num">Three parts, then the evidence</div>
          <div className="note-text hidden sm:block">Use the arrow keys to move between pages</div>
        </div>

        <div className="grid sm:grid-cols-2 border-t border-l border-earth-500/20">
          {path.map((p, i) => (
            <motion.div key={p.to}
              initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.03 }}
              className="border-b border-r border-earth-500/20"
            >
              <Link to={p.to} className="group flex items-baseline gap-4 p-6 hover:bg-parchment-100 transition-colors">
                <span className="field-num shrink-0">{p.n}</span>
                <span className="min-w-0">
                  <span className="font-display text-[1.5rem] text-ink-900 group-hover:text-brass-700 transition-colors">{p.label}</span>
                  <span className="block caption-text mt-1">{p.hook}</span>
                </span>
                <ArrowRight className="w-5 h-5 text-earth-500/50 ml-auto self-center shrink-0 group-hover:text-brass-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/innovation" className="btn-primary">
            Begin · Innovation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/tools" className="btn-secondary">Try the tools yourself</Link>
        </div>
      </section>
    </>
  )
}
