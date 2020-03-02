const Auth = require('express').Router()

// Controllers
const { Login } = require('../controllers/auth')

Auth.post('/login', Login)

module.exports = { Auth }