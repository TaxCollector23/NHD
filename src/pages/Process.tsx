import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react'

type Item = { done: boolean; label: string; detail?: string }

const built: Item[] = [
  {
    done: true,
    label: 'Four narrative pages framed around Innovation in History: Impact, Influence, Change, plus Sources',
  },
  {
    done: true,
    label:
      'Interactive tools collected on one page: triangle simulator with error propagation, theodolite viewer with eyepiece and vernier, height calculator, and position-fix comparison. The survey map and the date sequence sit on the Impact page.',
  },
  {
    done: true,
    label: 'An evidence badge on every interactive and chart (verified, reconstruction, or illustrative)',
  },
  {
    done: true,
    label: 'Real d3-geo Mercator projection over a hand-embedded India polygon, rivers, Himalayan shading, Andamans',
  },
  {
    done: true,
    label: 'Searchable glossary, with terms also defined inline on first use',
  },
  { done: true, label: '⌘K search across pages, glossary, sources' },
  {
    done: true,
    label: 'Arrow-key slideshow, route preloading, reduced-motion support',
  },
  {
    done: true,
    label: 'Code-split SPA, custom favicon, OG social image, 404 page',
  },
  {
    done: true,
    label:
      'Portrait images in public/portraits/: Lambton, Everest, Waugh, Sikdar, Nain Singh, and a period illustration of the Indian survey team',
  },
  {
    done: true,
    label:
      'Student-composed prose kept under the 1,200-word cap (run `npm run words` after any prose edit to re-check)',
  },
]

const todo: Item[] = [
  {
    done: false,
    label: 'Add your name, division, school, and category on this page',
    detail: 'Edit src/pages/Process.tsx. Look for the "About the author" section below.',
  },
  {
    done: false,
    label: 'Deploy to Vercel or Netlify and paste the URL into your NHD registration',
    detail: 'npm run build produces the /dist folder. Both platforms accept a drag-and-drop deploy in under 3 minutes.',
  },
  {
    done: false,
    label: 'Print out the exhibit board with a QR code linking to the live URL',
    detail: 'Physical NHD boards benefit from a QR code so judges can see the interactive at their table.',
  },
]

const author = {
  name: 'Rangan V Balaji',
  division: 'Junior · Individual Website',
  school: 'Laurel Springs Middle School',
  year: 'NHD 2027',
  bio: 'A one-paragraph author bio. Explain who you are, why you chose this topic, and one sentence on what surprised you during the research.',
}

export default function Process() {
  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Process and build notes</div>
      <p className="text-brass-600 font-display text-lg mb-2">
        Everything the exhibit already ships, and what you still need to add.
      </p>
      <h1 className="page-title">Behind the exhibit</h1>

      <div className="mt-6 rounded-md border-l-4 border-brass-500 bg-parchment-100/70 p-4 text-sm text-ink-800/90 leading-relaxed max-w-3xl">
        <b>Note:</b> this page is a build checklist, not your NHD process paper. The process paper is a separate
        document (max&nbsp;500 words) covering topic selection, research, category choice, and how the project connects
        to the theme. A starter template lives at{' '}
        <code className="font-mono text-[11px] bg-parchment-200/60 px-1 rounded">docs/process-paper-draft.md</code>.
        Fill it in yourself. This React site also cannot be submitted as-is: NHD requires it be rebuilt in NHDWebCentral
        (static HTML/CSS only). See{' '}
        <code className="font-mono text-[11px] bg-parchment-200/60 px-1 rounded">docs/nhdwebcentral-checklist.md</code>.
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Panel title="What is built" items={built} icon={CheckCircle2} iconClass="text-brass-600" />
        <Panel title="What you need to do" items={todo} icon={Circle} iconClass="text-earth-500" />
      </div>

      <section className="mt-10 card-parchment p-6">
        <div className="page-eyebrow mb-2">About the author</div>
        <div className="grid sm:grid-cols-2 gap-6">
          <ul className="space-y-1.5 text-sm">
            <li className="flex justify-between border-b border-earth-500/15 py-1">
              <span className="text-earth-600">Name</span>
              <span>{author.name}</span>
            </li>
            <li className="flex justify-between border-b border-earth-500/15 py-1">
              <span className="text-earth-600">Division / Category</span>
              <span>{author.division}</span>
            </li>
            <li className="flex justify-between border-b border-earth-500/15 py-1">
              <span className="text-earth-600">School</span>
              <span>{author.school}</span>
            </li>
            <li className="flex justify-between border-b border-earth-500/15 py-1">
              <span className="text-earth-600">Contest year</span>
              <span>{author.year}</span>
            </li>
          </ul>
          <p className="text-sm text-ink-800/85 leading-relaxed italic">{author.bio}</p>
        </div>
        <p className="text-xs text-earth-600 mt-4">
          Edit these fields in{' '}
          <code className="font-mono text-[11px] bg-parchment-200/60 px-1 rounded">src/pages/Process.tsx</code>.
        </p>
      </section>

      <ul className="mt-10 space-y-2 text-sm text-ink-800/90 leading-relaxed list-disc pl-5 max-w-3xl">
        <li>
          <b className="text-ink-900">Category and theme:</b> Individual Website, NHD 2027,{' '}
          <i>Innovation in History: Impact, Influence, Change.</i> Verify your division and category on your
          registration.
        </li>
        <li>
          <b className="text-ink-900">Word count:</b> the website cap is 1,200 student-composed words; the process paper
          is a separate 500-word document. Bibliography and cited quotations are excluded. Verify the current rulebook.
        </li>
        <li>
          <b className="text-ink-900">Sources:</b> listed in full on the{' '}
          <Link to="/sources" className="underline decoration-dotted">
            Sources
          </Link>{' '}
          page. Update with your own reading list.
        </li>
      </ul>

      <section className="mt-10 card-parchment p-6">
        <div className="page-eyebrow mb-2">Repository</div>
        <p className="text-sm text-ink-800/90 leading-relaxed">
          The exhibit is a React + TypeScript SPA. Every value shown in an interactive is computed live from the code,
          not stored as a screenshot. To run locally:
        </p>
        <pre className="mt-3 rounded-md bg-ink-900 text-parchment-50 p-4 text-xs font-mono overflow-x-auto">
          {`npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in /dist`}
        </pre>
        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brass-600 hover:underline mt-3"
        >
          <ExternalLink className="w-3 h-3" /> Deploy in three minutes on Vercel
        </a>
      </section>
    </div>
  )
}

function Panel({
  title,
  items,
  icon: Icon,
  iconClass,
}: {
  title: string
  items: Item[]
  icon: any
  iconClass: string
}) {
  return (
    <div className="card-parchment p-6">
      <div className="page-eyebrow mb-3">{title}</div>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-3">
            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconClass}`} />
            <div className="min-w-0">
              <div className="text-sm text-ink-900 leading-snug">{it.label}</div>
              {it.detail && <div className="text-xs text-earth-600 mt-0.5 leading-snug">{it.detail}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
