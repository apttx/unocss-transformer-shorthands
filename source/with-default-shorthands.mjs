import * as defaultShorthands from './defaultShorthands.mjs'

/** @type {(shorthands: import("./types.mjs").ShorthandsUserConfig['shorthands']) => import("./types.mjs").ShorthandsUserConfig['shorthands']} */
export const withDefaultShorthands = (shorthands) => {
  const defaultShorthandOptions = Object.fromEntries(
    Object.entries(defaultShorthands).map(([name, shorthand]) => [
      name,
      { shorthand: /** @type {import("./types.mjs").ShorthandsFunction} */ (shorthand) },
    ]),
  )

  return {
    ...defaultShorthandOptions,
    ...shorthands,
  }
}
