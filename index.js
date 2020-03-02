const express = require('express')
const bodyParser = require('body-parser')

// Import routes
const { User } = require('./src/routes/user')
const { Auth } = require('./src/routes/auth')

// Initialize app
const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Routes middleware
app.use('/user', User)
app.use('/auth', Auth)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3333, () => {
  console.log('Server Running at Port 3333')
})