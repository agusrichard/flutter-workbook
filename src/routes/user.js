const User = require('express').Router()

// Controllers
const { DeleteUser, GetSingleUser, GetUsers, CreateUser, UpdateUser } = require('../controllers/user')


User.get('/', GetUsers)

User.get('/:id', GetSingleUser)

User.post('/', CreateUser)

User.patch('/', UpdateUser)

User.delete('/', DeleteUser)

module.exports = { User }