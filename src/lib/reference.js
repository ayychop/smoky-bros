// No 0, O, 1, I or L, so a reference reads cleanly over the phone
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function makeReference(prefix) {
  const code = Array.from({ length: 5 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('')
  return `${prefix} ${code}`
}
