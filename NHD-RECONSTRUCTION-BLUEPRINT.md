# NHD Reconstruction Blueprint — GTS of India

**Theme:** *Innovation in History: Impact, Influence, Change* (2026)
**Decision document** reconciling the two prior audits with the Perplexity research package (the evidence baseline).
Confidence grades are the package's own: **A** primary-verified · **B** strong secondary · **C** plausible/needs verification · **D** popular/unverified · **E** incorrect.

> **Authorship guardrail (unchanged from the audits):** I can strip fabrications, relabel illustrative models, wire in *documented* facts with citations, and fix every technical problem. I will **not** fabricate values or write your finished thesis/interpretation. Candidate thesis wording below is a *starting point to rewrite in your own voice* — the code marks these spots `STUDENT:`.

---

## 0. WHAT I ALREADY CHANGED THIS SESSION (live on :5173, build passes)

Integrity/technical fixes that are stable regardless of final structure:

- **Theme** corrected to *Innovation in History: Impact, Influence, Change* in `pages.ts`, hero eyebrow, footer, Process page.
- **False source attribution removed** — Chart 1 no longer claims the "Survey of India General Reports"; relabelled SCHEMATIC/illustrative.
- **Fabricated statistic removed** — `KM_PER_PX` and the "numbers a Surveyor General would report to London" caption deleted; Survey map relabelled schematic.
- **"Real observation stations" → "Worked examples · illustrative"** in the Everest calculator; Jirol/Ladnia/1849 names and the tuned angles removed; a plain-language *Illustrative model* disclaimer added; default `k` reconciled to 0.13; "within a few metres" accuracy boast removed.
- **"Historical presets" → "Worked examples · illustrative"** in the triangulation simulator; the physically-impossible "sighted Bangalore hundreds of miles" blurb replaced; an illustrative disclaimer added; ~580/1,600 numbers flagged for citation.
- **PositionFix timers** relabelled illustrative on-screen and in code; "ten thousand times better than a theodolite" removed; GPS-lineage framing → "two technologies, same question."
- **Forbidden "km per decade" chart removed** from the Survey page.
- **Precision chart** relabelled illustrative; Wild T3 dated 1925 (was 1900); Doppler category-error reworded.
- **Peak XV claims corrected** across Home, Himalayas, People, timeline, glossary, PEAKS chart, locations: Sikdar reframed as *computational* (Chief Computer 1851, Royal Society); "discovered/observed" removed; the **"Waugh added 2 ft" anecdote deleted**; "six observations" removed; 29,002 ft attributed not asserted; 1856 naming-proposal vs 1865 adoption separated.
- **GPS-descent claims** ("the math still runs GPS," "traces to every modern Indian map") → comparison framing.
- **Accessibility:** `reducedMotion="never"` → `"user"`.
- **Console error fixed** (TimelineScrubber `<line>` x2/y2), and the arc is now dashed to match its caption.
- **Developer-facing text removed** from the People portraits and the Process checklist; the wrong "Congressional App Challenge" item and the wrong word-count/theme stat cards corrected.
- **README** false "student-authored" claim removed.
- **Meta/OG** description reframed to the system thesis (no "discover Everest," no "before GPS").
- `STUDENT:` comments placed at every spot needing your own prose (thesis lines, chapter intros).

**Still yours to do (cannot be done for you):** write the real historical prose to the ≤1,200 budget; mine the primary sources for the numbers now flagged; rebuild the bibliography from works actually read; add credited public-domain images.

---

## 1. STRONGEST DEFENSIBLE THESIS

Ranked candidates (Agent B). **Recommended default = Candidate 2.** Rewrite the one you pick in your own words.

**C2 (recommended):** *The GTS mattered less for any single measurement than for making precise geographic knowledge something calculated rather than walked: by integrating triangulation, geodetic instruments, and a specialized computing staff at continental scale, it could fix positions and even weigh the Earth's tallest mountain from a distance — and that system, not GPS descent, is what modern state surveying inherited.*
- Covers Innovation (integrated system) · Impact (positions + Peak XV) · Influence (institutional inheritance) · Change (traverse → computation). Self-disarms the GPS trap.
- Vulnerability: "weigh the mountain" leans on Peak XV — keep it framed as *derived by the system*, never reconstruct the numbers.

**C1 (floor, safest):** organizational innovation turned surveying from expeditions into a continuous self-correcting system. *Risk:* "self-correcting" needs error-control evidence you haven't mined — soften to "systematic."

**C3 (upgrade if you mine the Sikdar article):** geographic truth as a product of coordinated labor — discovery at a desk as legitimately as in the field.

**C4 (ambitious):** the GTS as early "big science" — a template for how large scientific institutions produce reliable knowledge. *Risk:* needs a scholar who uses that frame.

**C5 (guardrail):** innovation as *organizing* existing tools/people/math into a system reliable enough to produce knowledge no one could gather by hand.

---

## 2. STRUCTURE — PAGE-BY-PAGE DISPOSITION

| Route | Disposition | Action |
|---|---|---|
| Home | **Keep, rewrite prose** | Thesis + 3 innovation / 3 impact cards → your words (scaffold in place). |
| Problem | **Keep, rewrite + replace image** | Intro softened (cite Edney); the "1780 map" is a stylised placeholder → replace with a digitised Rennell map, credited. |
| Triangulation | **Keep, relabel done** | Simulator = illustrative (done). Write intro. |
| Instruments | **Keep / consider merging into Survey** | Specs need sourcing (Everest 1847 / museum record). Agent B suggests merging Instruments+Survey into one "system at scale" argument. |
| Survey | **Keep, relabel done** | Map + timeline = schematic (done). Forbidden chart removed. |
| Himalayas (Peak XV) | **Keep as case study inside Impact** | Calculator = illustrative (done). Prose reframed to computation (done) — polish in your voice. |
| People | **Re-purpose** from bio gallery → one argument about *specialized labor / division of scientific work*. Sikdar central, Nain Singh = later reach. |
| Legacy | **Keep, reframe done** | Influence(institutional) + Change; PositionFix = illustrative comparison, no lineage (done). |
| Sources | **Rebuild** | Real annotated bibliography from works actually read (see §6). |
| Glossary | **Keep, trim** | Strip embedded contested history; terse definitions; ~10 core terms in the word budget, rest as reference. |
| Process | **Replace** | Not a process paper — write the real 500-word paper, or drop from the public site. |

Spine reads: Innovation (Problem→Triangulation→Instruments/Survey) → Impact (Himalayas) → Influence (People→Legacy) → Change (Legacy). Peak XV is evidence, not the climax. The biographical relay is dissolved into the labor argument.

---

## 3. EVIDENCE CONFLICTS — RESOLUTIONS (all applied or flagged)

| Conflict | Resolution |
|---|---|
| Chart datasets (GROWTH/PRECISION/DECADES) | GROWTH → illustrative pending mined figures; PRECISION → illustrative + errors fixed; DECADES → **removed** (forbidden graph). PEAKS elevations kept (real), years marked approximate, "2 ft" note deleted. |
| Station years + triangle mesh | Relabelled **schematic**; lat/lng kept (real); mesh flagged "not the historical network." |
| "Historical presets" | → "Worked examples · illustrative"; only the ~7.5-mi Madras baseline is a real quantity. |
| "Real observation stations" | → illustrative; tuned angles + station names/dates removed. |
| Peak XV numeric inputs | Calculator is illustrative; no reconstruction; 29,002 ft attributed, needs Waugh 1856 to assert. |
| Precision comparison | Illustrative order-of-magnitude only; **not** a GTS-vs-GPS accuracy claim (package forbids). |
| GPS lineage | Reframed to comparison everywhere. |
| Invented dates/annotations | Peak XV chronology corrected (1851/1854/1856/1865); interior timeline dates flagged for citation. |

---

## 4. NARRATIVE = CAUSAL ARGUMENT (not four labels on four pages)

- **Innovation** — the *integrated geodetic system* (baseline+triangulation+theodolite+astronomical control+computing staff+institution). Evidence B (Royal Society, Science Museum, EBSCO). *Never* "Lambton invented triangulation."
- **→ Impact** — knowledge *calculated, not collected*: the Great Arc; Peak XV height derived from distant stations. Peak XV is the case study. **Broken links to exclude:** railways, taxation, borders, "measured all of India," "measured Everest directly."
- **→ Influence** — institutional and methodological: a permanent state survey; Walker's methods debate; the Pundit surveys (Nain Singh) as later *reach*. **Broken link:** "GPS is based on the GTS."
- **→ Change** — regional route-surveys → geodetic framework → specialized state surveying → GNSS; the *locus of work* moved from field to computation. **Broken link:** any quantitative GTS-vs-GPS accuracy graph.

---

## 5. ≤1,200-WORD COUNTABLE BUDGET (Agent C)

| Surface | Budget | Convert the overflow into… |
|---|---|---|
| Home / thesis | 130 | innovation/impact cards → stat tiles / labeled figures |
| Problem | 100 | `obstacles[5]` → hotspot labels on the map |
| Triangulation | 100 | ToolIntro → interactive labels |
| Instruments | 100 | `supporting[3]` + theodolite `info{4}` → diagram callouts + cited caption |
| Survey | 100 | ToolIntro → labels |
| Himalayas | 100 | preset blurbs → data rows |
| People | 140 (~35×4) | 21 milestones → timeline entries |
| Legacy | 110 | `rows[5]` → data table |
| Glossary | 110 | 26 `full` → terse definition-list (data, cite history) |
| Chart captions | 60 | 26 chart notes → cited data-point tooltips |
| Buffer | 50 | — |
| **Total** | **1,100** | 100 under the cap |

Highest-yield cuts: glossary essays (~700), chart notes (~250), Legacy table (~200), People milestones (~180), ToolIntro copy (~180), remove the public Process checklist (~430). **Design to 1,200 first; don't write freely and trim.**

---

## 6. DATA REPLACEMENT PLAN (Agent A) — never invent values

| Item | Verdict | Do this |
|---|---|---|
| GROWTH (Chart 1) | E | MINE from *General Report 1873–74* (archive.org `in.ernet.dli.2015.177438`), page/table-cited — or delete. |
| PRECISION (Chart 2) | E | Illustrative only (done) or remove; cite each value if kept. |
| DECADES (Chart 3) | E | Removed. Rebuild only from mined annual tables. |
| PEAKS (Chart 4) | mixed | Elevations kept + cite; "believed tallest" years = secondary cite or approximate. |
| TriangleSimulator PRESETS | E | Illustrative (done); MINE real baseline+angles from Everest 1847 to upgrade. |
| EverestCalculator STATIONS | E | Illustrative (done); a reconstruction needs Waugh's 1856 report. |
| PositionFix timers | E | Removed as data (illustrative animation only). |
| KM_PER_PX | E | Deleted. |
| locations.ts years + mesh | C/E | Schematic (done); MINE a real triangulation chart (Historical Records of the Survey of India). |
| 29,002 ft | C | MINE Waugh 1856 before asserting; attributed for now. |
| Instrument specs, £2,000 | C/D | MINE Everest 1847 / museum record; $ conversion deleted. |

**Primary sources to mine (with what each supplies):** Everest 1847 *Account* (baseline/instruments/arc) · General Report 1873–74 (annual counts) · Account of Operations vol. XVIII 1906 (later procedures/accuracy) · **Waugh's 1856 Peak XV report — CRITICAL, not yet located** (29,002 ft, naming) · Historical Records of the Survey of India (staff, station chronology, mesh) · Royal Society "Mapping India" (Sikdar 1851, Waugh naming).

---

## 7. PEAK XV — WHAT SURVIVES, WHAT DIES (Agent D)

**Keep (with citation):** Sikdar = Chief Computer from 1851, role computational (RS); Waugh proposed the name in an 1856 letter (RS quoting primary); name adopted 1865 (RGS); Peak XV established highest by calculation; modern height ≈29,032 ft.
**Reword:** 29,002 ft → attributed, not asserted (needs Waugh 1856); measurement date → mid-1850s (RGS gives 1854), reconcile with the traditional 1852 computation year.
**DELETE (must disappear):** "Sikdar discovered Everest"; "Sikdar personally observed Peak XV"; the "Sir, I have discovered…" quote (never add it); **"Waugh added 2 ft"**; the specific "six observations" count; "Real observation stations" with tuned angles; the precise "off by 30 ft." — *All applied.*

**The strong argument this unlocks:** nineteenth-century *discovery by computation* — specialized mathematical labor (Sikdar, the computing office) as the innovation, not heroic fieldwork. Attribute it as interpretation (B/C), never dramatize with invented calculation steps.

**People emphasis:** Lambton (central, founder — *applied* not invented triangulation); Everest (central, the system refined/institutionalized; 1847 *Account*); Waugh (supporting, the naming decision); **Sikdar (central, computation-as-innovation)**; Nain Singh (peripheral to the Great Arc, central to later *reach* — Influence/Change).

---

## 8. REPLACEMENT WORDING FOR MAJOR LINES (fits the existing design; all applied as scaffold)

- Home H2 (innovation): "A system, not a single invention."
- Home H2 (impact): "Knowledge no one could gather by hand."
- Hero subtitle: "how an integrated system turned a subcontinent into calculated knowledge."
- Triangulation: "The innovation: a measured baseline and observed angles, chained across India."
- Survey: "The innovation, sustained: a repeatable procedure backed by a permanent institution."
- People: "The innovation as a system: it ran on specialised labour — field observers and human computers — not lone heroes."
- Himalayas: "The impact: a mountain's height determined by calculation from distant stations, not by climbing it."
- Legacy: "Change: from intervisible ground stations to satellites — two technologies answering the same question."
- Sikdar bio: "…His calculations established Peak XV as the highest known mountain — through computation, not field observation. He did not 'discover' or sight the peak."

These are evidence-safe placeholders. **Rewrite them in your own voice** — the code marks each with `STUDENT:`.

---

## 9. IMPLEMENTATION ORDER

1. **DONE — integrity fixes** (§0): fabrications relabelled/removed, false attribution gone, theme corrected, a11y + console fixed, build passing.
2. **Theme/thesis text** — replace every `STUDENT:` scaffold with your own prose, to the §5 budget. Files: `Home.tsx`, the 7 chapter pages, `HeroSection.tsx`, the 7 brass thesis lines.
3. **Charts/interactions** — as you mine each dataset, swap the array + caption + axis domain + default index (5 edits/chart); upgrade the two illustrative simulators only if you get real observation tables.
4. **Source architecture** — rebuild `sources.ts` from works actually read (add a `usedFor` annotation field; fix entry 11's URL; drop the 2 image citations); then attach real citations to the facts now flagged.
5. **Final word-count trim** — measure countable prose, convert overflow to tables/timelines/captions/glossary per §5, confirm ≤1,200 against the current rulebook.

**Cleanup backlog (non-blocking):** delete dead files (`Timeline.tsx`, `Term.tsx` or wire it up, `useVisited.ts` or wire it up, `public/icons.svg`, `src/assets/hero.png|react.svg|vite.svg`); drop 9 unused deps (leaflet, react-leaflet, 6× radix, cva) and the `.leaflet-container` CSS; convert the 3 raw `<a href>` internal links to `<Link>`; add real portraits + Lucide credit; swap `india.ts` for real GeoJSON.

### MINIMUM FILES YOU STILL NEED TO EDIT (yours to write), by priority
1. `src/pages/Home.tsx` — thesis + cards
2. `src/pages/Himalayas.tsx`, `src/pages/Legacy.tsx`, `src/pages/Survey.tsx`, `src/pages/Problem.tsx`, `src/pages/Triangulation.tsx`, `src/pages/Instruments.tsx` — chapter prose
3. `src/pages/People.tsx` — re-purpose to the labor argument
4. `src/data/timeline.ts`, `src/data/glossary.ts`, `src/data/locations.ts` — verify/cite every dated claim
5. `src/data/sources.ts` — rebuild the bibliography
6. `src/components/data/Graphs.tsx` — real datasets when mined
7. `src/pages/Process.tsx` — the real 500-word process paper
