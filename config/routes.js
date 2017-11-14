const express = require('express')
const passport = require('passport')
const router = express.Router()

const validator = require('./validators')

const amnesiaCtrl = require('../app/amnesia/controller')
const amnesiaVldtr = require('../app/amnesia/validator')

const home = require('../app/home/controller')
const signin = require('../app/signin/controller')

router.get('/', home.render)
router.get('/signin', signin.render)
router.post('/signin', validator.signin, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}))

router.get('/amnesia', amnesiaVldtr.validate, amnesiaCtrl.render)

// router.get('/signup', signup.render)

/*
router.get('/signup', (req, res) => {
  res.render('auth/signin', login.render)
})

router.get('/signout', (req, res) => {
  res.render('auth/signin', login.render)
}) */

router.get('/locale', function (req, res) {
  let redirectPath = req.query.redirect || '/'
  res.cookie('locale', req.query.locale)

  res.redirect(redirectPath)
})

module.exports = router
