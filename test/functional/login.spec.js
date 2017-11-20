/* global describe before it */
const Browser = require('zombie')

describe('User visit login page', () => {
  const browser = new Browser()

  before(() => {
    return browser.visit('/signin')
  })

  describe('login page', () => {
    it('should be successful', () => {
      browser.assert.success()
    })
  })
})
