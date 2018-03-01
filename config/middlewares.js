/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  }
  res.redirect('/signin')
}

/**
 * Authorization Required middleware.
 */
/* exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0]
  const token = req.user.tokens.find(token => token.kind === provider)
  if (token) {
    next()
  } else {
    res.redirect(`/auth/${provider}`)
  }
} */
