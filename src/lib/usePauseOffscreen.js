import { useEffect, useRef } from 'react'

// Anything that loops forever (smoke, embers, tickers, the turntable) should cost nothing while nobody can see it.
// Attach the returned ref to the loop's root element: it is flagged `data-paused="true"` whenever it is off screen,
// and the stylesheet pauses every CSS animation inside a flagged element. It writes to the DOM directly, so there
// is no React render involved and scrolling stays free.
export default function usePauseOffscreen(margin = '120px') {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.paused = entry.isIntersecting ? 'false' : 'true'
      },
      { rootMargin: margin },
    )
    observer.observe(element)

    // A hidden tab should not animate either
    const onVisibility = () => {
      if (document.hidden) element.dataset.paused = 'true'
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [margin])

  return ref
}
