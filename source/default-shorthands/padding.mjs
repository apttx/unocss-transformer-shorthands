import { Unit } from '../Unit.mjs'

/** @type {import("../types.mjs").ShorthandOption} */
export const p = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const pl = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding-left:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const pr = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding-right:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const pt = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding-top:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const pb = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding-bottom:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const px = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding-left:${dimension};padding-right:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const py = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `padding-top:${dimension};padding-bottom:${dimension};`
}
