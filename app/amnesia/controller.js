const query = require('../../config/queries')

exports.checkEmail = (req, res, next) => {
  const _user = query.findUserByEmail(req.body.usermail)

  if (_user === undefined) {
    let dbError = {
      usermail: {
        msg: req.getCatalog().amnesiaL.dbUserMailError
      }
    }
    req.flash('dbError', dbError)
  }

  res.redirect('/amnesia')
}

exports.render = (req, res) => {
  let errors = req.flash('error')[0] || req.flash('dbError')[0] || []
  console.log('errors', errors)

  res.render('amnesia/template', {
    title: 'Amnesia',
    redirectWhenLocale: '/amnesia',
    csrfToken: req.csrfToken(),
    errorUsermail: errors.usermail ? errors.usermail.msg : undefined,
    success: errors.length < 1
  })
}
