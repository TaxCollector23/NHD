export type Term = { term: string; short: string; full: string }

// Keys are lower-case; <Term> looks up by term text or by explicit `k`.
export const glossary: Record<string, Term> = {
  theodolite: {
    term: 'theodolite',
    short: 'A precision instrument for measuring horizontal and vertical angles.',
    full: 'A theodolite is a telescope mounted so it swings against graduated circles, one horizontal and one vertical. The instruments used by the Great Trigonometrical Survey were heavy brass ones, read by eye through their verniers. This site prints no dimension or precision figure for them, because none could be traced to a document.',
  },
  baseline: {
    term: 'baseline',
    short: 'The one distance measured physically. All other distances are computed from it.',
    full: 'The Survey’s first baseline was measured near Madras in 1802. Every position in India traces back to that one measurement.',
  },
  triangulation: {
    term: 'triangulation',
    short: 'Determining a point’s position by measuring angles to it from two known points.',
    full: 'By the Law of Sines, one known side and two known angles fully determine a triangle. There is no need to physically measure the other two sides.',
  },
  'law of sines': {
    term: 'Law of Sines',
    short: 'a/sin A = b/sin B = c/sin C. The equation that let the Survey compute distances they never walked.',
    full: 'In any triangle, the ratio of a side to the sine of its opposite angle is constant. This is the foundation of trigonometric surveying.',
  },
  vernier: {
    term: 'vernier',
    short: 'A secondary sliding scale that reads sub-divisions of a main scale.',
    full: 'Pierre Vernier’s 1631 invention. 10 vernier divisions span 9 main divisions, so the coincident line gives an extra tenth. The Great Theodolite carried several verniers around its circle for redundancy.',
  },
  'arc-second': {
    term: 'arc-second',
    short: '1/3600 of a degree, the scale of angle a precise survey works at.',
    full: 'Be careful with two different quantities: one arc-second OF LATITUDE on Earth’s surface is about 30 metres, but one arc-second of ANGLE in a sight-line displaces the target only a few centimetres per kilometre (≈3 cm at 6 km). The Survey read angles far more finely than a hand compass could.',
  },
  'arc-minute': {
    term: 'arc-minute',
    short: '1/60 of a degree. Roughly the resolution of a cheap sextant.',
    full: 'One arc-minute at 100 km is about 30 metres of transverse displacement. That is roughly the accuracy of a hand-held compass in 1800.',
  },
  refraction: {
    term: 'atmospheric refraction',
    short: 'The bending of light through the atmosphere. Makes distant objects appear higher than they are.',
    full: 'The Survey measured this bending as roughly 13% opposite to Earth’s curvature and included the correction in every long-distance height calculation.',
  },
  heliotrope: {
    term: 'heliotrope',
    short: 'A mirror rig that flashed sunlight to a distant surveyor to mark a target station.',
    full: 'Invented by Gauss in 1821 and adopted by the Survey. The only reliable way to signal a station 30 miles away before radio.',
  },
  meridian: {
    term: 'meridian',
    short: 'A line of constant longitude running north to south.',
    full: 'The Great Arc followed the 78° meridian roughly 1,600 miles from Cape Comorin to Banog (Keay, The Great Arc). Measuring an arc of meridian is how astronomers computed the size and shape of the Earth.',
  },
  'peak xv': {
    term: 'Peak XV',
    short: 'The internal Survey designation for the mountain later named Everest.',
    full: 'The Survey numbered unnamed Himalayan peaks in Roman numerals. Peak XV was established as the highest known mountain by computation in the early 1850s and reported by Waugh in 1856; the name Mount Everest was adopted in 1865.',
  },
  ellipsoid: {
    term: 'reference ellipsoid',
    short: 'A mathematical approximation of Earth’s shape used to reduce measurements to a consistent frame.',
    full: 'The Survey defined the Everest 1830 ellipsoid, the reference for Indian maps for over a century. It was replaced by the satellite-derived WGS 84.',
  },
  computer: {
    term: 'computer',
    short: 'A person employed to perform hand calculations. The original meaning of the word.',
    full: 'The Calcutta computing office employed a team of Indian mathematicians led by Radhanath Sikdar. They spent months reducing raw field angles to positions using logarithm tables.',
  },
  geodesy: {
    term: 'geodesy',
    short: 'The science of measuring the shape, size, and orientation of Earth.',
    full: 'The Great Trigonometrical Survey was the largest single geodetic project of the 19th century. Modern geodesy has replaced brass theodolites with satellite receivers but the questions are the same.',
  },
  resection: {
    term: 'resection',
    short: 'Finding your own position by taking bearings to known landmarks.',
    full: 'The classical field method for a lost surveyor: observe three known peaks with a compass or theodolite, plot the back-bearings on a table, and the point where the three lines cross is where you are.',
  },
  trilateration: {
    term: 'trilateration',
    short: 'Determining a position by measuring distances (not angles) to known references.',
    full: 'GPS is trilateration. Your receiver measures the distance to each visible satellite by timing the signal, then computes the point where all those distance-spheres intersect.',
  },
  zenith: {
    term: 'zenith',
    short: 'The point on the sky directly overhead. 90° elevation.',
    full: 'The Survey used a zenith sector to measure the angle between a chosen star and the vertical at a station. This gave latitude directly, an independent check on the triangulated network.',
  },
  latitude: {
    term: 'latitude',
    short: 'Angular position north or south of the equator.',
    full: 'Latitude can be measured astronomically from any station by observing the height of the Pole Star or by timing a star crossing the meridian. The Great Arc measured latitude at every principal station, then compared it with the triangulated distance to test Earth’s shape.',
  },
  longitude: {
    term: 'longitude',
    short: 'Angular position east or west of a reference meridian.',
    full: 'Longitude is much harder than latitude because it requires knowing the time at two places at once. The Survey established Indian longitudes by combining astronomical observations with the triangulated distances.',
  },
  'plane table': {
    term: 'plane table',
    short: 'A flat drawing board on a tripod used for direct field sketching of a survey.',
    full: 'The topographical branch of the Survey used plane tables to fill in detail between principal triangulation stations. The fastest way in the field to draw a road, a river, or a village outline.',
  },
  'great arc': {
    term: 'Great Arc',
    short: 'The roughly 1,600-mile chain of triangles along the 78° meridian, from Cape Comorin to Banog (Keay).',
    full: 'The central spine of the Survey. Because it followed a single meridian, its length and the measured latitude difference between the ends gave an independent test of Earth’s ellipsoid parameters.',
  },
  chain: {
    term: 'Gunter’s chain',
    short: 'A physical measuring chain 100 feet or 66 feet long. The surveyor’s standard length unit before steel tapes.',
    full: 'The Survey’s baselines were measured with steel chains laid end-to-end under fixed tension and corrected for temperature. Every meaningful chain had its own calibration certificate.',
  },
  ephemeris: {
    term: 'ephemeris',
    short: 'A published table of the positions of the Sun, Moon, planets, and stars over time.',
    full: 'Astronomical fixes at Survey stations relied on the annual Nautical Almanac and equivalent ephemerides. Without them, raw star observations meant nothing.',
  },
  'least squares': {
    term: 'least squares',
    short: 'A method of combining many imperfect measurements into a single best estimate.',
    full: 'Gauss developed least squares partly to reduce Napoleonic-era survey data. The Great Trigonometrical Survey applied it to reconcile the many redundant triangles they observed. Its statistical rigor is what turned messy field data into a consistent map.',
  },
  datum: {
    term: 'geodetic datum',
    short: 'The reference framework (an ellipsoid plus an origin) that a survey computes positions relative to.',
    full: 'The Survey fixed the Indian datum at Kalianpur in 1839. Positions across the subcontinent were reported as offsets from that point on the Everest 1830 ellipsoid.',
  },
  ordinance: {
    term: 'Ordnance Survey',
    short: 'The British national mapping agency that provided the technical model the Great Trigonometrical Survey extended.',
    full: 'The Great Trigonometrical Survey used many techniques pioneered by the Ordnance Survey of Great Britain (founded 1791) but had to invent new methods for the tropical climate, longer sightlines, and harder terrain.',
  },
}

export function lookup(key: string): Term | undefined {
  return glossary[key.toLowerCase().trim()]
}
