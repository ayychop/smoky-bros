import { CalendarCheck, Flame, MessageSquare, UtensilsCrossed } from 'lucide-react'
import { PROCESS } from '../data/site'
import Plate from './Plate'
import Reveal from './Reveal'
import { ExitSign } from './RoadSign'
import Scallop from './Scallop'
import Smoke from './Smoke'

const ICONS = [MessageSquare, CalendarCheck, UtensilsCrossed, Flame]
const LEAN = [15, 5, -5, -15]

export default function ProcessSteps() {
  return (
    <section className="ember-glow relative isolate overflow-hidden bg-ink px-6 pb-20 pt-24 text-white">
      <Smoke tone="dark" plumes={3} wisps={3} />
      <Scallop />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-12">
          <ExitSign exit="04" className="text-white">
            How it works
          </ExitSign>
          <h2 className="mt-4 font-display text-4xl text-white md:text-6xl">From enquiry to embers</h2>
        </Reveal>

        <ol className="mt-4 grid list-none gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:[perspective:1500px]">
          {PROCESS.map((step, index) => (
            <Plate
              key={step.index}
              number={step.index}
              label={`Step ${index + 1}`}
              title={step.title}
              copy={step.copy}
              Icon={ICONS[index]}
              lean={LEAN[index]}
              delay={index * 0.1}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
