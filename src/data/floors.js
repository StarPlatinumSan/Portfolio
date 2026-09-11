export const floorIds = [
  'top',
  'echoes',
  'studio',
  'the-lucid',
  'short-film',
  'visual-story-writing',
  'je-suis-quark',
  'maville',
  'prop-hunt',
  'experience',
  'other-projects',
  'skills',
  'education',
  'relevant-courses',
  'contact',
]

export const getFloors = (copy) =>
  floorIds.map((id) => ({ id, label: copy.floors[id] }))
