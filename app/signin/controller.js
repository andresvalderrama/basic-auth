exports.render = function (req, res) {
  let errors = req.flash('error')[0] || []
  let clientValues = req.flash('values')[0] || []

  res.render('signin/template', {
    title: 'Signin',
    valueUsermail: !errors.usermail ? clientValues.usermail : undefined,
    errorUsermail: errors.usermail ? errors.usermail.msg : undefined,
    errorPassword: !errors.usermail && errors.password ? errors.password.msg : undefined
  })
}

exports.authenticated = function (req, res) {
  res.redirect('/')
}
