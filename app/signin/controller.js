exports.render = function(req, res) {
  res.render('signin/template', {
    title: 'Signin'
  })
}

exports.authenticated = function(req, res) {
  res.redirect('/')
}