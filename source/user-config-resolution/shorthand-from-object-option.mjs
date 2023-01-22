/**
 * @template {string & number} Value
 * @type {(option: import("../types.mjs").StringFunctionShorthandUserOption<Value>) => import("../types.mjs").ShorthandsFunction} */
export const ShorthandFromObjectOption = (option) => {
  // const {
  //   property: propertyOption,
  //   value: valueOption,
  //   declaration: declarationOption,
  // } = option
  // result.value = valueOption ?? ((_, { value }) => value)
  // if (typeof propertyOption === 'string') {
  //   result.property = () => propertyOption
  // } else {
  //   result.property = propertyOption
  // }
  // result.declaration = declarationOption ?? ((property, value) => `${property}:${value};`)
  return (_, { value }) => `${option}:${value};`
}
