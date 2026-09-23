export type Classification = 'PRIMARY' | 'INST-SEC' | 'SCHOL-SEC' | 'SEC'

export type TimelineEvent = {
  year: number
  title: string
  location?: string
  description: string
  classification: Classification
  source: string
}

/*
  The verified dataset from RESEARCH-TRUTH-FILE.md (Appendix). These are the
  only dates on the site that carry a named source per row, which is why the
  timeline is the one visualisation labelled as verified rather than
  illustrative. Interior dates that could not be tied to a source were removed
  rather than softened.
*/
export const timeline: TimelineEvent[] = [
  {
    year: 1788,
    title: 'Rennell publishes his Memoir of a Map of Hindoostan',
    location: 'London',
    description: 'Regional maps of India already existed before the GTS began.',
    classification: 'PRIMARY',
    source: 'Rennell 1788',
  },
  {
    year: 1802,
    title: 'Lambton begins the trigonometrical survey',
    location: 'Southern India',
    description: 'Lambton begins the measured baseline and the first triangles of the framework.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1818,
    title: 'The work is named the Great Trigonometrical Survey of India',
    description: 'The project receives a permanent name and a continuing administrative structure.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1830,
    title: 'Everest becomes Surveyor General and Superintendent',
    location: 'Dehradun',
    description: 'Everest takes charge of the survey’s technical and administrative work.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1843,
    title: 'Everest retires; Waugh succeeds him',
    description: 'The survey continues under a new leader.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1847,
    title: 'Everest publishes his Account of the meridional arc',
    location: 'London',
    description: 'The report gives readers observations and calculations they can examine.',
    classification: 'PRIMARY',
    source: 'Everest 1847 (HathiTrust)',
  },
  {
    year: 1850,
    title: 'Waugh asks Sikdar to revise the snow-peak procedure',
    location: 'Calcutta',
    description: 'A written procedure is revised for calculating the heights of distant peaks.',
    classification: 'SCHOL-SEC',
    source: 'Smith 1999',
  },
  {
    year: 1851,
    title: 'Waugh reports on the operations of the survey',
    description: 'The report describes mid-century operations, including work connected to Peak XV.',
    classification: 'PRIMARY',
    source: 'Waugh 1851',
  },
  {
    year: 1856,
    title: 'The height of Peak XV is announced',
    description: 'The survey publishes 29,002 feet for Peak XV. Waugh proposes the name Mount Everest.',
    classification: 'SEC',
    source: 'Period accounts',
  },
  {
    year: 1865,
    title: 'The name Mount Everest is adopted',
    description: 'Mount Everest enters wider official use as the mountain’s English name.',
    classification: 'SEC',
    source: 'Royal Geographical Society',
  },
]

export const eventsBetween = (from: number, to: number) => timeline.filter((e) => e.year >= from && e.year <= to)
