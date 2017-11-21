/* global describe before it */
const Browser = require('zombie')

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('localhost', 3333)

describe('User visits signup page', () => {
  const browser = new Browser()

  before(() => {
    return browser.visit('/signin')
  })

  it('should be a successful request', () => {
    browser.assert.status(200)
  })
  it('should show contact page', () => {
    browser.assert.text('title', 'Signin')

    browser.assert.text('article header h2', 'signin')

    browser.assert.elements('form', 1)
    browser.assert.className('form', 'local-login')
    browser.assert.attribute('.local-login', 'action', '/signin')
    browser.assert.attribute('.local-login', 'method', 'post')

    browser.assert.className('form fieldset.usermail', 'usermail')
    browser.assert.attribute('.usermail label', 'for', 'usermail')
    browser.assert.text('.usermail label', 'iniciar sesión')
    browser.assert.attribute('.usermail input', 'type', 'text')
    browser.assert.attribute('.usermail input', 'name', 'usermail')
    browser.assert.attribute('.usermail input', 'id', 'usermail')

    browser.assert.className('form fieldset.password', 'password')
    browser.assert.attribute('.password label', 'for', 'password')
    browser.assert.text('.password label', 'contraseña')
    browser.assert.attribute('.password input', 'type', 'password')
    browser.assert.attribute('.password input', 'name', 'password')
    browser.assert.attribute('.password input', 'id', 'password')

    browser.assert.className('form fieldset.remember-me', 'remember-me')
    browser.assert.text('.remember-me label', 'recordar me')
    browser.assert.attribute('.remember-me label', 'for', 'remember-me')
    browser.assert.attribute('.remember-me input', 'type', 'checkbox')
    browser.assert.attribute('.remember-me input', 'id', 'remember-me')

    browser.assert.className('form fieldset.footer', 'footer submit')
    browser.assert.attribute('.submit input[type=hidden]', 'name', '_csrf')
    browser.assert.attribute('.submit input[type=submit]', 'value', 'iniciar sesión')

    browser.assert.link('form .amnesia', '¿olvido su contraseña?', '/amnesia')

    browser.assert.elements('form fieldset', 4)
  })

  it('should refuse wrong mails', (done) => {
    browser.fill('.usermail input[name=usermail]', '_andresvalderrama')
    browser.pressButton('iniciar sesión')
      .then(() => {
        browser.assert.status(202)
        browser.assert.text('.usermail .error', 'el correo que ingreso es incorrecto')
        browser.assert.input('.usermail input[name=usermail]', '')
      })
      .then(done, done)
  })
  it('should refuse empty password')
  // it('should keep values on partial submissions')
  // it('should refuse invalid emails')
  // it('should accept complete submissions')
})
