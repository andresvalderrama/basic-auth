module.exports.render = function (req, res) {
  let errors = req.flash('error')[0] || req.flash('dbError')[0] || []
  let clientValues = req.flash('values')[0] || []

  res.render('signin/template', {
    title: 'Signin',
    redirectWhenLocale: '/signin',
    csrfToken: req.csrfToken(),
    valueUsermail: clientValues.usermail,
    errorUsermail: errors.usermail ? errors.usermail.msg : undefined,
    errorPassword: !errors.usermail && errors.password ? errors.password.msg : undefined
  })
}
