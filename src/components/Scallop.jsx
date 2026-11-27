// The edge between two sections: a fine ember hairline, with a soft glow where it is brightest.
// It used to be a scalloped awning, and still takes the old `color` prop so older callers keep working.
// eslint-disable-next-line no-unused-vars
export default function Scallop({ color, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 z-[1] ${className}`}>
      <div className="hairline-ember h-px w-full" />
      <div className="mx-auto h-8 w-1/2 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(255,106,19,0.18),transparent)]" />
    </div>
  )
}
