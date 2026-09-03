import { motion } from 'framer-motion'
import SectionNav from '../components/ui/SectionNav'
import Standfirst from '../components/ui/Standfirst'
import ThreadKicker from '../components/ui/ThreadKicker'
import TimelineStrip from '../components/timeline/TimelineStrip'
import { PeaksHeightChart } from '../components/data/Graphs'
import { pageSections } from '../lib/pages'

const rows: { topic: string, then: string, now: string }[] = [
  { topic: 'Angles',     then: 'A brass circle',      now: 'Timing from orbit' },
  { topic: 'Arithmetic', then: 'Logarithm tables',     now: 'Solvers, in seconds' },
  { topic: 'Reference',  then: 'A survey-made shape',  now: 'A satellite frame' },
]

export default function Change() {
  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Change</div>
      <h1 className="page-title max-w-[14em]">From unknowable to computable</h1>
      <ThreadKicker />

      <SectionNav sections={pageSections['/change']} />

      {/* ── 01 · Peak XV ───────────────────────────────────────────────── */}
      <section id="peak" className="scroll-mt-28">
        <h2 className="section-title">A mountain measured from a hundred miles away</h2>
        <Standfirst>One height nobody could reach.</Standfirst>

        <p className="lede">
          Before the framework existed, nobody could establish the height of the remote Himalayan peak the
          survey numbered Peak XV. You could see it and guess, and no two guesses agreed.
        </p>

        <p className="body-text mt-5">
          Once it existed, the question became arithmetic. Observers more than a hundred miles from Peak XV
          measured the angle up to its summit. Calcutta corrected those angles for the Earth's curve and the
          bending of light through air, then returned a height: 29,002 feet, published in 1856. The modern
          figure is 29,032.
        </p>

        <p className="body-text mt-4">
          A height nobody could reach had become a number an office could calculate. That is the change.
          Radhanath Sikdar’s office did the computation, part of a collective process. Calling him
          Everest’s discoverer overstates it, and the two-feet-added story is undocumented.
        </p>

        <div className="mt-8">
          <PeaksHeightChart />
        </div>

        <TimelineStrip from={1847} to={1865}
          caption="The stretch of years this section covers, from the publication of the survey’s own measurements to the adoption of the name." />
      </section>

      {/* ── 02 · What continued ────────────────────────────────────────── */}
      <section id="after" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">What continued after the survey ended</h2>
        <Standfirst>What outlived the survey.</Standfirst>

        <p className="lede">
          Records, instruments, and written procedure outlived the careers that made them. The project
          became the permanent Survey of India, and later work was tied to the same control.
        </p>

        <p className="body-text mt-5">
          Satellite positioning does that job now. A receiver measures its distance from satellites whose
          positions are known, the same move as fixing a station from the network. The technology shares
          nothing.
        </p>

        <section className="mt-8 card-parchment overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-ink-900 text-parchment-50 text-[0.75rem] uppercase tracking-[0.2em]">
            <div className="p-4">Same job</div>
            <div className="p-4">In the 1800s</div>
            <div className="p-4">Today</div>
          </div>
          {rows.map((r, i) => (
            <motion.div key={r.topic}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-3 border-t border-earth-500/20">
              <div className="p-4 font-display text-[1.2rem] text-brass-600">{r.topic}</div>
              <div className="p-4 caption-text">{r.then}</div>
              <div className="p-4 caption-text">{r.now}</div>
            </motion.div>
          ))}
        </section>
      </section>

      {/* ── 03 · Why it matters now ────────────────────────────────────── */}
      <section id="today" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">Why this matters to someone who has never heard of it</h2>
        <Standfirst>The opening question, answered.</Standfirst>

        <p className="lede">
          Where am I, and how far away is that. A phone answers in a second, which makes precise position
          feel like a fact of nature. It is not. Someone built the first one, slowly, and checked it.
        </p>

        <p className="body-text mt-5">
          The same framework served two purposes. It made the shape of the Earth better known, and it made
          an occupied territory easier to tax, move troops through, and hold. Both are what the survey was
          for.
        </p>

        {/* Closes the loop opened by the cold open on the home page. */}
        <div className="mt-10 max-w-[42em]">
          <div className="rule-ticks mb-5" aria-hidden />
          <p className="font-display text-[1.5rem] md:text-[1.95rem] leading-[1.25] text-ink-900 text-balance">
            Seventy years, a small army of surveyors, and an empire's reasons for paying.
            <span className="text-brass-600"> That is what one second of certainty cost to build the first
            time.</span>
          </p>
        </div>

      </section>
    </div>
  )
}
