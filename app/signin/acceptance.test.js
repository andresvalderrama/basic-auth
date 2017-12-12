/* global describe before it */
const Browser = require('zombie')

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('localhost', 3000)

describe('User visits signup page', () => {
  const browser = new Browser()

  before(() => {
    return browser.visit('/signin')
  })

  it('should redirect to login', () =>
    browser.assert.status(200)
  )
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
  it('should refuse empty password', (done) => {
    browser.fill('.usermail input[name=usermail]', 'thismailnot@exists.com')
    browser.pressButton('iniciar sesión')
    .then(() => {
      browser.assert.status(202)
      browser.assert.input('.usermail input[name=usermail]', 'thismailnot@exists.com')
      browser.assert.text('.password .error', 'la contraseña que ingreso es incorrecta')
    })
    .then(done, done)
  })
  it('should refuse unregister mails', (done) => {
    browser.fill('input[name=usermail]', 'thismailnot@exists.com')
    browser.fill('input[name=password]', '123456')
    browser.pressButton('iniciar sesión')
      .then(() => {
        browser.assert.status(202)
        browser.assert.elements('.error', 1)
        browser.assert.text('.usermail .error', 'el correo no existe')
        browser.assert.input('input[name="usermail"]', 'thismailnot@exists.com')
        browser.assert.input('input[name="password"]', '')
      })
      .then(done, done)
  })
  it('should refuse wrong password', (done) => {
    browser.fill('input[name=usermail]', 'thismail@exists.com')
    browser.fill('input[name=password]', '7896542')
    browser.pressButton('iniciar sesión')
      .then(() => {
        browser.assert.status(202)
        browser.assert.elements('.error', 1)
        browser.assert.input('input[name=usermail]', 'thismail@exists.com')
        browser.assert.text('.password .error', 'la contraseña que ingreso es incorrecta')
        browser.assert.input('input[name=password]', '')
      })
      .then(done, done)
  })
  it('should redirect to home when correct credentials', (done) => {
    browser.fill('input[name=usermail]', 'thismail@exists.com')
    browser.fill('input[name=password]', '654321')
    browser.pressButton('iniciar sesión')
      .then(() => {
        browser.assert.redirected()
        browser.assert.url('/')
        browser.assert.status('200')
      })
      .then(done, done)
  })
  // it('should keep values on partial submissions')
  // it('should refuse invalid emails')
  // it('should accept complete submissions')
})
