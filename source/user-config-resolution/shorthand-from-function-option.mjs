/**
 * @template {string & number} Value
 * @type {(option: import("../types.mjs").FunctionShorthandUserOption<Value>) => import("../types.mjs").ShorthandsFunction<string>}
 */
export const ShorthandFromFunctionOption = (option) => {
  /** @type {import("../types.mjs").ShorthandsFunction<string>} */
  const shorthand = (context, shorthandContext) =>
    `${shorthandContext.property}:${option(context, shorthandContext) ?? shorthandContext.value};`

  return shorthand
}
