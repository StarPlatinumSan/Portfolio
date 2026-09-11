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
]

export const flowSectionIds = [
  'other-projects',
  'experience',
  'skills',
  'education',
  'relevant-courses',
  'contact',
]

export const sectionIds = [...floorIds, ...flowSectionIds]

export const getFloors = (copy) =>
  floorIds.map((id) => ({ id, label: copy.floors[id] }))

export const getSections = (copy) =>
  sectionIds.map((id) => ({ id, label: copy.floors[id] }))
