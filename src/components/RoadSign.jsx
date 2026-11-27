import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'
import usePauseOffscreen from '../lib/usePauseOffscreen'

// The roadside theme, kept quiet and premium: an exit marker above each section, a mile marker and a thin road stripe. Together they say you pulled off the long road for the best BBQ.

// The marker above each section heading: an orange exit number, a hairline, then the section name.
// It takes its text colour from the section, so it works on black and on white.
// eslint-disable-next-line no-unused-vars
export function ExitSign({ exit, children, tone, className }) {
  return (
    <p className={cn('inline-flex items-center gap-3 text-xs md:text-sm', className)}>
      {exit && (
        <span className="font-cond rounded-sm bg-sun px-2 py-0.5 text-[0.7rem] font-bold tracking-[0.2em] text-ink">EXIT {exit}</span>
      )}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      <span className="font-cond tracking-[0.28em]">{children}</span>
    </p>
  )
}

// A quiet sign post with the miles to the fire. Give it a "to" and it becomes a link, with an arrow
// that drives forward on hover.
export function MileMarker({ place = 'Your place', note = 'We bring the fire to you', to, className }) {
  const base = 'inline-flex flex-col items-center rounded-md border border-white/20 bg-white/[0.04] px-6 py-3 text-white backdrop-blur'
  // Letter spacing leaves a gap after the last letter, so centred tracked text sits a touch left. The matching
  // left padding puts the letters, not the gaps, on the centre line. The arrow hangs outside the text so
  // it never pushes the words off centre.
  const body = (
    <>
      <span className="font-cond pl-[0.4em] text-[0.7rem] tracking-[0.4em] text-white/60">Next stop</span>
      <span className="font-display text-2xl leading-tight">{place}</span>
      <span className="font-cond relative pl-[0.04em] text-sm tracking-[0.04em] text-sun">
        {note}
        {to && (
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="absolute left-full top-1/2 ml-2.5 -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-1.5"
            strokeWidth={2.5}
          />
        )}
      </span>
    </>
  )

  if (!to) return <div className={cn(base, className)}>{body}</div>

  return (
    <Link
      to={to}
      className={cn(
        base,
        'group transition-all duration-300 hover:-translate-y-1 hover:border-sun hover:bg-sun/10 hover:shadow-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun',
        className,
      )}
    >
      {body}
    </Link>
  )
}

// A strip of tarmac with a fine dashed centre line that slowly drives past
export function RoadLine({ className }) {
  const paused = usePauseOffscreen()
  return (
    <div ref={paused} aria-hidden="true" className={cn('relative h-6 w-full overflow-hidden border-y border-white/10 bg-black', className)}>
      <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden opacity-80">
        {/* One dash cycle wider than the strip, slid left by exactly one cycle, so the loop never shows a seam */}
        <div className="road-dash road-dash-track absolute left-0 top-0 h-full w-[calc(100%+112px)]" />
      </div>
    </div>
  )
}
