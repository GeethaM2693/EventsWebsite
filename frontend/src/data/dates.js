// October 2026 starts on a Thursday. Days are numbered from Oct 1 (Nov 1 = 32, Dec 1 = 62).
export const TODAY = 10
export const MONTHS = [
  { name: 'October 2026', short: 'Oct', lead: 4, days: 31, base: 0 },
  { name: 'November 2026', short: 'Nov', lead: 0, days: 30, base: 31 },
  { name: 'December 2026', short: 'Dec', lead: 2, days: 31, base: 61 },
]
export const WEEKDAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const dayLabel = (i) => {
  const m = i > 61 ? MONTHS[2] : i > 31 ? MONTHS[1] : MONTHS[0]
  return `${WD[(4 + i - 1) % 7]} ${i - m.base} ${m.short}`
}

export const presets = [
  { label: 'Next 7 days', a: 10, b: 16 },
  { label: 'Next 2 weekends', a: 17, b: 25 },
  { label: 'Rest of October', a: 10, b: 31 },
  { label: 'November', a: 32, b: 61 },
]

export const timesOfDay = [
  { label: 'Morning', sub: 'before 12' },
  { label: 'Afternoon', sub: '12–5' },
  { label: 'Evening', sub: '5–9' },
  { label: 'Late night', sub: 'after 9' },
]

export const dateTabs = ['Today', 'Tomorrow', 'This Weekend', 'Next Week', 'This Month']

// Day number (1 = 1 Oct 2026, 32 = 1 Nov …) → 'YYYY-MM-DD'.
export const dayToISO = (i) => new Date(Date.UTC(2026, 9, i)).toISOString().slice(0, 10)

// 'YYYY-MM-DD' → day number, or null outside the calendar's range.
export const isoToDay = (iso) => {
  const n = Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.UTC(2026, 9, 1)) / 86400000) + 1
  return n >= 1 && n <= 92 ? n : null
}

// UI time-of-day label → API value
export const timeOfDayParam = { Morning: 'morning', Afternoon: 'afternoon', Evening: 'evening', 'Late night': 'late-night' }
