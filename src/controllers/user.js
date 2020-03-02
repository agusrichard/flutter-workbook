// Mock up data
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

const user = require('../models/user')


const DeleteUser = (req, res) => {
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
}

const GetSingleUser = (req, res) => {
  const list = ['Ujang', 'Hadi', 'Kurnia']

  res.send({
    success: true,
    data: {
      name: list[parseInt(req.params.id) - 1]
    }
  })
}

const GetUsers = (req, res) => {
  res.send(data)
}

const CreateUser = (req, res) => {
  const { name, username, password } = req.body
  try {
    user.create(name, username, password)
    res.send(`User with username ${req.body.username} is created`)
  } catch(err) {
    res.send('There is an error when creating the user ' + err)
  }
}

const UpdateUser = (req, res) => {
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
}

module.exports = { 
  DeleteUser, 
  GetSingleUser, 
  GetUsers, 
  CreateUser, 
  UpdateUser 
}