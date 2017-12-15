const db = require('./database')

let findUserByEmail = (email) => {
  return db.get('users').find({ email: email }).value()
}

let findUserByUsername = (username) => {
  return db.get('users').find({ username: username }).value()
}

let findUserById = (id) => {
  return db.get('users').find({ id: id }).value()
}

module.exports = {
  findUserByEmail,
  findUserById,
  findUserByUsername
}
