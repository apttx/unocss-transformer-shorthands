import { Unit } from '../Unit.mjs'

/** @type {import("../types.mjs").ShorthandOption} */
export const m = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const ml = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin-left:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const mr = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin-right:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const mt = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin-top:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const mb = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin-bottom:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const mx = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin-left:${dimension};margin-right:${dimension};`
}

/** @type {import("../types.mjs").ShorthandOption} */
export const my = (_, { value }) => {
  const dimension = typeof value === 'number' ? Unit(value) : value

  return `margin-top:${dimension};margin-bottom:${dimension};`
}
