import { cn } from '../lib/cn'

// A framed photo print with a small caption under it: thin frame, deep shadow, nothing loud
export default function Polaroid({ src, alt, caption, className, imgClassName }) {
  return (
    <figure className={cn('relative overflow-hidden rounded-md border border-white/15 bg-ink p-1.5 pb-9 shadow-sticker', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('aspect-square w-full rounded-[3px] object-cover [filter:saturate(1.08)_contrast(1.06)]', imgClassName)}
      />
      {caption && (
        <figcaption className="font-cond absolute inset-x-2 bottom-2.5 text-center text-xs leading-none tracking-[0.3em] text-white/80">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
