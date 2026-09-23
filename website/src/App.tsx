import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SlideNav from './components/layout/SlideNav'
import SearchModal from './components/layout/SearchModal'
import Home from './pages/Home'
import { neighbours, SITE_NAME, SITE_NAME_FULL } from './lib/pages'
import { routePreloaders } from './lib/preload'

// Pages are code-split so the initial payload is just Home plus the shell.
const Innovation = lazy(() => import('./pages/Innovation'))
const Impact = lazy(() => import('./pages/Impact'))
const Change = lazy(() => import('./pages/Change'))
const Tools = lazy(() => import('./pages/Tools'))
const Sources = lazy(() => import('./pages/Sources'))
const Process = lazy(() => import('./pages/Process'))
const ProcessPaper = lazy(() => import('./pages/ProcessPaper'))
const Glossary = lazy(() => import('./pages/Glossary'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Loading() {
  return (
    <div className="container-museum py-24 text-center" role="status" aria-live="polite">
      <div className="inline-block h-6 w-6 rounded-full border-2 border-brass-500/40 border-t-brass-500 animate-spin" aria-hidden="true" />
      <div className="mt-3 text-sm text-earth-600">Loading</div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  // Whenever the current route changes, warm the prev/next chunks so
  // pressing ← / → feels instant.
  useEffect(() => {
    const n = neighbours(location.pathname)
    const supportsIdle = typeof window.requestIdleCallback === 'function'
    const idle = (cb: () => void) =>
      supportsIdle ? window.requestIdleCallback(cb) : window.setTimeout(cb, 300)
    const first = idle(() => {
      if (n.prev) routePreloaders[n.prev.to]?.()
    })
    const second = idle(() => {
      if (n.next) routePreloaders[n.next.to]?.()
    })
    return () => {
      if (supportsIdle) {
        window.cancelIdleCallback(first)
        window.cancelIdleCallback(second)
      } else {
        window.clearTimeout(first)
        window.clearTimeout(second)
      }
    }
  }, [location.pathname])

  // Global ⌘K / Ctrl+K opens the search modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Update <title> per route so the browser tab reads sensibly.
  useEffect(() => {
    const map: Record<string, string> = {
      '/': SITE_NAME_FULL,
      '/innovation': `Innovation · ${SITE_NAME}`,
      '/impact': `Impact · ${SITE_NAME}`,
      '/change': `Change · ${SITE_NAME}`,
      '/tools': `Try the tools · ${SITE_NAME}`,
      '/sources': `Sources · ${SITE_NAME}`,
      '/glossary': `Glossary · ${SITE_NAME}`,
      '/process': `About this site · ${SITE_NAME}`,
      '/process-paper': `Process paper · ${SITE_NAME}`,
    }
    document.title = map[location.pathname] || SITE_NAME_FULL
  }, [location.pathname])

  return (
    <div className="min-h-full flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-ink-900 text-parchment-50 px-3 py-1.5 rounded text-sm"
      >
        Skip to main content
      </a>
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main id="main" className="flex-1" role="main">
        <div key={location.pathname} className="animate-page-in">
          <Suspense fallback={<Loading />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/innovation" element={<Innovation />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/change" element={<Change />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/process" element={<Process />} />
              <Route path="/process-paper" element={<ProcessPaper />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <SlideNav />
      </main>
      <Footer />
    </div>
  )
}
