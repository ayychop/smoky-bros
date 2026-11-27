import { cn } from '../lib/cn'

// A small round seal with a short message in it: a fine double ring in orange, like a stamp of approval.
// `fill` and `color` stay for older callers, but the seal now picks a tone itself.
// eslint-disable-next-line no-unused-vars
export default function Burst({ children, className, style, fill, color }) {
  return (
    <div className={cn('relative grid place-items-center rounded-full bg-ink text-white', className)} style={style}>
      <span aria-hidden="true" className="absolute inset-0 rounded-full border border-sun/80" />
      <span aria-hidden="true" className="absolute inset-[5px] rounded-full border border-dashed border-white/30" />
      <span className="font-cond relative px-3 text-center text-[0.65rem] leading-[1.2] tracking-[0.16em] md:text-xs">{children}</span>
    </div>
  )
}
