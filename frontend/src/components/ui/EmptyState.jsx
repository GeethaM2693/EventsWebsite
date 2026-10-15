export default function EmptyState({ title, children, actions, dashed = false, className = '' }) {
  return (
    <section className={`rounded-card bg-surface px-6 py-14 text-center ${dashed ? 'border border-dashed border-primary' : 'border border-line'} ${className}`}>
      <h2 className="m-0 text-2xl font-bold">{title}</h2>
      <p className="mx-auto mt-2.5 mb-0 max-w-[480px] text-base leading-relaxed text-muted">{children}</p>
      {actions && <div className="mt-6 flex flex-wrap justify-center gap-3">{actions}</div>}
    </section>
  )
}
