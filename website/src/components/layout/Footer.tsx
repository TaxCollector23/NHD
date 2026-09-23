import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { primaryNav, secondaryNav, SITE_NAME } from '../../lib/pages'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-earth-500/15 bg-parchment-100/60">
      <div className="container-museum py-7 grid sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-5 h-5 text-brass-600" />
            <span className="font-display text-[1.3rem]">{SITE_NAME}</span>
          </div>
          <p className="caption-text">NHD 2027 project by Rangan Balaji.</p>
        </div>

        <div>
          <ul className="flex flex-wrap justify-start sm:justify-end gap-x-4 gap-y-1 caption-text">
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

      </div>
      <div className="border-t border-earth-500/10 py-4 text-center note-text">
        © {new Date().getFullYear()} · National History Day project
      </div>
    </footer>
  )
}
