import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import MagneticButton from './MagneticButton'
import PlaceholderScene from './PlaceholderScene'
import Reveal from './Reveal'

export default function ServiceRow({ service, flip }) {
  const { Icon } = service

  return (
    <article id={service.id} className="mx-auto grid max-w-6xl scroll-mt-32 grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
      <Reveal x={flip ? 60 : -60} y={0} className={flip ? 'md:order-2' : ''}>
        <div className="relative">
          <PlaceholderScene
            className="aspect-[4/5] w-full rounded-[2rem] border border-white/10 md:aspect-[5/6]"
            caption={`${service.index} / ${service.title}`}
          />
          <span className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-ember/40 bg-black/50 text-ember backdrop-blur-md">
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>
      </Reveal>

      <Reveal x={flip ? -60 : 60} y={0} delay={0.12}>
        <p className="font-serif text-sm tracking-[0.28em] text-emberGlow">{service.index}</p>
        <h2 className="mt-4 font-serif text-4xl italic leading-[1.05] tracking-tight text-white/90 md:text-6xl">
          {service.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ash/80">{service.tagline}</p>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-ash/60">{service.copy}</p>

        <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ash/75">
              <Check size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-emberGlow" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <MagneticButton>
            <Link
              to={service.cta.to}
              className="inline-flex items-center justify-center rounded-full bg-ember px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(200,54,10,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow"
            >
              {service.cta.label}
            </Link>
          </MagneticButton>
          <p className="text-xs uppercase tracking-[0.28em] text-ash/45">{service.price}</p>
        </div>
      </Reveal>
    </article>
  )
}
