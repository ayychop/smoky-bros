import { cn } from '../lib/cn'
import usePauseOffscreen from '../lib/usePauseOffscreen'

// An endless strip. Two identical halves make a -50% shift seamless, so the loop has no seam.
// The slide is a CSS transform animation, so it runs on the GPU and never wakes the main thread,
// and it pauses itself while the strip is off screen.
export default function Ticker({ children, duration = 45, reverse = false, className, label }) {
  const paused = usePauseOffscreen()

  const half = (hidden) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {children}
    </div>
  )

  return (
    <div ref={paused} aria-label={label} className={cn('overflow-hidden', className)}>
      <div className={cn('ticker-track flex w-max', reverse && 'is-reverse')} style={{ '--ticker-duration': `${duration}s` }}>
        {half(false)}
        {half(true)}
      </div>
    </div>
  )
}
