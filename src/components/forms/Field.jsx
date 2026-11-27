import { useId } from 'react'

const base =
  'w-full rounded-xl border bg-white px-4 py-3.5 text-base font-medium text-ink placeholder:text-ink/40 transition-shadow duration-200 focus:outline-none shadow-sticker'

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
    className: `${base} ${error ? 'border-chili' : 'border-ink'}`,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
        {label}
        {required && <span className="text-chili"> *</span>}
      </label>
      {multiline ? <textarea rows={rows} {...props} /> : <input type={type} {...props} />}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-bold text-chili">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs font-medium text-ink/65">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
