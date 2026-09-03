/*
  The one-line restatement of the argument, repeated verbatim at the top of
  Innovation, Impact, and Change. It uses the survey-tick rule already in the
  design system so the reader recognises it as the same mark returning, not as
  a paragraph being repeated. Deliberately shorter than a sentence needs to be:
  it is a thread, not a summary.
*/
export default function ThreadKicker() {
  return (
    <div className="mt-6 max-w-[40em]">
      <div className="rule-ticks mb-3" aria-hidden />
      <p className="font-display text-[1.2rem] md:text-[1.35rem] leading-snug text-brass-700">
        The innovation: one framework, one plan, one subcontinent, seventy years of checking.
      </p>
    </div>
  )
}
