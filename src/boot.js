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

export function markBootSeen() {
  try {
    window.sessionStorage.setItem(KEY, '1')
  } catch {
    // Storage can be blocked, the intro then simply plays again next load
  }
}
