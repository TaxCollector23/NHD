import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionNav from '../components/ui/SectionNav'
import Standfirst from '../components/ui/Standfirst'
import ThreadKicker from '../components/ui/ThreadKicker'
import CoverageCompare from '../components/maps/CoverageCompare'
import BaselineSteps from '../components/triangulation/BaselineSteps'
import TimelineStrip from '../components/timeline/TimelineStrip'
import { pageSections } from '../lib/pages'

export default function Innovation() {
  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Innovation</div>
      <h1 className="page-title max-w-[15em]">A system for measuring a subcontinent</h1>
      <ThreadKicker />

      <SectionNav sections={pageSections['/innovation']} />

      {/* ── 01 · The problem ───────────────────────────────────────────── */}
      <section id="problem" className="scroll-mt-28">
        <h2 className="section-title">Why measurement mattered</h2>
        <Standfirst>What the Company needed.</Standfirst>

        <p className="lede">
          By 1800 the East India Company held a lot of Indian territory and paid its bills by taxing land. To tax land
          you have to know where it is.
        </p>

        <p className="body-text mt-5">
          James Rennell and other Company surveyors had already charted whole regions by 1788. The trouble was that each
          region had been surveyed on its own, so nobody knew how far apart any two were. William Lambton's idea was to
          measure one accurate skeleton first and hang the old maps on it.
        </p>

        <div className="mt-8">
          <CoverageCompare />
        </div>

        <p className="body-text mt-6 max-w-[40em]">
          <b className="text-ink-900">Doing it was another matter.</b> Mountains blocked sight lines, the monsoon
          stopped fieldwork every year, disease killed people in the field including Lambton, and every triangle
          was worked by hand.
        </p>

        <TimelineStrip
          from={1788}
          to={1830}
          caption="Rennell's maps were already published in 1788. Lambton started work in 1802, and it took another sixteen years for that work to become a named, permanent department."
        />
      </section>

      {/* ── 02 · How it worked ─────────────────────────────────────────── */}
      <section id="method" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">Measuring a distance you never walk</h2>
        <Standfirst>The geometry, in four steps.</Standfirst>

        <p className="lede">
          The method is triangulation. Measure one line on the ground. Stand at each end and aim at the same distant
          hill. Those two angles and that one distance fix the whole triangle.
        </p>

        <div className="mt-8">
          <BaselineSteps />
        </div>

        <div className="mt-12 max-w-[40em]">
          <div>
            <h3 className="sub-title">Old technique, new scale</h3>
            <p className="body-text mt-4">
              European surveyors had solved triangles this way for two hundred years. What this survey did differently
              was keep going, across a subcontinent, for seventy years. A parish surveyor solved one triangle and went
              home. This survey chained thousands together, kept an office in Calcutta that did nothing but arithmetic,
              and treated any disagreement between readings as something to chase down. Colin Mackenzie set out the
              principle in 1815: persevere "on one undeviating plan."
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-md border border-brass-500/40 bg-brass-500/10 p-5 flex flex-wrap items-center justify-between gap-4">
          <p className="note-text max-w-[34em]">
            Every method described here has a working model on the tools page, including one that shows a small angle
            error growing as triangles get chained together.
          </p>
          <Link to="/tools" className="btn-primary shrink-0">
            Try the tools yourself <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 03 · The instruments ───────────────────────────────────────── */}
      <section id="instruments" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">Where the accuracy came from</h2>
        <Standfirst>Mostly from doing things twice.</Standfirst>

        <p className="lede">
          A theodolite is a telescope mounted so it swings against finely marked circles, letting an observer read off
          where it points. Most of the accuracy came from repetition. Latitude got checked separately against
          the stars, and angles corrected for refraction, the way air bends light. W. Hodson wrote down the rule:
          investigate discrepancies, never conceal them.
        </p>

        <ul className="body-text mt-6 max-w-[40em] space-y-2 list-disc pl-5">
          <li>
            <b className="text-ink-900">Baseline apparatus:</b> two metals paired so that their expansion in the heat
            cancelled out.
          </li>
          <li>
            <b className="text-ink-900">Astronomical observation:</b> latitude fixed by starlight, which gave a check
            the triangles had no part in.
          </li>
          <li>
            <b className="text-ink-900">Measuring chains:</b> a steel chain, corrected for temperature, laid out each
            baseline.
          </li>
        </ul>

        <p className="note-text mt-5 max-w-[40em]">
          No weight, size, or angular resolution for the survey's instruments appears anywhere on this site. Those
          numbers get repeated in plenty of places, but none of them could be traced back to a document, so none of them
          are here.
        </p>
      </section>
    </div>
  )
}
