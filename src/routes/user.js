const User = require('express').Router()

// Controllers
const { DeleteUser, GetSingleUser, GetAllUsers, CreateUser, UpdateUser } = require('../controllers/user')


User.get('/', GetAllUsers)

User.get('/:id', GetSingleUser)

User.post('/', CreateUser)

User.patch('/:id', UpdateUser)

User.delete('/:id', DeleteUser)

module.exports = { User }