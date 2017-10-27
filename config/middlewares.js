exports.isLoggin = (req, res, next) => {
  if (!req.isAuthenticated())  {
    return res.redirect('/signin')
  }

  next()
}