import { describe, test, expect } from 'vitest'
import { ShorthandFromFunctionOption } from '../../source/user-config-resolution/shorthand-from-function-option.mjs'
import { pluginContext } from '../fixtures/pluginContext.mjs'

const shorthandContext = /** @type {import('../../source/types.mjs').ShorthandContext<string>} */ ({
  property: 'test-property',
})

describe('string user user option resolver', () => {
  const actual = ShorthandFromFunctionOption(() => 'arbitrary value')

  test('returns a function', () => {
    expect(actual).toBeTypeOf('function')
  })

  test('returns a function', () => {
    const returnValue = actual(pluginContext, shorthandContext)

    expect(returnValue).toEqual(`test-property:arbitrary value;`)
  })
})
