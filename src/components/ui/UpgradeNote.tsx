import { FileSearch } from 'lucide-react'

/*
  Sits under every illustrative model and chart. It names the specific archival
  work that would turn the model into a reconstruction, so the label is an
  invitation rather than a disclaimer.
*/
export default function UpgradeNote({ what }: { what: string }) {
  return (
    <div className="mt-4 rounded-md border-l-[3px] border-survey-500 bg-parchment-100/70 p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <FileSearch className="w-4 h-4 text-survey-600" />
        <span className="page-eyebrow text-survey-600">What would make this real data</span>
      </div>
      <p className="caption-text">
        {what} Those figures sit in George Everest's 1847 <i>Account of the Measurement of Two Sections
        of the Meridional Arc of India</i> and in Andrew Waugh's 1851 report on the survey's operations.
        Neither has been transcribed into a usable dataset yet, so this stays a working model of the
        method. Transcribing them is the next piece of research this project needs.
      </p>
    </div>
  )
}
