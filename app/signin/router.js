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
router.post('/signin', csrfProtection, signinVldtr, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}))

module.exports = router
