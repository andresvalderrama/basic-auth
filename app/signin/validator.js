const { check, validationResult } = require('express-validator/check')
module.exports = [
  check('usermail', 'user/email do not exists')
    .trim()
    .isLength({ min: 5 }),
  check('password', 'password must be at least 5 chars long and contain one number')
    .trim()
    .isLength({ min: 5 })
    .matches(/\d/),

  (req, res, next) => {
    const errors = validationResult(req)
    const i18nCatalog = req.getCatalog()

    if (!errors.isEmpty()) {
      let mappedErrors = validationResult(req).mapped()

      console.log(mappedErrors)

      if (mappedErrors.usermail) {
        mappedErrors.usermail.msg = i18nCatalog.singInP.userMailError
        req.body.usermail = ''
      }
      if (mappedErrors.password) {
        mappedErrors.password.msg = i18nCatalog.singInP.passwordError
        req.body.password = ''
      }

      req.flash('error', mappedErrors)
      req.flash('values', req.body)
    }
    next()
  }
]
