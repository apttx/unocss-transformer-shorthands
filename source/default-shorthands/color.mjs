/** @type {import("../types.mjs").ShorthandOption<string>} */
export const color = ({ theme }, { value }) => {
  const themeValue = theme.colors?.[value] ?? value

  return `color:${themeValue};`
}
