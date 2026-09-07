import Bibliography from '../components/sources/Bibliography'

// TODO(author): when you add the five portraits to public/portraits/
// (lambton.jpg, everest.jpg, waugh.jpg, sikdar.jpg, nainsingh.jpg), add a
// credit line here for each one's public-domain source.

export default function Sources() {
  return (
    <div className="container-museum py-8 md:py-10">
      <h1 className="page-title">Sources</h1>
      <p className="mt-3 note-text">Works Cited, MLA 9th edition.</p>
      <div className="mt-10">
        <Bibliography />
      </div>
    </div>
  )
}
