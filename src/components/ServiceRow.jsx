import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SHOWCASE } from '../data/site'
import MagneticButton from './MagneticButton'
import Polaroid from './Polaroid'
import Reveal from './Reveal'
import { ExitSign } from './RoadSign'

// Each service gets a real food photo in a thin frame
const PHOTOS = {
  'private-catering': { item: SHOWCASE[0], caption: 'Cooked at your place', tilt: '' },
  'street-food': { item: SHOWCASE[1], caption: 'Hot and ready', tilt: '' },
  partnerships: { item: SHOWCASE[2], caption: 'Better together', tilt: '' },
}

export default function ServiceRow({ service, flip }) {
  const { Icon } = service
  const photo = PHOTOS[service.id] ?? PHOTOS['private-catering']

  return (
    <article id={service.id} className="mx-auto grid max-w-6xl scroll-mt-32 grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
      <Reveal x={flip ? 60 : -60} y={0} className={flip ? 'md:order-2' : ''}>
        <div className="relative mx-auto max-w-md">
          <Polaroid src={photo.item.image} alt={photo.item.alt} caption={photo.caption} className={photo.tilt} imgClassName="aspect-[5/4]" />
          <span
            className="absolute -right-3 -top-5 flex h-16 w-16 items-center justify-center rounded-full border border-sun bg-ink text-sun shadow-ember"
          >
            <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>
      </Reveal>

      <Reveal x={flip ? -60 : 60} y={0} delay={0.12}>
        <ExitSign exit={service.index}>
          What we do
        </ExitSign>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] text-ink md:text-6xl">{service.title}</h2>
        <p className="mt-5 text-lg font-semibold leading-relaxed text-chili">{service.tagline}</p>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-ink/70">{service.copy}</p>

        <ul className="mt-6 space-y-3">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base text-ink">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember/10 text-ember">
                <Check size={13} strokeWidth={2.5} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <MagneticButton>
            <Link
              to={service.cta.to}
              className="inline-flex items-center justify-center rounded-full bg-chili px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame hover:shadow-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
            >
              {service.cta.label}
            </Link>
          </MagneticButton>
          <p className="font-marker text-sm text-ink/70">{service.price}</p>
        </div>
      </Reveal>
    </article>
  )
}
