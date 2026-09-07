import { Ruler } from 'lucide-react'

/*
  What an arc-second is, and why a tiny angle matters over a long sight line.
  Everything shown is arithmetic that can be checked with a calculator. No
  figure for the survey's own instruments appears here, because none could be
  traced to a document.
*/
export default function ArcSecondExplainer() {
  return (
    <div className="card-parchment p-6">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 shrink-0 rounded-lg bg-ink-900 text-brass-400 grid place-items-center shadow-sm">
          <Ruler className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h3 className="sub-title">Why a fraction of a degree decides everything</h3>
          <p className="body-text mt-2">
            An angle read at a station is not the answer. It is multiplied by a distance to get the answer, so a small
            error in the angle becomes a large error on the ground. That multiplication is why a survey working over
            long sight lines cares about fractions of a degree that would be invisible anywhere else.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-earth-500/20 bg-ink-900 text-parchment-50 p-5 font-mono text-[0.95rem] leading-relaxed">
        1 degree &nbsp;=&nbsp; 60 minutes &nbsp;=&nbsp; 3600 seconds of arc <br />1 second of arc, at 6 km &nbsp;≈&nbsp;{' '}
        <span className="text-brass-400">3 cm</span> sideways <br />1 second of arc, at 170 km &nbsp;≈&nbsp;{' '}
        <span className="text-brass-400">82 cm</span> sideways
      </div>

      <p className="note-text mt-3">
        Plain trigonometry, checkable on any calculator: sideways error = distance × tan(angle). The survey's own
        achieved precision is not stated anywhere on this site. That figure would have to come out of the observation
        tables in Everest's 1847 Account, which have not been transcribed.
      </p>
    </div>
  )
}
