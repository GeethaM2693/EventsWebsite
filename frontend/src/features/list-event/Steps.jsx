import { Check } from 'lucide-react'

export const stepLabels = ['Organizer details', 'Event details', 'Tickets & photos']

export default function Steps({ step, onGo }) {
  return (
    <ol aria-label="Steps" className="m-0 mt-6 flex list-none flex-col gap-1 p-0">
      {stepLabels.map((label, i) => {
        const n = i + 1
        const active = n === step
        const done = n < step || step === 4
        return (
          <li key={label}>
            <button
              type="button"
              aria-current={active ? 'step' : undefined}
              onClick={() => onGo(n)}
              className={`flex min-h-[52px] w-full cursor-pointer items-center gap-3 rounded-control border-0 px-3 text-left text-[15px] ${active ? 'bg-primary-soft font-bold text-primary-deep' : 'bg-transparent font-semibold text-muted hover:bg-primary-soft/50'}`}
            >
              <span
                className={`flex size-[30px] flex-none items-center justify-center rounded-full text-sm font-extrabold ${active || done ? 'bg-primary text-white' : 'border-[1.5px] border-primary bg-surface text-primary'}`}
              >
                {done ? <Check size={16} strokeWidth={3} aria-label="Completed" /> : n}
              </span>
              {label}
            </button>
          </li>
        )
      })}
    </ol>
  )
}
