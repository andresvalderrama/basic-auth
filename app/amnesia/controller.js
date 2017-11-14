exports.checkEmail = (req, res, next) => {
  console.log('check email exists in the db')
  return next()
}

exports.render = (req, res) => {
  res.render('amnesia/template', {
    title: 'Amnesia',
    redirectWhenLocale: '/amnesia'
  })
}
