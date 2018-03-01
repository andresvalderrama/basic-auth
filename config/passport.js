const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const query = require('./queries')

const loginFields = {
  usernameField: 'usermail',
  passwordField: 'password',
  passReqToCallback: true
}

module.exports = function () {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    const _user = query.findUserById(id)
    done(null, _user)
  })

  passport.use(new LocalStrategy(loginFields,
    function (req, email, password, done) {

      var isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

      const _user = isEmail
        ? query.findUserByEmail(email)
        : query.findUserByUsername(email)
      let catalog = req.getCatalog()

      console.log('>>>>>>>>>>', _user)

      /* if (_user.err) {
        return done(err)
      } */

      if (!_user) {
        req.flash('values', req.body)
        req.flash('dbError', { usermail: { msg: catalog.singInP.dbUserMailError } })
        return done(null, false)
      }

      if (_user.password !== password) {
        req.flash('values', req.body)
        req.flash('dbError', { password: { msg: catalog.singInP.dbPasswordError } })
        return done(null, false)
      }

      return done(null, _user)
    }
  ))
}
