import { env } from '../config/env.js'

const DAY = 24 * 60 * 60 * 1000
const IST_OFFSET = 5.5 * 60 * 60 * 1000

export const addDays = (d, n) => new Date(d.getTime() + n * DAY)

// Midnight-UTC Date for the current calendar day in India (or APP_TODAY when set).
export function getToday() {
  if (env.appToday) return new Date(`${env.appToday}T00:00:00.000Z`)
  const ist = new Date(Date.now() + IST_OFFSET)
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()))
}

export const parseDay = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s ?? '')) return null
  const d = new Date(`${s}T00:00:00.000Z`)
  return Number.isNaN(d.getTime()) ? null : d
}

// Inclusive [from, to] for the date tabs on Home / Explore / Collections.
export function rangeForTab(tab, today = getToday()) {
  const wd = today.getUTCDay() // 0 = Sun … 6 = Sat
  switch (tab) {
    case 'today':
      return [today, today]
    case 'tomorrow': {
      const t = addDays(today, 1)
      return [t, t]
    }
    case 'weekend': {
      const sat = wd === 6 ? today : wd === 0 ? addDays(today, -1) : addDays(today, 6 - wd)
      const from = sat < today ? today : sat
      return [from, addDays(sat, 1)]
    }
    case 'next-week': {
      const mon = addDays(today, wd === 1 ? 7 : (8 - wd) % 7 || 7)
      return [mon, addDays(mon, 6)]
    }
    case 'month': {
      const last = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0))
      return [today, last]
    }
    default:
      return null
  }
}

export const dateTabs = ['today', 'tomorrow', 'weekend', 'next-week', 'month']

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "Sat 10 Oct" for one day, "9–18 Oct" for a range (and "30 Oct – 2 Nov" across months).
export function formatDateLabel(start, end) {
  const sd = start.getUTCDate()
  const sm = MON[start.getUTCMonth()]
  if (start.getTime() === end.getTime()) return `${WD[start.getUTCDay()]} ${sd} ${sm}`
  const ed = end.getUTCDate()
  const em = MON[end.getUTCMonth()]
  return sm === em ? `${sd}–${ed} ${sm}` : `${sd} ${sm} – ${ed} ${em}`
}
