import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import EpistemicBadge from '../ui/EpistemicBadge'

/*
  One D3 chart. The three others that used to live here plotted invented
  series: cumulative triangles per year, kilometres of triangulation per
  decade, and instrument precision across four centuries. No verified series
  exists for any of them, so they were removed rather than relabelled. What
  remains is the peak comparison, whose bar heights are modern published
  elevations anyone can check.
*/

const BRASS = '#a8802a'
const BRASS_HI = '#c89b3a'
const EARTH = '#5b3a1e'
const PAPER = '#f5eddc'
const GRID = '#b28c50'

// ─── Chart 4 — Peak XV vs its rivals ────────────────────────────────────────

type Peak = {
  peak: string
  short: string
  height: number
  thought: number
  note: string
}
const PEAKS: Peak[] = [
  {
    peak: 'Chimborazo (Andes)',
    short: 'Chimborazo',
    height: 6263,
    thought: 1800,
    note: 'Long thought the highest. Its bulge is the farthest point on the surface from the centre of the Earth.',
  },
  {
    peak: 'Dhaulagiri (Nepal)',
    short: 'Dhaulagiri',
    height: 8167,
    thought: 1808,
    note: 'Briefly held the title after a measurement in 1808.',
  },
  {
    peak: 'Kanchenjunga (Sikkim)',
    short: 'Kanchenjunga',
    height: 8586,
    thought: 1849,
    note: 'Held the title through the 1840s, until Peak XV.',
  },
  {
    peak: 'Peak XV → Everest',
    short: 'Peak XV',
    height: 8848,
    thought: 1856,
    note: 'Reported as the highest known mountain under Waugh, and published at 29,002 feet. The modern figure is about 29,032 feet.',
  },
]

export function PeaksHeightChart() {
  const ref = useRef<SVGSVGElement | null>(null)
  const [sel, setSel] = useState(3) // Peak XV
  useEffect(() => {
    if (!ref.current) return
    renderPeaks(ref.current, {
      width: 600,
      height: 300,
      data: PEAKS,
      highlightIdx: sel,
      onSelect: setSel,
    })
  }, [sel])
  const s = PEAKS[sel]
  return (
    <ChartFrame
      title="Which peak was believed tallest, and when"
      eyebrow="A moving target"
      badge={
        <EpistemicBadge
          kind="verified"
          claim="Modern published summit elevations of four Himalayan/Andean peaks."
          note="The bar heights are standard modern elevations, independently checkable in any reference. The 'believed tallest' years are approximate, drawn from secondary histories, so treat those as context rather than as precise data."
          sources={[
            {
              text: 'Modern published elevations (e.g. Survey of India / standard references)',
              type: 'Secondary',
            },
            {
              text: 'Keay, The Great Arc; Edney, Mapping an Empire',
              type: 'Secondary',
            },
          ]}
        />
      }
      caption="Click a mountain for its story. Bar heights are modern elevations, not nineteenth-century figures."
    >
      <svg ref={ref} viewBox="0 0 600 300" className="w-full h-auto" />
      <DetailRow head={`${s.peak} · ${s.height.toLocaleString()} m · believed tallest c. ${s.thought}`} body={s.note} />
    </ChartFrame>
  )
}

// ─── Frame + detail row ────────────────────────────────────────────────────

function ChartFrame({
  title,
  eyebrow,
  caption,
  badge,
  children,
}: {
  title: string
  eyebrow: string
  caption: string
  badge?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="card-parchment p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="page-eyebrow mb-1">{eyebrow}</div>
          <h4 className="font-display text-xl">{title}</h4>
        </div>
        {badge}
      </div>
      {children}
      <p className="text-xs text-ink-700/75 mt-2 leading-relaxed">{caption}</p>
    </div>
  )
}

function DetailRow({ head, body }: { head: string; body: string }) {
  return (
    <div className="mt-3 rounded-md bg-parchment-50/80 border border-earth-500/20 p-3">
      <div className="font-display text-sm text-ink-900">{head}</div>
      <p className="text-xs text-ink-800/85 mt-1 leading-relaxed">{body}</p>
    </div>
  )
}

// ─── Renderers ─────────────────────────────────────────────────────────────

function renderPeaks(
  node: SVGSVGElement,
  opts: {
    width: number
    height: number
    data: Peak[]
    highlightIdx?: number
    onSelect?: (i: number) => void
  },
) {
  const { width, height, data, highlightIdx, onSelect } = opts
  const svg = d3.select(node)
  svg.selectAll('*').remove()
  const m = { top: 20, right: 20, bottom: 42, left: 60 }
  const w = width - m.left - m.right
  const h = height - m.top - m.bottom
  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`)

  const x = d3
    .scaleBand<string>()
    .domain(data.map((d) => d.short))
    .range([0, w])
    .padding(0.35)
  const y = d3.scaleLinear().domain([0, 9500]).range([h, 0])

  g.append('g')
    .attr('transform', `translate(0,${h})`)
    .call(d3.axisBottom(x))
    .attr('color', EARTH)
    .selectAll('text')
    .style('font-size', 10)
  g.append('g')
    .call(
      d3
        .axisLeft(y)
        .ticks(6)
        .tickFormat((d) => `${d} m`),
    )
    .attr('color', EARTH)
  g.append('g')
    .selectAll('line')
    .data(y.ticks(6))
    .join('line')
    .attr('x1', 0)
    .attr('x2', w)
    .attr('y1', (d) => y(d))
    .attr('y2', (d) => y(d))
    .attr('stroke', GRID)
    .attr('stroke-opacity', 0.15)
    .attr('stroke-dasharray', '2 3')

  data.forEach((d, i) => {
    const bx = x(d.short) as number
    const bw = x.bandwidth()
    const by = y(d.height)
    const isActive = i === highlightIdx
    const fill = isActive ? BRASS_HI : BRASS

    const group = g
      .append('g')
      .style('cursor', 'pointer')
      .on('click', () => onSelect && onSelect(i))
      .on('mouseenter', function () {
        d3.select(this).select('polygon.mountain').attr('fill-opacity', 0.95)
      })
      .on('mouseleave', function () {
        d3.select(this)
          .select('polygon.mountain')
          .attr('fill-opacity', isActive ? 0.9 : 0.7)
      })

    group
      .append('polygon')
      .attr('class', 'mountain')
      .attr('points', `${bx},${h} ${bx + bw / 2},${by - 8} ${bx + bw},${h}`)
      .attr('fill', fill)
      .attr('fill-opacity', isActive ? 0.9 : 0.7)
      .attr('stroke', EARTH)
      .attr('stroke-width', isActive ? 1.5 : 1)

    group
      .append('polygon')
      .attr('points', `${bx + bw / 2 - 12},${by + 12} ${bx + bw / 2},${by - 8} ${bx + bw / 2 + 12},${by + 12}`)
      .attr('fill', PAPER)
      .attr('opacity', 0.85)

    group
      .append('text')
      .attr('x', bx + bw / 2)
      .attr('y', by - 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('fill', isActive ? EARTH : EARTH)
      .attr('font-weight', 700)
      .text(`${d.height.toLocaleString()} m`)

    group
      .append('text')
      .attr('x', bx + bw / 2)
      .attr('y', h + 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', 9)
      .attr('fill', EARTH)
      .attr('font-style', 'italic')
      .text(`believed tallest ~${d.thought}`)
  })
}
