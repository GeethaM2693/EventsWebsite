import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const SavedContext = createContext(null)

// Which events/places this browser has saved. Every heart on the site reads from here.
export function SavedProvider({ children }) {
  const [saved, setSaved] = useState({ events: new Set(), places: new Set() })

  useEffect(() => {
    const controller = new AbortController()
    api.get('/saved/ids', { signal: controller.signal })
      .then(({ data }) => setSaved({ events: new Set(data.events), places: new Set(data.places) }))
      .catch(() => {}) // hearts just start empty if the API is unreachable
    return () => controller.abort()
  }, [])

  const isSaved = useCallback((kind, slug) => saved[kind].has(slug), [saved])

  const setItem = useCallback(async (kind, slug, on) => {
    const apply = (value) =>
      setSaved((s) => {
        const next = new Set(s[kind])
        if (value) next.add(slug)
        else next.delete(slug)
        return { ...s, [kind]: next }
      })
    apply(on) // optimistic
    try {
      await (on ? api.put(`/saved/${kind}/${slug}`) : api.del(`/saved/${kind}/${slug}`))
    } catch (err) {
      apply(!on) // roll back
      throw err
    }
  }, [])

  const value = useMemo(
    () => ({ isSaved, setItem, toggle: (kind, slug) => setItem(kind, slug, !saved[kind].has(slug)) }),
    [isSaved, setItem, saved],
  )
  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
}

export const useSaved = () => useContext(SavedContext)
