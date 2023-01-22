import { parse, walk } from 'css-tree'
import { cssIdRE } from '@unocss/core'

import * as defaultShorthands from './defaultShorthands.mjs'
import { ShorthandFromStringOption } from './user-config-resolution/shorthand-from-string-option.mjs'
import { ShorthandFromFunctionOption } from './user-config-resolution/shorthand-from-function-option.mjs'
import { ShorthandFromObjectOption } from './user-config-resolution/shorthand-from-object-option.mjs'

/** @type {(node: import('css-tree').CssNode) => number | string} */
const NodeValue = (node) => {
  switch (node.type) {
    case 'Number': {
      let result = parseInt(node.value)
      if (isNaN(result)) {
        result = parseFloat(node.value)
      }

      return result
    }
    case 'Raw':
    case 'String': // 'primary'
      return node.value
    case 'Identifier': // primary
      return node.name
    case 'Dimension': // 1rem
      return `${node.value}${node.unit}`
    default:
      console.debug({ unknownValueNodeType: node.type, node })
  }

  return 'null'
}

/** @type {(node: import('css-tree').CssNode) => node is (import('css-tree').Declaration & { loc: import('css-tree').CssLocation })} */
const isDeclarationWithLocation = (node) => !!(node.loc && node.type === 'Declaration')

/**
 * @type {(config: import('./types.mjs').ShorthandsConfig) => import('@unocss/core').SourceCodeTransformer['transform']}
 */
const Transform = (config) => {
  const shorthandsOption = config.shorthands
  const shorthandsRegex = new RegExp(Object.keys(shorthandsOption).join('|'))

  /** @type {import('@unocss/core').SourceCodeTransformer['transform']} */
  const transform = async (code, id, ctx) => {
    // TODO: does this make sense? with a large collection of shorthands (which is intended to be the default), the likelyhood of hitting one is very high
    const hasShorthand = shorthandsRegex.test(code.original)
    if (!hasShorthand) {
      return
    }

    const ast = parse(code.original, {
      parseAtrulePrelude: false,
      positions: true,
      filename: id,
    })

    if (ast.type !== 'StyleSheet') {
      return
    }

    const uno = ctx.uno
    const theme = ctx.uno.config.theme
    /** @type {import('./types.mjs').PluginContext} */
    const pluginContext = { uno, theme }

    /** @type {Promise<void>[]} */
    const stack = []
    /**
     * @type {(
     *  node: import('css-tree').Declaration & { loc: import('css-tree').CssLocation }
     * ) => Promise<void>}
     */
    const processDeclaration = async (node) => {
      const shorthand = shorthandsOption[node.property]

      if (!shorthand) {
        return
      }

      /** @type {import('./types.mjs').ShorthandContext} */
      const shorthandContext = {
        property: node.property,
        value:
          node.value.type === 'Value'
            ? node.value.children.map(NodeValue).filter(Boolean).first
            : NodeValue(node.value),
        cssDeclarationNode: node,
        cssValueNode: node.value,
      }

      const declaration = shorthand(pluginContext, shorthandContext)

      const codeStartOffset = node.loc.start.offset
      const codeEndOffset = node.loc.end.offset
      // replace original code
      code.overwrite(codeStartOffset, codeEndOffset, declaration)
    }

    walk(ast, (node) => {
      if (isDeclarationWithLocation(node)) {
        stack.push(processDeclaration(node))
      }
    })

    await Promise.all(stack)
  }

  return transform
}

/** @type {(entry: any) => entry is [string, import('./types.mjs').ShorthandsFunction]} */
const isShorthandEntry = (entry) =>
  entry && typeof entry[0] === 'string' && typeof entry[1] === 'function'

/**
 * @type {(config?: import('./types.mjs').ShorthandsUserConfig) => import('@unocss/core').SourceCodeTransformer}
 */
export const TransformerShorthands = (config = {}) => {
  /** @type {import('./types.mjs').ShorthandsConfig['shorthands'] | undefined} */
  const userShorthands =
    config.shorthands &&
    Object.fromEntries(
      Object.entries(config.shorthands)
        .map(([shorthandName, option]) => {
          // string option
          if (typeof option === 'string') {
            return [shorthandName, ShorthandFromStringOption(option)]
          }

          // function option
          if (typeof option === 'function') {
            return [shorthandName, ShorthandFromFunctionOption(option)]
          }

          // one of the object options
          // if (typeof option === 'object') {
          //   return [shorthandName, ShorthandFromObjectOption(option)]
          // }

          // invalid option: warn and ignore
          console.warn(
            `[transformer-shorthands] warn: '${JSON.stringify(
              option,
            )}' is not a valid shorthand option.`,
          )
        })
        .filter(isShorthandEntry),
    )

  /** @type {import('./types.mjs').ShorthandsConfig} */
  const finalConfig = {
    ...config,
    shorthands: userShorthands ?? defaultShorthands,
  }

  /** @type {import('@unocss/core').SourceCodeTransformer} */
  const transformer = {
    name: 'css-shorthands',
    enforce: config?.enforce,
    idFilter: (id) => !!id.match(cssIdRE),
    transform: Transform(finalConfig),
  }

  return transformer
}
