# NHDWebCentral content export, copy and paste in order

This is the **exact final prose** from the live React site (extracted from the rendered `<p>`, `<h1>`, `<h2>`, `<h3>` text plus the short strings that render inside cards, not the JSX). Keep this open in one tab and paste block by block into NHDWebCentral. Word count of the student-composed prose = **1,150 / 1,200** (`npm run words`). Do not re-edit while pasting; the count is already at budget.

The site is now **four narrative pages plus Sources**, not nine chapters. Each page below lists its **HEADING**, the **prose** in order, and an **[INTERACTIVE]** note for each non-text element that needs a static replacement (see `interactive-replacements.md`).

---

## 1. Home / Hero

**Eyebrow line:** National History Day 2027 · Innovation in History: Impact, Influence, Change

**H1:** The Great Trigonometrical Survey of India

**Question (subhead):** From 1802 to 1871, surveyors set out to fix the position of every landmark in India to a precision nobody had attempted at that scale. How do you measure ground you cannot walk, and what changes once you can?

**Answer:** The innovation was not an instrument. The geometry was already two centuries old. What was new was one connected framework of measurement across a subcontinent, kept running for seventy years by trained staff and an office whose job was finding its own mistakes.

**Stat line:** 1802 first baseline measured · 1818 named the Great Trigonometrical Survey · Peak XV calculated, not climbed

**[INTERACTIVE]** Right-side animated triangulation schematic over a projection of India. Caption: *"Station coordinates are real places. The mesh joining them is a teaching schematic, not the historical network."* Use a static image or a short screen capture.

**[NAV]** The homepage carries a four-item index (Innovation, Impact, Change, Sources) with these one-line hooks. In NHDWebCentral this becomes the flat page menu:
- **Innovation** — What was actually new about it.
- **Impact** — One framework, and the workforce behind it.
- **Change** — A mountain measured from a desk.
- **Sources** — The document behind every claim.

---

## 2. Innovation

**H1:** A system built to measure a subcontinent

### Section 1 — H2: Why measurement mattered

**Prose:** By 1800 the East India Company governed a large territory in India and paid for itself by taxing land. Taxing land means knowing which land, and whose. Troops had to be moved, and authority asserted over ground it did not always control.

**Prose:** Maps already existed. James Rennell and other Company surveyors had charted whole regions by 1788. The gap was connection: each was surveyed separately, so nobody could say how far a place in one lay from a place in another. William Lambton proposed measuring a single precise skeleton for the country first, then hanging every later map on it.

**[INTERACTIVE]** Two-panel coverage comparison (separately measured points vs. one connected framework). Static export of both panels side by side. Caption: *"A diagram of two ways to organise measurement, not a map of who surveyed what. The dots are real station coordinates; the triangle mesh is a teaching schematic rather than the survey's actual network. No historical coverage data is shown, because no verified coverage dataset has been assembled for this project."*

**Sub-heading:** What stood in the way

**Four cards (plain text):**
- **Terrain** — Ranges blocked sight lines.
- **Season** — Monsoon halted work.
- **Disease** — Lambton died in the field.
- **Tools** — Every figure computed by hand.

**[INTERACTIVE]** Verified date strip, 1788 to 1830. Caption: *"The survey did not start from nothing. Rennell's mapping was already published in 1788, and the work Lambton began in 1802 only became a named, permanent department sixteen years later."*

### Section 2 — H2: How you measure a distance you never travel

**Prose:** Triangulation is the method, and the idea fits in a sentence. Measure one line on the ground, sight a distant point from both ends, and the triangle you have described gives its distance.

**[INTERACTIVE]** Four-step baseline walkthrough with a diagram per step. The step text is prose and must be pasted:
- **01 Measure one line** — Measure between two points you can walk. This baseline is the only distance anyone measures.
- **02 Sight the far point twice** — From each end, aim at the same hilltop and record the angle away from the baseline.
- **03 Calculate the rest** — One side and its two end angles fix the whole triangle. The distances follow.
- **04 Use it as the next baseline** — A calculated side starts the next triangle. Chained far enough, it crosses anything.

**H3:** The technique was old. The scale was not.

**Prose:** None of this was new. European surveyors had solved triangles this way for two centuries. The new part was doing it continuously, across a subcontinent, for seventy years, under one plan.

**Prose:** A parish surveyor solved one triangle and went home. This survey chained thousands together, kept an office in Calcutta whose only job was the arithmetic, and made investigating disagreement a procedure. Colin Mackenzie named the principle in 1815: persevere "on one undeviating plan."

**[LINK]** A call-out linking to the tools page. In NHDWebCentral this becomes a plain link to whichever page carries the media substitutes.

### Section 3 — H2: Precision was a procedure, not a gadget

**Prose:** A theodolite is a telescope mounted so it swings against finely divided circles, letting an observer read exactly where it points. Accuracy came from repetition around it. Star sightings fixed latitude independently, testing the network against something outside itself, and angles were corrected for refraction, the bending of light through air that lifts a distant object above where it sits. W. Hodson recorded the rule: discrepancies were investigated, not concealed.

**Three cards (plain text):**
- **Baseline apparatus** — Two metals paired, so heat expanding one cancelled the other.
- **Astronomical observation** — Latitude fixed from the stars, independently of the triangles.
- **Measuring chains** — A steel chain, corrected for temperature, laid out the baseline.

**Closing note (does not need to count as narrative):** The site states no figure for the survey's instruments: no weight, no dimension, no angular resolution. Those numbers circulate widely but none of them could be traced to a document, so none of them appear here.

---

## 3. Impact

**H1:** From one triangle to a subcontinent

### Section 1 — H2: What seventy years of measuring produced

**Prose:** The result sounds modest and was not: points across India whose positions were known precisely, and known relative to each other. A later surveyor could start from one of them.

**Prose:** The survey called this a geodetic framework. Geodetic means the measurements account for the curvature of the Earth rather than treating a region as flat. Later surveys were tied to it, and that is what made their results comparable.

**Prose:** Coverage stayed uneven, and other surveys kept running alongside. This one supplied the standard they were checked against, which contemporaries called the undisputed ground of Indian geography.

**[INTERACTIVE]** Survey map with the year slider and a labelled Play button, 1802 to 1871. Screen recording is strongly preferred here; the growth over time is the point.

**H3:** The order things happened in

**[INTERACTIVE]** Verified date sequence, ten events, each carrying its source and its classification. Export `public/verified-timeline.svg` to PNG, or record the scroll.

### Section 2 — H2: Who did the work

**Prose:** A framework is also a workforce. Keeping one running for seventy years meant training people, splitting the work into roles, and refilling those roles as people died. The institution is as much of the impact as the measurements.

**Production line (plain text row):** Field observation → Instrument reading → Computing office → Published position

**Six roles (paste as a plain list; the tabbed component has no equivalent):**
- **Initiation — William Lambton, 1753 to 1823.** Founder of the survey. Began the work in 1802 and ran it until he died in the field, 1823.
- **Standardisation — George Everest, 1790 to 1866.** Surveyor General, 1830 to 1843. Standardised the instruments and published the survey's own measurements in 1847.
- **Administration — Andrew Scott Waugh, 1810 to 1878.** Surveyor General from 1843. Directed the survey while Peak XV was established as highest known, and proposed the name.
- **Computation — Radhanath Sikdar, 1813 to 1870.** Chief computer, Calcutta office. Led the office that turned field angles into positions, and wrote the 1850 procedure for distant snow-peak heights.
- **The labour — Indian survey personnel, 1802 to 1871.** Observers, chain carriers, computers, instrument makers. Syed Mir Mohsin Husain built precision instruments in Calcutta. Most of this workforce went unnamed.
- **Later reach — Nain Singh Rawat, 1830 to 1895.** Survey explorer. Walked routes into Tibet recording positions, carrying the same method past the original arc.

**[INTERACTIVE]** Verified date strip, 1830 to 1865. Caption: *"The dates the people above are anchored to. Everest, Waugh, and Sikdar overlap across a single stretch of the survey's middle decades."*

**H3:** Who paid, and who was credited

**Prose:** The historian Matthew Edney argues that mapping of this kind helped construct the very idea of British India. Indian and British workers built the network; the officers took the credit.

---

## 4. Change

**H1:** From unknowable to computable

### Section 1 — H2: A mountain measured from a hundred miles away

**Prose:** Before the framework existed, the height of a remote Himalayan peak was not something anyone could establish. You could see it and guess, and no two guesses could be reconciled.

**Prose:** Once it existed, the question became arithmetic. Observers more than a hundred miles from the peak the survey called Peak XV recorded the angle up to its summit. Those angles reached the computing office in Calcutta, were corrected for the Earth's curve and for the bending of light through air, and came back as a height: 29,002 feet, published in 1856. The modern figure is 29,032.

**Prose:** A height nobody could reach had become a number an office could calculate. That is the change. Radhanath Sikdar's office did the computation, one part of a collective process. Calling him the discoverer of Everest overstates one role, and the two-feet-added story is undocumented.

**[INTERACTIVE]** Peak comparison chart ("Which peak was believed tallest, and when"). This one uses real modern elevations and may be exported as a static image with its source note.

**[INTERACTIVE]** Verified date strip, 1847 to 1865. Caption: *"The stretch of years this section covers, from the publication of the survey's own measurements to the adoption of the name."*

### Section 2 — H2: What continued after the survey ended

**Prose:** Records, instruments, and written procedure outlived the careers that made them. The project became the permanent Survey of India, and later work was tied to the same control.

**Prose:** Satellite positioning does that job now. A receiver measures its distance from satellites whose positions are known, the same move as fixing a station from points already in the network. The technology shares nothing; the question is the same.

**Three-column table (rebuild as a simple HTML table or a clean list):**

| Same job | In the 1800s | Today |
| --- | --- | --- |
| Angles | A brass circle | Timing from orbit |
| Arithmetic | Logarithm tables | Solvers, in seconds |
| Reference | A survey-made shape | A satellite frame |

### Section 3 — H2: Why this matters to someone who has never heard of it

**Prose:** Every time a phone puts a dot on a map, it answers the question this survey spent seventy years answering by hand and eye: where am I, and how far away is that. It arrives in a second now, so it feels like a fact of nature rather than something built.

**Prose:** It is worth being clear about who built it and why. This was measurement in the service of taxation, troop movement, and territorial control, by an occupying administration. Knowledge and power grew together, and the history is better held that way.

---

## 5. Sources

Paste the bibliography from `src/data/sources.ts`, keeping the **Primary / Secondary / Images / Data** grouping and the "why it matters" note under each entry. Bibliography and cited quotations are excluded from the word count.

---

## What is deliberately absent

Cross-check against `RESEARCH-TRUTH-FILE.md` §10 before publishing. The site states no theodolite specification, no baseline length, no angular precision figure, and no multi-year numeric series, because none of those could be traced to a document. Do not add any of them back while rebuilding.
