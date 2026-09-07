export type Source = {
  category: 'Primary' | 'Secondary' | 'Images' | 'Data'
  citation: string
  link?: string
  note: string
}

export const sources: Source[] = [
  {
    category: 'Primary',
    citation:
      'Everest, George. An Account of the Measurement of the Arc of the Meridian Between the Parallels of 18°3′ and 24°7′. London: J. L. Cox & Sons, 1830.',
    note: 'Everest’s own report. Foundational primary account of the meridian measurement.',
  },
  {
    category: 'Primary',
    citation:
      'Everest, George. An Account of the Measurement of Two Sections of the Meridional Arc of India. London, 1847.',
    link: 'https://catalog.hathitrust.org/Record/012154949',
    note: 'The single most important primary source: baselines, instruments, observations, and reductions. The volume that could turn the site’s illustrative models into true reconstructions.',
  },
  {
    category: 'Primary',
    citation: 'Rennell, James. Memoir of a Map of Hindoostan; or the Mogul Empire. London, 1788.',
    note: 'The evidence base for what already existed before 1802: substantial regional mapping of India, unevenly organised and separately controlled.',
  },
  {
    category: 'Primary',
    citation:
      'Waugh, Andrew Scott. Instructions for Topographical Surveying. Dehra Dun: Surveyor General’s Office, 1861.',
    note: 'Field-manual outlining nineteenth-century procedure.',
  },
  {
    category: 'Primary',
    citation: 'Waugh, Andrew Scott. Report on the Operations of the Great Trigonometrical Survey of India. 1851.',
    note: 'Official contemporary account of mid-century operations, spanning the Peak XV calculation. Locate via UK Parliamentary Papers / Internet Archive.',
  },
  {
    category: 'Primary',
    citation: 'Survey of India. General Report of the Great Trigonometrical Survey of India. Dehra Dun, 1870-1883.',
    note: 'Multi-volume official record of stations, angles, and computed values.',
  },
  {
    category: 'Secondary',
    citation:
      'Keay, John. The Great Arc: The Dramatic Tale of How India was Mapped and Everest was Named. HarperCollins, 2000.',
    note: 'Definitive modern narrative history of the Survey.',
  },
  {
    category: 'Secondary',
    citation:
      'Edney, Matthew H. Mapping an Empire: The Geographical Construction of British India, 1765-1843. University of Chicago Press, 1997.',
    note: 'Scholarly analysis of the survey’s scientific and colonial context.',
  },
  {
    category: 'Secondary',
    citation: 'Smith, James R. Everest: The Man and the Mountain. Whittles Publishing, 1999.',
    note: 'Biography of George Everest and technical detail on his instruments.',
  },
  {
    category: 'Secondary',
    citation: 'Markham, Clements R. A Memoir on the Indian Surveys. London: W. H. Allen, 1878.',
    note: 'Nineteenth-century overview by the Royal Geographical Society.',
  },
  {
    category: 'Secondary',
    citation: 'Phillimore, R. H. Historical Records of the Survey of India. Dehra Dun: Survey of India, 1945-1958.',
    note: 'Institutional history from the Survey’s own archives. The source for its organization, the Mackenzie “undeviating plan” directive, and the error-discipline practice attributed to Hodson.',
  },
  {
    category: 'Secondary',
    citation: '“Mapping India.” The Royal Society, 2023.',
    link: 'https://royalsociety.org/blog/2023/09/mapping-india/',
    note: 'The Royal Society account behind the site’s inline “(Royal Society)” tags: Sikdar as Chief Computer (1851) and Waugh’s 1856 naming of Peak XV.',
  },
  {
    category: 'Secondary',
    citation:
      '“Theodolites at 20,000 feet: justifying precision measurement in the Great Trigonometrical Survey of India.” Notes and Records of the Royal Society, vol. 76, no. 3, 2022.',
    link: 'https://royalsocietypublishing.org/rsnr/article/76/3/603/55020/',
    note: 'Scholarly study of the Survey’s precision practice and later Himalayan work under Waugh and Montgomerie.',
  },
  {
    category: 'Secondary',
    citation: 'Royal Geographical Society. The Journey of the Pundit Nain Singh Through Great Tibet. Map, 1877.',
    note: 'The RGS record behind the site’s “(RGS)” tag: Nain Singh’s later Survey-of-India exploration beyond the original Great Arc.',
  },
  {
    category: 'Images',
    citation: 'Royal Geographical Society Picture Library. “Great Theodolite of the Trigonometrical Survey.” London.',
    note: 'Historical photograph of Cary’s Great Theodolite.',
  },
  {
    category: 'Images',
    citation: 'Survey of India Archives. Triangulation charts, 1870.',
    note: 'Original triangle network maps.',
  },
  {
    category: 'Data',
    citation: 'Bomford, Guy. Geodesy. 4th ed. Oxford: Clarendon Press, 1980.',
    note: 'Formulas used to reproduce nineteenth-century calculations.',
  },
  {
    category: 'Data',
    citation: 'National Geodetic Survey. “Everest 1830 Ellipsoid parameters.” NOAA, accessed 2026.',
    link: 'https://geodesy.noaa.gov',
    note: 'Modern reference for the reference ellipsoid Everest defined.',
  },
]
