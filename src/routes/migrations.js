const Migration = require('express').Router()

Migration.get('/user', (req, res) => {
  require('../migrations/user')
  res.send('OK')
})

module.exports = { Migration }