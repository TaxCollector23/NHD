# NHDWebCentral build-order checklist

Why this exists: this React/Vite site **cannot be entered as-is**. NHD rule 6.5.E2 requires the website be built **inside NHDWebCentral**, which supports **static HTML/CSS only** (no JavaScript) and has no import path from an external app. Rebuild it by hand using the two companion docs:
- `nhdwebcentral-content.md` — the exact text to paste, page by page.
- `interactive-replacements.md` — the static/video stand-in for each interactive.

Do the steps in order.

### 1. Register
- [ ] Create an account at **nhdwebcentral.org** and start a new website.
- [ ] **If any team member is under 13**, complete the required **parental-consent** step before building (NHDWebCentral gates under-13 accounts on this).
- [ ] Note your **site key / site URL** — you'll need it for contest registration (step 8).

### 2. Pages & navigation (flatten the nav)
- [ ] Create five pages matching the site structure: **Home, Innovation, Impact, Change, Sources**. Add a sixth page for the media substitutes if you want the tool recordings gathered in one place, the way the live site's "Try the tools" page does.
- [ ] ⚠️ **NHDWebCentral does not support sub-menus / nested navigation** (per their FAQ). The live site's in-page section tabs (for example Innovation's "The problem / How it worked / The instruments") have no equivalent, so either keep each merged page as one long page with clear H2 headings, or split it into separate flat pages. Whichever you choose, the menu stays single-level.

### 3. Container blocks first
- [ ] On **each** page, add a **container block before anything else**. In NHDWebCentral, other blocks only keep their formatting if they sit inside a container — build the container, then add text/media blocks into it.

### 4. Paste the text
- [ ] Working page by page from `nhdwebcentral-content.md`, paste each **H1**, then the prose blocks **in the order given**, then sub-headings and their prose.
- [ ] For the **Who did the work** section of Impact, paste the six roles as the plain-text list in the content doc (the tabbed component has no equivalent).
- [ ] For the **What continued** section of Change, rebuild the then/now table as a simple HTML table or a clean list.

### 5. Add the media substitutes
- [ ] For each interactive, upload the recommended stand-in from `interactive-replacements.md` (screen-recording `.mp4` via the **Embed Multimedia** block, or static PNGs).
- [ ] Keep every media item's **epistemic caption** (Verified / Reconstruction / **Illustrative model**) so nothing reads as real historical data when it isn't.
- [ ] Timeline: use a **self-made** static/video timeline only — **no third-party timeline embeds** (NHD prohibits them). `public/verified-timeline.svg` → PNG is the ready-made honest option.

### 6. Check the word count
- [ ] NHDWebCentral shows a **live word count** on the site automatically. Confirm it is **≤ 1,200**. The React source is currently at **1,175** (`npm run words` — re-check this yourself before relying on it, since the number moves as the prose is edited); if the NHDWebCentral count differs, trim captions first.
- [ ] Remember the exclusions: navigation/menu words, media credits, quoted primary-source material, and the bibliography **do not count**; your own descriptive prose **does**.

### 7. Bibliography page
- [ ] Add the bibliography as **its own page** (or a linked PDF), preserving the **Primary / Secondary / Images / Data** grouping already in `src/data/sources.ts`.
- [ ] Every source named in the prose (Rennell, Everest 1847, Waugh 1851, Phillimore, Edney, Smith) must have a matching bibliography entry. They already do in `sources.ts`; copy them over.
- [ ] Bibliography and cited quotations are **excluded** from the word count.

### 8. Save = publish, then register
- [ ] In NHDWebCentral, **Save = publish** — there is no separate publish step. Save when the site is ready for judges.
- [ ] Copy the **site URL and site key** into your NHD contest registration.
- [ ] Fill in the **author fields** (name, school, division, category) — currently placeholders in `Process.tsx`; enter your real details in NHDWebCentral.
- [ ] Submit the separate **process paper** (≤ 500 words) — start from `docs/process-paper-draft.md`.

### Final review before judging
- [ ] Every page has a container block and its text in order.
- [ ] Every interactive has a working static/video stand-in with the right label.
- [ ] Flat single-level navigation; every page reachable.
- [ ] Word count ≤ 1,200; bibliography on its own page.
- [ ] No banned/unverified numbers reintroduced (cross-check RESEARCH-TRUTH-FILE §8/§10).
