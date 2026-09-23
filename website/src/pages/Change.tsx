import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionNav from '../components/ui/SectionNav'
import Reveal from '../components/ui/Reveal'
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
        <Reveal>
          <h2 className="section-title">Measured from a hundred miles away</h2>
          <Standfirst>A height nobody could reach.</Standfirst>

          <p className="lede">
            Before the framework existed, nobody could say how tall the summit the survey had numbered Peak XV was.
            Estimates circulated and disagreed, with no way to settle which was right.
          </p>
        </Reveal>

        <p className="body-text mt-5">
          With the framework in place, working out the height was just arithmetic. Observers more than a hundred miles
          off measured the angle up to the summit, and Calcutta corrected it for the curve of the Earth and for
          refraction, the bending of light through air. The answer, published in 1856, was 29,002 feet. Today's figure
          is 29,032.
        </p>

        <p className="body-text mt-4">
          A summit nobody had climbed now had a number, worked out at a desk. Radhanath Sikdar's office did that
          computation, as part of a team. Calling him Everest's discoverer overstates the record, and the story that
          Waugh padded the figure by two feet to avoid a round number is undocumented.
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
        <Reveal>
          <h2 className="section-title">What continued afterward</h2>
          <Standfirst>The Survey of India, and after.</Standfirst>

          <p className="lede">
            The records, instruments, and working methods all outlasted the people who built them. The undertaking
            became the permanent Survey of India, still tied to the same control.
          </p>
        </Reveal>

        <p className="body-text mt-5">
          Satellite positioning does the same job now. A receiver works out how far it is from satellites whose
          positions are known, the same move as fixing a station from known points. The two technologies are
          unrelated, though the problem they solve is identical.
        </p>

        <section className="mt-8 space-y-3">
          {rows.map((r, i) => (
            <motion.div
              key={r.topic}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="card-parchment flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4"
            >
              <div className="field-num sm:w-24 shrink-0">{r.topic}</div>
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                <span className="flex-1 rounded-md border border-earth-500/25 bg-parchment-200/50 px-3 py-2 text-[0.9rem] text-ink-800">
                  {r.then}
                </span>
                <ArrowRight className="hidden sm:block w-4 h-4 text-brass-500 shrink-0" />
                <span className="flex-1 rounded-md border border-ink-900/15 bg-ink-900 px-3 py-2 text-[0.9rem] text-parchment-50">
                  {r.now}
                </span>
              </div>
            </motion.div>
          ))}
        </section>
      </section>

      {/* ── 03 · Why it matters now ────────────────────────────────────── */}
      <section id="today" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <Reveal>
          <h2 className="section-title">Why it matters now</h2>
          <Standfirst>What it looks like now.</Standfirst>

          <p className="lede">
            Where am I, and how far away is that? A phone answers both in about a second, so it's easy to forget that
            exact position used to be something nobody could just know. Someone had to build the first system that
            could actually answer it.
          </p>
        </Reveal>

        <p className="body-text mt-5">
          The survey taught the world much about the true shape of the Earth, and it made an occupied territory easier
          to tax, march through, and hold — both were reasons it got funded.
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
