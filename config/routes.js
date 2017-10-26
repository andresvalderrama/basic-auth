const express = require('express')
const passport = require('passport')
const router = express.Router();

const home = require('../app/home/controllers')
const auth = require('../app/auth/controllers')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home/index', home)
});

router.get('/login', (req, res) => {
  res.render('auth/login', auth)
})

router.post('/login', passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/login' })
)

module.exports = router;