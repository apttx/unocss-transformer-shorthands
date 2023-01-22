/** @type {import('../types.mjs').ShorthandsFunction<string | number>} */
export const text = ({ theme }, { property, value }) => {
  const color = theme.colors?.[value]

  if (color) {
    return `color:${color};`
  }

  const size = theme.fontSize?.[value]

  if (size) {
    return 'font-size:'
  }

  return `${property}:${value};`
}
