const { check, validationResult } = require('express-validator/check')

module.exports = [
  check('usermail', 'required')
    .trim()
    .isEmail()
    .normalizeEmail(),
  (req, res, next) => {
    const errors = validationResult(req)
    const i18n = req.getCatalog()

    if (!errors.isEmpty()) {
      let mappedErrors = errors.mapped()

      if (mappedErrors.usermail) {
        mappedErrors.usermail.msg = i18n.amnesiaL.clientUserMailError
          ? i18n.amnesiaL.clientUserMailError
          : mappedErrors.usermail.msg // no support for i18n at the moment

        req.body.usermail = ''
      }

      req.flash('error', mappedErrors)
      return res.redirect('amnesia')
    }
    next()
  }
]
