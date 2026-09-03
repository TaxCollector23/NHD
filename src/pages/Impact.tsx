import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, ImageIcon } from 'lucide-react'
import SectionNav from '../components/ui/SectionNav'
import Standfirst from '../components/ui/Standfirst'
import ThreadKicker from '../components/ui/ThreadKicker'
import ForScale from '../components/ui/ForScale'
import SurveyMap from '../components/maps/SurveyMap'
import TimelineScrubber from '../components/timeline/TimelineScrubber'
import TimelineStrip from '../components/timeline/TimelineStrip'
import { pageSections } from '../lib/pages'

type Person = {
  key: string
  func: string        // the role in the system, which is the primary label
  name: string
  dates: string
  role: string
  stage: string
  body: string
  hinge?: boolean
  imgSrc?: string
}

const people: Person[] = [
  {
    key: 'lambton', func: 'Initiation', name: 'William Lambton', dates: '1753 to 1823',
    role: 'Founder of the survey', stage: 'Field observation', imgSrc: '/portraits/lambton.jpg',
    body: 'Began the work in 1802 and ran it until he died in the field, 1823.',
  },
  {
    key: 'everest', func: 'Standardisation', name: 'George Everest', dates: '1790 to 1866',
    role: 'Surveyor General, 1830 to 1843', stage: 'Instrument and method', imgSrc: '/portraits/everest.jpg',
    body: 'Standardised the instruments and published the survey’s own measurements in 1847.',
  },
  {
    key: 'waugh', func: 'Administration', name: 'Andrew Scott Waugh', dates: '1810 to 1878',
    role: 'Surveyor General from 1843', stage: 'Direction', imgSrc: '/portraits/waugh.jpg',
    body: 'Directed the survey while Peak XV was established as highest known, and proposed the name.',
  },
  {
    key: 'sikdar', func: 'Computation', hinge: true, name: 'Radhanath Sikdar', dates: '1813 to 1870',
    role: 'Chief computer, Calcutta office', stage: 'Computing office', imgSrc: '/portraits/sikdar.jpg',
    body: 'Led the office that turned field angles into positions, and wrote the 1850 snow-peak procedure.',
  },
  {
    key: 'teams', func: 'The labour', name: 'Indian survey personnel', dates: '1802 to 1871',
    role: 'Observers, chain carriers, computers, instrument makers', stage: 'Every stage',
    body: 'Syed Mir Mohsin Husain built precision instruments in Calcutta. Most of this workforce went unnamed.',
  },
  {
    key: 'nainsingh', func: 'Later reach', name: 'Nain Singh Rawat', dates: '1830 to 1895',
    role: 'Survey explorer', stage: 'Beyond the arc', imgSrc: '/portraits/nainsingh.jpg',
    body: 'Walked routes into Tibet recording positions, carrying the method past the original arc.',
  },
]

export default function Impact() {
  const [active, setActive] = useState(people[0].key)
  const person = people.find(p => p.key === active)!

  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Impact</div>
      <h1 className="page-title max-w-[15em]">From one triangle to a subcontinent</h1>
      <ThreadKicker />

      <SectionNav sections={pageSections['/impact']} />

      {/* ── 01 · The framework ─────────────────────────────────────────── */}
      <section id="framework" className="scroll-mt-28">
        <h2 className="section-title">What seventy years of measuring produced</h2>
        <Standfirst>What the framework enabled.</Standfirst>

        <p className="lede">
          The result sounds modest and was not: points across India whose positions were known precisely
          and relative to each other. Later surveyors could start from one.
        </p>

        <p className="body-text mt-5">
          The survey called this a geodetic framework: measurements that account for the curvature of the
          Earth, not a flat sheet. Later surveys were tied to it, which made them comparable.
        </p>

        <p className="body-text mt-4">
          Coverage stayed uneven. This one supplied the standard other surveys were checked against, what
          contemporaries called the undisputed ground of Indian geography.
        </p>

        <div className="mt-8">
          <SurveyMap />
        </div>

        <ForScale>
          The Great Arc ran roughly 1,600 miles (Keay). New York to Denver is about 1,630.
        </ForScale>

        <div className="mt-12">
          <h3 className="sub-title mb-1">The order things happened in</h3>
          <p className="note-text mb-5 max-w-[38em]">
            Ten dates, each carrying the document it comes from. This is the one part of the site built on
            verified historical data rather than on a model of the method.
          </p>
          <TimelineScrubber />
        </div>
      </section>

      {/* ── 02 · Who did the work ──────────────────────────────────────── */}
      <section id="people" className="scroll-mt-28 mt-16 border-t border-earth-500/20 pt-12">
        <h2 className="section-title">Who did the work</h2>
        <Standfirst>The workforce behind it.</Standfirst>

        <p className="lede">
          A framework is also a workforce, and that workforce is part of the impact. Running one for
          seventy years meant training people, splitting the work into roles, and refilling them as people
          died.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
          {['Field observation', 'Instrument reading', 'Computing office', 'Published position'].map((stage, i) => (
            <span key={stage} className="flex items-center gap-2">
              <span className="rounded border border-earth-500/30 bg-parchment-100 px-3 py-1.5 font-mono text-[0.85rem] text-earth-700">{stage}</span>
              {i < 3 && <span className="text-brass-600">→</span>}
            </span>
          ))}
        </div>
        <p className="note-text mt-2">Each role below sits on one stage of this line. The labour underlies all of them.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <ul className="space-y-2 md:col-span-1">
            {people.map(p => (
              <li key={p.key}>
                <button
                  onClick={() => setActive(p.key)}
                  className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                    active === p.key
                      ? 'bg-ink-900 text-parchment-50 border-ink-900'
                      : 'bg-parchment-100 border-earth-500/25 hover:bg-parchment-200'
                  } ${p.hinge && active !== p.key ? 'ring-1 ring-brass-500/40' : ''}`}>
                  <div className={`font-display text-[1.2rem] leading-tight ${active === p.key ? 'text-brass-300' : 'text-brass-700'}`}>
                    {p.func}
                  </div>
                  <div className={`text-[0.98rem] leading-tight mt-0.5 ${active === p.key ? 'text-parchment-50' : 'text-ink-900'}`}>{p.name}</div>
                  <div className={`text-[0.85rem] ${active === p.key ? 'text-parchment-200' : 'text-earth-600'}`}>{p.dates}</div>
                </button>
              </li>
            ))}
          </ul>

          <motion.div
            key={person.key}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="card-parchment p-6 md:col-span-2"
          >
            <div className="grid sm:grid-cols-[150px_1fr] gap-6">
              <Portrait src={person.imgSrc} name={person.name} />
              <div>
                <div className="page-eyebrow">{person.func} · {person.stage}</div>
                <h3 className="font-display text-[2.1rem] mt-1 leading-tight">{person.name}</h3>
                <div className="note-text italic">{person.role} · {person.dates}</div>
                <p className="body-text mt-4">{person.body}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <TimelineStrip from={1830} to={1865}
          caption="The dates the people above are anchored to. Everest, Waugh, and Sikdar overlap across a single stretch of the survey’s middle decades." />

        <div className="mt-10 max-w-[40em]">
          <h3 className="sub-title mb-3">Who paid, and who was credited</h3>
          <p className="body-text">
            The historian Matthew Edney argues that mapping of this kind helped construct the idea of
            British India. Indian and British workers built the network; officers took the credit.
          </p>
        </div>
      </section>
    </div>
  )
}

// Portrait tries a JPG from /portraits/. If it is missing, it keeps showing a
// labelled placeholder rather than a broken image.
function Portrait({ src, name }: { src?: string, name: string }) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed
  return (
    <div className="w-[150px]">
      <div className="aspect-[3/4] rounded-md overflow-hidden border border-earth-500/30 bg-parchment-50 grid place-items-center relative">
        {showImg ? (
          <img src={src} alt={`Portrait of ${name}`} className="w-full h-full object-cover"
               onError={() => setFailed(true)} />
        ) : (
          <div className="text-center px-2">
            <User className="w-8 h-8 text-earth-500/50 mx-auto" />
            <div className="text-[0.7rem] uppercase tracking-widest text-earth-600 mt-2">Portrait pending</div>
          </div>
        )}
      </div>
      {!showImg && (
        <div className="mt-2 note-text flex items-start gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>To be added from a public domain source, with credit.</span>
        </div>
      )}
    </div>
  )
}
