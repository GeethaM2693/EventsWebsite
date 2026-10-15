import { CheckboxField, Field, FieldGroup, RadioField } from '../../components/ui/FormField'
import { filterAreas, goodForOptions, priceOptions } from '../../data/filters'
import { filterCategories } from '../../data/categories'

export default function ExploreFilters({ filters, onToggleCategory, onChange, onClear }) {
  return (
    <aside aria-label="Filters" className="flex max-w-full flex-[1_1_240px] flex-col gap-7">
      <div className="flex items-baseline justify-between">
        <h2 className="m-0 text-lg font-bold">Filters</h2>
        <button type="button" onClick={onClear} className="min-h-11 cursor-pointer border-0 bg-transparent text-sm font-bold text-primary">
          Clear all
        </button>
      </div>

      <FieldGroup legend="Category">
        {filterCategories.map((name) => (
          <CheckboxField
            key={name}
            label={name}
            checked={filters.categories.includes(name)}
            onChange={() => onToggleCategory(name)}
          />
        ))}
      </FieldGroup>

      <Field id="x-area" label="Area">
        <select
          id="x-area"
          value={filters.area}
          onChange={(e) => onChange({ area: e.target.value })}
          className="min-h-12 w-full rounded-control border border-line bg-surface px-3.5 text-[15px]"
        >
          {filterAreas.map((a) => <option key={a}>{a}</option>)}
        </select>
      </Field>

      <FieldGroup legend="Price">
        {priceOptions.map((p) => (
          <RadioField key={p} name="price" label={p} checked={filters.price === p} onChange={() => onChange({ price: p })} />
        ))}
      </FieldGroup>

      <FieldGroup legend="Good for">
        {goodForOptions.map((g) => (
          <CheckboxField
            key={g}
            label={g}
            checked={filters.goodFor.includes(g)}
            onChange={() =>
              onChange({ goodFor: filters.goodFor.includes(g) ? filters.goodFor.filter((x) => x !== g) : [...filters.goodFor, g] })
            }
          />
        ))}
      </FieldGroup>
    </aside>
  )
}
