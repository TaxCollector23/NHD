# NHDWebCentral content export, copy and paste in order

This is the **exact current prose** from the live React site, re-extracted directly from
`src/pages/*.tsx` and the shared components they render (`HeroSection`, `ThreadKicker`,
`Standfirst`, `ForScale`, `BaselineSteps`) on 2026-09-04. Keep this open in one tab and paste
block by block into NHDWebCentral. Do not re-edit while pasting.

**Word count of the student-composed prose = 1,168 / 1,200** (`npm run words`, re-run at the
time this doc was regenerated). This document lists every block that script counts, plus the
uncounted interface text (nav hooks' surrounding chrome, eyebrows, `note-text` asides) needed
to actually rebuild the page, each one labelled so you know which is which.

The site is **four narrative pages plus Sources**, not nine chapters. Each page below lists its
**HEADING**, the **prose** in render order, and an **[INTERACTIVE]** note for each non-text
element that needs a static replacement (see `interactive-replacements.md`).

Two small components repeat on every narrative page and are easy to paste-over by accident —
call them out explicitly here:
- **ThreadKicker** — one line, identical on Innovation, Impact, and Change: *"One plan, held for
  seventy years, every measurement checked twice."* It sits right under each page's H1. Paste it
  three times, once per page.
- **Standfirst** — a short italic deck line under each section H2. There are eight of them
  across the three narrative pages. They are real, word-counted prose, not decoration — the
  previous version of this document omitted all eight.

---

## 1. Home / Hero

**Eyebrow line (interface chrome, not word-counted):** National History Day 2027 · Innovation
in History: Impact, Influence, Change

**H1:** The Great Trigonometrical Survey of India

**Subhead:** From 1802 to 1871, surveyors set out to fix the position of every landmark in
India. How do you measure ground you cannot walk, and what changes once you can?

**Answer:** The innovation was not an instrument. The geometry itself was already two centuries
old. What took seventy years was holding one framework together across a whole subcontinent.

**Stat line (interface chrome, not word-counted):** 1802 first baseline measured · 1818 named
the Great Trigonometrical Survey · Peak XV calculated, not climbed

**[INTERACTIVE]** Right-side animated triangulation schematic over a projection of India.
Caption (`note-text`, not word-counted): *"Station coordinates are real places. The mesh
joining them is a teaching schematic, not the historical network."* Use a static image or a
short screen capture.

**Cold-open (below the hero, still on Home.tsx):** Your phone finds you in one second. Doing
the same for a subcontinent took seventy years and a small army of surveyors.

**[NAV]** The homepage carries a four-item index (Innovation, Impact, Change, Sources) with
these one-line hooks, which **are** word-counted:
- **Innovation** — What was actually new.
- **Impact** — One framework, and who ran it.
- **Change** — A mountain measured from a desk.
- **Sources** — The document behind every claim.

---

## 2. Innovation

**H1:** A system built to measure a subcontinent

**ThreadKicker:** One plan, held for seventy years, every measurement checked twice.

### Section 1 — H2: Why measurement mattered

**Standfirst:** What the Company needed.

**Prose:** By 1800 the East India Company governed a large territory in India and paid for
itself by taxing land. Troops had to be moved, and authority asserted over ground it did not
hold.

**Prose:** Maps already existed. James Rennell and other Company surveyors had charted whole
regions by 1788, so the maps weren't blank — the gap was connection: each region was surveyed
separately, so distances between them stayed unknown. William Lambton's idea: measure one
precise skeleton first, then hang every later map on it.

**[INTERACTIVE]** Two-panel coverage comparison (separately measured points vs. one connected
framework). Static export of both panels side by side. Caption: *"A diagram of two ways to
organise measurement, not a map of who surveyed what. The dots are real station coordinates;
the triangle mesh is a teaching schematic rather than the survey's actual network. No
historical coverage data is shown, because no verified coverage dataset has been assembled for
this project."*

**Prose:** Doing it was another matter. Mountains blocked sight lines, the monsoon stopped
fieldwork every year, disease killed people in the field including Lambton, and every triangle
was solved by hand.

**[INTERACTIVE]** Verified date strip, 1788 to 1830. Caption: *"The survey did not start from
nothing. Rennell's mapping was already published in 1788, and the work Lambton began in 1802
only became a named, permanent department sixteen years later."*

### Section 2 — H2: How you measure a distance you never travel

**Standfirst:** The geometry, in four steps.

**Prose:** Triangulation is the method, and the idea fits in a sentence. Measure one line on
the ground, sight a distant point from both ends, and the triangle gives its distance.

**[INTERACTIVE]** Four-step baseline walkthrough with a diagram per step (`BaselineSteps`
component — its step text **is** word-counted narrative and must be pasted verbatim):
- **01 Measure one line** — Measure between two points you can walk. This is the only distance
  anyone measures.
- **02 Sight the far point twice** — From each end, aim at the same hilltop and record the
  angle off the baseline.
- **03 Calculate the rest** — One side and its two end angles fix the triangle. The distances
  follow.
- **04 Use it as the next baseline** — A calculated side starts the next triangle. Chained far
  enough, it crosses anything.

**H3:** The technique was old. The scale was not.

**Prose:** None of this was new — European surveyors had solved triangles this way for two
centuries, so the math wasn't new. The scale was: doing it continuously, across a subcontinent,
for seventy years.

**Prose:** A parish surveyor solved one triangle and went home. This survey chained thousands
together, ran an office in Calcutta that did nothing but arithmetic, and chased down any
disagreement between two readings instead of rounding it away. Colin Mackenzie put the principle
in writing in 1815: persevere "on one undeviating plan."

**[LINK]** A call-out linking to the tools page, with a `note-text` line (not word-counted):
*"Working models of every method described here, including one that shows how a small angle
error grows as triangles are chained together, are collected on one page."* In NHDWebCentral
this becomes a plain link to whichever page carries the media substitutes.

### Section 3 — H2: Precision was a procedure, not a gadget

**Standfirst:** Where the accuracy came from.

**Prose:** A theodolite is a telescope that swings against finely divided circles, letting an
observer read exactly where it points. The instrument mattered less than the habit of repeating
the reading. Latitude was checked against the stars, and angles were corrected for refraction,
the bending of light through air. W. Hodson recorded the rule: investigate discrepancies, never
conceal them.

**Three cards (plain text, word-counted):**
- **Baseline apparatus** — Two metals paired so heat expansion cancelled itself.
- **Astronomical observation** — Latitude fixed by starlight, apart from the triangles.
- **Measuring chains** — A steel chain, temperature-corrected, laid the baseline.

**Closing note (`note-text`, does not count as narrative):** The site states no figure for the
survey's instruments: no weight, no dimension, no angular resolution. Those numbers circulate
widely but none of them could be traced to a document, so none of them appear here.

---

## 3. Impact

**H1:** From one triangle to a subcontinent

**ThreadKicker:** One plan, held for seventy years, every measurement checked twice.

### Section 1 — H2: What seventy years of measuring produced

**Standfirst:** What the framework enabled.

**Prose:** The result sounds modest and was not: points across India whose positions were
known accurately, and known relative to each other. A later surveyor could start from one of
them instead of starting over.

**Prose:** The survey called this a geodetic framework — the measurements accounted for the
Earth's curve rather than treating India as a flat sheet. Coverage stayed uneven, but other
surveys were still checked against this one, which contemporaries called the undisputed ground
of Indian geography.

**[INTERACTIVE]** Survey map with the year slider and a labelled Play button, 1802 to 1871.
Screen recording is strongly preferred here; the growth over time is the point.

**ForScale aside (word-counted — omitted from the previous version of this document):** The
Great Arc ran roughly 1,600 miles (Keay). New York to Denver is about 1,630. *(On-page label:
"For scale · a comparison by the author, not a historical claim.")*

**H3:** The order things happened in

**[INTERACTIVE]** Verified date sequence, ten events, each carrying its source and its
classification. Export `public/verified-timeline.svg` to PNG, or record the scroll. Caption
above it (`note-text`, not word-counted): *"Ten dates, each carrying the document it comes
from. This is the one part of the site built on verified historical data rather than on a
model of the method."*

### Section 2 — H2: Who did the work

**Standfirst:** The workforce behind it.

**Prose:** A framework like this is also a workforce. Running it for seventy years meant
training people, splitting the work into roles, and refilling them as people died.

**Production line (plain text row, interface chrome):** Field observation → Instrument reading
→ Computing office → Published position

**Six roles (paste as a plain list; the tabbed component has no equivalent):**
- **Initiation — William Lambton, 1753 to 1823.** Founder of the survey. Started the work in
  1802, and died running it in 1823.
- **Standardisation — George Everest, 1790 to 1866.** Surveyor General, 1830 to 1843.
  Standardised the instruments and published the survey's own measurements in 1847.
- **Administration — Andrew Scott Waugh, 1810 to 1878.** Surveyor General from 1843. Directed
  the survey while Peak XV was established as highest known, and proposed the name.
- **Computation — Radhanath Sikdar, 1813 to 1870.** Chief computer, Calcutta office. Led the
  office that turned field angles into positions, and wrote the 1850 snow-peak procedure.
- **The labour — Indian survey personnel, 1802 to 1871.** Observers, chain carriers, computers,
  instrument makers. Syed Mir Mohsin Husain built precision instruments in Calcutta. Most of
  this workforce went unnamed.
- **Later reach — Nain Singh Rawat, 1830 to 1895.** Survey explorer. Walked routes into Tibet
  recording positions, carrying the method past the original arc.

**[INTERACTIVE]** Verified date strip, 1830 to 1865. Caption: *"The dates the people above are
anchored to. Everest, Waugh, and Sikdar overlap across a single stretch of the survey's middle
decades."*

**H3:** Who paid, and who was credited

**Prose:** The historian Matthew Edney argues this kind of mapping helped build the idea of
British India in the first place. Indian and British workers did the measuring; the officers
got the credit.

**H3:** The influence that outlasted the arc

**Prose:** The working habits outlasted the Great Arc itself. Later Survey of India work kept
tying back to the same trigonometrical control, giving the country one shared system rather
than scattered local surveys. Nain Singh Rawat carried it furthest, sent into Tibet where
British officers could not go.

---

## 4. Change

**H1:** From unknowable to computable

**ThreadKicker:** One plan, held for seventy years, every measurement checked twice.

### Section 1 — H2: A mountain measured from a hundred miles away

**Standfirst:** One height nobody could reach.

**Prose:** Before the framework existed, nobody could establish the height of the remote
Himalayan peak the survey numbered Peak XV. You could only guess, and guesses disagreed.

**Prose:** With the framework in place, working out the height was just arithmetic. Observers
more than a hundred miles off measured the angle up to the summit, and Calcutta corrected it
for the curve of the Earth and for refraction, the bending of light through air. The answer,
published in 1856, was 29,002 feet. Today's figure is 29,032.

**Prose:** A summit nobody had climbed now had a number, worked out at a desk. Radhanath
Sikdar's office did that computation, as part of a team. Calling him Everest's discoverer
overstates the record, and the story that Waugh padded the figure by two feet to avoid a round
number is undocumented.

**[INTERACTIVE]** Peak comparison chart ("Which peak was believed tallest, and when"). This one
uses real modern elevations and may be exported as a static image with its source note.

**[INTERACTIVE]** Verified date strip, 1847 to 1865. Caption: *"The stretch of years this
section covers, from the publication of the survey's own measurements to the adoption of the
name."*

### Section 2 — H2: What continued after the survey ended

**Standfirst:** What outlived the survey.

**Prose:** The records, instruments, and working methods all outlasted the people who built
them. The undertaking became the permanent Survey of India, still tied to the same control.

**Prose:** Satellite positioning does the same job now. A receiver works out how far it is from
satellites whose positions are known, the same move as fixing a station from known points. The
two technologies are unrelated, though the problem they solve is identical.

**Four-row table (rebuild as a simple HTML table or a clean list — a "Labour" row was added
after the previous version of this document was written):**

| Same job | In the 1800s | Today |
| --- | --- | --- |
| Angles | A brass circle | Timing from orbit |
| Arithmetic | Logarithm tables | Solvers, in seconds |
| Reference | A survey-made shape | A satellite frame |
| Labour | A field-and-office workforce | A distributed satellite network |

### Section 3 — H2: Why this matters to someone who has never heard of it

**Standfirst:** The opening question, answered.

**Prose:** Where am I, and how far away is that? A phone answers both in about a second, so
it's easy to forget that exact position used to be something nobody could just know. Someone
had to build the first system that could actually answer it.

**Prose:** The survey taught the world much about the true shape of the Earth, and it made an
occupied territory easier to tax, march through, and hold — both were reasons it got funded.

**Closing line (font-display, word-counted — this is the line that closes the loop opened by
the Home page cold-open):** Seventy years, a small army of surveyors, and an empire's reasons
for paying. That is what one second of certainty cost to build the first time.

---

## 5. Sources

Paste the bibliography from `src/data/sources.ts`, keeping the **Primary / Secondary / Images /
Data** grouping and the "why it matters" note under each entry. Bibliography and cited
quotations are excluded from the word count.

The H1 ("Sources") and the one-line standfirst ("Primary reports of the Survey of India plus
modern scholarship. MLA format.") are not word-counted narrative — `src/pages/Sources.tsx` is
not one of the files `npm run words` scans — but paste them anyway; they are real page content.

**Author note:** `Sources.tsx` currently carries a `TODO(author)` code comment reminding you to
add a credit line for each portrait's public-domain source once the five portraits
(`lambton.jpg`, `everest.jpg`, `waugh.jpg`, `sikdar.jpg`, `nainsingh.jpg`) are dropped into
`public/portraits/`. That credit line does not exist in the rendered page yet — add it to this
page (and to this document) once you've sourced the images.

---

## What is deliberately absent

Cross-check against `RESEARCH-TRUTH-FILE.md` §10 before publishing. The site states no
theodolite specification, no baseline length, no angular precision figure, and no multi-year
numeric series, because none of those could be traced to a document. Do not add any of them
back while rebuilding.
