const { check, validationResult } = require('express-validator/check')

exports.signin = [
  check('usermail')
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail(),
  check('password', 'password must be at least 5 chars long and contain one number')
    .trim()
    .isLength({ min: 5 })
    .matches(/\d/),

  (req, res, next) => {
    const errors = validationResult(req)
    const i18nCatalog = req.getCatalog()

    if (!errors.isEmpty()) {
      let mappedErrors = validationResult(req).mapped()

      if (mappedErrors.usermail) {
        mappedErrors.usermail.msg = i18nCatalog.singInP.userMailError
      }
      if (mappedErrors.password) {
        mappedErrors.password.msg = i18nCatalog.singInP.passwordError
      }

      req.flash('error', mappedErrors)
      req.flash('values', req.body)
    }
    next()
  }
]
