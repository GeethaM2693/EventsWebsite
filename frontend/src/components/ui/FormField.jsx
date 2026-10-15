import { createContext, useContext } from 'react'

// Field errors keyed by input name (e.g. "organizer.email"). Fields read their own error from here.
export const FormErrors = createContext({})
const useError = (name) => useContext(FormErrors)[name]

const control = 'w-full rounded-control border bg-surface px-3.5 text-base text-ink'
const border = (error) => (error ? 'border-accent' : 'border-line')

export function Field({ id, label, hint, optional, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label} {optional && <span className="font-medium text-muted">(optional)</span>}
      </label>
      {children}
      {error ? <span role="alert" className="text-[13px] font-semibold text-accent">{error}</span> : hint && <span className="text-[13px] text-muted">{hint}</span>}
    </div>
  )
}

export function TextInput({ id, label, hint, optional, name, ...rest }) {
  const error = useError(name)
  return (
    <Field id={id} label={label} hint={hint} optional={optional} error={error}>
      <input id={id} name={name} aria-invalid={!!error} className={`${control} ${border(error)} min-h-12`} {...rest} />
    </Field>
  )
}

export function SelectInput({ id, label, options, name, ...rest }) {
  const error = useError(name)
  return (
    <Field id={id} label={label} error={error}>
      <select id={id} name={name} aria-invalid={!!error} className={`${control} ${border(error)} min-h-12`} {...rest}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Field>
  )
}

export function TextArea({ id, label, hint, name, ...rest }) {
  const error = useError(name)
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <textarea id={id} name={name} aria-invalid={!!error} className={`${control} ${border(error)} py-3 leading-relaxed`} {...rest} />
    </Field>
  )
}

export function CheckboxField({ label, className = '', children, ...rest }) {
  return (
    <label className={`flex min-h-9 cursor-pointer items-center gap-2.5 text-[15px] ${className}`}>
      <input type="checkbox" className="size-[18px] accent-primary" {...rest} />
      {children ?? label}
    </label>
  )
}

export function RadioField({ label, ...rest }) {
  return (
    <label className="flex min-h-9 cursor-pointer items-center gap-2.5 text-[15px]">
      <input type="radio" className="size-[18px] accent-primary" {...rest} />
      {label}
    </label>
  )
}

export function FieldGroup({ legend, children, className = '' }) {
  return (
    <fieldset className={`m-0 flex flex-col gap-1 border-0 p-0 ${className}`}>
      <legend className="mb-2 text-[13px] font-bold uppercase tracking-widest text-primary">{legend}</legend>
      {children}
    </fieldset>
  )
}
