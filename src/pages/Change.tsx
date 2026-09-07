import { motion } from 'framer-motion'
import SectionNav from '../components/ui/SectionNav'
import Standfirst from '../components/ui/Standfirst'
import ThreadKicker from '../components/ui/ThreadKicker'
import TimelineStrip from '../components/timeline/TimelineStrip'
import { PeaksHeightChart } from '../components/data/Graphs'
import { pageSections } from '../lib/pages'

const rows: { topic: string; then: string; now: string }[] = [
  { topic: 'Angles', then: 'A brass circle', now: 'Timing from orbit' },
  {
    topic: 'Arithmetic',
    then: 'Log tables and clerks',
    now: 'A chip, instantly',
  },
  {
    topic: 'Reference',
    then: 'A shape the survey computed',
    now: 'A satellite frame',
  },
  { topic: 'Labour', then: 'Thousands of people', now: 'A satellite network' },
]

export default function Change() {
  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Change</div>
      <h1 className="page-title max-w-[14em]">Calculated, not climbed</h1>
      <ThreadKicker />

      <SectionNav sections={pageSections['/change']} />

      {/* ── 01 · Peak XV ───────────────────────────────────────────────── */}
      <section id="peak" className="scroll-mt-28">
        <h2 className="section-title">Measured from a hundred miles away</h2>
        <Standfirst>A height nobody could reach.</Standfirst>

        <p className="lede">
          Before the framework existed, nobody could say how tall the summit the survey had numbered Peak XV was.
          Estimates circulated and disagreed, with no way to settle which was right.
        </p>

        <p className="body-text mt-5">
          With the framework in place, the question became arithmetic. Observers more than a hundred miles off measured
          the angle up to the summit, and Calcutta corrected it for the curve of the Earth and for refraction, the
          bending of light through air. The answer, published in 1856, was 29,002 feet. Today's figure is 29,032.
        </p>

        <p className="body-text mt-4">
          An unclimbed summit had become a number worked out at a desk. Radhanath Sikdar's office did that computation,
          though it was collective work. Calling him the discoverer of Everest claims more than the record supports, and
          the story that Waugh added two feet to avoid a round number is documented nowhere.
        </p>

        <div className="mt-8">
          <PeaksHeightChart />
        </div>

        <TimelineStrip
          from={1847}
          to={1865}
          caption="The stretch of years this section covers, from the survey publishing its own measurements to the name being adopted."
        />
      </section>

      {/* ── 02 · What continued ────────────────────────────────────────── */}
      <section id="after" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">What continued afterward</h2>
        <Standfirst>The Survey of India, and after.</Standfirst>

        <p className="lede">
          The records, the instruments, and the working methods all outlasted the careers that produced them. The
          undertaking became the permanent Survey of India, still tying new work back to the same control.
        </p>

        <p className="body-text mt-5">
          Satellite positioning does the same job now. A receiver works out how far it is from satellites whose
          positions are already known, the same move as fixing a station from known points. The two technologies are
          unrelated, though the problem they solve is identical.
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
        <h2 className="section-title">Why it matters now</h2>
        <Standfirst>What it looks like now.</Standfirst>

        <p className="lede">
          Where am I, and how far is it to there? A phone answers both in about a second, so exact position feels like a
          fact of the world. Someone had to build the first framework that could answer those questions at all.
        </p>

        <p className="body-text mt-5">
          The survey taught the world a great deal about the true shape of the Earth. It also made an occupied territory
          easier to tax, march through, and hold. It was funded for both reasons.
        </p>

        {/* Closes the loop opened by the cold open on the home page. */}
        <div className="mt-10 max-w-[42em]">
          <div className="rule-ticks mb-5" aria-hidden />
          <p className="font-display text-[1.5rem] md:text-[1.95rem] leading-[1.25] text-ink-900 text-balance">
            Seventy years of fieldwork, thousands of surveyors, and an empire that wanted its tax rolls to balance.
            <span className="text-brass-600"> That is what the first accurate map of India cost.</span>
          </p>
        </div>
      </section>
    </div>
  )
}
