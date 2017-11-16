const router = require('express').Router()
const csrfProtection = require('../../config/csrf')

const amnesiaCtrl = require('./controller')
const amnesiaVldtr = require('./validator')

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

router.get('/amnesia', csrfProtection, amnesiaCtrl.render)
router.post('/amnesia', csrfProtection, amnesiaVldtr, amnesiaCtrl.checkEmail)

module.exports = router
