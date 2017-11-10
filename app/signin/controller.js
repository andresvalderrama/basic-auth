exports.render = function (req, res) {
  let errors = req.flash('error')[0] || []

  res.render('signin/template', {
    title: 'Signin',
    errorUsermail: errors.usermail ? errors.usermail.msg : undefined,
    errorPassword: errors.password ? errors.password.msg : undefined
  })
}

exports.authenticated = function (req, res) {
  res.redirect('/')
}
