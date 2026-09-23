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
        Five models you can push around. Each one shows how a method worked rather than what the survey actually
        recorded, and the label on every panel tells you which of those two you are looking at.
      </p>

      <div className="mt-12">
        <ToolPanel
          id="triangulation"
          n={1}
          title="Triangulation simulator"
          question="How far away is that hill, and how sure can you actually be about it?"
          kind="illustrative"
          claim="The Law of Sines, and how a small angle error snowballs across a chain of triangles."
          note="The geometry and the error propagation are standard and correct. The baselines and angles are teaching values, not the survey's recorded observations."
          sources={[
            {
              text: 'Law of Sines; first-order error propagation (standard geodesy)',
              type: 'Secondary',
            },
            {
              text: 'Observed baselines and angles, Everest 1847',
              type: 'Primary',
              needed: true,
            },
          ]}
          readouts={triangle}
          explain={
            <>
              <p>
                Set the one side you would have measured on the ground, then set the two angles you would have read at
                its ends. Everything else about the triangle falls out of those three numbers, including the distance to
                a point nobody ever visited.
              </p>
              <p>
                Switch to <b>Error</b> and raise the angle uncertainty. The patch of doubt at the far point gets bigger,
                and it gets bigger faster when the triangle is long and thin. That is why the survey took a reading more
                than once.
              </p>
            </>
          }
          footer={
            <UpgradeNote what="A reconstruction needs the actual baseline lengths and the observed angles for a named chain of stations." />
          }
        >
          <TriangleSimulator onReadout={onTriangle} />
        </ToolPanel>

        <ToolPanel
          id="arcsecond"
          n={2}
          title="What an arc-second buys you"
          question="Why does an angle this tiny even matter?"
          kind="illustrative"
          claim="How a tiny angle error turns into a big distance error."
          note="Plain trigonometry, checkable on a calculator. No figure for the survey's own instrument precision appears here, because none could be traced to a document."
          sources={[{ text: 'Elementary trigonometry', type: 'Secondary' }]}
          explain={
            <>
              <p>
                An arc-second is one part in 3,600 of a degree — way smaller than anything your eye could judge on its
                own. It matters because the angle is never the final answer. It gets multiplied by a distance.
              </p>
              <p>
                Over a short sight line, a tiny angle error is only a few centimetres. Over the long sight lines this
                survey used, that same error is close to a metre. Carry that through a whole chain of triangles and
                it's the difference between a position you can trust and one you can't.
              </p>
            </>
          }
        >
          <ArcSecondExplainer />
        </ToolPanel>

        <ToolPanel
          id="theodolite"
          n={3}
          title="The theodolite"
          question="How do you read an angle precisely enough to actually trust it?"
          kind="illustrative"
          claim="A generic schematic of the instrument used to read horizontal angles."
          note="The object is historical and the parts are real. Specific dimensions, weights, and resolutions are deliberately absent, because no verified specification was found for the survey's instruments."
          sources={[
            {
              text: 'General instrument descriptions (museum and technical references)',
              type: 'Secondary',
            },
            {
              text: 'Instrument descriptions in Everest 1847',
              type: 'Primary',
              needed: true,
            },
          ]}
          readouts={theodolite}
          explain={
            <>
              <p>
                A theodolite is a telescope on a mount that swings sideways and tilts up and down, with each motion read
                against a finely divided circle. Click any labelled part of the drawing to see what it does.
              </p>
              <p>
                Scroll down inside the tool for the eyepiece and the vernier, the sliding scale that lets an observer
                read a fraction of the smallest mark on the circle. That reading is where the angle in the simulator
                above comes from.
              </p>
            </>
          }
          footer={
            <UpgradeNote what="Making this a reconstruction needs the survey's own description of a named instrument: its circle diameter, its graduations, and how many verniers were read." />
          }
        >
          <TheodoliteViewer onReadout={onTheodolite} />
        </ToolPanel>

        <ToolPanel
          id="height"
          n={4}
          title="Height of a peak you cannot reach"
          question="How do you figure out a mountain's height without ever climbing it?"
          kind="illustrative"
          claim="How you turn a distant angle into a peak's height, once you add the corrections."
          note="The geometry and the curvature-and-refraction correction are standard and correct. The inputs are teaching values, not the survey's Peak XV stations, and this does not reproduce Sikdar's computation. The modern figure is shown for scale only."
          sources={[
            {
              text: 'Trigonometric heighting with curvature and refraction (Bomford, Geodesy)',
              type: 'Secondary',
            },
            {
              text: 'The Peak XV observation table, Waugh 1851',
              type: 'Primary',
              needed: true,
            },
          ]}
          readouts={everest}
          explain={
            <>
              <p>
                Point at a summit from a station whose position you know, measure how far above horizontal you're
                looking, and multiply by the distance. That gives you a first answer, and over a hundred miles it's
                wrong in two different ways.
              </p>
              <p>
                The Earth curves away under the sight line, so the peak is actually taller than flat geometry would
                say. Light also bends slightly as it passes through the air, which makes the summit look even higher
                through the eyepiece. Move the refraction slider and watch the number shift. The result is sensitive
                enough that the survey never trusted one observer looking once — they sent it to an office and did it
                again.
              </p>
            </>
          }
          footer={
            <UpgradeNote what="A reconstruction needs the station names, dates, observed vertical angles, and the curvature and refraction values that produced the published figure of 29,002 feet." />
          }
        >
          <EverestCalculator onReadout={onEverest} />
        </ToolPanel>

        <ToolPanel
          id="position"
          n={5}
          title="Where am I?"
          question="How do you figure out where you are — in the 1800s versus now?"
          kind="illustrative"
          claim="Two ways to work out your position, bearings vs. distances, side by side."
          note="Both panels do the same basic move: intersect measurements taken from points whose position you already know. The shapes are real geometry. There's no timing or accuracy comparison here, because the evidence for one doesn't exist, and this isn't a claim that satellite positioning comes from the survey."
          sources={[
            {
              text: 'Resection and trilateration are standard positioning methods',
              type: 'Secondary',
            },
          ]}
          readouts={position}
          explain={
            <>
              <p>
                On the left, a surveyor takes bearings to three hills already fixed in the network. Where the three
                lines cross is the position. On the right, a receiver measures its distance from three satellites whose
                positions are known. Where the three circles overlap is the position.
              </p>
              <p>
                Push either error slider and the crossing stops being a point and turns into a small patch. That's the
                honest answer — a measured position always covers some area, not a single dot. The two technologies
                aren't related at all. Geometry is the only thing they share.
              </p>
            </>
          }
          footer={
            <UpgradeNote what="Turning the left panel into a reconstruction needs a documented resection from named stations with their recorded bearings." />
          }
        >
          <PositionFix onReadout={onPosition} />
        </ToolPanel>
      </div>

      <div className="mt-14 rounded-md border border-brass-500/40 bg-brass-500/10 p-5 flex flex-wrap items-center justify-between gap-4">
        <p className="caption-text max-w-[36em]">
          Every model above is labelled illustrative for the same reason. The observation tables that would turn them
          into reconstructions have not been transcribed yet.
        </p>
        <Link to="/sources" className="btn-primary shrink-0">
          See the sources <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
