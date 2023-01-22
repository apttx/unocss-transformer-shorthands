import { describe, test, expect } from 'vitest'

import { bg } from '../../source/default-shorthands/background.mjs'
import { pluginContext } from '../fixtures/pluginContext.mjs'

describe('bg shorthand', () => {
  test('is a function', () => {
    expect(bg).toBeTypeOf('function')
  })

  test.todo('resolves a color', () => {
    const shorthandContext =
      /** @type {import('../../source/types.mjs').ShorthandContext<string>} */ ({
        property: 'bg',
        value: 'primary',
      })
    const returnValue = bg(pluginContext, shorthandContext)

    expect(returnValue).toEqual('background-color:SlateBlue;')
  })

  test.todo('resolves an image', () => {
    const shorthandContext =
      /** @type {import('../../source/types.mjs').ShorthandContext<string>} */ ({
        property: 'bg',
        value: 'checkers',
      })
    const returnValue = bg(pluginContext, shorthandContext)

    expect(returnValue).toEqual("background-image:url('checkers.svg');")
  })

  test('returns unrecognised value', () => {
    const shorthandContext =
      /** @type {import('../../source/types.mjs').ShorthandContext<string>} */ ({
        property: 'bg',
        value: 'does not exist',
      })
    const returnValue = bg(pluginContext, shorthandContext)

    expect(returnValue).toEqual('background:does not exist;')
  })
})
