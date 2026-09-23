# NHD 2027 website audit

Audited September 13, 2026 against the official National History Day 2027 theme page, website checklist, evaluation form, and contest rule book.

Official references:

- [2027 theme: Innovation in History: Impact, Influence, Change](https://nhd.org/en/contest/theme/)
- [Website project checklist](https://nhd.org/wp-content/uploads/2023/02/NHD-Project-Checklist-2021-Website.pdf)
- [Website evaluation form](https://nhd.org/wp-content/uploads/2023/10/Copy-of-NHD-Evaluation-Forms-1st-Round-2022-Website.pdf)
- [Contest Rule Book](https://nhd.org/wp-content/uploads/2022/10/NHDRuleBook2020Digital.pdf)
- [NHD get-started guide](https://nhd.org/en/contest/get-started/)

## Overall judgment

The strongest idea is clear: the Great Trigonometrical Survey innovated by turning scattered observations into a connected, repeatable system. The site is visually distinctive, the three-part structure follows the annual theme, and the interactive triangle, map, timeline, and height models help a visitor understand the method.

The biggest risks are not visual. NHD judges award 80% for historical quality, including argument, theme, research, primary sources, context, multiple perspectives, accuracy, and significance. The current site still contains a mixture of documented history, teaching models, and claims that need source-level checking. A judge should never have to guess which is which.

## What is working

- Innovation / Impact / Change is visible in the information architecture.
- The home page includes the contest fields NHD asks for: student name placeholder, Junior division, Individual Website, visible-word count, multimedia length, and process-paper status.
- The thesis is specific enough to develop: the innovation was a system of measurement and coordination, not simply a new instrument.
- The timeline identifies dates and names the source category for each entry.
- The triangle simulator is a useful mathematical teaching model and is distinguished from a historical reconstruction.
- The project acknowledges colonial context and Indian labor instead of presenting the survey as the work of officers alone.
- Keyboard navigation, skip link, responsive layout, source badges, and reduced-motion handling improve presentation.

## What still needs improvement before an NHD submission

### Historical argument and theme

The home page and each chapter should answer the same two questions: what changed, and who or what did that change affect? Keep the focus on three linked claims:

1. Innovation: Lambton and later Survey of India teams adapted triangulation, astronomical checks, instruments, offices, and procedures into one long-running geodetic framework.
2. Impact: the framework made positions comparable across regions and supported later mapping, administration, and scientific work.
3. Influence and change: the method outlasted individual leaders, while its benefits and burdens were shaped by colonial rule and the unequal credit given to Indian and British workers.

Avoid treating GPS as a direct technological descendant. It is a useful comparison, but the historical claim is more defensible when phrased as a shared problem—positioning from known references—not as the same technology.

### Research and accuracy

- Replace every “approximate,” “probable,” or “to be verified” item with the exact source and page/plate number, or remove it.
- Do not use invented values as historical data. The map mesh is a teaching diagram; keep that label visible.
- Keep the peak chart as a modern elevation comparison. It no longer displays unsupported “believed tallest” years; the historical sequence belongs in the sourced timeline and prose.
- Recheck the Peak XV / Radhanath Sikdar attribution against the primary and scholarly sources. Present the calculation as collective office work unless a source supports a narrower claim.
- Keep the distinction between an arc-second of angle and an arc-second of latitude. At 6 km, 1 arc-second of angle corresponds to roughly 3 cm of transverse displacement; “about 30 metres” describes a different geographic quantity.
- Add direct image credits next to portraits and diagrams. Full citations belong in the annotated bibliography, but NHD also asks for brief credits where materials appear.

### Website-category compliance

The official checklist requires no more than 1,200 visible student-composed words, a home page with required entry information, an integrated process paper and annotated bibliography in PDF format, primary/secondary bibliography sections, brief source credits, working internal links, and no extensive supplementary material. It also says contest websites must be created in NHDWebCentral. This React/Vite/Vercel site is therefore a prototype and research presentation, not the final contest build. Rebuild the final version in NHDWebCentral or confirm a school-level exception with the teacher/coordinator.

The current measured narrative count is 1,195 words under this project’s counting convention. Re-run `npm run words` after any prose edit; the home metadata itself is not a substitute for the official NHD word-count procedure.

## Priority order

1. Fill in the student name and final process-paper word count.
2. Finish source verification and annotated bibliography PDFs.
3. Add an explicit historical argument paragraph to the process paper using the three claims above.
4. Convert the final entry to NHDWebCentral if entering an NHD contest.
5. Preserve interactives only where they clarify evidence or method; remove any model that implies invented numbers are historical measurements.

## Intensive page review

This is a judgment of the current prototype, not a promise of a contest result. Judges score the research and argument first. A polished interface cannot cover for weak evidence.

### Home

Current level: promising, but incomplete.

The opening now makes a clear claim about scale. The map also tells the reader that its triangle mesh is a teaching diagram. The remaining problem is the unfinished student information. Replace “Add your name,” add the final process-paper word count, and verify the official word count after the NHDWebCentral rebuild. The first screen should also make the argument visible before the visitor starts clicking.

Best next move: add one short student-written thesis sentence to the final NHD version. It should name the innovation, its effect on mapping, and its colonial use. Do not add another slogan.

### Innovation

Current level: strongest narrative page.

It gives context before method, shows why separate regional maps were not enough, and explains triangulation with a visual sequence. The page needs exact citations for the claims about taxation, Rennell, Mackenzie, Hodson, and the equipment. The phrase “hang the old maps on it” is memorable but should stay only if it matches the student's natural voice.

Best next move: connect each obstacle to a specific solution. Terrain required long sight lines and signals. Seasonal weather required repeated campaigns. Calculation required an office. Error required repeated observations and checks. This creates a cause-and-effect argument instead of a list.

### Impact

Current level: competitive idea, mixed evidence.

The map and timeline make change over time easy to follow. The labor section is valuable because it challenges the officer-only version of the story. However, the map contains candidate points and a schematic mesh, so it must never be described as the actual historical network. The statement that Indian workers filled every role needs a source that supports that scope, not only a general history.

Best next move: name one documented Indian worker or role with a specific source, then explain what the source shows. Avoid the broad sentence “Most of this workforce went unnamed” unless the bibliography supports it directly.

### Change

Current level: good conclusion, but the evidence needs tightening.

The Peak XV section gives the visitor a clear payoff and correctly separates the 1856 figure from the modern elevation. The chart now has a narrow purpose and no longer presents estimated “believed tallest” dates as data. Keep the caution around Sikdar and the two-feet story. The GPS comparison is useful only as a comparison of problems, not as a direct line of technological descent.

Best next move: make the conclusion state significance in history. Explain that the survey changed what administrators, scientists, and later surveyors could do with a shared reference system, while the same system strengthened colonial control.

### Tools

Current level: visually strong, too much interface text before this pass.

The triangle, arc-second, theodolite, height, and position models are appropriate for a website because they show processes that static prose cannot. They are not historical data, and the badges say so. The repeated source-gap cards were removed because they interrupted the learning sequence. The final page should keep one short note explaining that the models use teaching values.

Best next move: record or export only the interactions that prove the argument. A judge should be able to understand each model without reading five paragraphs of instructions. Every historical number shown in a model must be labelled as a teaching value or tied to a primary source.

### Sources

Current level: useful research base, not yet a finished annotated bibliography.

The list includes primary sources, scholarly work, institutional records, technical references, and images. It also includes weak or popular web sources. Remove sources that were only leads, separate the final primary and secondary lists, and annotate only sources actually used. Replace “locate,” “verify,” and “to be transcribed” language with page numbers, plates, archive identifiers, or a clear removal of the claim.

Best next move: build the bibliography from a claim table. For every major sentence, record the source, page or plate, source type, and the reason it matters. This is more useful than adding more titles.

### Glossary

Current level: helpful reference, but it should not become hidden extra narrative.

The definitions explain the mathematics in plain language. Check the definitions of Gunter's chain, the Great Arc endpoint, the vernier, and the historical use of “computer” against the sources. Keep the glossary short and technical. Do not use it to add claims that the main argument does not need.

### Process and build notes

Current level: not contest-ready.

The page is a checklist, not the required process paper. The real process paper must be no more than 500 words and answer how the topic was chosen, how research was conducted, how the project was made, what the argument is, and why the topic matters. It must be integrated as a PDF in the final NHD website. The current page correctly warns that the React app is not an NHDWebCentral submission, but the placeholder student fields still need to be completed.

## What would make this competitive

1. Build and submit the final contest site in NHDWebCentral. Keep this Vercel site as a prototype or public companion only.
2. Write the process paper in the student's own voice. Explain one surprise, one research problem, and why interactivity was the right category choice.
3. Use fewer sources, better. Prioritize Everest's 1847 account, Waugh's report, Rennell's 1788 map memoir, Survey of India records, Edney, and the scholarly Sikdar article. Add exact pages or plates.
4. Make the argument visible in every page title or opening paragraph. Innovation is the organization of an old method into a durable system. Impact is the shared reference framework. Influence and change include later surveying and the colonial uses of the map.
5. Show multiple perspectives. Pair official survey records with scholarship on colonial power and Indian scientific labor. State when the record is incomplete.
6. Keep only visuals that prove something. The triangle walkthrough explains triangulation. The map explains sequence and scale. The timeline explains institutional change. The height model explains correction. Decorative visuals should not compete with these.
7. Prepare a two-minute judge explanation. State the thesis, point to the triangle model, explain one primary source, and give the colonial consequence. This helps the site's argument survive a quick judging visit.
8. Before submission, test every link, mobile layout, image credit, source credit, PDF, word count, and page load in NHDWebCentral. The official checklist treats these as requirements, not optional polish.

## Winnability verdict

As a Vercel prototype, this is strong enough to become a competitive Junior Individual Website. As an NHD submission today, it is not ready. The two blocking issues are platform compliance and incomplete source verification. Fix those first. After that, the biggest improvement will come from the student's own final writing and a tighter claim-to-source trail, not from adding more animations or more pages.
