import { useSyncExternalStore } from 'react'

const KEY = 'smokybros-boot-seen'

function readSeen() {
  try {
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

// Evaluated once per page load, so every component agrees on whether the intro plays
export const BOOT_PLAYS = typeof window !== 'undefined' && !readSeen()

// Timeline of the intro, in seconds. The wipe starts at BOOT_WIPE_AT and the site is revealed under it.
export const BOOT_WIPE_AT = 3.6
export const BOOT_WIPE_FOR = 1

export function markBootSeen() {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    // Storage can be blocked, the intro then simply plays again next load
  }
}

// The hero and nav wait for this, so they enter exactly as the wipe begins,
// whether the intro ran to the end or the visitor skipped it.
let done = !BOOT_PLAYS
const listeners = new Set()

export function finishBoot() {
  if (done) return
  done = true
  markBootSeen()
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useBootDone() {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => true,
  )
}
