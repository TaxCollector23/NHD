#!/usr/bin/env node
/*
  Counts ONLY student-composed historical narrative, per RESEARCH-TRUTH-FILE.md §11.

  Included:
    - <p>, <h1>, <h2>, <h3> prose in the four narrative pages and the hero
    - text handed to the <Standfirst> and <ForScale> wrappers, and the
      ThreadKicker sentence, once for each page that renders it
    - literal strings in the narrative fields of those pages' data arrays
      (body:, hook:, then:, now:), because a claim written into an array is
      still a claim the reader reads

  Excluded (separate categories under the NHD convention, not counted):
    - navigation, buttons, and slider labels
    - eyebrows and mono field numbers (.field-num / .page-eyebrow)
    - epistemic labels, source notes, and the "what would make this real data"
      notes, which are evidence apparatus rather than narrative
    - the tools page, the glossary, the bibliography, and the build-notes page
*/
import { readFileSync } from 'node:fs'

// ThreadKicker carries its own sentence and is rendered once per page, so it
// is listed under each page that shows it and counted once for each.
const THREAD = 'src/components/ui/ThreadKicker.tsx'

const PAGES = [
  ['Home / hero', ['src/pages/Home.tsx', 'src/components/hero/HeroSection.tsx']],
  ['Innovation',  ['src/pages/Innovation.tsx', 'src/components/triangulation/BaselineSteps.tsx', THREAD]],
  ['Impact',      ['src/pages/Impact.tsx', THREAD]],
  ['Change',      ['src/pages/Change.tsx', THREAD]],
]

const SKIP_CLASS = /field-num|page-eyebrow|note-text/
// Wrapper components whose children are rendered as visible prose count too:
// text handed to <Standfirst> or <ForScale> is read exactly like a paragraph.
const TARGET_TAG = /<(?:motion\.)?(p|h1|h2|h3|Standfirst|ForScale)\b([^>]*)>([\s\S]*?)<\/(?:motion\.)?\1>/g
// Narrative written as data rather than as markup.
const NARRATIVE_FIELD = /\b(?:body|hook|then|now|blurb)\s*:\s*(['"])((?:\\.|(?!\1)[\s\S])*?)\1/g

function words(s) { return s.trim() ? s.trim().split(/\s+/).length : 0 }

function clean(inner) {
  return inner
    .replace(/\{[^{}]*\}/g, ' ')      // JSX expressions
    .replace(/<[^>]+>/g, ' ')         // nested tags
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countFile(path) {
  let src
  try { src = readFileSync(path, 'utf8') } catch { return { n: 0, samples: [] } }
  let m, n = 0
  const samples = []

  while ((m = TARGET_TAG.exec(src))) {
    const attrs = m[2] || ''
    if (SKIP_CLASS.test(attrs)) continue
    const t = clean(m[3] || '')
    const w = words(t)
    if (!w) continue
    n += w; samples.push([w, t.slice(0, 60)])
  }
  while ((m = NARRATIVE_FIELD.exec(src))) {
    const t = m[2].replace(/\\'/g, "'").replace(/\s+/g, ' ').trim()
    const w = words(t)
    if (!w) continue
    n += w; samples.push([w, '[data] ' + t.slice(0, 52)])
  }
  return { n, samples }
}

let grand = 0
const rows = []
for (const [label, files] of PAGES) {
  let n = 0
  for (const f of files) n += countFile(f).n
  rows.push([label, n]); grand += n
}

const CAP = 1200, TARGET = 1150
console.log('\n  Student-composed narrative word count (RESEARCH-TRUTH-FILE §11 convention)\n')
for (const [label, n] of rows) console.log('  ' + label.padEnd(16) + String(n).padStart(5))
console.log('  ' + '-'.repeat(21))
console.log('  ' + 'TOTAL'.padEnd(16) + String(grand).padStart(5))
console.log(`\n  NHD website cap: ${CAP}   ·   working target: ${TARGET}   ·   ` +
  (grand <= TARGET ? 'under target' : grand <= CAP ? 'under cap, over target' : 'OVER CAP'))
console.log('')
if (process.argv.includes('--verbose')) {
  for (const [label, files] of PAGES) {
    console.log('\n### ' + label)
    for (const f of files) for (const [w, s] of countFile(f).samples) console.log(`  ${String(w).padStart(4)}  ${s}`)
  }
}
