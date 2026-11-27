import Lenis from 'lenis'
import { useEffect } from 'react'

// Shared handle so route changes and anchor links can drive the same smooth scroller
export const lenisRef = { current: null }

export function scrollToTop() {
  if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export function scrollToTarget(target) {
  if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.4, offset: -24 })
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Buttery smooth scrolling, skipped for visitors who ask for reduced motion
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
}
