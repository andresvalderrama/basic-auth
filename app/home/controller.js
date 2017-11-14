exports.render = function (req, res) {
  let notLoggin = !req.user

  console.log(notLoggin)
  res.render('home/template', {
    title: 'Auth Express',
    notLoggin
  })
}
