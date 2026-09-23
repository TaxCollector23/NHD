// Hand-embedded simplified outline of the Republic of India (mainland),
// Sri Lanka, and the Andaman & Nicobar Islands. Also carries polylines for
// the major rivers, the Himalayan crest, and a few ocean labels used by the
// map component. Coordinates are [lng, lat] in the GeoJSON convention.
// Traced clockwise-in-north-up-map; verified with d3-geo.geoBounds.
//
// Accuracy: educational, not political. Coastline density ≈ 1 waypoint
// every 40–120 km; not for navigation.

import type { FeatureCollection } from 'geojson'

const INDIA_MAINLAND: [number, number][] = [
  // Kashmir NW → east along the Himalayan border
  [74.9, 32.5],
  [75.9, 33.6],
  [76.5, 34.0],
  [77.0, 34.6],
  [77.9, 34.9],
  [78.4, 34.5],
  [79.0, 33.5],
  [79.4, 32.5],
  [79.5, 31.4],
  [79.5, 30.6],
  // Along the Nepal border (north edge of the Ganges plain)
  [80.2, 30.1],
  [81.0, 30.0],
  [82.0, 30.0],
  [83.0, 30.0],
  [84.0, 29.2],
  [85.5, 28.0],
  // Sikkim, Bhutan, Arunachal
  [87.0, 27.9],
  [88.0, 27.6],
  [88.5, 27.4],
  [88.9, 27.5],
  [89.7, 27.3],
  [90.5, 27.0],
  [92.0, 27.5],
  [92.0, 28.0],
  [93.5, 28.5],
  [95.0, 28.5],
  [96.5, 28.7],
  [97.2, 27.5],
  // Down the Myanmar border through Nagaland/Manipur/Mizoram
  [96.4, 26.0],
  [96.0, 24.5],
  [95.0, 23.0],
  [94.0, 22.0],
  [93.0, 21.5],
  [92.5, 21.0],
  [92.3, 20.7],
  // Chittagong tract, then west along the Bangladesh border
  [91.0, 22.5],
  [90.5, 22.5],
  [89.3, 22.1],
  // Sundarbans / West Bengal coast
  [89.0, 22.0],
  [88.5, 21.8],
  [88.0, 21.5],
  [87.6, 21.4],
  [87.0, 21.5],
  [86.7, 21.0],
  [86.5, 20.5],
  // Odisha
  [86.3, 20.2],
  [85.9, 20.0],
  [85.5, 19.5],
  [85.2, 19.0],
  [84.5, 18.5],
  [84.0, 18.0],
  [83.5, 17.7],
  // Andhra Pradesh east coast
  [83.0, 17.2],
  [82.5, 16.5],
  [81.7, 16.2],
  [81.3, 16.0],
  [80.6, 15.0],
  [80.3, 14.4],
  [80.1, 13.7],
  // Tamil Nadu coast
  [80.5, 13.5],
  [80.3, 13.1],
  [80.0, 12.6],
  [80.0, 12.0],
  [79.85, 11.7],
  [79.85, 11.3],
  [79.8, 10.8],
  [80.0, 10.0],
  [79.85, 9.7],
  [79.5, 9.5],
  [78.9, 9.1],
  [78.4, 8.9],
  // Cape Comorin (southernmost mainland)
  [77.55, 8.08],
  // Kerala west coast
  [76.9, 8.5],
  [76.5, 9.0],
  [76.3, 9.5],
  [76.0, 10.5],
  [75.6, 11.2],
  [75.2, 11.8],
  [75.0, 12.0],
  [74.7, 12.8],
  [74.5, 13.5],
  [74.2, 14.6],
  [74.0, 15.3],
  // Karnataka / Goa
  [73.8, 15.5],
  [73.5, 16.0],
  [73.2, 17.0],
  [73.0, 17.5],
  [72.9, 18.5],
  // Maharashtra / Mumbai
  [72.8, 19.0],
  [72.7, 19.6],
  [72.6, 20.3],
  [72.5, 20.5],
  [72.2, 20.8],
  // Diu / Saurashtra
  [71.5, 20.7],
  [71.2, 20.9],
  [70.8, 20.9],
  [70.5, 21.0],
  [70.0, 21.5],
  [69.5, 22.0],
  [69.1, 22.3],
  [68.8, 22.5],
  [68.5, 22.5],
  // Kachchh, Rann
  [68.6, 23.4],
  [68.5, 24.0],
  [69.0, 24.2],
  [70.0, 24.5],
  [70.9, 24.4],
  // Rajasthan / Pakistan border
  [71.5, 24.5],
  [71.7, 25.0],
  [72.5, 25.5],
  [72.2, 26.0],
  [72.0, 27.0],
  [71.5, 27.9],
  [71.5, 28.5],
  [72.3, 29.5],
  [73.5, 30.5],
  [74.5, 31.5],
  [74.9, 32.5], // close ring
]

const SRI_LANKA: [number, number][] = [
  [79.9, 6.9],
  [79.7, 7.5],
  [79.8, 8.5],
  [79.7, 9.5],
  [80.2, 9.7],
  [81.2, 9.4],
  [81.5, 8.7],
  [81.9, 8.0],
  [81.7, 6.9],
  [80.9, 6.0],
  [80.5, 5.9],
  [79.9, 6.9],
]

// Andaman & Nicobar — greatly simplified as two clusters.
const ANDAMAN: [number, number][] = [
  [92.7, 13.6],
  [92.9, 13.4],
  [93.0, 12.8],
  [93.0, 12.0],
  [92.7, 11.5],
  [92.6, 12.2],
  [92.5, 12.9],
  [92.7, 13.6],
]
const NICOBAR: [number, number][] = [
  [93.5, 9.2],
  [93.7, 9.0],
  [93.8, 7.4],
  [93.6, 6.8],
  [93.4, 7.5],
  [93.4, 8.5],
  [93.5, 9.2],
]

// Major rivers as polylines (source → mouth, approximate midlines).
export const rivers: { name: string; path: [number, number][] }[] = [
  {
    name: 'Ganges',
    path: [
      [78.7, 30.7],
      [79.5, 29.9],
      [80.7, 28.9],
      [82.7, 27.5],
      [84.4, 26.1],
      [85.5, 25.4],
      [86.7, 25.2],
      [87.9, 24.9],
      [88.4, 24.4],
      [88.5, 23.5],
      [88.7, 22.5],
      [89.1, 22.0],
      [89.5, 21.7],
      [90.5, 22.0],
    ],
  },
  {
    name: 'Yamuna',
    path: [
      [78.0, 30.5],
      [77.7, 29.4],
      [77.2, 28.6],
      [78.1, 27.2],
      [79.4, 26.2],
      [81.8, 25.4],
    ],
  },
  {
    name: 'Brahmaputra',
    path: [
      [95.5, 28.0],
      [94.7, 27.5],
      [93.7, 27.0],
      [92.5, 26.6],
      [91.4, 26.2],
      [90.4, 26.1],
      [89.8, 26.0],
      [89.6, 25.6],
      [89.7, 24.8],
      [90.4, 24.0],
      [90.5, 23.5],
      [90.5, 22.5],
    ],
  },
  {
    name: 'Indus',
    path: [
      [76.6, 33.5],
      [76.0, 33.0],
      [75.3, 32.7],
      [74.4, 32.0],
      [73.4, 31.2],
      [72.5, 30.4], // exits India (into Pakistan) at Punjab
    ],
  },
  {
    name: 'Godavari',
    path: [
      [73.7, 19.9],
      [75.0, 19.4],
      [76.5, 19.0],
      [78.0, 18.5],
      [79.5, 18.0],
      [80.7, 17.6],
      [81.8, 17.2],
      [82.3, 16.9],
      [82.3, 16.5],
    ],
  },
  {
    name: 'Krishna',
    path: [
      [73.9, 18.2],
      [75.5, 17.4],
      [77.0, 17.0],
      [78.5, 16.5],
      [80.0, 16.5],
      [80.7, 16.3],
      [81.0, 15.9],
      [81.2, 15.8],
    ],
  },
  {
    name: 'Narmada',
    path: [
      [81.3, 22.7],
      [79.9, 22.7],
      [78.4, 22.9],
      [76.3, 22.3],
      [74.2, 22.0],
      [72.8, 21.7],
      [72.7, 21.6],
    ],
  },
]

// A rough polyline along the Himalayan crest — draws a shaded ridge on the map.
export const himalayanCrest: [number, number][] = [
  [74.3, 34.7],
  [76.5, 34.5],
  [78.5, 34.0],
  [80.5, 32.5],
  [82.5, 31.5],
  [84.7, 30.2],
  [86.9, 28.0],
  [88.5, 27.9],
  [90.3, 27.8],
  [92.5, 28.2],
  [94.5, 28.5],
  [96.5, 28.7],
]

// Ocean labels (used decoratively on some maps).
export const oceanLabels: { name: string; lng: number; lat: number; rotate?: number }[] = [
  { name: 'ARABIAN SEA', lng: 66.5, lat: 18, rotate: 0 },
  { name: 'BAY OF BENGAL', lng: 87, lat: 15, rotate: 0 },
  { name: 'INDIAN OCEAN', lng: 79.5, lat: 3.5, rotate: 0 },
]

// The 78° meridian, used by the Great Arc — a line from Cape Comorin up to
// the Himalayan foot at Banog. Drawn separately as a dashed reference.
export const greatArcLine: [number, number][] = [
  [77.55, 8.08], // Cape Comorin
  [77.7, 30.5], // Banog / Dehradun
]

export const indiaGeo: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'India (mainland, simplified)' },
      geometry: { type: 'Polygon', coordinates: [INDIA_MAINLAND] },
    },
    {
      type: 'Feature',
      properties: { name: 'Sri Lanka' },
      geometry: { type: 'Polygon', coordinates: [SRI_LANKA] },
    },
    {
      type: 'Feature',
      properties: { name: 'Andaman Islands' },
      geometry: { type: 'Polygon', coordinates: [ANDAMAN] },
    },
    {
      type: 'Feature',
      properties: { name: 'Nicobar Islands' },
      geometry: { type: 'Polygon', coordinates: [NICOBAR] },
    },
  ],
}
