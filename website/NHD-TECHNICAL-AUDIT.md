# NHD Technical Audit — "Measuring the Impossible"

**Purpose:** a technical map of the existing codebase so verified research and student writing can replace
the AI-generated historical material later.
**Audited:** 2026-08-26, against the running dev server (`http://localhost:5173`, all 11 routes exercised).
**No files were modified.** This report is a new file only.

**Scope note:** 45 source files inspected (`src/**`, `public/**`, `index.html`, configs). Word counts are
measured two ways — live from the rendered DOM, and from the source arrays — and I say which is which.

---

## 1. CONTENT INVENTORY

Type key: **A** technical/UI · **B** mathematical/algorithmic · **C** historical factual ·
**D** historical interpretation/argument · **E** data · **F** citation/bibliography · **G** visual/illustrative

### 1a. Data files — the content layer

| File | Exports / variables | Content type | Types | Words |
|---|---|---|---|---|
| `src/data/timeline.ts` | `timeline` (12 events: year, title, location, description) | Dated event log | **C, E** | 181 |
| `src/data/glossary.ts` | `glossary` (26 terms × `short` + `full`), `lookup()` | Technical definitions, many with historical assertions | **C, E** | 1,048 |
| `src/data/sources.ts` | `sources` (11 entries: category, citation, link?, note) | Bibliography + annotations | **F** | 236 |
| `src/data/locations.ts` | `RAW` (13 stations), `stations`, `triangles` (12 tuples) | Station coords/years/notes; triangle mesh | **C, E** | 27 (notes) |
| `src/data/india.ts` | `INDIA_MAINLAND`, `SRI_LANKA`, `ANDAMAN`, `NICOBAR`, `rivers`, `himalayanCrest`, `oceanLabels`, `greatArcLine`, `indiaGeo` | Hand-typed geographic coordinates | **E, G** | ~6 (labels) |
| `src/lib/pages.ts` | `NHD_THEME`, `pageOrder`, `chapterNav`, `referenceNav`, `neighbours()` | Route registry + **theme string** | **A** (+ **C** for `NHD_THEME`) | ~30 |

### 1b. Pages

| File | Component | Content type | Types | Words (default render) |
|---|---|---|---|---|
| `src/pages/Home.tsx` | `Home` | Thesis blocks; `innovations[3]`, `impacts[3]` card arrays | **D, C** | 299 |
| `src/pages/Problem.tsx` | `Problem` | Intro; `obstacles[5]`; before/after slider; inline 1780 SVG map | **D, C, G** | 226 |
| `src/pages/Triangulation.tsx` | `Triangulation` | Intro; ToolIntro copy | **D, A** | 626 (page total incl. simulator) |
| `src/pages/Instruments.tsx` | `Instruments` | Intro; `supporting[3]`; ToolIntro copy | **C, D** | 622 |
| `src/pages/Survey.tsx` | `Survey` | Intro; 2× ToolIntro copy | **C, D** | 651 |
| `src/pages/Himalayas.tsx` | `Himalayas` | Intro; ToolIntro copy | **C, D** | 542 |
| `src/pages/People.tsx` | `People`, `Portrait` | `people[4]`: bios, roles, 21 milestones, 4 `imgHint` strings | **C, D** | 194 shown / **495 across all 4 tabs** |
| `src/pages/Legacy.tsx` | `Legacy` | Intro; `rows[5]` then/now table; ToolIntro copy | **D** | 511 |
| `src/pages/Sources.tsx` | `Sources` | Wrapper only; renders `Bibliography` | **A** | 294 (from `sources.ts`) |
| `src/pages/Glossary.tsx` | `Glossary` | Search + A–Z renderer; renders `full` only | **A** | 804 (from `glossary.ts`) |
| `src/pages/Process.tsx` | `Process`, `Panel` | `built[8]`, `todo[6]`, `author{}` placeholders, stat cards | **A** (build checklist, not a process paper) | 432 |
| `src/pages/NotFound.tsx` | `NotFound` | 404 copy | **A** | ~40 |

### 1c. Components

| File | Component(s) | Content type | Types | Words |
|---|---|---|---|---|
| `src/components/data/Graphs.tsx` | `TrianglesGrowthChart`, `PrecisionOverTimeChart`, `DistancePerDecadeChart`, `PeaksHeightChart`, `ChartFrame`, `DetailRow`, `renderLine`, `renderLog`, `renderBars`, `renderPeaks`, `attachHover` | 4 datasets + 26 annotations + 4 captions; D3 renderers | **E, C, D** + **A/B** | 393 (notes+captions) |
| `src/components/triangulation/TriangleSimulator.tsx` | `TriangleSimulator`, `solve`, `TriangleCanvas`, `ChainCanvas`, `GuidedExplanation`, `FormulaExplanation`, `ChainExplanation`, `Control`, `Row`, `TriangleSimulatorNext` | `PRESETS[4]`; Law-of-Sines solver; explanation panels | **B** + **C/D** (presets, prose) | 342 |
| `src/components/triangulation/ArcSecondExplainer.tsx` | `ArcSecondExplainer` | 3 explanatory panels + formula box (all JSX prose) | **C, D** | ~230 |
| `src/components/instruments/TheodoliteViewer.tsx` | `TheodoliteViewer`, `EyepieceAndVernier`, `Range` | `info{4 parts}`; 5-step procedure; SVG schematic | **C, G** + **A** | 187 |
| `src/components/mountain/EverestCalculator.tsx` | `EverestCalculator`, `Field` | `STATIONS[4]` presets; trig-height formula; SVG diagram | **B** + **C/E** (presets) | 272 |
| `src/components/legacy/PositionFix.tsx` | `PositionFix`, `Panel`, `Field`, `centroidOfIntersections`, `lineLineIntersection`, `circleIntersection`, `circleCircle`, `format1850Time`, `distancePx` | `HILLS`, `SATS`, `TRUE_POS`; timing constants; solvers | **B** + **C/D** (framing, timers) | 159 |
| `src/components/maps/SurveyMap.tsx` | `SurveyMap`, `anchor` | Year slider; `KM_PER_PX`; station detail panel | **A/B** + **C** | ~60 |
| `src/components/maps/IndiaMap.tsx` | `IndiaBackground` | Renders coastline/rivers/crest/arc/labels | **G, A** | ~18 |
| `src/components/timeline/TimelineScrubber.tsx` | `TimelineScrubber` | Scroll→year mapping; mini-map; renders `timeline` | **A** (+ **C** via data) | ~45 own |
| `src/components/timeline/Timeline.tsx` | `Timeline` | **DEAD — never imported** | **A** | 0 |
| `src/components/sources/Bibliography.tsx` | `Bibliography` | Groups + renders `sources` | **A/F** | 3 own |
| `src/components/ui/ToolIntro.tsx` | `ToolIntro` | Layout shell; copy passed in from 6 pages | **A** | 161 (`what`) + 18 `tryThis` bullets |
| `src/components/ui/Term.tsx` | `Term` | Glossary tooltip — **DEAD, never used** | **A** | 0 |
| `src/components/layout/Navbar.tsx` | `Navbar` | Nav chrome | **A** | ~25 (desktop) |
| `src/components/layout/Footer.tsx` | `Footer` | Site description + project blurb | **A** + **D** (1 claim) | 56 |
| `src/components/layout/SlideNav.tsx` | `SlideNav` | Prev/next + arrow keys | **A** | 2/page |
| `src/components/layout/SearchModal.tsx` | `SearchModal` | ⌘K search; `PAGE_HINTS[11]` descriptive strings | **A** + **C** (hints) | 80 |

### 1d. Infrastructure — no historical content

`src/App.tsx` (router, title map, preload, ⌘K), `src/main.tsx`, `src/index.css`, `src/lib/projection.ts`,
`src/lib/preload.ts`, `src/lib/utils.ts`, `src/lib/useVisited.ts` (**DEAD**), `tailwind.config.js`,
`vite.config.ts`, `postcss.config.js`, `tsconfig*.json`, `.oxlintrc.json`. Type **A**.

`index.html` — meta/OG/Twitter copy contains project claims (**C**, 69 words).
`README.md` — 198 words of project description including a **false authorship claim** (**C**).

---

## 2. CONTENT THAT MUST BE REPLACED

Every item below makes a historical claim. Listed by storage location.

### `src/data/timeline.ts` → `timeline[]`
12 entries; each has `year`, `title`, `location?`, `description`. **All 12 dates, all 12 event
descriptions, all 8 place attributions.** Indexes 0–11 (1800, 1802, 1806, 1818, 1823, 1830, 1841, 1843,
1852, 1856, 1865, 1871).

### `src/data/locations.ts`
- `RAW[]` — 13 records. **`lat`/`lng` are real modern coordinates** (lowest replacement priority).
  **`year` on all 13 records is an assertion about when a station entered the network.**
  **`note` on 7 records** (`cape`, `madras`, `kalianpur`, `calcutta`, `dehradun`, `darjeeling`, `peakxv`)
  — including `'29,002 ft, computed 1852'`.
- `triangles[]` — 12 tuples `[stationA, stationB, stationC, year]`. **The entire mesh and all 12 dates.**

### `src/data/glossary.ts` → `glossary{}`
26 terms. `full` field is rendered; `short` field is **not rendered anywhere** (see §10). Terms carrying
embedded historical claims rather than pure definitions: `theodolite`, `baseline`, `vernier`,
`arc-second`, `arc-minute`, `refraction`, `heliotrope`, `meridian`, `peak xv`, `ellipsoid`, `computer`,
`geodesy`, `latitude`, `plane table`, `great arc`, `chain`, `ephemeris`, `least squares`, `datum`,
`ordinance`. (Roughly 20 of 26.)

### `src/data/sources.ts` → `sources[]`
All 11 `citation` strings and all 11 `note` annotations. See §6.

### `src/components/data/Graphs.tsx`
- `GROWTH[]` — 8 records (`year`, `tri`, `note`)
- `PRECISION[]` — 7 records (`year`, `arcsec`, `instrument`, `note`)
- `DECADES[]` — 7 records (`decade`, `km`, `note`)
- `PEAKS[]` — 4 records (`peak`, `short`, `height`, `thought`, `note`)
- 4 `caption=` props inside `ChartFrame` calls
- Axis labels: `'principal triangles'`, `'best precision (arc-seconds, log)'`, `'km added per decade'`
- Interpolated `head` strings in `DetailRow` calls

### `src/components/triangulation/TriangleSimulator.tsx`
- `PRESETS[]` — 4 records (`id`, `title`, `year`, `c`, `A`, `B`, `blurb`). **All 16 numeric fields and
  all 4 blurbs.** Section heading `'Historical presets'` and subtitle `'or load a real Survey scenario'`.
- `ChainExplanation` — bulleted claims: `~1,600 miles`, `~580` principal triangles, error-propagation claim.
- `FormulaExplanation` — closing paragraph (`'No calculators in 1802…a week to reduce'`).
- `ChainCanvas` footer string (`'The Survey did this thousands of times…'`).

### `src/components/mountain/EverestCalculator.tsx`
- `STATIONS[]` — 4 records (`id`, `name`, `distance`, `angle`, `observer`, `blurb`). **All 12 numeric
  fields and all 4 blurbs.** Section heading `'Real observation stations'`.
- Hardcoded comparison row: `'Peak XV (Everest), modern satellite'` → `8,848 m · 29,032 ft`.
- Explainer paragraphs: the `13–17%` refraction claim, the `'within a few metres'` claim.
- Slider help text on `refraction` (`'The Survey used k ≈ 0.13'`).
- Default `refraction` state = `0.14`.

### `src/components/legacy/PositionFix.tsx`
- `12 * 60` and `350` timing constants (lines in the `useEffect` loop).
- `D1850 = 6000`, `DGPS = 900` animation durations.
- `angleErr` default `0.5`, `rangeErr` default `3`.
- `HILLS[3]` names (`Hill A/B/C`), `SATS[3]` names (`PRN 12/23/07`).
- Both `methodNote` strings; both `era` strings; both `<Field>` help paragraphs (compass 0.5°, GPS ±3 m,
  RTK ±1 cm, "ten thousand times better than a theodolite"); closing summary paragraph.

### `src/components/instruments/TheodoliteViewer.tsx`
- `info{}` — 4 parts × (`title`, `short`, `body`). **All instrument specifications.**
- SVG caption `"Cary's Great Theodolite (schematic)…"`.
- 5-step `'How to measure an angle'` procedure list.
- `EyepieceAndVernier` intro paragraphs; the `60″` lock threshold text; the "five verniers" closing claim.

### `src/components/maps/SurveyMap.tsx`
- `KM_PER_PX = 8.5`
- `YEAR_MIN = 1802`, `YEAR_MAX = 1871`
- Quick-jump year buttons `[1802, 1820, 1840, 1852, 1871]`
- Panel caption `'These three numbers are the ones a Surveyor General would have reported to London.'`
- The `'Approx. km along network'` row label.

### `src/components/timeline/TimelineScrubber.tsx`
- Caption describing the arc growing "north along the 78° meridian".
- Derives all content from `timeline` (replace upstream).

### `src/components/triangulation/ArcSecondExplainer.tsx`
All three panel bodies (the 3 cm / 48 cm figures, the 30″ drift claim), the formula box lines
(`Great Theodolite reading precision: 1″`, `Cheap sextant: 60″`), and the closing five-verniers claim.
**All JSX prose — no data array to swap.**

### Page-level prose (all JSX; no data layer)
| File | Items |
|---|---|
| `Home.tsx` | Hero-adjacent H2s + 2 thesis paragraphs; `innovations[3]`; `impacts[3]` (incl. `29,002 ft`/`29,032 ft`) |
| `Problem.tsx` | Intro paragraph (30-mile claim); `obstacles[5]`; scale-card caption (1.5 M sq mi, 1,600 miles); both SVG map labels; slider caption |
| `Triangulation.tsx` | Chapter eyebrow, thesis line, intro paragraph, `ToolIntro` `what` + 3 `tryThis` |
| `Instruments.tsx` | Thesis line; intro (1,000 lb, £2,000, ~$300,000, twelve men, 1″); `supporting[3]`; `ToolIntro` copy |
| `Survey.tsx` | Thesis line; intro (~580 triangles, 1,600 miles); 2× `ToolIntro` copy |
| `Himalayas.tsx` | Thesis line; intro (six observations, 100+ miles, 29,002/29,032/30 ft, 1953); `ToolIntro` copy |
| `People.tsx` | `people[4]` — `role`, `dates`, `body`, 21 `milestones`, 4 `imgHint` |
| `Legacy.tsx` | Thesis line; intro; `rows[5]` × (`then`, `now`); `ToolIntro` copy |
| `Process.tsx` | `built[8]`, `todo[6]`, `author{}`, 3 stat cards (word count, theme, source counts) |
| `Footer.tsx` | Site description; "authentic nineteenth-century surveying methods" claim |
| `SearchModal.tsx` | `PAGE_HINTS{11}` |
| `index.html` | `<meta name="description">`, OG + Twitter description |
| `public/og.svg` | Embedded `<text>`: title, subtitle, `1802 · Madras baseline`, `1852 · Peak XV computed` |
| `src/lib/pages.ts` | `NHD_THEME` |
| `README.md` | Whole file, especially the authorship sentence |

### Historical quotations
**None.** There is not a single quoted primary-source passage anywhere in the project.

### Historical maps
- `Problem.tsx` — inline `<path d="M 230 70 C …">` labelled `'Hindoostan, c. 1780 (approximate)'`.
  Not derived from any map.
- `src/data/india.ts` — the entire coastline/river/crest coordinate set.

---

## 3. DATA DEPENDENCIES

| Component | Current Data | Location | Historical Claim in UI | Replace Data Only? | Code Changes Needed |
|---|---|---|---|---|---|
| `TrianglesGrowthChart` | `GROWTH[8]` `{year,tri,note}` | `Graphs.tsx` L28-37 | Caption asserts *"from the Survey of India's General Reports"* | ✅ Yes | Rewrite `caption`; adjust `yDomain:[0,620]` + `xDomain:[1802,1871]` to new range |
| `PrecisionOverTimeChart` | `PRECISION[7]` `{year,arcsec,instrument,note}` | `Graphs.tsx` L64-72 | Caption: GTS at "the elbow where brass mechanics hit its ceiling" | ✅ Yes | Rewrite `caption`; adjust log `yDomain:[0.0005,1000]`, `xDomain`; `useState` default finds `year===1830` |
| `DistancePerDecadeChart` | `DECADES[7]` `{decade,km,note}` | `Graphs.tsx` L104-112 | Caption: *"The 1840s were the Survey's most productive decade"* | ✅ Yes | Rewrite `caption`; `useState(4)` hardcodes the 1840s index |
| `PeaksHeightChart` | `PEAKS[4]` `{peak,short,height,thought,note}` | `Graphs.tsx` L143-152 | Caption: *"the title moved four times in 50 years"* | ✅ Yes | Rewrite `caption`; `y.domain([0,9500])` hardcoded; `useState(3)` hardcodes Peak XV |
| `SurveyMap` | `stations[13]`, `triangles[12]`, `KM_PER_PX` | `locations.ts`; `SurveyMap.tsx` L44 | "Surveyor General would have reported to London"; km figure | ⚠️ Partly | `YEAR_MIN/MAX` hardcoded; quick-jump years hardcoded; **`KM_PER_PX` must be deleted or replaced with real great-circle math** |
| `TimelineScrubber` | `timeline[12]`, `stations`, `triangles`, `GREAT_ARC_PX` | `timeline.ts`, `locations.ts`, `projection.ts` | Arc "growing north along the 78° meridian" | ✅ Yes | `YEAR_MIN/MAX` derive from array automatically — good. Fix `motion.line` bug (§10) |
| `HeroSection` | `stations`, `triangles` | `locations.ts` | Implies the drawn mesh is the real network | ✅ Yes | Animation delays (`i * 0.12`) assume ~12 triangles; retune for a larger set |
| `IndiaBackground` | `indiaGeo`, `rivers`, `himalayanCrest`, `oceanLabels`, `greatArcLine` | `india.ts` | Implies an accurate historical basemap | ✅ Yes | Swapping in real GeoJSON works via `projection.ts` unchanged — `fitExtent` auto-scales |
| `TriangleSimulator` | `PRESETS[4]` | `TriangleSimulator.tsx` L33-64 | "Historical presets", "a real Survey scenario" | ✅ Yes | Change section heading + subtitle strings; `Control` `max={80}` km may need widening |
| `EverestCalculator` | `STATIONS[4]` | `EverestCalculator.tsx` L27-32 | "Real observation stations" + 1848/1849 dates | ✅ Yes | Change heading string; slider ranges (`distance` 10–250 km, `angle` 0.05–10°, `observer` 0–5 km) may need widening; hardcoded 8,848 m comparison row |
| `PositionFix` | `HILLS[3]`, `SATS[3]`, `TRUE_POS`, `12*60`, `350` | `PositionFix.tsx` L30-45, L92-93 | "minutes vs. milliseconds" | ❌ No | Timers are **invented constants inside the animation loop**, not data. Requires extracting to a config object or deleting the timer feature |
| `TheodoliteViewer` | `info{4}` | `TheodoliteViewer.tsx` L6-30 | Instrument specifications | ✅ Yes | None — pure text swap |
| `EyepieceAndVernier` | `target`/`aim` state, `60″` threshold | same file | Reading procedure | ✅ Yes (text) | Vernier tick math (`round(seconds/6)`, 10 divisions) is stylised, not a real 10-on-9 vernier |
| `Bibliography` | `sources[11]` | `sources.ts` | Implies sources were used | ✅ Yes | None — `category` union type limits you to Primary/Secondary/Images/Data |
| `Glossary` page | `glossary{26}` | `glossary.ts` | Definitions with embedded history | ✅ Yes | None — renders `full` only |
| `SearchModal` | `pageOrder`, `glossary`, `sources`, `PAGE_HINTS` | `SearchModal.tsx` L27-39 | Page descriptions | ✅ Yes | `PAGE_HINTS` keys must match routes |
| `Problem` before/after | Inline SVG path + `IndiaBackground` | `Problem.tsx` L98-105 | "Hindoostan, c. 1780" | ❌ No | The 1780 map is an inline bezier path. Using a real image requires replacing the `<svg>` layer with `<img>`/`<image>` and reworking the `clipPath` |

**Summary: 13 of 17 accept a pure data swap.** The four that don't are `PositionFix` (timers),
`SurveyMap` (`KM_PER_PX`), the `Problem` before/after slider (inline drawing), and `ArcSecondExplainer`
(prose only, no data layer).

---

## 4. SIMULATORS

### 4.1 `TriangleSimulator` — `src/components/triangulation/TriangleSimulator.tsx`

- **Model:** `C = 180 − A − B`; Law of Sines `k = c / sin C`, `a = k·sin A`, `b = k·sin B`;
  `area = ½·a·b·sin C`; `height = a·sin B`. Plane trigonometry.
- **Inputs:** `baseline` (1–80 km, step 0.05), `angleA` (5°–), `angleB` (5°–), `mode`
  (`guided`/`formula`/`chain`), preset selection.
- **Outputs:** `C`, `a`, `b`, `area`, `height`, live SVG, scale bar, narrated steps.
- **Constants:** `MAX_SUM = 178`; canvas `W=700 H=440`, `padX=90 padY=70`;
  `proportional = 0.35 + baseline * 0.4`; `ChainCanvas` fixed at 6 triangles, 900 ms interval.
- **Presets:** `PRESETS[4]` — Madras 1802 (12.1/78/72), Cape Comorin 1806 (30/60/70),
  Great Arc 1830 (25/74/68), Darjeeling→Peak XV 1852 (40/85/88).
- **Assumptions:** plane (not spherical) trigonometry; no spherical-excess correction; no measurement
  error; `A`+`B` clamped so `C ≥ 2°`.
- **Genuinely mathematical:** `solve()`, `TriangleCanvas` layout/auto-fit, `arcPath`/`angleAt` geometry,
  `ChainCanvas` tessellation, `FormulaExplanation`'s live arithmetic. ✅ Keep.
- **Presented as historical:** `PRESETS` (all 16 numbers), the 4 blurbs, the heading
  `'Historical presets'`, the subtitle `'or load a real Survey scenario'`, `ChainExplanation`'s bullets,
  the `'No calculators in 1802'` paragraph, `ChainCanvas`'s footer line.
- **Relabel if no data found:** rename the section to *Worked examples* / *Illustrative scenarios*,
  strip the `year` field from `Preset`, remove place names, remove the "real Survey scenario" subtitle.
  The math needs no relabelling.

### 4.2 `EverestCalculator` — `src/components/mountain/EverestCalculator.tsx`

- **Model:** `h = h₀ + d·tan θ + (1 − k)·d²/(2R)`. Standard trigonometric heighting with combined
  curvature-and-refraction correction. Correctly implemented.
- **Inputs:** `distance` (10–250 km), `angle` (0.05–10°, step 0.005), `observer` (0–5 km),
  `refraction` k (0.10–0.20, default 0.14), preset selection.
- **Outputs:** uncorrected height (m + ft), corrected height (m + ft), curvature drop (m), live SVG
  with exaggerated vertical scale and curved horizon.
- **Constants:** `R = 6371` km; `3.28084` m→ft; canvas `640×320`, `padL/R/T/B = 60/40/30/70`;
  `curvDropCanvas` clamped to 60 px; inline `(170*170/(2*6371)*1000)` in the explainer paragraph.
- **Presets:** `STATIONS[4]` — Jirol 1849 (174 km / 2.18° / 0.137 km), Ladnia 1849 (176 / 2.13 / 0.137),
  Darjeeling ridge 1848 (130 / 3.10 / 2.13), Nearby hill (40 / 5.0 / 0.6).
- **Assumptions:** spherical Earth; single lumped `k`; sea-level datum; no geoid/plumb-line deflection;
  no atmospheric-model variation with altitude; the diagram's vertical scale is exaggerated (labelled).
- **Genuinely mathematical:** the formula, the `useMemo` computation, the SVG diagram geometry,
  unit conversion, the `Field` slider component. ✅ Keep.
- **Presented as historical:** the heading `'Real observation stations'`; all 4 station names and the
  1848/1849 dates; all 12 numeric preset fields; the 4 blurbs; the hardcoded `8,848 m · 29,032 ft`
  comparison row; the `k ≈ 0.13` slider help; the `13–17%` and `'within a few metres'` claims.
- **Relabel if no data found:** rename to *Try your own observation* / *Worked example*; remove station
  names and years; remove the fixed comparison row or label it as a modern published value with a
  citation. **The formula stays as-is.**

### 4.3 `PositionFix` — `src/components/legacy/PositionFix.tsx`

- **Model:** left panel — three bearing lines from fixed landmarks with per-hill deterministic offset
  `((i*37 % 7) − 3)/3 × angleErr`, fix = centroid of the 3 pairwise line-line intersections. Right panel
  — three range circles with offset `((i*41 % 5) − 2) × rangeErr/5`, fix = centroid of the 3 circle-circle
  intersection points nearest `CENTER`.
- **Inputs:** `angleErr` (0–2°, default 0.5), `rangeErr` (0.5–15 m, default 3), "Take a fix" button.
- **Outputs:** animated bearing lines / range rings, computed fix marker, true position marker,
  fix error, two timers.
- **Constants:** `W=H=340`; `CENTER={170,170}`; `TRUE_POS={170,170}`; `HILLS[3]`; `SATS[3]`;
  `D1850 = 6000` ms; `DGPS = 900` ms; **`12 * 60` simulated field-seconds**; **`350` simulated ms**.
- **Assumptions:** compass resection is the right 1850s analogue; error is deterministic, not stochastic;
  canvas pixels stand in for metres (left panel labels them `"metres"` in quotes, right panel labels the
  identical unit `m` without quotes); 2-D plane, no altitude, no clock-bias unknown (real GPS needs a
  4th satellite for exactly that reason, which the `badge` text mentions but the model ignores).
- **Genuinely mathematical:** `lineLineIntersection`, `circleCircle`, `centroidOfIntersections`,
  `circleIntersection`, `distancePx`, the rAF animation loop. ✅ Keep.
- **Presented as historical:** the two timers and everything that frames them; both `methodNote`s;
  both era labels; the compass-0.5° / GPS-±3 m / RTK-±1 cm / "ten thousand times better" help text;
  the closing paragraph.
- **Relabel if no data found:** **remove the timers entirely** or move them behind a clearly-marked
  "illustrative, not measured" label. Rename to *Geometry comparison*. Unify the error units (both are
  pixels — either label both as arbitrary units or scale both to a stated real-world scale).

### 4.4 `TheodoliteViewer` — `src/components/instruments/TheodoliteViewer.tsx`

- **Model:** none. `rot` (−45°…45°) drives both the telescope group's `rotate` transform and the red
  pointer on the graduated circle at a 1:1 ratio. Purely presentational.
- **Inputs:** `active` part (4 hotspots + 4 buttons + 4 numbered callouts), `rot` slider.
- **Outputs:** highlighted SVG parts, description panel.
- **Constants:** SVG `400×520`; circle at `(200,325)` `rx=115 ry=20`; 36 tick marks; `brassGrad`.
- **Presets:** none.
- **Assumptions:** the schematic is a generic illustration, not a measured drawing of a specific instrument.
- **Genuinely technical:** the SVG, the highlight state machine, the rotation binding. ✅ Keep.
- **Presented as historical:** `info{}` — all 4 `body` strings (36-inch scope, "divided into single
  degrees", 1,000 lb, twelve men, five verniers); the SVG caption naming a specific maker's instrument;
  the 5-step procedure.
- **Relabel if no data found:** change the caption to *Theodolite (generic schematic)* and drop the
  attribution to a named instrument until specs are sourced.

### 4.5 `EyepieceAndVernier` — same file

- **Model:** `err = target − aim`; `errArcsec = err × 3600`; `locked = |errArcsec| < 60`.
  Reading decomposition: `deg = floor(aim)`, `minutes = floor((aim−deg)×60)`,
  `seconds = round(((aim−deg)×60 − minutes)×60)`. Highlighted vernier tick = `round(seconds/6)`.
- **Inputs:** `target` (22–25°, step 0.001), `aim` (22–25°, step 0.0001).
- **Outputs:** simulated telescope view with parallax offset `(target−aim)×25` px, lock indicator,
  D°M′S″ readout, vernier strip.
- **Constants:** `60″` lock threshold; 10 vernier divisions at 6″ each; 60 main-scale ticks; `25` px/°.
- **Assumptions:** ⚠️ **the vernier is stylised, not mechanically real.** A vernier works by 10 divisions
  spanning 9 main divisions (as `glossary.ts` correctly states); this widget just highlights the tick at
  `seconds/6`. The `60″` lock threshold is arbitrary. The DMS decomposition is correct arithmetic.
- **Genuinely technical:** DMS conversion, the SVG, the parallax binding. ✅ Keep.
- **Presented as historical:** the intro paragraphs, the "usable reading" threshold framing, the
  five-verniers closing claim.
- **Relabel if no data found:** call it a *simplified vernier* explicitly, or implement the real 10-on-9
  geometry (this is a genuine improvement — see §13).

### 4.6 `SurveyMap` — `src/components/maps/SurveyMap.tsx`

- **Model:** filter `stations` and `triangles` by `year <= current`. Distance metric:
  `Σ hypot(Δx, Δy) × KM_PER_PX` over one edge per triangle.
- **Inputs:** `year` slider (1802–1871), Play/Pause (90 ms per year), Reset, 5 quick-jump buttons,
  station hover/click.
- **Outputs:** animated triangle mesh, station dots + labels, station detail panel (name, year, lat/lng,
  note), 3 statistics (stations, triangles, "Approx. km along network").
- **Constants:** `YEAR_MIN=1802`, `YEAR_MAX=1871`, `KM_PER_PX = 8.5`, 90 ms tick, `anchor()` thresholds
  (`x > 340`, `y < 220`, `y > 500`).
- **Presets:** quick-jump years `[1802, 1820, 1840, 1852, 1871]`.
- **Assumptions:** ⚠️ **`KM_PER_PX` is invalid.** Its own comment says *"rough for our stylized map."*
  Mercator px→km is latitude-dependent, so a single constant cannot be correct; and the code sums one
  edge per triangle, which is not a defined survey quantity.
- **Genuinely technical:** year filtering, the d3-geo projection, animation, hover/select state. ✅ Keep.
- **Presented as historical:** the km statistic; the caption *"These three numbers are the ones a
  Surveyor General would have reported to London"*; station `year` values; station `note` strings.
- **Relabel if no data found:** **delete the km statistic.** If a network-length figure is wanted,
  compute real great-circle distances from lat/lng (`d3.geoDistance`) — but that measures your mesh, not
  the historical one, so it still needs a label saying so.

### 4.7 `TimelineScrubber` — `src/components/timeline/TimelineScrubber.tsx`

- **Model:** scroll position → nearest item to `container.top + 60` → `currentIdx` → `currentYear`.
  `arcFrac = (currentYear − YEAR_MIN) / (YEAR_MAX − YEAR_MIN)`, linearly interpolating the Great Arc
  endpoint in **projected pixel space**.
- **Inputs:** scroll, Play (1200 ms per item), Restart.
- **Outputs:** highlighted entry, year readout, station/triangle counts, animated arc, mini-map.
- **Constants:** `YEAR_MIN`/`YEAR_MAX` derived from `timeline[0]`/`timeline[n-1]` (✅ good — auto-adapts);
  1200 ms; `+60` px scroll offset; `h-[520px]` container.
- **Presets:** none.
- **Assumptions:** ⚠️ arc progress is **linear in time**, which asserts a constant rate of northward
  progress. Also interpolating in pixel space rather than lat/lng is a minor projection inaccuracy.
- **Genuinely technical:** scroll tracking, sticky layout, the rAF loop, filtering. ✅ Keep.
- **Presented as historical:** the linear growth rate itself; the caption; all content from `timeline`.
- **Relabel if no data found:** state that arc progress is schematic, or drive `arcFrac` from actual
  dated station positions instead of elapsed time.

---

## 5. CHARTS

All four live in `src/components/data/Graphs.tsx`. Shared infrastructure: `ChartFrame` (eyebrow, title,
caption), `DetailRow` (head + body), `attachHover` (tooltip), palette constants
`INK/BRASS/BRASS_HI/EARTH/PAPER/GRID`.

### Chart 1 — "Cumulative principal triangles"
- **Component:** `TrianglesGrowthChart` → `renderLine`
- **Dataset:** `GROWTH: Growth[]`, same file
- **Hardcoded fields:** 8 × `{ year, tri, note }` — 1802:3, 1810:22, 1820:61, 1830:130, 1840:240,
  1850:360, 1860:480, 1871:583
- **Also hardcoded in the component:** `xDomain:[1802,1871]`, `yDomain:[0,620]`,
  `yLabel:'principal triangles'`, `useState(GROWTH.length - 1)`
- **Eyebrow:** "Growth of the survey" · **Title:** "Cumulative principal triangles"
- **Caption:** *"Approximate figures from the Survey of India's General Reports. Click any dot for context."*
- **Annotations:** 8 `note` strings
- **Source attribution displayed:** **YES — the Survey of India General Reports**
- **Backed by anything in the repo?** ❌ **NO.** No data file, no extract, no page reference, no
  retrieval. `sources.ts` lists the General Reports, but nothing links the two and nothing was read.
  **This is a source attribution with no backing.**
- **To replace:** swap `GROWTH`; rewrite `caption`; adjust both domains.

### Chart 2 — "Best angular precision over 400 years"
- **Component:** `PrecisionOverTimeChart` → `renderLog`
- **Dataset:** `PRECISION: Precision[]`
- **Hardcoded fields:** 7 × `{ year, arcsec, instrument, note }` — 1600/600/Tycho Brahe's quadrant,
  1700/60/Sextant, 1780/10/Ramsden theodolite, 1830/1/Cary's Great Theodolite (GTS), 1900/0.5/Wild T3,
  1970/0.05/Doppler satellite, 2020/0.001/VLBI-GNSS
- **Also hardcoded:** `xDomain:[1600,2030]`, `yDomain:[0.0005,1000]`, log scale,
  `yLabel:'best precision (arc-seconds, log)'`, `useState(findIndex(year===1830))`
- **Caption:** *"Log scale… The Great Theodolite of 1830 sits at the elbow where brass mechanics hit its ceiling."*
- **Source attribution displayed:** none
- **Backed by anything in the repo?** ❌ No.
- **To replace:** swap `PRECISION`; rewrite caption; adjust log domain; **the `useState` default hunts
  for `year === 1830` and will break silently if that year isn't in your new data** (returns `-1`).

### Chart 3 — "Kilometres of new triangulation, per decade"
- **Component:** `DistancePerDecadeChart` → `renderBars`
- **Dataset:** `DECADES: Decade[]`
- **Hardcoded fields:** 7 × `{ decade, km, note }` — 1800s:300, 1810s:700, 1820s:900, 1830s:1300,
  1840s:1800, 1850s:1600, 1860s:1400
- **Also hardcoded:** `yLabel:'km added per decade'`, `useState(4)` (the 1840s), `yMax * 1.1` headroom
- **Caption:** *"Click a bar for that decade's story. The 1840s were the Survey's most productive decade."*
- **Source attribution displayed:** none
- **Backed by anything in the repo?** ❌ No. **The caption states a conclusion drawn from the data.**
- **To replace:** swap `DECADES`; rewrite caption; **`useState(4)` is a magic index** that silently
  points at the wrong bar if your array length changes.

### Chart 4 — "Which peak was believed tallest, and when"
- **Component:** `PeaksHeightChart` → `renderPeaks` (bespoke mountain-polygon renderer)
- **Dataset:** `PEAKS: Peak[]`
- **Hardcoded fields:** 4 × `{ peak, short, height, thought, note }` — Chimborazo 6263/1800,
  Dhaulagiri 8167/1808, Kanchenjunga 8586/1849, Peak XV 8848/1856
- **Also hardcoded:** `y.domain([0, 9500])`, `useState(3)`, in-SVG labels `${height} m` and
  `believed tallest ~${thought}`
- **Caption:** *"Click a mountain for its story. Before the GTS, the title moved four times in 50 years."*
- **Source attribution displayed:** none
- **Backed by anything in the repo?** ❌ No. The four *elevations* are standard published figures and
  are individually checkable; the four `thought` years and all 4 notes are not backed by anything.
- **To replace:** swap `PEAKS`; rewrite caption; **`y.domain([0,9500])` is hardcoded** and will clip
  anything taller; `useState(3)` is a magic index.

### What you must replace per chart, in short
For each: **(1)** the dataset array, **(2)** the `caption` prop, **(3)** the `note` field on every record,
**(4)** the hardcoded axis domain, **(5)** the `useState` default index. Five edits × four charts.
The renderers (`renderLine`, `renderLog`, `renderBars`, `renderPeaks`, `attachHover`, `ChartFrame`,
`DetailRow`) need **no changes** — they are generic. ✅

---

## 6. SOURCES

All 11 in `src/data/sources.ts`, rendered by `Bibliography.tsx` at `/sources`, and indexed by
`SearchModal.tsx`. Each has `category`, `citation`, optional `link`, and `note` (rendered as
*"Why it matters: …"*).

| # | Citation (abbrev.) | Category | URL? | URL→actual source? | Referenced elsewhere in repo? | Site claims relying on it |
|---|---|---|---|---|---|---|
| 1 | Everest, *An Account of the Measurement of the Arc of the Meridian…*, 1830 | Primary | ❌ | n/a | ❌ none | Everest 1830 ellipsoid; People milestone; glossary `ellipsoid` |
| 2 | Waugh, *Instructions for Topographical Surveying*, 1861 | Primary | ❌ | n/a | ❌ none | Field procedure in `TheodoliteViewer` 5-step list |
| 3 | Survey of India, *General Report of the GTS*, 1870–1883 | Primary | ❌ | n/a | ⚠️ **Named in Chart 1's caption but never linked to the data** | Chart 1 dataset; ~580 triangles; station years |
| 4 | Keay, *The Great Arc*, 2000 | Secondary | ❌ | n/a | ❌ none | Most narrative prose |
| 5 | Edney, *Mapping an Empire*, 1997 | Secondary | ❌ | n/a | ❌ none | Colonial-context argument on `/people` |
| 6 | Smith, *Everest: The Man and the Mountain*, 1999 | Secondary | ❌ | n/a | ❌ none | Everest biography; instrument detail |
| 7 | Markham, *A Memoir on the Indian Surveys*, 1878 | Secondary | ❌ | n/a | ❌ none | General survey history |
| 8 | RGS Picture Library, "Great Theodolite of the Trigonometrical Survey" | Images | ❌ | n/a | ❌ none | ⚠️ **Cites a photograph the site does not display** |
| 9 | Survey of India Archives, "Triangulation charts, 1870" | Images | ❌ | n/a | ❌ none | ⚠️ **Cites a chart the site does not display** |
| 10 | Bomford, *Geodesy*, 4th ed., 1980 | Data | ❌ | n/a | ❌ none | The curvature/refraction formula in `EverestCalculator` |
| 11 | NGS, "Everest 1830 Ellipsoid parameters," NOAA, accessed 2026 | Data | ✅ `https://geodesy.noaa.gov` | ❌ **Bare agency homepage, not the document** | ❌ none | Ellipsoid claims in glossary + `/people` |

### Findings
1. **Zero of eleven sources are referenced anywhere in the codebase.** No page number, no quotation,
   no data extract, no `sourceId` field on any record, no footnote system. There is no mechanism in the
   code by which any claim connects to any source.
2. **Entry 3 is the only one named in the UI** — inside Chart 1's caption — and the dataset it supposedly
   supports is a plain hardcoded array in `Graphs.tsx` with no provenance. **A displayed source
   attribution with nothing behind it.**
3. **Entries 8 and 9 cite images that do not exist on the site.** There is no theodolite photograph and
   no 1870 triangulation chart anywhere in `public/` or `src/assets/`.
4. **Entry 11's URL is a homepage**, not the ellipsoid-parameters document. `accessed 2026` has no date.
5. **No entry has a page number, volume number, DOI, or archive URL** — several of these works are freely
   available digitally, and MLA would want those.
6. **The `Source` type has no field for a real annotation.** `note` is currently a description of what
   the book *is*. NHD wants an annotation describing **how you used it**. Adding that is a type change:
   `src/data/sources.ts` L1-6.
7. **`category` is a closed union** — `'Primary' | 'Secondary' | 'Images' | 'Data'`. If your real
   bibliography needs other groupings, the type and `Bibliography.tsx`'s `groups` array both change.

---

## 7. WORD COUNT

**Method.** Per-page figures are measured from `document.querySelector('main').innerText` on the running
site (so they exclude the navbar and footer, which live outside `<main>`). Interaction totals were
measured by clicking through every state and de-duplicating repeated lines. Array-level figures come
from parsing the source.

**Rules caveat — verify before relying on this.** My understanding: the NHD **website** category caps
**student-composed words at 1,200**; the **process paper is a separate 500-word document**; and the
following are generally *excluded* from the count — the annotated bibliography, the process paper,
properly-cited quotations from historical sources, media credits, and recurring navigation/menu/title
words. Confidence is high on the 1,200 and 500 figures and on the exclusion categories, moderate on
current-year wording. **Confirm against this year's rulebook and your affiliate's guidance.**
Note that `src/pages/Process.tsx` currently tells you the limit is 500 for the website — that is the
process-paper number, and it is wrong in that context.

### 7a. Visible by default, per page

| Page | Visible words | Notes |
|---|---|---|
| `/` | 299 | Includes SVG ocean labels |
| `/problem` | 226 | Includes 2 in-map text labels |
| `/triangulation` | 626 | Guided mode only |
| `/instruments` | 622 | Telescope part only |
| `/survey` | 651 | 2 charts, 1 note each |
| `/himalayas` | 542 | Jirol preset only |
| `/people` | 194 | **Lambton only** |
| `/legacy` | 511 | 1 chart note |
| `/sources` | 294 | Whole bibliography |
| `/glossary` | 804 | All 26 `full` definitions |
| `/process` | 432 | Build checklist |
| **Subtotal** | **5,201** | |

### 7b. Hidden interaction text (measured by clicking through states)

| Page | Default | All states | Delta |
|---|---|---|---|
| `/people` | 194 | 495 | **+301** (3 more biographies + 16 more milestones) |
| `/instruments` | 624 | 730 | **+106** (3 more theodolite parts) |
| `/triangulation` | 626 | 839 | **+213** (Formula + Chain panels) |
| `/triangulation` presets | — | — | **+51** (3 more preset blurbs) |
| `/himalayas` presets | — | — | **+22** (3 more station blurbs) |
| Chart annotations (all 3 chart pages) | 4 shown | 26 total = 323 words | **+247** |
| **Subtotal hidden** | | | **≈ +940** |

### 7c. Chrome (rendered once, outside `<main>`)

| Element | Words |
|---|---|
| Navbar (desktop, all chapter links + "More" + Search) | ~25 |
| Footer | 56 |
| `SlideNav` prev/next labels | 2 per page (recurring) |

### 7d. Never rendered

| Item | Words |
|---|---|
| `glossary.short` — all 26 short definitions | **321** |

These exist only because `Term.tsx` (the tooltip that would display them) is **never imported by any
component**. Dead content. Don't spend research effort on `short` unless you re-enable `<Term>`.

### 7e. Totals

| Bucket | Words |
|---|---|
| Visible by default (11 pages) | 5,201 |
| + hidden behind interaction | ≈ 940 |
| **Total reachable in the browser** | **≈ 6,140** |
| + never-rendered `glossary.short` | 321 |
| **Total prose in the repository** | **≈ 6,460** |

### 7f. "Likely countable project text"

| Bucket | Words | Counts? | Why |
|---|---|---|---|
| Chapter prose (7 chapters, visible) | ≈ 3,477 | ✅ **Counts** | Student-composed narrative |
| Hidden interaction text | ≈ 940 | ✅ **Counts** | Student-composed; visible on interaction |
| Glossary `full` (26 terms) | 804 | ✅ **Likely counts** | Student-composed explanatory text, not a credit or quotation |
| Home page | 299 | ✅ **Counts** | |
| Footer project description | 56 | ✅ **Likely counts** | Descriptive prose, not navigation |
| Chart captions + axis labels | ≈ 90 | ✅ **Counts** | Student-composed captions |
| `/sources` (bibliography + annotations) | 294 | ❌ **Exempt** | Annotated bibliography |
| `/process` | 432 | ⚠️ **Exempt only if it is your actual process paper** — it currently is not | It is a build checklist addressed to the developer |
| Navbar + SlideNav | ~35 | ❌ **Exempt** | Recurring navigation |
| Media credits | 0 | — | None exist |
| Quotations from sources | 0 | — | None exist |
| **Estimated countable total** | **≈ 5,670** | | |

> ### Countable ≈ **5,670** against a **1,200** cap — roughly **4.7× over**.
> This is a structural problem, not a trimming problem. Plan the 1,200 words first and build the
> chapters to fit, rather than writing freely and cutting later.

**Also:** `/process` currently displays *"≈ 1,100 words"* in a stat card (`src/pages/Process.tsx`).
That is wrong by roughly 5×.

---

## 8. NHD THEME — WHERE THE CURRENT SITE EXPRESSES THEME-RELATED IDEAS

Listing locations and the existing conceptual relationship only. **No argument written, nothing rewritten.**

### Theme string
`src/lib/pages.ts` → `export const NHD_THEME = 'Innovation and its Impact'`.
⚠️ Note: this string is **not consumed by any component** — it is exported and never imported. The theme
text that actually renders is hardcoded in `HeroSection.tsx` (`'An interactive NHD exhibit · Innovation
and its Impact'`), in `public/og.svg`, and — with a **different value** — in `src/pages/Process.tsx`
(`'NHD 2025 theme: Rights & Responsibilities'`). Three locations, two conflicting values, neither
matching a current NHD theme as far as I can determine. Verify at nhd.org.

### "INNOVATION" — where expressed

| Location | Existing conceptual relationship |
|---|---|
| `Home.tsx` — `innovations[3]` array + "The innovation" eyebrow + H2 | Frames the innovation as *substitution*: computation replacing physical measurement |
| `Home.tsx` — first thesis paragraph | Contrasts a pre-1802 method with a post-1802 method; innovation as a break in technique |
| `Problem.tsx` — thesis line `'The innovation: the specific obstacles it had to defeat'` | Frames innovation as a *response to constraints*; the 5 `obstacles` are the constraints |
| `Triangulation.tsx` — thesis line `'The innovation: geometry replaces walking'` | Innovation located in a mathematical method |
| `Instruments.tsx` — thesis line `'The innovation, in brass'` | Innovation located in a physical instrument enabling the method |
| `Survey.tsx` — thesis line `'The innovation, scaled'` | Innovation as *repeatable procedure* rather than single discovery |
| `People.tsx` — thesis line `'The innovation as a system: it outlived every one of its founders'` | Innovation as institution rather than individual act |
| `TriangleSimulator.tsx` — SVG legend "You measured / Math computed everything else" | The innovation stated as an interactive affordance |

### "IMPACT" — where expressed

| Location | Existing conceptual relationship |
|---|---|
| `Home.tsx` — `impacts[3]` array + "The impact" eyebrow + H2 | Three impact registers: cartographic, discovery, technological descent |
| `Home.tsx` — second thesis paragraph | Impact framed as *persistence*: method outlasting its tools |
| `Himalayas.tsx` — thesis line `'The impact: … weighed the highest mountain on Earth without anyone climbing it'` | Impact as a specific consequential result |
| `Legacy.tsx` — thesis line `'The impact, today'` + intro | Impact as present-day continuity |
| `Legacy.tsx` — `rows[5]` then/now table | Impact expressed as a structured 1800s→today comparison across 5 dimensions |
| `PositionFix.tsx` — dual panel + closing paragraph | Impact rendered as an interactive equivalence between eras |
| `PrecisionOverTimeChart` caption | Impact as a position on a 400-year precision trajectory |

### "INFLUENCE" — where expressed

| Location | Existing conceptual relationship |
|---|---|
| `Home.tsx` — `impacts[0]` "Every modern Indian map traces to this framework" | Downstream influence on later cartography |
| `Home.tsx` — `impacts[2]` / `Legacy.tsx` — "The math still runs GPS" | Influence framed as methodological inheritance |
| `glossary.ts` — `ellipsoid`, `datum` | Influence via a reference frame persisting for a century |
| `glossary.ts` — `ordinance` (Ordnance Survey) | **Inbound** influence — the only place the site treats the GTS as a *recipient* of influence |
| `People.tsx` — `teams` entry | Influence/attribution question: who is credited for the work |
| `Legacy.tsx` — `rows[4]` "Reference frame" | Everest 1830 → WGS 84 as a lineage |

### "CHANGE" — where expressed

| Location | Existing conceptual relationship |
|---|---|
| `Problem.tsx` — before/after slider | Change rendered as a direct visual comparison of two map states |
| `SurveyMap.tsx` — year slider 1802→1871 | Change as *accumulation over time*, driven by the user |
| `TimelineScrubber.tsx` — scroll-linked timeline | Change as chronological sequence |
| `timeline.ts` — 12 events | Change as discrete dated milestones |
| `TrianglesGrowthChart`, `DistancePerDecadeChart` | Change as quantified rate |
| `PeaksHeightChart` — `thought` field | Change in *knowledge* rather than in the world |
| `Legacy.tsx` table + `PositionFix` | Change across eras, with an explicit continuity counter-claim |
| `People.tsx` milestones | Change through generational succession |

### Structural observation
The site's organising pattern is **Innovation (Ch. 1–4) → Impact (Ch. 5–7)**, with each chapter carrying
a single brass-coloured thesis line under the eyebrow. Those 7 lines are the connective tissue. If you
change your theme framing, **those 7 strings plus `Home.tsx`'s two H2/paragraph pairs are the minimum
set that must change** to keep the structure coherent. They live at:
`Problem.tsx` L~40, `Triangulation.tsx` L~11, `Instruments.tsx` L~22, `Survey.tsx` L~13,
`Himalayas.tsx` L~11, `People.tsx` L~100, `Legacy.tsx` L~26 — each the `<p className="text-brass-600
font-display text-lg mb-2">` immediately under the `page-eyebrow` div.

---

## 9. TECHNICAL CONTENT THAT CAN STAY

### The rendering ENGINE (keep — no historical dependency)

| Layer | Files | Status |
|---|---|---|
| **Build/architecture** | `vite.config.ts`, `postcss.config.js`, `tsconfig*.json`, `.oxlintrc.json`, `package.json` | ✅ Keep |
| **App shell** | `src/main.tsx`, `src/App.tsx` | ✅ Keep (title map holds page titles) |
| **Routing** | `App.tsx` lazy routes, `src/lib/pages.ts`, `src/lib/preload.ts` | ✅ Keep (`pageOrder` labels are content) |
| **Styling / design system** | `src/index.css`, `tailwind.config.js` | ✅ Keep entirely |
| **Projection** | `src/lib/projection.ts` | ✅ Keep — **fully generic**, `fitExtent` auto-scales to whatever GeoJSON you supply |
| **D3 chart renderers** | `renderLine`, `renderLog`, `renderBars`, `renderPeaks`, `attachHover`, `ChartFrame`, `DetailRow` in `Graphs.tsx` | ✅ Keep — data-agnostic |
| **Math solvers** | `solve()` (Law of Sines); the trig-height formula; `lineLineIntersection`, `circleCircle`, `centroidOfIntersections`, `circleIntersection`, `distancePx` | ✅ Keep — standard, correct |
| **SVG rendering** | `TriangleCanvas`, `ChainCanvas`, theodolite schematic, eyepiece, vernier, curvature diagram, `IndiaBackground`, `renderPeaks` mountains | ✅ Keep (labels are content) |
| **UI components** | `ToolIntro`, `Control`, `Field`, `Range`, `Row`, `Panel`, `DetailRow`, `Portrait` | ✅ Keep (copy passed in is content) |
| **Navigation** | `Navbar`, `SlideNav` (arrow keys), `Footer`, `neighbours()` | ✅ Keep |
| **Search** | `SearchModal` | ✅ Keep (`PAGE_HINTS` is content) |
| **Animation** | Framer Motion usage throughout; `animate-page-in`, `animate-shimmer` | ✅ Keep — but see the `reducedMotion` problem in §10 |
| **Accessibility scaffolding** | Skip-link, `role="img"` + `aria-label` on maps, `aria-label` on sliders/buttons, `:focus-visible` rings, `aria-haspopup`/`aria-expanded` on the More menu | ✅ Keep — but incomplete, see §10 |
| **Responsive design** | Tailwind breakpoints, `container-museum`, SVG `viewBox` scaling | ✅ Keep |
| **State/persistence** | `useVisited.ts` | ⚠️ Keep but **currently dead** — never imported |

### The DATA layer (replace)
`src/data/timeline.ts`, `src/data/glossary.ts`, `src/data/sources.ts`, `src/data/locations.ts`,
`src/data/india.ts`, and the in-component arrays: `GROWTH`, `PRECISION`, `DECADES`, `PEAKS`,
`PRESETS`, `STATIONS`, `info`, `people`, `obstacles`, `innovations`, `impacts`, `supporting`,
`rows`, `built`, `todo`, `author`, `PAGE_HINTS`, `HILLS`, `SATS`.

### The separation, assessed
**The engine/data split is about 80% clean.** The five `src/data/*.ts` files are a genuine content layer.
The weakness: **9 content arrays are embedded inside component files** rather than in `src/data/`
(`GROWTH`, `PRECISION`, `DECADES`, `PEAKS` in `Graphs.tsx`; `PRESETS` in `TriangleSimulator.tsx`;
`STATIONS` in `EverestCalculator.tsx`; `info` in `TheodoliteViewer.tsx`; `people` in `People.tsx`;
`HILLS`/`SATS` in `PositionFix.tsx`), and **all page prose is inline JSX** with no data layer at all.
Extracting those into `src/data/` before you start writing would make the replacement pass far easier —
but that is a refactor, and you said don't modify. Flagging it as an option.

---

## 10. KNOWN PROBLEMS

### Factual-risk content
1. `glossary.ts` `arc-second` says *"about 30 metres"*; `Graphs.tsx` `PRECISION[1830].note` says
   *"Roughly 30 metres of transverse error at 6 km"*; `ArcSecondExplainer` says *"roughly 3 cm"* at 6 km.
   Two of these describe different quantities and one contradicts another. **Three locations, mutually
   inconsistent.**
2. `PRECISION[4]` dates the Wild T3 to 1900.
3. `PRECISION[5]` assigns an arc-second value to "Doppler satellite" — a ranging technique, not an
   angular one.
4. The Sikdar/Peak XV attribution is stated as settled fact in **five** locations:
   `Himalayas.tsx` intro, `Home.tsx` `impacts[1]`, `timeline.ts` (1852), `People.tsx` (`sikdar`),
   `PEAKS[3].note`.
5. `PEAKS[3].note` states the "added 2 ft" anecdote as fact.
6. `TriangleSimulator.tsx` `PRESETS[1].blurb` describes a single sight-line of "hundreds of miles",
   which contradicts the site's own explanation of why chaining was necessary.

### Fabricated / placeholder data
7. `GROWTH`, `PRECISION`, `DECADES` — three complete datasets with no provenance.
8. `PEAKS` `thought` years — no provenance (the `height` values are standard published figures).
9. `STATIONS` in `EverestCalculator.tsx` — presets whose angles were tuned to produce a target output.
10. `PRESETS` in `TriangleSimulator.tsx` — angles have no provenance.
11. `PositionFix.tsx` — `12 * 60` and `350` are labelled `// pretend` in the source.
12. `SurveyMap.tsx` — `KM_PER_PX = 8.5`, labelled `// rough for our stylized map`.
13. `locations.ts` `triangles[]` — comment states the mesh was chosen so it *"reads as a coherent mesh"*.
14. `india.ts` — hand-typed coastline, header comment: *"Accuracy: educational, not political."*
15. `Problem.tsx` — the inline "Hindoostan c. 1780" bezier path.
16. `Process.tsx` `author{}` — `'Your name here'`, `'Your school'`, and a placeholder bio.

### Misleading labels
17. `'Historical presets'` heading (`TriangleSimulator.tsx`) over unsourced numbers.
18. `'Real observation stations'` heading (`EverestCalculator.tsx`) over tuned numbers.
19. `'Adjust the sliders, or load a real Survey scenario.'` (`TriangleSimulator.tsx` subtitle).
20. `'These three numbers are the ones a Surveyor General would have reported to London.'` (`SurveyMap.tsx`).
21. `Footer.tsx`: *"All calculations, diagrams, and interactive tools demonstrate authentic
    nineteenth-century surveying methods."*
22. `PositionFix.tsx` — left panel reports error in `"metres"` (quoted), right panel reports the
    identical pixel unit as `m` (unquoted).
23. `README.md` — *"the narrative summaries … were student-authored"*. **False statement about
    authorship, sitting in the repository.**

### False source attribution
24. `TrianglesGrowthChart` caption cites the *Survey of India General Reports* for a dataset with no
    provenance. **The single most serious item in this list.**
25. `sources.ts` entries 8 and 9 cite images the site does not contain.
26. `sources.ts` entry 11's URL is an agency homepage, not the cited document.

### Visible developer instructions
27. `People.tsx` `Portrait` — the `<details>` "Add an image" panel renders
    *"Drop a JPG at `public/portraits/lambton.jpg`"* to any visitor. **All four portraits are in this
    state** because `public/portraits/` does not exist.
28. `Process.tsx` — *"Edit these fields in `src/pages/Process.tsx`"*, *"Deploy to Vercel or Netlify"*,
    *"Record a 2-minute demo video for Congressional App Challenge"*. All publicly visible at `/process`.

### Console errors
29. `TimelineScrubber.tsx` — the Great Arc `<motion.line>` has `x1`/`y1` but only animates `x2`/`y2`,
    so the first render emits:
    `Error: <line> attribute x2: Expected length, "undefined"` (and `y2`). Reproducible on `/survey`.
30. The same `<line>` is described in the caption as a **dashed** brass line but is rendered solid
    (no `strokeDasharray`).

### Unused assets and dead code
31. `src/assets/hero.png` (343×361) — not imported anywhere. Origin unknown.
32. `src/assets/react.svg`, `src/assets/vite.svg` — Vite scaffold leftovers.
33. `public/icons.svg` — contains `bluesky-icon`, `discord-icon`, `github-icon`, `x-icon` etc. **Vite
    template social icons, entirely unrelated to this project.** Shipped in `dist/`.
34. `src/components/timeline/Timeline.tsx` — never imported (`TimelineScrubber` is used instead).
35. `src/components/ui/Term.tsx` — never imported. **This is why 321 words of `glossary.short` never
    render, and why the README's "glossary tooltips" feature does not exist on the site.**
36. `src/lib/useVisited.ts` — never imported. The README's "progress dots persist in localStorage"
    feature does not exist.
37. `TriangleSimulatorNext` (exported from `TriangleSimulator.tsx`) — never imported.
38. `Graphs.tsx` default export `Graphs()` — never imported.
39. **Unused dependencies in `package.json`:** `leaflet`, `react-leaflet`, `@radix-ui/react-dialog`,
    `@radix-ui/react-navigation-menu`, `@radix-ui/react-slider`, `@radix-ui/react-slot`,
    `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`, `class-variance-authority`. Zero imports of any.
    `index.css` still carries a `.leaflet-container` rule.

### Broken / suboptimal links
40. Three raw `<a href>` links to internal routes cause **full page reloads** instead of client-side
    navigation: `Process.tsx` → `/sources`; `ArcSecondExplainer.tsx` → `/instruments`;
    `TheodoliteViewer.tsx` → `/triangulation`. Should be `<Link to=…>`.
41. `sources.ts` entry 11 → `https://geodesy.noaa.gov` (homepage, not the document).
42. All four `public/portraits/*.jpg` paths 404 by design (handled by `onError`, but they are 404s).

### Accessibility issues
43. **`<MotionConfig reducedMotion="never">` in `main.tsx` overrides the OS "reduce motion" setting**
    for every user. This is a real accessibility violation, and the README describes it as a feature
    (*"so the exhibit animates for every user"*). Should be `"user"`.
44. SVG click targets are **not keyboard accessible**: theodolite parts (`<g onClick>`), chart dots and
    bars (D3 `.on('click')`), survey-map stations (`<g onClick>`). No `tabIndex`, no `role="button"`,
    no key handlers.
45. `Control` / `Field` / `Range` render a visual `<span>` label with **no `htmlFor`/`id` association** to
    their `<input type="range">`. Screen readers announce an unlabelled slider. (`SurveyMap`'s year
    slider and `Problem`'s reveal slider *do* have `aria-label` — inconsistent.)
46. `SlideNav`'s arrow-key handler bails out when the focused element is a `BUTTON`, so keyboard
    navigation silently stops working after any button click.
47. D3 tooltips in `attachHover` are mouse-only — no focus/keyboard equivalent.
48. Chart data is available **only** as an interactive SVG; no table or text alternative.
49. `Term.tsx` has correct `aria-label`/`role="tooltip"` — but it is dead code, so none of that helps.

### Incomplete components
50. All four `Portrait` slots on `/people` are empty placeholders.
51. `useVisited` progress tracking — built, never wired up.
52. Glossary tooltips (`Term`) — built, never wired up.
53. `Process.tsx` is a developer checklist, not a process paper.

### Contradictory numbers
54. `~580` principal triangles (`Survey.tsx` intro, `ChainExplanation`) vs `583` (`GROWTH[7]`).
55. Refraction: `k = 0.14` (default state) vs *"The Survey used k ≈ 0.13"* (slider help) vs
    *"roughly 13%"* (`glossary.refraction`) vs *"13–17%"* (explainer paragraph).
56. Theme: `'Innovation and its Impact'` (`pages.ts`, `HeroSection`, `og.svg`) vs
    `'Rights & Responsibilities'` (`Process.tsx`).
57. Word count: *"≈ 1,100 words"* (`Process.tsx`) vs ≈ 6,140 measured.
58. Word limit: *"500 words"* stated for the website (`Process.tsx`) vs the 1,200 website cap.
59. Source counts: *"3 primary · 4 secondary"* (`Process.tsx`) — accurate, but omits the 2 image and
    2 data entries, so `/sources` shows 11 while `/process` implies 7.

### Misleading UI text
60. `Survey.tsx` `ToolIntro`: *"Each entry on the left is a real Survey milestone."*
61. `Himalayas.tsx` `ToolIntro`: *"the correction brings the raw 22,000 ft calculation up to nearly
    29,000 ft"* — describes the tuned preset as a result.
62. `Legacy.tsx` `ToolIntro`: *"Watch the two timers: minutes vs. milliseconds"* — directs attention to
    the invented constants.
63. `Process.tsx` `built[]` claims *"26-term glossary with hover tooltips"* — the tooltips don't exist.
64. `README.md` claims localStorage progress dots and glossary tooltips — neither is wired up.

---

## 11. REPLACEMENT PLAN

| Current Component | Keep | Modify | Delete | Needs Research | Needs Student Writing |
|---|---|---|---|---|---|
| `vite.config.ts`, `tsconfig*`, `postcss`, `.oxlintrc` | ✅ | | | | |
| `src/main.tsx` | | ✅ (`reducedMotion`) | | | |
| `src/App.tsx` | ✅ | ✅ (title map) | | | ✅ titles |
| `src/index.css`, `tailwind.config.js` | ✅ | ○ (drop `.leaflet-container`) | | | |
| `src/lib/projection.ts` | ✅ | | | | |
| `src/lib/preload.ts`, `src/lib/utils.ts` | ✅ | | | | |
| `src/lib/pages.ts` | ✅ | ✅ (`NHD_THEME`, labels) | | ✅ theme | ✅ labels |
| `src/lib/useVisited.ts` | ○ | | ✅ if unused | | |
| `src/data/timeline.ts` | | ✅ | | ✅ | ✅ |
| `src/data/glossary.ts` | | ✅ | ○ (`short` unless `Term` revived) | ✅ | ✅ |
| `src/data/sources.ts` | | ✅ (+ add `usedFor` field) | | ✅ | ✅ annotations |
| `src/data/locations.ts` | ○ (lat/lng) | ✅ (`year`, `note`, `triangles`) | | ✅ | ✅ notes |
| `src/data/india.ts` | | ✅ (swap real GeoJSON) | | ✅ | |
| `src/pages/Home.tsx` | ○ layout | ✅ | | ✅ | ✅ **thesis** |
| `src/pages/Problem.tsx` | ○ slider mechanics | ✅ | ✅ 1780 SVG path | ✅ | ✅ |
| `src/pages/Triangulation.tsx` | ○ layout | ✅ | | ✅ | ✅ |
| `src/pages/Instruments.tsx` | ○ layout | ✅ | | ✅ | ✅ |
| `src/pages/Survey.tsx` | ○ layout | ✅ | | ✅ | ✅ |
| `src/pages/Himalayas.tsx` | ○ layout | ✅ | | ✅ | ✅ |
| `src/pages/People.tsx` | ✅ `Portrait` mechanics | ✅ `people[]` | | ✅ | ✅ |
| `src/pages/Legacy.tsx` | ○ layout | ✅ `rows[]` | | ✅ | ✅ |
| `src/pages/Sources.tsx` | ✅ | | | | |
| `src/pages/Glossary.tsx` | ✅ | | | | |
| `src/pages/Process.tsx` | | ✅ **rewrite as a real process paper** | ○ or remove route | | ✅ |
| `src/pages/NotFound.tsx` | ✅ | | | | |
| `Graphs.tsx` renderers | ✅ | | | | |
| `Graphs.tsx` `GROWTH`/`PRECISION`/`DECADES`/`PEAKS` + captions | | ✅ | ○ delete charts without data | ✅ | ✅ captions |
| `TriangleSimulator` `solve()`/canvases | ✅ | | | | |
| `TriangleSimulator` `PRESETS` + explanation panels | | ✅ + relabel | | ✅ | ✅ |
| `ArcSecondExplainer` | ○ layout | ✅ all prose | | ✅ | ✅ |
| `TheodoliteViewer` SVG/state | ✅ | | | | |
| `TheodoliteViewer` `info{}` + caption + procedure | | ✅ | | ✅ | ✅ |
| `EyepieceAndVernier` | ✅ math | ✅ prose; ○ real vernier geometry | | | ✅ |
| `EverestCalculator` formula/diagram | ✅ | | | | |
| `EverestCalculator` `STATIONS` + heading + comparison row | | ✅ + relabel | | ✅ | ✅ |
| `PositionFix` solvers/animation | ✅ | | | | |
| `PositionFix` timers + framing + units | | ✅ | ✅ **timers** | ✅ if kept | ✅ |
| `SurveyMap` filtering/projection/UI | ✅ | | | | |
| `SurveyMap` `KM_PER_PX` + caption | | | ✅ | | |
| `TimelineScrubber` | ✅ | ✅ (fix `motion.line`; `arcFrac` model) | | | ✅ caption |
| `IndiaMap.tsx` | ✅ | | | | |
| `HeroSection.tsx` | ○ | ✅ copy + delays | | | ✅ **thesis** |
| `Timeline.tsx` | | | ✅ dead | | |
| `Term.tsx` | ○ | ✅ wire up or delete | | | |
| `Bibliography.tsx` | ✅ | ○ if `Source` type changes | | | |
| `ToolIntro.tsx` | ✅ | | | | ✅ the 6 copy blocks |
| `Navbar`/`SlideNav` | ✅ | ○ (a11y) | | | |
| `Footer.tsx` | ○ | ✅ 2 claims | | | ✅ |
| `SearchModal.tsx` | ✅ | ✅ `PAGE_HINTS` | | | ✅ |
| `index.html` | ○ | ✅ meta copy | | | ✅ |
| `public/og.svg` | ○ | ✅ embedded text | | | ✅ |
| `public/icons.svg` | | | ✅ dead | | |
| `src/assets/hero.png`, `react.svg`, `vite.svg` | | | ✅ dead | | |
| `package.json` | | ✅ drop 9 unused deps | | | |
| `README.md` | | ✅ **remove the false authorship claim** | | | ✅ |

✅ = primary action · ○ = optional/secondary

---

## 12. NOTE ON YOUR LAST LINE

You wrote *"when i say simulators i mean the visual sliders and graphs and stuff make those better too
please"* — but §12 of your brief says three times not to modify the files, and the stated purpose is a
clean technical map before you supply research.

**I did not modify anything.** Instead, §13 below is a concrete, purely-technical improvement spec for
the sliders and charts — no historical content involved, so none of it depends on your research and none
of it can contaminate your writing. Say the word and I'll implement any subset. If you meant "start
building now," tell me and I'll go.

---

## 13. SLIDER / CHART IMPROVEMENT SPEC (technical only — not yet implemented)

### Sliders — current state
Three near-duplicate implementations: `Control` (`TriangleSimulator.tsx`), `Field`
(`EverestCalculator.tsx`), `Field` (`PositionFix.tsx`), `Range` (`TheodoliteViewer.tsx`).
All are bare `<input type="range">` with `accent-brass-600`, a visual label, and a mono value readout.

Proposed, in priority order:
1. **Unify into one `<Slider>`** in `src/components/ui/` — kills 4 duplicates.
2. **Fix the label association** (§10 #45) — generated `id` + `htmlFor`, `aria-valuetext` with units.
3. **Keyboard/precision affordances** — arrow = 1 step, shift+arrow = 10 steps, Home/End to min/max,
   plus a small numeric input for exact entry (the Everest angle slider has a step of 0.005° across a
   10° range; dragging to a specific value is currently impractical).
4. **Tick marks + min/max end labels** so the domain is legible without dragging.
5. **A visible filled track** — currently only the native accent colour shows position.
6. **A "reset to preset" affordance** — once you drag, there is no way back to the loaded preset.
7. **Live-region announcement** of the computed result so screen-reader users get the output, not just
   the input.
8. **Non-linear scale for the Everest angle slider** — the interesting region is 0.05–5°, but the
   control spans 0.05–10° linearly.

### Charts — current state
`renderLine`, `renderLog`, `renderBars`, `renderPeaks` all re-run `svg.selectAll('*').remove()` and
rebuild on every selection change; fixed `viewBox`; mouse-only tooltips.

Proposed:
1. **Keyboard accessibility** (§10 #44) — `tabIndex`, `role="button"`, `aria-label`, Enter/Space on
   every dot and bar; roving tabindex across a series.
2. **A text/table alternative** per chart (§10 #48) — a `<details>` data table beside each, which also
   gives you a natural place to put a per-chart source line.
3. **Stop the full teardown-and-rebuild** — use D3 joins so selection changes animate instead of
   flashing; currently every click destroys and recreates the whole SVG.
4. **Derive axis domains from the data** instead of hardcoding (`[0,620]`, `[0.0005,1000]`, `[0,9500]`)
   — this is what makes the charts fragile to a data swap (§5).
5. **Replace magic default indices** (`useState(4)`, `useState(3)`, `findIndex(year===1830)`) with a
   `defaultKey` field on each dataset, so nothing silently mis-selects when data changes.
6. **A structured `source` field on each chart** rendered as a caption line — so a real citation has a
   defined home rather than being prose inside `caption`.
7. **Responsive height** — all four are fixed-height `viewBox`es; the 600×240 line charts get cramped
   on mobile.
8. **Focus-visible styling** on chart elements to match the site's `:focus-visible` ring.

None of the above touches a single historical claim.

---

# MINIMUM FILES I WILL NEED TO EDIT

Ordered by importance.

### Tier 1 — integrity. Nothing ships until these are done.
1. `src/components/data/Graphs.tsx` — 4 datasets, 26 notes, 4 captions, **and the false General Reports attribution**
2. `src/data/sources.ts` — the entire bibliography and its annotations
3. `README.md` — remove the false authorship claim
4. `src/components/mountain/EverestCalculator.tsx` — `STATIONS` presets + "Real observation stations" heading
5. `src/components/legacy/PositionFix.tsx` — the `12*60` / `350` timers and their framing
6. `src/components/maps/SurveyMap.tsx` — `KM_PER_PX` and the "Surveyor General" caption

### Tier 2 — core historical content
7. `src/data/timeline.ts`
8. `src/pages/People.tsx` — `people[]`
9. `src/data/glossary.ts`
10. `src/data/locations.ts` — `year`, `note`, `triangles[]`
11. `src/components/triangulation/TriangleSimulator.tsx` — `PRESETS` + "Historical presets" heading
12. `src/components/instruments/TheodoliteViewer.tsx` — `info{}` + caption + procedure

### Tier 3 — your writing (thesis and chapter prose)
13. `src/pages/Home.tsx`
14. `src/pages/Problem.tsx`
15. `src/pages/Triangulation.tsx`
16. `src/pages/Instruments.tsx`
17. `src/pages/Survey.tsx`
18. `src/pages/Himalayas.tsx`
19. `src/pages/Legacy.tsx`
20. `src/components/triangulation/ArcSecondExplainer.tsx`
21. `src/components/hero/HeroSection.tsx`

### Tier 4 — framing, metadata, compliance
22. `src/pages/Process.tsx` — rewrite as an actual process paper
23. `src/lib/pages.ts` — `NHD_THEME`
24. `src/components/layout/Footer.tsx` — 2 claims
25. `index.html` — meta descriptions
26. `public/og.svg` — embedded text
27. `src/components/layout/SearchModal.tsx` — `PAGE_HINTS`

### Tier 5 — technical fixes and cleanup
28. `src/main.tsx` — `reducedMotion="user"`
29. `src/components/timeline/TimelineScrubber.tsx` — `motion.line` console error + caption
30. `src/data/india.ts` — swap in real GeoJSON
31. `package.json` — drop 9 unused dependencies
32. **Delete:** `src/components/timeline/Timeline.tsx`, `public/icons.svg`, `src/assets/hero.png`,
    `src/assets/react.svg`, `src/assets/vite.svg`
33. **Decide:** `src/components/ui/Term.tsx` and `src/lib/useVisited.ts` — wire up or delete

**Minimum viable set if you only touch what makes a historical claim: files 1–21 (21 files).**
**Absolute floor for integrity: files 1–6 (6 files).**
