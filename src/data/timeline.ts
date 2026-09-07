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
    description: 'Substantial regional mapping of India already exists before any of this begins.',
    classification: 'PRIMARY',
    source: 'Rennell 1788',
  },
  {
    year: 1802,
    title: 'Lambton begins the trigonometrical survey',
    location: 'Southern India',
    description: 'The first measured baseline and the first triangles of the framework.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1818,
    title: 'The work is named the Great Trigonometrical Survey of India',
    description: 'A field project becomes a standing department with a standing plan.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1830,
    title: 'Everest becomes Surveyor General and Superintendent',
    location: 'Dehradun',
    description: 'Technical and administrative authority combine in one office.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1843,
    title: 'Everest retires; Waugh succeeds him',
    description: 'The survey outlasts its second leader without losing its plan.',
    classification: 'INST-SEC',
    source: 'Historical Records of the Survey of India',
  },
  {
    year: 1847,
    title: 'Everest publishes his Account of the meridional arc',
    location: 'London',
    description: 'The survey publishes its own measurements so others can check them.',
    classification: 'PRIMARY',
    source: 'Everest 1847 (HathiTrust)',
  },
  {
    year: 1850,
    title: 'Waugh asks Sikdar to revise the snow-peak procedure',
    location: 'Calcutta',
    description: 'A written method for computing heights of peaks seen from over a hundred miles away.',
    classification: 'SCHOL-SEC',
    source: 'Smith 1999',
  },
  {
    year: 1851,
    title: 'Waugh reports on the operations of the survey',
    description: 'The official account of mid-century work, spanning the Peak XV computation.',
    classification: 'PRIMARY',
    source: 'Waugh 1851',
  },
  {
    year: 1856,
    title: 'The height of Peak XV is announced',
    description: 'Published as 29,002 feet. Waugh proposes naming the peak after George Everest.',
    classification: 'SEC',
    source: 'Period accounts',
  },
  {
    year: 1865,
    title: 'The name Mount Everest is adopted',
    description: 'The survey number becomes the name the mountain is known by in English.',
    classification: 'SEC',
    source: 'Royal Geographical Society',
  },
]

export const eventsBetween = (from: number, to: number) => timeline.filter((e) => e.year >= from && e.year <= to)
