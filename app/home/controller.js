exports.render = function (req, res) {
  let notLoggin = !req.user

  res.render('home/template', {
    title: 'Auth Express',
    notLoggin
  })
}
