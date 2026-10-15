// Turns the flat { "organizer.name": … } form values into the API's submission payload.
export function setIn(obj, path, value) {
  const [head, ...rest] = path.split('.')
  return { ...obj, [head]: rest.length ? setIn(obj[head] ?? {}, rest.join('.'), value) : value }
}

export function stepForField(name) {
  if (name.startsWith('organizer.')) return 1
  if (name.startsWith('event.')) return 2
  return 3
}

export function buildPayload(values, entry, { draft = false } = {}) {
  return {
    draft,
    organizer: values.organizer ?? {},
    event: values.event ?? {},
    entry,
    price: values.price,
    ticketLink: values.ticketLink,
    photoCount: values.photoCount ?? 0,
    confirmed: values.confirmed === true,
  }
}
