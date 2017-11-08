const express = require('express')
const passport = require('passport')
const router = express.Router()

const auth = require('./middlewares')
const validator = require('./validators')

const home = require('../app/home/controller')
const signin = require('../app/signin/controller')
const signup = require('../app/signup/controller')
const amnesia = require('../app/amnesia/controller')

router.get('/signin', signin.render)
router.post('/signin', validator.signin, passport.authenticate('local', {
  failureRedirect: '/signin',
  failureFlash: true
}), signin.authenticated)

router.get('/amnesia', amnesia.render)

router.get('/signup', signup.render)

/*
router.get('/signup', (req, res) => {
  res.render('auth/signin', login.render)
})

router.get('/signout', (req, res) => {
  res.render('auth/signin', login.render)
}) */

router.get('/locale', function (req, res) {
  res.cookie('locale', req.query.locale)
  res.redirect('/')
})

router.get('/', auth.isLoggin, home.render)

module.exports = router
