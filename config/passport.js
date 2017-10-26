const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
//const User = mongoose.model('User')

const loginFields = {
  usernameField: 'email',
  passwordField: 'password'
}

module.exports = function () {
  //serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    //api???
    console.log("deserializeUser called", id)
    User.findOne({ _id: id }, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy( loginFields,
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      });
    }
  ))
}