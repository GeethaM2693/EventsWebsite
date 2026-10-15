const KEY = 'events.recentSearches'
const FALLBACK = ['flea market', 'pottery workshop', 'HITEX']

export function getRecent() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    return Array.isArray(list) && list.length ? list.slice(0, 5) : FALLBACK
  } catch {
    return FALLBACK
  }
}

export function addRecent(q) {
  const term = q.trim()
  if (!term) return
  try {
    const next = [term, ...getRecent().filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, 5)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable — recents just won't persist */
  }
}
