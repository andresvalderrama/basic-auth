const router = require('express').Router()

const home = require('../app/home/controller')
router.get('/', home.render)

router.get('/locale', function (req, res) {
  let redirectPath = req.query.redirect || '/'
  res.cookie('locale', req.query.locale)

  res.redirect(redirectPath)
})

module.exports = router
