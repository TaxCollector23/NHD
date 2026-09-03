import { Link } from 'react-router-dom'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-museum py-24 text-center">
      <Compass className="w-16 h-16 mx-auto text-brass-500/70 mb-4" />
      <div className="page-eyebrow">Off the survey</div>
      <h1 className="page-title mt-2">This point is not on our chart</h1>
      <p className="mt-4 max-w-md mx-auto text-ink-800/85 leading-relaxed">
        The page you asked for isn’t in the network. Head back to a known
        station and pick another chapter.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex"><Home className="w-4 h-4" /> Back to Home</Link>
    </div>
  )
}
