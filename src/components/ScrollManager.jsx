import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTarget, scrollToTop } from '../lib/lenis'

const TITLES = {
  '/': 'Smoky Bros BBQ | Made in Smoke, Premium BBQ Catering in Maidenhead',
  '/services': 'Services | Smoky Bros BBQ',
  '/book': 'Book an Event | Smoky Bros BBQ',
  '/enquiry': 'Enquiries | Smoky Bros BBQ',
  '/brand': 'Brand Identity | Smoky Bros BBQ',
}

// Resets scroll on every route change, and lands on #anchors when the URL has one.
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] ?? 'Not found | Smoky Bros BBQ'
  }, [pathname])

  useEffect(() => {
    if (!hash) {
      scrollToTop()
      return undefined
    }

    // Wait a beat so the incoming page has mounted before we look for the anchor
    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1))
      if (target) scrollToTarget(target)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
