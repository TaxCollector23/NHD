# Static replacements for every interactive (NHDWebCentral build)

**The constraint.** NHDWebCentral is static HTML/CSS: no JavaScript, no iframes, no externally-hosted apps or video. The only ways to add non-text media are: **static images** (PNG/JPG/GIF) and NHD's **Embed Multimedia block**, which accepts **PDF / MP3 / MP4 / WAV / AAC / MOV / WMV uploaded to NHDWebCentral itself**. None of the live interactives can be ported; each needs a self-made static or video stand-in.

**Originality note (applies to all).** Two options recur below: (A) **record your own screen** driving the live simulator (30–60 s, export `.mp4`, upload via Embed Multimedia), or (B) **export static frames** (before / mid / after) as images with captions. For the NHD certifications ("we independently researched and created this website," "no improper assistance"), **option A — your own screen recording of your own working tool, ideally with a short spoken or captioned narration of what you're doing and why — is the more defensible evidence of original work.** Reproducing a diagram you didn't make, or that looks lifted, is riskier. Every uploaded frame/clip should also carry the same epistemic label the live site uses (**Verified / Reconstruction / Illustrative model**) so nothing reads as a real historical dataset when it isn't.

**Production tip.** Run the live site (`npm run dev`), record with QuickTime/OBS at a clean window size, trim, and export `.mp4`. For static frames, screenshot the SVG state and save as PNG. Keep clips short — NHDWebCentral has upload-size limits.

---

## 1. Triangle Simulator (Try the tools page)
- **Demonstrates:** how one measured baseline plus two observed angles fixes a distant point, how triangles chain into a network, and how a small angle error grows into a large position error down the chain.
- **Recommended:** **(A) screen recording.** Record ~45 s: load a worked example, drag the baseline, switch to Chain, then open **Error** and widen the angle-precision slider so the "region of doubt" visibly grows. This motion *is* the argument and can't be captured in one still.
- **If image-only:** a 3-frame sequence — (1) baseline + two angles, (2) solved triangle with computed sides, (3) Error mode with the uncertainty circle — each with a one-line caption. Label **Illustrative model — values are teaching examples, not Survey observations.**

## 2. ArcSecondExplainer (Try the tools page)
- **Demonstrates:** why a fraction of a degree matters once it is multiplied by a long distance.
- **Recommended:** **(B) one static image** of the arithmetic card (`1 degree = 60 minutes = 3600 seconds of arc`; `1 second at 6 km ≈ 3 cm`; `1 second at 170 km ≈ 82 cm`) plus a one-sentence caption. It is already static; a screen recording adds nothing. Do not state any figure for the survey's own achieved precision.

## 3. Theodolite Viewer + eyepiece/vernier (Try the tools page)
- **Demonstrates:** the parts of a theodolite and how a vernier is read to a fine fraction of a degree.
- **Recommended:** **(A) short screen recording** (~30 s): click each numbered part, rotate the scope, then nudge the eyepiece crosshair and show the vernier readout changing. Alternatively **(B)** a single labelled still of the instrument with numbered callouts. State no instrument specification at all: no weight, no dimension, no angular resolution. None of those could be traced to a document.

## 4. Survey Map (Impact page)
- **Demonstrates:** one baseline growing into a subcontinental network across 1802→1871.
- **Recommended:** **(A) screen recording** of the Play button running the year slider so the mesh fills in — the growth over time is the whole point. Caption: station coordinates real, mesh a **schematic**, not the historical network.
- **If image-only:** three frames (early / mid / full network) side by side.

## 5. Date sequence and date strips (Impact, Innovation, Change pages), special NHD rule
- **Demonstrates:** the order the pieces of the system came together, with the source standing behind each date. The map animation that used to sit beside this was removed, because it repeated what the survey map above it already shows.
- **NHD prohibits embedding third-party timeline tools** (Tiki-Toki, Sutori, Knight Lab, etc.). The replacement **must be self-made**: either **(A)** a screen recording of *this* scrubber, or **(B)** a hand-built static timeline image/graphic you make yourself (a simple labelled horizontal timeline of the dated events). **Do not** link out to or embed an external timeline service. A ready-made honest static timeline already exists in the repo at `public/verified-timeline.svg` (the dated, source-classified milestones) — export it to PNG and upload that.

## 6. Everest Calculator (Try the tools page)
- **Demonstrates:** how a peak's height is derived from a distant angle, and why curvature + refraction corrections are needed — as an **illustrative model**, not a reconstruction of Sikdar's computation.
- **Recommended:** **(A) screen recording** (~40 s): load an example, drag distance and angle so the peak and sight-line move, then the refraction slider so the correction changes. Must keep the on-screen **Illustrative model** badge visible in the recording. Do **not** present any frame as the real Peak XV observation set (RESEARCH-TRUTH-FILE §7).

## 7. Position Fix Simulator (Try the tools page)
- **Demonstrates:** the same "where am I?" problem solved two ways — 1850s resection (bearings) vs. modern trilateration (ranges) — a comparison, **not** a claim that satellite positioning descends from the survey.
- **Recommended:** **(A) screen recording** of "Take a fix" on both panels, plus dragging the error sliders to show the crossing region grow/shrink. Caption must state: same problem, different technology, **no lineage**. No timing/accuracy numbers (the live version already removed them).

---

### Charts (illustrative — decide per chart)
The "Cumulative principal triangles", "Kilometres per decade", and "Angular precision over time" charts have been **removed from the live site**: all three plotted invented series and no verified dataset exists for any of them. Do not rebuild them. The "believed tallest peaks" chart uses real modern elevations and may be exported as a static image with its source note. The safest verified visual to keep is **`public/verified-timeline.svg` → PNG** (see #5).
