import { useState, useRef, useEffect } from 'react'
import { lookup } from '../../data/glossary'

// Inline glossary term. Dotted underline; click or hover for a small popup.
export default function Term({ children, k }: { children: React.ReactNode; k?: string }) {
  const key = (k || (typeof children === 'string' ? children : '')).toString()
  const term = lookup(key)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [open])

  if (!term) return <>{children}</>
  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        className="underline decoration-dotted decoration-brass-500/70 underline-offset-2 hover:text-brass-600 focus:text-brass-600 focus:outline-none cursor-help"
        aria-label={`Definition of ${term.term}`}
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          onMouseLeave={() => setOpen(false)}
          className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-72 max-w-[80vw] rounded-md shadow-lg
                     bg-ink-900 text-parchment-50 border border-brass-500/30 p-3 text-xs leading-relaxed
                     before:content-[''] before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2
                     before:border-x-[6px] before:border-x-transparent before:border-b-[6px] before:border-b-ink-900"
        >
          <span className="block font-display text-sm text-brass-400 mb-1">{term.term}</span>
          <span className="block">{term.full}</span>
        </span>
      )}
    </span>
  )
}
