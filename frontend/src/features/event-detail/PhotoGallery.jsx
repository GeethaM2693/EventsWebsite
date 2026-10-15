import PhotoPlaceholder from '../../components/ui/PhotoPlaceholder'

export default function PhotoGallery({ photos }) {
  const [main, a, b] = photos
  return (
    <section aria-label="Photos" className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
      <PhotoPlaceholder tone={main.tone} label={main.label} className="min-h-[420px] rounded-card sm:col-span-2" />
      <div className="grid gap-3">
        <PhotoPlaceholder tone={a.tone} label={a.label} className="min-h-[204px] rounded-card" />
        <PhotoPlaceholder tone={b.tone} label={b.label} className="min-h-[204px] rounded-card">
          <button type="button" className="absolute right-3 bottom-3 min-h-11 cursor-pointer rounded-control border-0 bg-surface px-3.5 text-sm font-bold text-primary">
            View all photos
          </button>
        </PhotoPlaceholder>
      </div>
    </section>
  )
}
