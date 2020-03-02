const express = require('express')
const bodyParser = require('body-parser')

// Middleware
const { checkAuthToken } = require('./src/middleware/AuthMiddleware')

// Import routes
const { User } = require('./src/routes/user')
const { Auth } = require('./src/routes/auth')
const { Migration } = require('./src/routes/migrations')

// Initialize app
const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Routes middleware
app.use('/user', checkAuthToken, User)
app.use('/auth', Auth)
app.use('/migrations', Migration)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3333, () => {
  console.log('Server Running at Port 3333')
})