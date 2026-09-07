import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { primaryNav, secondaryNav, SITE_NAME, NHD_THEME } from '../../lib/pages'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-earth-500/15 bg-parchment-100/60">
      <div className="container-museum py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-5 h-5 text-brass-600" />
            <span className="font-display text-[1.3rem]">{SITE_NAME}</span>
          </div>
          <p className="caption-text">
            An interactive exhibit on the Great Trigonometrical Survey of India, 1802 to 1871, and on what changed once
            a subcontinent could be measured.
          </p>
        </div>

        <div>
          <div className="page-eyebrow mb-3">The exhibit</div>
          <ul className="space-y-1.5 caption-text">
            {primaryNav
              .filter((p) => p.to !== '/')
              .map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="hover:text-brass-600">
                    {p.label}
                  </Link>
                </li>
              ))}
            {secondaryNav.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="hover:text-brass-600">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="page-eyebrow mb-3">About this project</div>
          <p className="caption-text">
            Built for National History Day 2027, on the theme <i>{NHD_THEME}</i>. The interactive tools demonstrate the
            methods of nineteenth-century surveying. Anything built on invented values is labelled as a model, and every
            claim is traced on the Sources page.
          </p>
        </div>
      </div>
      <div className="border-t border-earth-500/10 py-4 text-center note-text">
        © {new Date().getFullYear()} · An educational National History Day exhibit
      </div>
    </footer>
  )
}
