const Joi = require('joi')

const signinSchema = {
  usermail: Joi.string().required(),
  password: Joi.string().min(5).max(15).required()
}
function signin (req, res, next) {
  Joi.validate(req.body, signinSchema, (err, value) => {
    if (err) {
      req.flash('error', err.details)
    }
    next()
  })
}

module.exports = {
  signin: signin
}
