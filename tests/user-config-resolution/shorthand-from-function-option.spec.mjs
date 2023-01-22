import { describe, test, expect } from 'vitest'
import { ShorthandFromStringOption } from '../../source/user-config-resolution/shorthand-from-string-option.mjs'
import { pluginContext } from '../fixtures/pluginContext.mjs'

const shorthandContext = /** @type {import('../../source/types.mjs').ShorthandContext<string>} */ ({
  value: 'test-value',
})

describe('string user user option resolver', () => {
  const actual = ShorthandFromStringOption('test-shorthand')

  test('returns a function', () => {
    expect(actual).toBeTypeOf('function')
  })

  test('returns a function', () => {
    const returnValue = actual(pluginContext, shorthandContext)

    expect(returnValue).toEqual('test-shorthand:test-value;')
  })
})
