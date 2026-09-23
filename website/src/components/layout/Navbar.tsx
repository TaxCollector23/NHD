import { NavLink, Link, useLocation } from 'react-router-dom'
import { Compass, Menu, X, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { primaryNav, secondaryNav, SITE_NAME } from '../../lib/pages'
import { routePreloaders } from '../../lib/preload'

export default function Navbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const loc = useLocation()
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform)
  const warmRoute = (to: string) => routePreloaders[to]?.()

  useEffect(() => {
    setMobileOpen(false)
  }, [loc.pathname])

  return (
    <header className="sticky top-0 z-40 bg-parchment-50 border-b border-earth-500/20">
      <div className="container-museum flex items-center justify-between h-14 gap-6">
        <Link to="/" className="group flex items-center gap-2.5 shrink-0" aria-label="Home">
          <span className="relative w-8 h-8 grid place-items-center rounded-full bg-white text-brass-600 border border-earth-500/25 shrink-0 shadow-sm transition-transform duration-300 group-hover:rotate-[20deg]">
            <Compass className="w-4 h-4" />
          </span>
          <span className="font-display text-[1.05rem] font-semibold text-ink-900 tracking-tight whitespace-nowrap">
            {SITE_NAME}
          </span>
          <span className="hidden xl:inline text-[0.68rem] uppercase tracking-[0.2em] text-earth-500/70 border-l border-earth-500/25 pl-2.5 ml-1">
            India · 1802 to 1871
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {primaryNav.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onMouseEnter={() => warmRoute(l.to)}
              onFocus={() => warmRoute(l.to)}
              className={({ isActive }) =>
                cn(
                  'relative px-3.5 py-2 text-[1rem] rounded-md transition-colors whitespace-nowrap',
                  isActive ? 'text-ink-900 font-medium' : 'text-ink-800/75 hover:text-ink-900',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && <span className="absolute left-3 right-3 -bottom-[13px] h-[2px] bg-brass-500" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="hidden md:inline-flex items-center gap-2 text-[0.85rem] text-earth-600 border border-earth-500/25 rounded-md px-3 py-1.5 hover:bg-parchment-200/70 hover:border-earth-500/40 hover:text-ink-800 transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="border border-earth-500/30 rounded px-1 py-0.5 text-[0.62rem] leading-none font-mono">
                {isMac ? '⌘' : 'Ctrl'} K
              </kbd>
            </button>
          )}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-md hover:bg-parchment-200 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-earth-500/15 bg-parchment-50/95 animate-page-in">
          <div className="container-museum py-3 flex flex-col gap-1">
            {onOpenSearch && (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  onOpenSearch()
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-left hover:bg-parchment-200/60"
              >
                <Search className="w-4 h-4 text-brass-600" />
                Search this site
              </button>
            )}
            {primaryNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onMouseEnter={() => warmRoute(l.to)}
                onFocus={() => warmRoute(l.to)}
                className={({ isActive }) =>
                  cn('px-3 py-2.5 rounded-md', isActive ? 'bg-parchment-200 font-medium' : 'hover:bg-parchment-200/60')
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="border-t border-earth-500/15 my-2" />
            {secondaryNav.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onMouseEnter={() => warmRoute(l.to)}
                onFocus={() => warmRoute(l.to)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-[0.95rem] rounded-md text-ink-800/85',
                    isActive ? 'bg-parchment-200 font-medium' : 'hover:bg-parchment-200/60',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
