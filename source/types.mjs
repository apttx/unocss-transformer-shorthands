/**
 * plugin context
 *
 * @typedef {{
 *  uno: import('@unocss/core').UnoGenerator
 *  theme: import('@unocss/core').UnoGenerator['config']['theme']
 * }} PluginContext
 */

/**
 * context of a specific (shorthand) property-value declaration
 *
 * css code, f.e. `bg: primary;`. this context's `property` here is the shorthand (`bg`), and its `value` is the value (`primary`).
 *
 * @template {string | number | null} [Value=string | number | null]
 * @typedef {{
 *  property: string
 *  value: Value
 *  cssDeclarationNode: import('css-tree').Declaration
 *  cssValueNode: import('css-tree').Declaration['value']
 * }} ShorthandContext
 */

/**
 * a function called by the plugin to either get a property name or a value
 *
 * @template {string | number} [Value=string | number]
 * @template {string | number} [Return=string]
 * @typedef {(context: PluginContext, config: ShorthandContext<Value>) => Return} ShorthandsFunction
 */

/**
 * replaces the shorthand property with the specified property
 *
 * config:
 *  TransformerShorthands({
 *    shorthands: {
 *      bg: 'background',
 *    },
 *  })
 *
 * written -> transpiled:
 *  bg: blue; -> background: blue;
 *
 * @typedef {string} StringShorthandUserOption
 */

/**
 * replaces the value of a property based on the specified function
 *
 * config: {
 *  transformers: [
 *    TransformerShorthands({
 *      shorthands: {
 *        color: ({ theme }, { value }) => theme.colors?.[value] || value,
 *      },
 *    })
 *  ],
 *  theme: {
 *    colors: {
 *      primary: 'blue',
 *    },
 *  },
 * }
 *
 * written -> transpiled:
 *  color: primary; -> color: blue;
 *
 * @template {string | number} [Value=string | number]
 * @typedef {ShorthandsFunction} FunctionShorthandUserOption
 */

/**
 * replaces the shorthand property with the specified property
 *
 * config: {
 *  transformers: [
 *    TransformerShorthands({
 *      shorthands: {
 *        bg: {
 *          targetProperty: 'background',
 *          value: ({ theme }, { value }) => theme.colors?.[value] || value,
 *        },
 *      },
 *    })
 *  ],
 *  theme: {
 *    colors: {
 *      primary: 'blue',
 *    },
 *  },
 * }
 *
 * written -> transpiled:
 *  bg: primary; -> background: blue;
 *
 * @template {string | number} [Value=string | number]
 * @typedef {{
 *  property: string,
 *  value: ShorthandsFunction<Value>
 * }} StringFunctionShorthandUserOption
 */

/**
 * replaces the shorthand property with the specified property and its value with the return value of the specified function
 *
 * config: {
 *  transformers: [
 *    TransformerShorthands({
 *      shorthands: {
 *        bg: {
 *          property: ({ theme }, { value }) => value.includes('url(') ? 'background-image' : 'background',
 *          value: ({ theme }, { value }) => (value.includes('url(') ? theme.images[value] : theme.colors?.[value]) || value,
 *        },
 *      },
 *    })
 *  ],
 *  theme: {
 *    colors: {
 *      primary: 'blue',
 *    },
 *    images: {
 *      checkers: "url('images/checkers.svg)",
 *    },
 *  }
 * }
 *
 * written -> transpiled:
 *  bg: primary; -> background: blue;
 *  bg: checkers; -> background-image: url('images/checkers.svg);
 *
 * @template {string | number} [Value=string | number]
 * @typedef {{
 *  property: ShorthandsFunction<string>
 *  value: ShorthandsFunction<Value>
 * }} PropertyFunctionShorthandUserOption
 */

/**
 * replaces the shorthand property with the specified property and its value with the return value of the specified function
 *
 * config: {
 *  transformers: [
 *    TransformerShorthands({
 *      shorthands: {
 *        mx: {
 *          value: ({ theme }, { value }) => (value.includes('url(') ? theme.images[value] : theme.colors?.[value]) || value,
 *          declaration: ({ theme }, { value }) => value.includes('url(') ? 'background-image' : 'background',
 *        },
 *      },
 *    })
 *  ],
 *  theme: {
 *    colors: {
 *      primary: 'blue',
 *    },
 *    images: {
 *      checkers: "url('images/checkers.svg)",
 *    },
 *  }
 * }
 *
 * written -> transpiled:
 *  bg: primary; -> background: blue;
 *  bg: checkers; -> background-image: url('images/checkers.svg);
 *
 * @template {string | number} [Value=string | number]
 * @typedef {{
 *  value?: ShorthandsFunction<Value>
 *  declaration?: (property: string, value: Value) => string
 * }} DeclarationFunctionShorthandUserOption
 */

/**
 * replaces the shorthand property with the specified property and its value with the return value of the specified function
 *
 * @template {string | number} [Value=string | number]
 * @typedef {{
 *  shorthand?: ShorthandsFunction<Value>
 * }} RawShorthandUserOption
 */

/**
 * @template {string | number} [Value=string | number]
 * @typedef {StringShorthandUserOption | FunctionShorthandUserOption<Value> | StringFunctionShorthandUserOption<Value> | PropertyFunctionShorthandUserOption<Value> | RawShorthandUserOption<Value>} ShorthandUserOption
 */

/**
 * @typedef {{
 *  shorthands?: { [key: string]: ShorthandUserOption }
 * } & Pick<import('@unocss/core').SourceCodeTransformer, 'enforce'>} ShorthandsUserConfig
 */

/**
 * @deprecated
 * @template {string | number} [Value=string | number]
 * @typedef {{
 *  property: ShorthandsFunction<string>
 *  value: ShorthandsFunction<Value>
 *  declaration: (property: string, value: Value) => string
 * }} LegacyShorthandOption
 */

/**
 * @template {string | number} [Value=string | number]
 * @typedef {ShorthandsFunction<Value, string>} ShorthandOption
 */

/**
 * @typedef {{
 *  shorthands: { [shorthandName: string]: ShorthandOption }
 * } & Pick<import('@unocss/core').SourceCodeTransformer, 'enforce'>} ShorthandsConfig
 */
