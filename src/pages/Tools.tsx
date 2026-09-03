import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ToolPanel, { type Readout } from '../components/ui/ToolPanel'
import UpgradeNote from '../components/ui/UpgradeNote'
import TriangleSimulator from '../components/triangulation/TriangleSimulator'
import ArcSecondExplainer from '../components/triangulation/ArcSecondExplainer'
import TheodoliteViewer from '../components/instruments/TheodoliteViewer'
import EverestCalculator from '../components/mountain/EverestCalculator'
import PositionFix from '../components/legacy/PositionFix'

/*
  Every standalone interactive on one page. Each sits in a two-column frame:
  the tool on the left, a plain-language explanation and the live result on the
  right. On narrow screens they stack, tool first.
*/
export default function Tools() {
  const [triangle, setTriangle] = useState<Readout[]>([])
  const [theodolite, setTheodolite] = useState<Readout[]>([])
  const [everest, setEverest] = useState<Readout[]>([])
  const [position, setPosition] = useState<Readout[]>([])

  // Stable callbacks, so the tools do not re-publish on every parent render.
  const onTriangle = useCallback((r: Readout[]) => setTriangle(r), [])
  const onTheodolite = useCallback((r: Readout[]) => setTheodolite(r), [])
  const onEverest = useCallback((r: Readout[]) => setEverest(r), [])
  const onPosition = useCallback((r: Readout[]) => setPosition(r), [])

  return (
    <div className="container-museum py-8 md:py-10">
      <div className="page-eyebrow mb-2">Try the tools</div>
      <h1 className="page-title max-w-[15em]">Working models of every method on this site</h1>
      <p className="lede mt-5">
        Five models you can push around. Each one shows how a method works, not what the survey recorded.
        The label on every panel says which of those two things you are looking at, and it stays on screen
        rather than hiding behind a tooltip.
      </p>

      <div className="mt-12">
        <ToolPanel
          id="triangulation" n={1}
          title="Triangulation simulator"
          question="How do you find the distance to something you cannot walk to, and how far can you trust the answer?"
          kind="illustrative"
          claim="The Law of Sines, and how angle error grows along a chain of triangles."
          note="The geometry and the error propagation are standard and correct. The baselines and angles are teaching values, not the survey's recorded observations."
          sources={[
            { text: 'Law of Sines; first-order error propagation (standard geodesy)', type: 'Secondary' },
            { text: 'Observed baselines and angles, Everest 1847', type: 'Primary', needed: true },
          ]}
          readouts={triangle}
          explain={
            <>
              <p>
                Set the one side you would have measured on the ground, then set the two angles you would
                have read at its ends. Everything else about the triangle follows from those three numbers,
                including the distance to a point nobody visited.
              </p>
              <p>
                Switch to <b>Chain</b> to watch a calculated side become the measured side of the next
                triangle. Switch to <b>Error</b> and raise the angle uncertainty: the region of doubt at the
                far point grows, and it grows faster when the triangle is long and thin. That is the reason
                the survey repeated readings instead of trusting one.
              </p>
            </>
          }
          footer={<UpgradeNote what="A reconstruction needs the actual baseline lengths and the observed angles for a named chain of stations." />}
        >
          <TriangleSimulator onReadout={onTriangle} />
        </ToolPanel>

        <ToolPanel
          id="arcsecond" n={2}
          title="What an arc-second buys you"
          question="Why does a survey care about an angle too small to see?"
          kind="illustrative"
          claim="How a small angular error becomes a large distance error."
          note="Plain trigonometry, checkable on a calculator. No figure for the survey's own instrument precision appears here, because none could be traced to a document."
          sources={[{ text: 'Elementary trigonometry', type: 'Secondary' }]}
          explain={
            <>
              <p>
                An arc-second is one part in 3,600 of a degree, far below what an eye can judge unaided. It
                matters because an angle is never the final answer: it gets multiplied by a distance.
              </p>
              <p>
                Over a short sight line a tiny angular error is a few centimetres. Over the long sight lines
                this survey worked with, the same error is close to a metre. Multiply that across a chain of
                triangles and it is the difference between a position you can build on and one you cannot.
              </p>
            </>
          }
        >
          <ArcSecondExplainer />
        </ToolPanel>

        <ToolPanel
          id="theodolite" n={3}
          title="The theodolite"
          question="What did it take to measure an angle precisely enough to trust the arithmetic?"
          kind="illustrative"
          claim="A generic schematic of the instrument used to read horizontal angles."
          note="The object is historical and the parts are real. Specific dimensions, weights, and resolutions are deliberately absent, because no verified specification was found for the survey's instruments."
          sources={[
            { text: 'General instrument descriptions (museum and technical references)', type: 'Secondary' },
            { text: 'Instrument descriptions in Everest 1847', type: 'Primary', needed: true },
          ]}
          readouts={theodolite}
          explain={
            <>
              <p>
                A theodolite is a telescope on a mount that can swing horizontally and tilt vertically,
                with each motion read against a finely divided circle. Click any labelled part of the
                drawing to see what it does.
              </p>
              <p>
                Scroll down inside the tool for the eyepiece and the vernier, the sliding scale that lets an
                observer read a fraction of the smallest mark on the circle. That reading is where the angle
                in the simulator above actually comes from.
              </p>
            </>
          }
          footer={<UpgradeNote what="Making this a reconstruction needs the survey's own description of a named instrument: its circle diameter, its graduations, and how many verniers were read." />}
        >
          <TheodoliteViewer onReadout={onTheodolite} />
        </ToolPanel>

        <ToolPanel
          id="height" n={4}
          title="Height of a peak you cannot reach"
          question="How do you get the height of a mountain without climbing it, and why is simple trigonometry not enough?"
          kind="illustrative"
          claim="How a peak's height is derived from a distant angle, with corrections."
          note="The geometry and the curvature-and-refraction correction are standard and correct. The inputs are teaching values, not the survey's Peak XV stations, and this does not reproduce Sikdar's computation. The modern figure is shown for scale only."
          sources={[
            { text: 'Trigonometric heighting with curvature and refraction (Bomford, Geodesy)', type: 'Secondary' },
            { text: 'The Peak XV observation table, Waugh 1851', type: 'Primary', needed: true },
          ]}
          readouts={everest}
          explain={
            <>
              <p>
                Point at a summit from a known station, measure how far above horizontal you are looking,
                and multiply by the distance. That gives a first answer, and over a hundred miles it is
                wrong in two ways at once.
              </p>
              <p>
                The Earth curves away underneath the sight line, so the peak is taller than the raw geometry
                suggests. Light bends downward through the atmosphere, so the peak also looks higher than it
                is. Move the refraction slider and watch the final number move: this sensitivity is exactly
                why the work was done by an office, repeatedly, rather than by one observer once.
              </p>
            </>
          }
          footer={<UpgradeNote what="A reconstruction needs the station names, dates, observed vertical angles, and the curvature and refraction values that produced the published figure of 29,002 feet." />}
        >
          <EverestCalculator onReadout={onEverest} />
        </ToolPanel>

        <ToolPanel
          id="position" n={5}
          title="Where am I?"
          question="How do you fix your own position, then and now?"
          kind="illustrative"
          claim="A geometry comparison of two ways to fix a position: resection from bearings, and trilateration from distances."
          note="Both panels show the same move: intersect measurements taken from references whose positions are already known. The shapes are real geometry. There are no timing or accuracy numbers, because a like-for-like comparison of the two eras is not supported by the evidence, and this is not a claim that satellite positioning descends from the survey."
          sources={[{ text: 'Resection and trilateration are standard positioning methods', type: 'Secondary' }]}
          readouts={position}
          explain={
            <>
              <p>
                On the left, a surveyor takes bearings to three hills already fixed in the network. Where
                the three lines cross is the position. On the right, a receiver measures its distance from
                three satellites whose positions are known. Where the three range circles overlap is the
                position.
              </p>
              <p>
                Push either error slider and the crossing stops being a point and becomes a small region.
                That region is the honest answer: a measured position always comes with a size. The two
                technologies share nothing except the logic.
              </p>
            </>
          }
          footer={<UpgradeNote what="Turning the left panel into a reconstruction needs a documented resection from named stations with their recorded bearings." />}
        >
          <PositionFix onReadout={onPosition} />
        </ToolPanel>
      </div>

      <div className="mt-14 rounded-md border border-brass-500/40 bg-brass-500/10 p-5 flex flex-wrap items-center justify-between gap-4">
        <p className="caption-text max-w-[36em]">
          Every model above is labelled illustrative for the same reason: the observation tables that would
          turn them into reconstructions have not been transcribed yet.
        </p>
        <Link to="/sources" className="btn-primary shrink-0">
          See the sources <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
