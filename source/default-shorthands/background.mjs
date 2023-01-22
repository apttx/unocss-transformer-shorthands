/** @type {import("../types.mjs").ShorthandOption} */
export const bg = ({ theme }, { value }) => {
  const themeValue = theme.colors?.[value] ?? value

  return `background:${themeValue};`
}
