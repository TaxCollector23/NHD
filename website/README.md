# The Great Trigonometrical Survey of India
### An interactive exhibit on the survey that measured a subcontinent, 1802 to 1871

Between 1802 and 1871, British and Indian surveyors built one connected framework of measurement across
India, using ground-based triangulation and hand computation. This project is a browser-based exhibit
about how that was done and what changed because of it. Every number the site displays is computed live
from the controls you move.

Built for National History Day 2027, on the theme *Innovation in History: Impact, Influence, Change*.

## Structure

Five top-level destinations, named after the theme's own words.

| Page | What it covers |
| --- | --- |
| **Home** | The question the survey set out to answer, and a one-paragraph answer. |
| **Innovation** | Why measurement mattered to the East India Company; how triangulation works, step by step; why the scale and duration, not the geometry, are the innovation; the instruments and the error discipline around them. |
| **Impact** | What seventy years of measuring produced, an animated map of the network year by year, the verified date sequence, and the workforce and institution the survey created. |
| **Change** | Peak XV as the centrepiece case study: a height that went from unknowable to computable. Then what continued after the survey ended, and why any of it matters to someone today. |
| **Sources** | Annotated bibliography in MLA format, grouped by Primary, Secondary, Images, and Data. |

Reachable from in-page links and the footer rather than the primary navigation:

- **Try the tools** — every interactive model on one page, each with a plain-language explanation and a
  live readout beside it.
- **Glossary** — technical terms, defined plainly. Terms are also defined inline on first use.
- **Process and build notes** — how the site was made. Not part of the exhibit narrative.

## Evidence discipline

`RESEARCH-TRUTH-FILE.md` is the single source of truth for this project. It classifies every claim by
source strength and lists, in section 10, the claims this site must never make. Nothing on the site
states a theodolite specification, a baseline length, or an angular precision figure, because none of
those could be traced to a document.

Every interactive carries a visible epistemic label:

- **Verified historical data** — the date timeline, and the modern peak elevations.
- **Illustrative model** — everything else. Each one is accompanied by a note naming the archival work
  that would upgrade it, namely transcribing the observation tables in Everest's 1847 *Account* and
  Waugh's 1851 report.

`npm run words` counts the student-composed narrative against National History Day's 1,200-word cap for
the website category.

## Tech stack

- **React + TypeScript + Vite**, one single-page app with a dynamic-import chunk per page.
- **Tailwind CSS**, with a small design system in `tailwind.config.js` and `src/index.css`
  (parchment, ink, earth, and brass, plus Playfair Display and Inter).
- **Framer Motion** for page transitions and diagram animation.
- **D3**, including `d3-geo` for the Mercator projection of an embedded India polygon.
- **React Router** with lazy routes.
- **Lucide** for icons.

## Repository layout

```
src/
  App.tsx                    router and lazy page loading
  index.css                  Tailwind, type scale, design tokens
  lib/
    pages.ts                 navigation model and in-page section maps
    projection.ts            d3-geo Mercator, cached
  data/
    india.ts                 India and Sri Lanka polygons (real lat/lng)
    locations.ts             13 survey stations, projected on load
    timeline.ts              the verified date dataset
    sources.ts               annotated bibliography
    glossary.ts              technical terms
  components/
    layout/        Navbar, Footer, SlideNav, SearchModal
    hero/          HeroSection
    triangulation/ TriangleSimulator, BaselineSteps, ArcSecondExplainer
    instruments/   TheodoliteViewer with eyepiece and vernier
    mountain/      EverestCalculator
    maps/          IndiaBackground, SurveyMap, CoverageCompare
    timeline/      TimelineScrubber, TimelineStrip
    legacy/        PositionFix
    data/          Graphs
    ui/            SectionNav, ToolPanel, UpgradeNote, EpistemicBadge, Term
  pages/
    Home, Innovation, Impact, Change, Tools, Sources, Glossary,
    Process, NotFound
public/
  favicon.svg, og.svg
  portraits/                 drop JPGs here for the Impact page
```

## Running locally

```bash
npm install
npm run dev             # http://localhost:5173
npm run build           # production bundle in dist/
npm run preview         # preview the production build
npm run words           # word count against the 1,200-word cap
```

## Portraits

The people section of the Impact page auto-detects portrait JPGs at these paths. Drop public domain
scans in:

- `public/portraits/lambton.jpg`
- `public/portraits/everest.jpg`
- `public/portraits/waugh.jpg`
- `public/portraits/sikdar.jpg`
- `public/portraits/nainsingh.jpg`

## A note on the contest submission

This React application cannot be entered into National History Day as it stands. The contest requires
websites to be built inside NHDWebCentral, which supports static HTML and CSS only. The `docs/` folder
holds the planning documents for that manual rebuild. This repository is the reference version.

## Credits and authorship status

The application code, the mathematical solvers, the D3 renderers, and the projection are AI-assisted
development scaffolding. The historical content is written against `RESEARCH-TRUTH-FILE.md`. See
`NHD-AI-AUDIT.md` and `NHD-TECHNICAL-AUDIT.md` for the provenance of every claim, dataset, and preset.
