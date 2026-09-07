// Great Trigonometrical Survey research-ready partial dataset (external source,
// added 2026-09-06). This is a partial, honestly-labelled layer, not a
// transcription of the survey's own station tables. Every status label below
// comes from the dataset itself:
//   probable    = historically plausible candidate, needs plate/table confirmation
//   provisional = a contextual map point only, not an asserted survey monument
// The dataset's own triangle table is intentionally empty. No triangle angles
// or fixation years exist yet, so the site's triangle mesh stays a separate,
// clearly-labelled teaching diagram (see data/locations.ts).
export type DatasetStatus = 'probable' | 'provisional'

export type DatasetStation = {
  id: string
  name: string
  role: string
  lat: number
  lng: number
  status: DatasetStatus
  note: string
}

export const datasetStations: DatasetStation[] = [
  {
    id: 'ds-bidar',
    name: 'Bidar',
    role: 'Southern meridional-arc area',
    lat: 17.913,
    lng: 77.53,
    status: 'probable',
    note: 'Candidate location named in survey history; exact station and historical coordinate require the Everest tables.',
  },
  {
    id: 'ds-hathipaon',
    name: 'Hathi Paon',
    role: 'Great Arc, northern area',
    lat: 30.453,
    lng: 78.067,
    status: 'provisional',
    note: 'Candidate station area; exact historical coordinate not yet transcribed.',
  },
  {
    id: 'ds-mangalore',
    name: 'Mangalore',
    role: 'Southern triangulation context',
    lat: 12.9141,
    lng: 74.856,
    status: 'provisional',
    note: 'Included as geographic context only, not asserted as a principal station.',
  },
]

// Cross-references for stations already on the map (data/locations.ts) that
// this dataset also names, with a status and a note on what remains unverified.
export const datasetCrossRefs: Record<string, { status: DatasetStatus; note: string }> = {
  cape: {
    status: 'provisional',
    note: 'Modern approximate place coordinate; historical station identity requires plate verification.',
  },
  sironj: { status: 'probable', note: 'Named in survey history; exact station point requires source verification.' },
  dehradun: { status: 'probable', note: 'City coordinate, not asserted as a specific triangulation station.' },
  banog: { status: 'probable', note: 'Candidate Great Arc station area; exact point requires atlas verification.' },
  bangalore: { status: 'provisional', note: 'Included as context only, not asserted as a principal station.' },
  calcutta: {
    status: 'provisional',
    note: 'Later survey/grid context; excluded from the Everest Great Arc reading unless a source confirms it.',
  },
}

export type DatasetSource = { citation: string; date: string; url: string; use: string }

export const datasetSources: DatasetSource[] = [
  {
    citation: 'George Everest, An Account of the Measurement of Two Sections of the Meridional Arc of India',
    date: '1847',
    url: 'https://archive.org/details/dli.ernet.176669',
    use: 'Station tables, observations, appendices',
  },
  {
    citation: "George Everest's 1847 atlas",
    date: '1847',
    url: 'https://books.google.com/books?id=b-82AQAAMAAJ',
    use: 'Triangulation plates and map figures',
  },
  {
    citation: "Trigonometrical Survey, India: review of Waugh's report",
    date: '1851',
    url: 'https://archive.org/details/dli.pahar.0418',
    use: 'Waugh report context',
  },
  {
    citation: 'Historical Records of the Survey of India, Vol. IV',
    date: '1968',
    url: 'https://ia801501.us.archive.org/30/items/in.ernet.dli.2015.531026/2015.531026.historical-records_text.pdf',
    use: 'Publication history and source-location guidance',
  },
  {
    citation: 'Account of Operations of the Great Trigonometrical Survey of India, Vol. II',
    date: '1879',
    url: 'https://pahar.in/pahar/Books%20and%20Articles/Survey%20of%20India/Account%20of%20Operations%20of%20Great%20Trigonometrical%20Survey/1879%20Vol%202%20History%20and%20Description%20of%20Principal%20Triangulation%20and%20its%20Reduction%20by%20Walker%20s.pdf',
    use: 'Principal-triangulation methodology and later history',
  },
]
