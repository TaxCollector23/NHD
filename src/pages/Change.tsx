import { motion } from 'framer-motion'
import SectionNav from '../components/ui/SectionNav'
import Standfirst from '../components/ui/Standfirst'
import ThreadKicker from '../components/ui/ThreadKicker'
import TimelineStrip from '../components/timeline/TimelineStrip'
import { PeaksHeightChart } from '../components/data/Graphs'
import { pageSections } from '../lib/pages'

const rows: { topic: string; then: string; now: string }[] = [
  { topic: 'Angles', then: 'A brass circle', now: 'Timing from orbit' },
  { topic: 'Arithmetic', then: 'Logarithm tables', now: 'Solvers, in seconds' },
  { topic: 'Reference', then: 'A survey-made shape', now: 'A satellite frame' },
  { topic: 'Labour', then: 'A field-and-office workforce', now: 'A distributed satellite network' },
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
          Before the framework existed, the height of the remote summit the survey numbered Peak XV was simply
          unknowable: estimates varied, with no way to settle which was right.
        </p>

        <p className="body-text mt-5">
          Once the framework existed, the question became a calculation. Observers over a hundred miles from Peak XV
          measured the angle of elevation to its summit. Calcutta corrected those angles for the Earth's curvature and
          for refraction, light bending through air, then returned a height: 29,002 feet, published in 1856. The modern
          figure is 29,032.
        </p>

        <p className="body-text mt-4">
          An inaccessible height had become a figure an office could derive at a desk. Radhanath Sikdar's office
          performed that computation, part of a collective process; calling him Everest's discoverer overstates it, and
          the popular anecdote that Waugh added two feet to round the figure remains undocumented.
        </p>

        <div className="mt-8">
          <PeaksHeightChart />
        </div>

        <TimelineStrip
          from={1847}
          to={1865}
          caption="The stretch of years this section covers, from the publication of the survey’s own measurements to the adoption of the name."
        />
      </section>

      {/* ── 02 · What continued ────────────────────────────────────────── */}
      <section id="after" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">What continued after the survey ended</h2>
        <Standfirst>What outlived the survey.</Standfirst>

        <p className="lede">
          Records, instruments, and procedure outlasted the careers that produced them. The undertaking became the
          permanent Survey of India, tying later work back to that same trigonometrical control.
        </p>

        <p className="body-text mt-5">
          Satellite positioning performs the equivalent function today: a receiver calculates its distance from
          satellites whose positions are already known, the same maneuver as fixing a station from a network of known
          points. The technology shares nothing with the nineteenth-century method.
        </p>

        <section className="mt-8 card-parchment overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-ink-900 text-parchment-50 text-[0.75rem] uppercase tracking-[0.2em]">
            <div className="p-4">Same job</div>
            <div className="p-4">In the 1800s</div>
            <div className="p-4">Today</div>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.topic}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-3 border-t border-earth-500/20"
            >
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
          Where am I, and how far away is that? A smartphone answers within a second, making precise position feel like
          an inherent fact of the world. It is not: someone built the first such framework, deliberately and slowly,
          checking every measurement against another.
        </p>

        <p className="body-text mt-5">
          That framework served two purposes at once: it advanced knowledge of the Earth's true shape, and it made an
          occupied territory easier to tax, move troops through, and hold. Both were what it was for.
        </p>

        {/* Closes the loop opened by the cold open on the home page. */}
        <div className="mt-10 max-w-[42em]">
          <div className="rule-ticks mb-5" aria-hidden />
          <p className="font-display text-[1.5rem] md:text-[1.95rem] leading-[1.25] text-ink-900 text-balance">
            Seventy years, an army of surveyors, and an empire's reasons for financing them.
            <span className="text-brass-600"> That is what one second of certainty cost to build the first time.</span>
          </p>
        </div>
      </section>
    </div>
  )
}
