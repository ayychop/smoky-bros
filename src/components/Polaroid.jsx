import { cn } from '../lib/cn'

// A framed photo print with a small caption under it. At rest it is calm and a little moody;
// under the pointer the food lights up: brighter, richer, a warm glow along the edge and a slow push in.
export default function Polaroid({ src, alt, caption, className, imgClassName, priority = false }) {
  return (
    <figure
      className={cn(
        'group/print relative overflow-hidden rounded-md border border-white/15 bg-ink p-1.5 pb-9 shadow-sticker transition-all duration-500 hover:border-gold/70 hover:shadow-[0_0_44px_-6px_rgba(255,183,3,0.42)]',
        className,
      )}
    >
      <span className="relative block overflow-hidden rounded-[3px]">
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={cn(
            'aspect-square w-full object-cover transition-[filter,transform] duration-700 ease-out [filter:saturate(1.12)_contrast(1.05)_brightness(1.06)] group-hover/print:scale-[1.06] group-hover/print:[filter:saturate(1.38)_contrast(1.08)_brightness(1.32)]',
            imgClassName,
          )}
        />
        {/* Warm light rising from the bottom edge of the photo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_80%_at_50%_100%,rgba(255,183,3,0.3),transparent)] opacity-0 transition-opacity duration-500 group-hover/print:opacity-100"
        />
      </span>
      {caption && (
        <figcaption className="font-cond absolute inset-x-2 bottom-2.5 text-center text-xs leading-none tracking-[0.3em] text-white/80 transition-colors duration-500 group-hover/print:text-gold">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
