exports.checkEmail = (req, res, next) => {
  console.log('check email exists in the db')

  res.redirect('/amnesia')
}

exports.render = (req, res) => {
  res.render('amnesia/template', {
    title: 'Amnesia',
    redirectWhenLocale: '/amnesia',
    csrfToken: req.csrfToken(),
    success: false
  })
}
