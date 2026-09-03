import { projectLL } from '../lib/projection'

// Real Great Trigonometrical Survey stations with authentic lat/lng.
// SVG x/y are derived at module load from a shared d3-geo Mercator projection,
// so every map on the site places these dots on the *same* accurate coastline.
export type Station = {
  id: string
  name: string
  year: number
  lat: number
  lng: number
  x: number
  y: number
  note?: string
}

const RAW: Omit<Station, 'x' | 'y'>[] = [
  { id: 'cape',       name: 'Cape Comorin',              year: 1806, lat: 8.08,  lng: 77.55, note: 'Southern anchor of the Great Arc' },
  { id: 'madras',     name: 'Madras (St. Thomas Mount)', year: 1802, lat: 13.00, lng: 80.20, note: 'First baseline, 1802' },
  { id: 'bangalore',  name: 'Bangalore',                 year: 1804, lat: 12.97, lng: 77.59 },
  { id: 'hyderabad',  name: 'Hyderabad',                 year: 1815, lat: 17.38, lng: 78.48 },
  { id: 'bombay',     name: 'Bombay',                    year: 1820, lat: 19.07, lng: 72.87 },
  { id: 'nagpur',     name: 'Nagpur',                    year: 1823, lat: 21.14, lng: 79.08 },
  { id: 'sironj',     name: 'Sironj',                    year: 1834, lat: 24.10, lng: 77.70 },
  { id: 'kalianpur',  name: 'Kalianpur',                 year: 1839, lat: 24.13, lng: 77.40, note: 'Origin of Indian geodetic datum' },
  { id: 'calcutta',   name: 'Calcutta',                  year: 1830, lat: 22.57, lng: 88.36, note: 'Survey computing office' },
  { id: 'dehradun',   name: 'Dehradun',                  year: 1832, lat: 30.32, lng: 78.03, note: 'Survey headquarters' },
  { id: 'banog',      name: 'Banog',                     year: 1841, lat: 30.52, lng: 78.05 },
  { id: 'darjeeling', name: 'Darjeeling',                year: 1848, lat: 27.03, lng: 88.26, note: 'Observations toward Peak XV' },
  { id: 'peakxv',     name: 'Peak XV (Everest)',         year: 1852, lat: 27.98, lng: 86.92, note: 'Identified as highest known by computation; height later published as 29,002 ft' },
]

export const stations: Station[] = RAW.map(s => {
  const { x, y } = projectLL(s.lng, s.lat)
  return { ...s, x, y }
})

// ILLUSTRATIVE / SCHEMATIC triangle mesh — NOT the historical GTS network.
// The real survey had hundreds of principal triangles in a different configuration.
// Station lat/lng are real; this mesh and the per-triangle years are a teaching
// diagram. Replace with a real triangulation chart (Survey of India / Historical
// Records) before presenting any of it as the actual network.
// Chain of adjacent triangles that flows south → north, then east to Peak XV;
// each reuses a side of a neighbour so the diagram reads as a coherent mesh.
export const triangles: [string, string, string, number][] = [
  ['cape',      'madras',    'bangalore',  1806],
  ['bangalore', 'madras',    'hyderabad',  1815],
  ['bangalore', 'hyderabad', 'bombay',     1820],
  ['hyderabad', 'bombay',    'nagpur',     1823],
  ['bombay',    'nagpur',    'sironj',     1834],
  ['nagpur',    'sironj',    'kalianpur',  1839],
  ['nagpur',    'kalianpur', 'calcutta',   1845],
  ['kalianpur', 'dehradun',  'sironj',     1841],
  ['dehradun',  'banog',     'kalianpur',  1841],
  ['banog',     'calcutta',  'kalianpur',  1846],
  ['banog',     'darjeeling','calcutta',   1848],
  ['darjeeling','peakxv',    'banog',      1852],
]
