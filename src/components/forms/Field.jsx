import { useId } from 'react'

const base =
  'w-full rounded-xl border bg-white/5 px-4 py-3.5 text-base text-ash placeholder:text-ash/30 backdrop-blur-md transition-[border-color,box-shadow] duration-300 focus:outline-none focus:border-ember focus:shadow-[0_0_0_3px_rgba(200,54,10,0.25)]'

export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  type = 'text',
  multiline = false,
  rows = 5,
  required = false,
  autoComplete,
  placeholder,
  inputMode,
}) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const props = {
    id,
    name,
    value,
    onChange: (event) => onChange(event.target.value),
    required,
    autoComplete,
    placeholder,
    inputMode,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: `${base} ${error ? 'border-red-400/70' : 'border-white/10'}`,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-ash/55">
        {label}
        {required && <span className="text-emberGlow"> *</span>}
      </label>
      {multiline ? <textarea rows={rows} {...props} /> : <input type={type} {...props} />}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ash/40">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
