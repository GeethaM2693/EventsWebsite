const KEY = 'events.clientId'

// Anonymous per-browser id used to keep saved events until sign-in exists.
export function getClientId() {
  try {
    let id = localStorage.getItem(KEY)
    if (!id) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`).replace(/[^A-Za-z0-9_-]/g, '-')
      localStorage.setItem(KEY, id)
    }
    return id
  } catch {
    return 'anonymous-session-id-0000' // storage blocked: saves still work for this page load
  }
}
