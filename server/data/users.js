const bcrypt = require('bcrypt')

const users = [
  {
    firstName: 'Vik',
    lastName: 'Cheb',
    email: 'vik@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
  {
    firstName: 'Jone',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false
  },
]

module.exports = users