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
      <h1 className="page-title max-w-[15em]">A system built to measure a subcontinent</h1>
      <ThreadKicker />

      <SectionNav sections={pageSections['/innovation']} />

      {/* ── 01 · The problem ───────────────────────────────────────────── */}
      <section id="problem" className="scroll-mt-28">
        <h2 className="section-title">Why measurement mattered</h2>
        <Standfirst>What the Company needed.</Standfirst>

        <p className="lede">
          By 1800 the East India Company governed a large Indian territory and paid for itself by taxing land. Troops
          had to move, and authority had to reach ground it did not hold.
        </p>

        <p className="body-text mt-5">
          Maps already existed: James Rennell and other Company surveyors had charted whole regions by 1788. The gap was
          connection, since each region was surveyed separately and distances between them stayed unknown. William
          Lambton proposed measuring one precise skeleton first, then hanging every map on it.
        </p>

        <div className="mt-8">
          <CoverageCompare />
        </div>

        <p className="body-text mt-6 max-w-[40em]">
          <b className="text-ink-900">What stood in the way:</b> mountainous terrain blocked sight lines, the monsoon
          halted fieldwork each year, disease killed people in the field (Lambton among them), and every triangle had to
          be computed by hand.
        </p>

        <TimelineStrip
          from={1788}
          to={1830}
          caption="The survey did not start from nothing. Rennell's mapping was already published in 1788, and the work Lambton began in 1802 only became a named, permanent department sixteen years later."
        />
      </section>

      {/* ── 02 · How it worked ─────────────────────────────────────────── */}
      <section id="method" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">How you measure a distance you never travel</h2>
        <Standfirst>The geometry, in four steps.</Standfirst>

        <p className="lede">
          Triangulation is the method, and the idea fits in a sentence. Measure one line on the ground, sight a distant
          point from both ends, and the triangle gives its distance.
        </p>

        <div className="mt-8">
          <BaselineSteps />
        </div>

        <div className="mt-12 max-w-[40em]">
          <div>
            <h3 className="sub-title">The technique was old. The scale was not.</h3>
            <p className="body-text mt-4">
              None of this was new. European surveyors had solved triangles this way for two centuries. The new part was
              doing it continuously, across a subcontinent, for seventy years.
            </p>
            <p className="body-text mt-4">
              A parish surveyor solved one triangle and went home. This survey chained thousands together, kept an
              office in Calcutta whose only job was the arithmetic, and made investigating disagreement a procedure.
              Colin Mackenzie named the principle in 1815: persevere "on one undeviating plan."
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-md border border-brass-500/40 bg-brass-500/10 p-5 flex flex-wrap items-center justify-between gap-4">
          <p className="note-text max-w-[34em]">
            Working models of every method described here, including one that shows how a small angle error grows as
            triangles are chained together, are collected on one page.
          </p>
          <Link to="/tools" className="btn-primary shrink-0">
            Try the tools yourself <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── 03 · The instruments ───────────────────────────────────────── */}
      <section id="instruments" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">Precision was a procedure, not a gadget</h2>
        <Standfirst>Where the accuracy came from.</Standfirst>

        <p className="lede">
          A theodolite is a telescope that swings against finely divided circles, letting an observer read where it
          points. Accuracy came from repetition: star sightings fixed latitude independently, and angles were corrected
          for refraction, the bending of light through air. W. Hodson recorded the rule: investigate discrepancies,
          never conceal them.
        </p>

        <ul className="body-text mt-6 max-w-[40em] space-y-2 list-disc pl-5">
          <li>
            <b className="text-ink-900">Baseline apparatus:</b> two metals paired so their heat expansion cancelled each
            other out.
          </li>
          <li>
            <b className="text-ink-900">Astronomical observation:</b> latitude fixed by starlight, independent of the
            triangles.
          </li>
          <li>
            <b className="text-ink-900">Measuring chains:</b> a steel chain, corrected for temperature, laid each
            baseline.
          </li>
        </ul>

        <p className="note-text mt-5 max-w-[40em]">
          The site states no figure for the survey's instruments: no weight, no dimension, no angular resolution. Those
          numbers circulate widely but none of them could be traced to a document, so none of them appear here.
        </p>
      </section>
    </div>
  )
}
