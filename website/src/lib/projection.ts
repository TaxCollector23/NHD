import { geoMercator, geoPath } from 'd3-geo'
import { indiaGeo, greatArcLine, rivers, himalayanCrest } from '../data/india'

/*
  A single Mercator projection fitted to India + Sri Lanka + the Andamans.
  Reused everywhere so stations, coastline, rivers, and reference lines all
  live in one coordinate system. viewBox is 500 × 600.
*/

const WIDTH = 500
const HEIGHT = 600
const PADDING = 18

export const indiaProjection = geoMercator().fitExtent(
  [
    [PADDING, PADDING],
    [WIDTH - PADDING, HEIGHT - PADDING],
  ],
  indiaGeo,
)

export const indiaPath = geoPath(indiaProjection as any)

const featurePath = (i: number) =>
  indiaPath({
    type: 'Feature',
    properties: {},
    geometry: indiaGeo.features[i].geometry as any,
  }) || ''

export const INDIA_PATH_D = featurePath(0)
export const SRI_LANKA_PATH_D = featurePath(1)
export const ANDAMAN_PATH_D = featurePath(2)
export const NICOBAR_PATH_D = featurePath(3)

// Project a lat/lng polyline into an SVG "M x y L x y ..." path.
export function polylineToPath(coords: [number, number][]): string {
  return coords
    .map(([lng, lat], i) => {
      const p = indiaProjection([lng, lat])
      if (!p) return ''
      return `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`
    })
    .join(' ')
}

export const RIVER_PATHS = rivers.map((r) => ({ name: r.name, d: polylineToPath(r.path) }))
export const HIMALAYAN_CREST_D = polylineToPath(himalayanCrest)

// Great Arc endpoints, projected to SVG-space.
export const GREAT_ARC_PX = greatArcLine.map(([lng, lat]) => {
  const p = indiaProjection([lng, lat])
  return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 }
})

// Convert any [lng, lat] to SVG-space (x, y).
export function projectLL(lng: number, lat: number): { x: number; y: number } {
  const p = indiaProjection([lng, lat])
  return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 }
}

export const INDIA_VIEWBOX = `0 0 ${WIDTH} ${HEIGHT}`
