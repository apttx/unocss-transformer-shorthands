/** @type {(option: import("../types.mjs").StringShorthandUserOption) => import("../types.mjs").ShorthandsFunction} */
export const ShorthandFromStringOption =
  (option) =>
  (_, { value }) =>
    `${option}:${value};`
