import { Briefcase, Gem, Hammer, Monitor, Mountain, Music, Smile, Star, Store } from 'lucide-react'

export const categories = [
  { name: 'Exhibitions & Expos', hint: 'Trade fairs, art, property', Icon: Monitor },
  { name: 'Food & Markets', hint: 'Festivals, flea, pop-ups', Icon: Store },
  { name: 'Music & Comedy', hint: 'Concerts, stand-up, theatre', Icon: Music },
  { name: 'Culture & Festivals', hint: 'Heritage, dance, celebrations', Icon: Star },
  { name: 'Family & Kids', hint: 'Weekend outings, shows', Icon: Smile },
  { name: 'Workshops & Classes', hint: 'Pottery, art, hobbies', Icon: Hammer },
  { name: 'Adventure & Outdoors', hint: 'Treks, kayaking, rides', Icon: Mountain },
  { name: 'Business & Tech', hint: 'Conferences, job fairs', Icon: Briefcase },
  { name: 'Hidden Gems', hint: 'Places locals love', Icon: Gem },
]

// Category names used by Explore's filter list (everything except Hidden Gems).
export const filterCategories = categories.filter((c) => c.name !== 'Hidden Gems').map((c) => c.name)
