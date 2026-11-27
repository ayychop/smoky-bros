import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge conditional class names and let the last Tailwind utility win
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
