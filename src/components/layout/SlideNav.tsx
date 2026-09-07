import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { neighbours } from '../../lib/pages'

// Bottom prev/next only. Arrow keys still walk the same order.
export default function SlideNav() {
  const nav = useNavigate()
  const loc = useLocation()
  const { prev, next } = neighbours(loc.pathname)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(t.tagName)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowRight' && next) {
        e.preventDefault()
        nav(next.to)
      } else if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault()
        nav(prev.to)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nav, next, prev])

  return (
    <nav className="container-museum mt-16 mb-4">
      <div className="flex items-center justify-between border-t border-earth-500/20 pt-6">
        {prev ? (
          <Link to={prev.to} className="group inline-flex items-center gap-2 hover:text-brass-600 transition-colors">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-display text-lg">{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.to} className="group inline-flex items-center gap-2 hover:text-brass-600 transition-colors">
            <span className="font-display text-lg">{next.label}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}
