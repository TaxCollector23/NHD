import Bibliography from '../components/sources/Bibliography'

export default function Sources() {
  return (
    <div className="container-museum py-8 md:py-10">
      <h1 className="page-title">Sources</h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-800/85 leading-relaxed">
        Primary reports of the Survey of India plus modern scholarship. MLA format.
      </p>
      <div className="mt-10">
        <Bibliography />
      </div>
    </div>
  )
}
