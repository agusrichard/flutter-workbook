const User = require('express').Router()


const data = {
  success: true,
  data: [
    {
      id: 1,
      name: 'Ujang',
      email: 'ujang@gmail.com'
    }
  ],
  count: 1
}

User.get('/', (req, res) => {
  res.send(data)
})

User.get('/:id', (req, res) => {
  const list = ['Ujang', 'Hadi', 'Kurnia']

  res.send({
    success: true,
    data: {
      name: list[parseInt(req.params.id) - 1]
    }
  })
})

User.post('/', (req, res) => {
  res.send(req.body)
})

User.patch('/', (req, res) => {
  const { id } = req.body

  if (id) {
    if (id === '5') {
      res.send({
        success: true,
        msg: 'User 5 has been updated'
      })
    }
  }
  res.send({
    success: false,
    msg: 'User not found'
  })
})

User.delete('/', (req, res) => {
  const { id } = req.body

  if (id) {
    if (id === '5') {
      res.send({
        success: true,
        msg: 'User 5 has been deleted'
      })
    }
  }
  res.send({
    success: false,
    msg: 'User not found'
  })
})

module.exports = { User }