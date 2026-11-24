import { Check } from 'lucide-react'

// Accessible single or multi select built from buttons.
// multiple=false behaves as a radio group, multiple=true as a set of toggles.
export default function ChoiceGroup({ label, options, value, onChange, multiple = false, error, columns = 'sm:grid-cols-2' }) {
  const isOn = (id) => (multiple ? value.includes(id) : value === id)

  // Multi-select hands the parent an updater, so rapid taps never overwrite each other
  const toggle = (id) => {
    if (!multiple) return onChange(id)
    return onChange((current) => (current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]))
  }

  return (
    <fieldset>
      <legend className="mb-3 text-[11px] uppercase tracking-[0.28em] text-ash/55">{label}</legend>
      <div role={multiple ? 'group' : 'radiogroup'} className={`grid grid-cols-1 gap-3 ${columns}`}>
        {options.map((option) => {
          const on = isOn(option.id)
          const { Icon } = option
          return (
            <button
              key={option.id}
              type="button"
              role={multiple ? undefined : 'radio'}
              aria-checked={multiple ? undefined : on}
              aria-pressed={multiple ? on : undefined}
              onClick={() => toggle(option.id)}
              className={`grill-card group relative flex items-start gap-4 rounded-2xl border p-5 text-left backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emberGlow ${
                on
                  ? 'border-ember bg-ember/10 shadow-[0_0_34px_rgba(200,54,10,0.25)]'
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
            >
              {Icon && (
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    on ? 'border-ember bg-ember text-white' : 'border-ember/40 bg-ember/10 text-ember'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-xl tracking-tight text-ash">{option.label}</span>
                {option.blurb && <span className="mt-1 block text-sm leading-relaxed text-ash/55">{option.blurb}</span>}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  on ? 'scale-100 border-ember bg-ember text-white' : 'scale-90 border-white/20 text-transparent'
                }`}
              >
                <Check size={13} strokeWidth={2.4} />
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </fieldset>
  )
}
