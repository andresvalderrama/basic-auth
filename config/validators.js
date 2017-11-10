const { check, validationResult } = require('express-validator/check')

exports.signin = [
  check('usermail')
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail(),
  check('password', 'password must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.flash('error', validationResult(req).mapped())
    }
    next()
  }
]
