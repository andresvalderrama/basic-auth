const db = require('./database')

let findUserByEmail = (email) => {
  return db.get('users').find({ email: email }).value()
}

let findUserById = (id) => {
  return db.get('users').find({ id: id }).value()
}

module.exports = {
  findUserByEmail,
  findUserById
}
