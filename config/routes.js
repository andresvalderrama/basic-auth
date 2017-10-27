const express = require('express')
const passport = require('passport')
const router = express.Router();

const auth = require('./middlewares')

const home = require('../app/home/controller')
const signin = require('../app/signin/controller')
const signup = require('../app/signup/controller')
const amnesia = require('../app/amnesia/controller')

router.route('/signin')
  .get(signin.render)
  .post(passport.authenticate('local', {
    failureRedirect: '/signin',
    //failureFlash: 'Invalid email or password'
  }), signin.authenticated)

router.route('/amnesia')
  .get(amnesia.render)

router.get('/signup', signup.render)


/*
router.get('/signup', (req, res) => {
  res.render('auth/signin', login.render)
})

router.get('/signout', (req, res) => {
  res.render('auth/signin', login.render)
}) */

router.get('/', auth.isLoggin, home.render);

module.exports = router;