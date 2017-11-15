const router = require('express').Router()

const amnesiaCtrl = require('./controller')
const amnesiaVldtr = require('./validator')

router.get('/amnesia', amnesiaVldtr.validate, amnesiaCtrl.render)

module.exports = router
