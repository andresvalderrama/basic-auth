const router = require('express').Router()
const passport = require('passport')

const csrfProtection = require('../../config/csrf')
const signinCtrl = require('./controller')
const signinVldtr = require('./validator')

/*
 * el fomulario debe traer un email
 * se ejecuta el middleware csrfProtection
 *  false ???
 * se valida si es un email
 *  false -> se redirecciona a GET /amnesia con error
 * se consulta el email
 *  false -> se redirecciona a GET /amnesia con error
 * se redirecciona a GET /amnesia con var-success
 *
 * */

router.get('/signin', csrfProtection, signinCtrl.render)

/* app.get('/protected', function (req, res, next) {
  passport.authenticate('local', function (err, user, info, status) {
    if (err) { return next(err) }
    if (!user) { return res.redirect('/signin') }
    res.redirect('/account')
  })(req, res, next)
}) */

router.post('/signin', csrfProtection, signinVldtr, passport.authenticate('local', {
  failureRedirect: '/signup',
  failureFlash: true
}), (req, res) => {
  const _redirectTo = req.flash('redirectTo')[0] || '/'
  res.redirect(_redirectTo)
})

module.exports = router
