exports.render = function (req, res) {
  res.render('signin/template', {
    title: 'Signin',
    err: req.flash('error')
  })
}

exports.authenticated = function (req, res) {
  res.redirect('/')
}
