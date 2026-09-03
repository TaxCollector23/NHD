import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { timeline } from '../../data/timeline'
import EpistemicBadge from '../ui/EpistemicBadge'

/*
  Sequence view. This used to re-animate the growing triangle network beside
  the list, which repeated what the survey map above it already showed. It now
  does one job: the order the pieces of the system arrived in, and the source
  standing behind each date.
*/
export default function TimelineScrubber() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [currentIdx, setCurrentIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const rafRef = useRef<number | null>(null)

  const current = timeline[currentIdx]
  const span = timeline[timeline.length - 1].year - timeline[0].year
  const progress = ((current.year - timeline[0].year) / span) * 100

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      let bestIdx = 0
      let bestDist = Infinity
      const topY = el.getBoundingClientRect().top + 60
      for (let i = 0; i < timeline.length; i++) {
        const child = itemRefs.current[i]
        if (!child) continue
        const dist = Math.abs(child.getBoundingClientRect().top - topY)
        if (dist < bestDist) { bestDist = dist; bestIdx = i }
      }
      setCurrentIdx(bestIdx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!playing) return
    let idx = currentIdx
    let last = performance.now()
    const loop = (t: number) => {
      if (t - last > 1600) {
        idx = Math.min(idx + 1, timeline.length - 1)
        itemRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        last = t
        if (idx >= timeline.length - 1) { setPlaying(false); return }
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [playing, currentIdx])

  const reset = () => {
    setPlaying(false)
    itemRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-6">
      <div className="card-parchment p-2 relative">
        <div ref={scrollRef} className="h-[26rem] overflow-y-auto pr-3 pl-6 py-4 relative">
          <div className="absolute left-3 top-4 bottom-4 w-px bg-earth-500/30" />
          {timeline.map((e, i) => {
            const active = i === currentIdx
            return (
              <div
                key={e.year + e.title}
                ref={el => { itemRefs.current[i] = el }}
                className={`relative pl-6 pb-7 transition-opacity ${active ? 'opacity-100' : 'opacity-65 hover:opacity-100'}`}
              >
                <span className={`absolute -left-[10px] top-2 w-[14px] h-[14px] rounded-full ring-4 ring-parchment-100 transition-colors ${
                  active ? 'bg-brass-500' : 'bg-earth-500/60'
                }`} />
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className={`font-display text-[1.35rem] ${active ? 'text-brass-600' : 'text-ink-700'}`}>{e.year}</span>
                  <span className="text-[1.02rem] font-medium text-ink-900">{e.title}</span>
                </div>
                <p className="caption-text mt-1">{e.description}</p>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-earth-500/20 pt-2 px-3 pb-1">
          <button onClick={() => setPlaying(p => !p)} className="btn-ghost !py-1.5 !px-3">
            {playing ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Play the sequence</>}
          </button>
          <button onClick={reset} className="btn-ghost !py-1.5 !px-3">
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
          <div className="ml-auto note-text">Scroll the list, or press play.</div>
        </div>
      </div>

      <div className="md:sticky md:top-28 self-start card-parchment p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="page-eyebrow">In view</div>
            <div className="font-display text-[3rem] leading-none text-ink-900">{current.year}</div>
          </div>
          <EpistemicBadge kind="verified"
            claim="Ten dates, each with a named source."
            note="This is the one dataset in the project that can be shown as historical fact rather than as a teaching model. Every entry is tied to a specific document: Rennell 1788, Everest 1847, Waugh 1851, the Historical Records of the Survey of India, or Smith 1999."
            sources={[
              { text: 'Historical Records of the Survey of India (Phillimore)', type: 'Secondary' },
              { text: 'Everest 1847; Waugh 1851; Rennell 1788', type: 'Primary' },
            ]} />
        </div>

        <div className="h-1.5 rounded-full bg-earth-500/20 overflow-hidden">
          <div className="h-full bg-brass-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between note-text mt-1.5">
          <span>{timeline[0].year}</span><span>{timeline[timeline.length - 1].year}</span>
        </div>

        <h4 className="sub-title mt-5">{current.title}</h4>
        {current.location && <div className="note-text mt-1">{current.location}</div>}
        <p className="body-text mt-3">{current.description}</p>

        <div className="mt-5 border-t border-earth-500/20 pt-4">
          <div className="page-eyebrow mb-1">Evidence for this date</div>
          <p className="caption-text">
            <span className="font-mono text-[0.82rem] text-survey-600">{current.classification}</span>
            {' · '}{current.source}
          </p>
        </div>
      </div>
    </div>
  )
}
