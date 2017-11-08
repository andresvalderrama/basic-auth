const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const User = mongoose.model('User')
const User = require('../db/users')

const loginFields = {
  usernameField: 'email',
  passwordField: 'password'
}

module.exports = function () {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    const _user = User.find((user) => user.id === id)
    done(null, _user)
  })

  passport.use(new LocalStrategy(loginFields,
    function (email, password, done) {
      const _user = User.find((user) => user.email === email)

      if (!_user) {
        return done(null, false, { message: 'Incorrect username' })
      }

      if (_user.password !== password) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, _user)
    }
  ))
}
