import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-museum py-24 text-center">
      <Compass className="w-16 h-16 mx-auto text-brass-500/70 mb-4" />
      <div className="page-eyebrow">Page not found</div>
      <h1 className="page-title mt-2">This page is not in the exhibit</h1>
      <p className="mt-4 max-w-md mx-auto text-ink-800/85 leading-relaxed">
        That address does not match one of the exhibit's pages. Return home to continue.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        <Home className="w-4 h-4" /> Return home
      </Link>
    </div>
  )
}
