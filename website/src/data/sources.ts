/*
  Annotated bibliography, MLA 9. Every entry carries three pieces of metadata
  the flat citation list can't:

    - type       whether this is a period document, a scholarly monograph, an
                 institutional reference, or an image
    - tier       Core (load-bearing to the argument), Supporting (backs a
                 specific claim in the prose), or Consulted (read for context,
                 not directly cited)
    - contribution   one sentence saying what this specific source gave the
                     project — the annotation NHD's rubric actually asks for

  This is the source of truth for /sources and for the ⌘K search. The flat
  worksCited.ts and imageCredits.ts have been retired.
*/

export type SourceType =
  | 'Primary'
  | 'Secondary — Institutional'
  | 'Secondary — Scholarly'
  | 'Reference'
  | 'Image'

export type SourceTier = 'Core' | 'Supporting' | 'Consulted'

export type Source = {
  id: string
  type: SourceType
  tier: SourceTier
  citation: string
  link?: string
  contribution: string
}

export const sources: Source[] = [
  // ── Primary ───────────────────────────────────────────────────────────
  {
    id: 'everest-1847',
    type: 'Primary',
    tier: 'Core',
    citation:
      'Everest, George. An Account of the Measurement of Two Sections of the Meridional Arc of India. London: J. L. Cox and Sons, 1847.',
    link: 'https://catalog.hathitrust.org/Record/012154949',
    contribution:
      "The survey's own account of its baselines, instruments, and reductions. Everything the Innovation chapter says about the discipline of measurement — that the accuracy came from procedure, not from a single perfect reading — is grounded here. Transcribing its observation tables would upgrade the site's triangle and Everest calculators from illustrative to full reconstructions.",
  },
  {
    id: 'waugh-1851',
    type: 'Primary',
    tier: 'Core',
    citation:
      'Waugh, Andrew Scott. Report on the Operations of the Great Trigonometrical Survey of India. Dehra Dun: Surveyor General’s Office, 1851.',
    contribution:
      "The official mid-century report spanning the Peak XV computation. Anchors the Change chapter's account of the 1856 announcement and Waugh's role as Everest's successor.",
  },
  {
    id: 'rennell-1788',
    type: 'Primary',
    tier: 'Core',
    citation:
      'Rennell, James. Memoir of a Map of Hindoostan; or the Mogul Empire. London: M. Brown, 1788.',
    contribution:
      "The evidence for what already existed before 1802. The Innovation chapter's line — the maps weren't blank, the gap was connection — rests on Rennell's memoir showing substantial but disconnected regional coverage decades before Lambton.",
  },
  {
    id: 'waugh-1861-instructions',
    type: 'Primary',
    tier: 'Supporting',
    citation:
      'Waugh, Andrew Scott. Instructions for Topographical Surveying. Dehra Dun: Surveyor General’s Office, 1861.',
    contribution:
      "Field manual codifying nineteenth-century procedure. Supports the site's framing of precision as an institutional practice, not an individual talent.",
  },
  {
    id: 'gts-general-report',
    type: 'Primary',
    tier: 'Supporting',
    citation:
      'Survey of India. General Report on the Operations of the Great Trigonometrical Survey of India. Dehra Dun, 1870–1883.',
    contribution:
      'Multi-volume record of stations, angles, and computed values published year by year. Consulted for period conventions in reporting observations; not quoted directly.',
  },

  // ── Secondary — Institutional ─────────────────────────────────────────
  {
    id: 'phillimore-historical-records',
    type: 'Secondary — Institutional',
    tier: 'Core',
    citation:
      'Phillimore, R. H. Historical Records of the Survey of India. Vols. I–IV, Survey of India, 1945–1958.',
    link: 'https://archive.org/stream/in.ernet.dli.2015.105268/2015.105268.Historical-Records-Of-The-Survey-Of-India-Vol3_djvu.txt',
    contribution:
      "The Survey's own institutional history from its archives. Anchors the site's account of the Survey as an integrated system: Colin Mackenzie's 1815 directive to persevere on one undeviating plan, W. Hodson's rule to investigate discrepancies rather than conceal them, the labour hierarchy, and the phrase “undisputed ground of Indian geography.”",
  },
  {
    id: 'royal-society-mapping-india',
    type: 'Secondary — Institutional',
    tier: 'Supporting',
    citation: '“Mapping India.” The Royal Society Blog, 13 Sept. 2023.',
    link: 'https://royalsociety.org/blog/2023/09/mapping-india/',
    contribution:
      "The Royal Society account behind the Impact chapter's naming of Sikdar as Chief Computer of the Calcutta office (1851) and Waugh's 1856 announcement of Peak XV.",
  },
  {
    id: 'rgs-nain-singh',
    type: 'Secondary — Institutional',
    tier: 'Supporting',
    citation:
      'Royal Geographical Society. The Journey of the Pundit Nain Singh through Great Tibet. Map, 1877.',
    contribution:
      "Royal Geographical Society record for the Impact chapter's mention of Nain Singh Rawat: a Survey-of-India explorer who carried the Survey's discipline into terrain closed to British parties, well after the original Great Arc.",
  },
  {
    id: 'ngs-everest-1830',
    type: 'Secondary — Institutional',
    tier: 'Consulted',
    citation:
      'National Geodetic Survey. “Everest 1830 Ellipsoid Parameters.” National Oceanic and Atmospheric Administration.',
    link: 'https://geodesy.noaa.gov',
    contribution:
      "Modern reference for the ellipsoid the Survey defined — the reference frame that stayed in use for Indian maps for more than a century, and is named in the glossary entry for reference ellipsoid.",
  },

  // ── Secondary — Scholarly ─────────────────────────────────────────────
  {
    id: 'keay-great-arc',
    type: 'Secondary — Scholarly',
    tier: 'Core',
    citation:
      'Keay, John. The Great Arc: The Dramatic Tale of How India Was Mapped and Everest Was Named. HarperCollins, 2000.',
    contribution:
      "The definitive modern narrative history. Source for the Great Arc's roughly 1,600-mile length used in the Impact chapter's “For scale” aside, and for much of the narrative framing of Lambton and Everest's careers.",
  },
  {
    id: 'edney-mapping-empire',
    type: 'Secondary — Scholarly',
    tier: 'Core',
    citation:
      'Edney, Matthew H. Mapping an Empire: The Geographical Construction of British India, 1765–1843. University of Chicago Press, 1997.',
    contribution:
      "The scholarly framework connecting the Survey's technical work to colonial rule. The Impact chapter's argument — that this kind of mapping helped construct the idea of British India, and that Indian labour did much of the work while officers took the credit — is grounded in Edney.",
  },
  {
    id: 'smith-1999',
    type: 'Secondary — Scholarly',
    tier: 'Core',
    citation:
      'Smith, James R. Everest: The Man and the Mountain. Whittles Publishing, 1999.',
    contribution:
      "Biography of George Everest and technical account of the Peak XV computation. Source for the Change chapter's documented fact that in December 1850, Waugh asked Sikdar to revise the procedure for computing snow-peak heights observed from over a hundred miles away.",
  },
  {
    id: 'lahiri-sikdar-2016',
    type: 'Secondary — Scholarly',
    tier: 'Supporting',
    citation:
      'Lahiri, Ashish. “Radhanath Sikdar and the Final Phase of Measuring Peak XV.” Indian Journal of History of Science, vol. 51, 2016, pp. 280–288.',
    link: 'https://www.semanticscholar.org/paper/b122d6efead1b97dba84bc243ce64024b5675beb',
    contribution:
      "Anchors the site's stance that Sikdar's role was computational and collective, not a lone discovery — and separates that documented role from the two undocumented Peak XV legends (the “Sir, I have discovered the highest mountain” quotation and Waugh's supposed two-foot padding).",
  },
  {
    id: 'theodolites-20000-feet',
    type: 'Secondary — Scholarly',
    tier: 'Supporting',
    citation:
      '“Theodolites at 20,000 Feet: Justifying Precision Measurement in the Great Trigonometrical Survey of India.” Notes and Records of the Royal Society, vol. 76, no. 3, 2022, pp. 603–620.',
    link: 'https://royalsocietypublishing.org/rsnr/article/76/3/603/55020/',
    contribution:
      "Peer-reviewed study of how the Survey's later Himalayan work under Waugh and Montgomerie justified its enormous cost through precision. Supports the site's framing of precision as an institutional argument, not just a technical one.",
  },
  {
    id: 'markham-1878',
    type: 'Secondary — Scholarly',
    tier: 'Consulted',
    citation:
      'Markham, Clements R. A Memoir on the Indian Surveys. 2nd ed., London: W. H. Allen, 1878.',
    link: 'https://archive.org/details/memoirontheindia025502mbp',
    contribution:
      "Nineteenth-century overview by the Royal Geographical Society president. Consulted for period judgements about the Survey's standing; used to check secondary claims rather than quoted directly.",
  },

  // ── Reference ─────────────────────────────────────────────────────────
  {
    id: 'bomford-geodesy',
    type: 'Reference',
    tier: 'Core',
    citation: 'Bomford, Guy. Geodesy. 4th ed., Clarendon Press, 1980.',
    contribution:
      "Standard geodesy textbook. Source for the trigonometric-heighting formula and the curvature-and-refraction coefficient (k ≈ 0.13) used by the Everest height calculator on the Tools page.",
  },

  // ── Image ─────────────────────────────────────────────────────────────
  {
    id: 'portrait-lambton',
    type: 'Image',
    tier: 'Supporting',
    citation:
      'Havell, William. Lieutenant-Colonel William Lambton. Oil on canvas, 1822. Royal Asiatic Society of Great Britain and Ireland, via Wikimedia Commons.',
    link: 'https://commons.wikimedia.org/wiki/File:Lambton_RAS.jpg',
    contribution: "Portrait of Lambton used on the Impact page's “Who did the work” panel.",
  },
  {
    id: 'portrait-everest',
    type: 'Image',
    tier: 'Supporting',
    citation:
      'Maull and Polyblank. George Everest. Photograph, c. 1850s. Wikimedia Commons.',
    link: 'https://commons.wikimedia.org/wiki/File:George_Everest_-_Maull_%26_Polyblank.jpg',
    contribution: "Portrait of Everest used on the Impact page's “Who did the work” panel.",
  },
  {
    id: 'portrait-waugh',
    type: 'Image',
    tier: 'Supporting',
    citation:
      'Beechey, George Duncan. Portrait of Major General Sir Andrew Scott Waugh. Oil on canvas, 1852. Artware Fine Art.',
    link: 'https://artwarefineart.com/gallery/portrait-major-general-sir-andrew-scott-waugh-1810-1878',
    contribution: "Portrait of Waugh used on the Impact page's “Who did the work” panel.",
  },
  {
    id: 'portrait-sikdar',
    type: 'Image',
    tier: 'Supporting',
    citation:
      '“Radhanath Sikdar.” Photographer and date unknown; authenticity of the image is not confirmed on its source page. Wikimedia Commons.',
    link: 'https://commons.wikimedia.org/wiki/File:Radhanath_Sikdar,_the_Mathematician_who_calculated_the_height_of_Mount_Everest.jpg',
    contribution:
      "Portrait used on the Impact page. Authorship and date are not confirmed on the source page — flagged as such rather than dropped, consistent with how the rest of the site marks unverified claims.",
  },
  {
    id: 'portrait-nain-singh',
    type: 'Image',
    tier: 'Supporting',
    citation:
      '“Nain Singh.” Photographer and date unknown. Wikimedia Commons.',
    link: 'https://commons.wikimedia.org/wiki/File:NainSingh.gif',
    contribution: "Portrait of Nain Singh Rawat used on the Impact page's “Who did the work” panel.",
  },
]

export const sourceTypes: SourceType[] = [
  'Primary',
  'Secondary — Institutional',
  'Secondary — Scholarly',
  'Reference',
  'Image',
]

export const tierRank: Record<SourceTier, number> = {
  Core: 0,
  Supporting: 1,
  Consulted: 2,
}
