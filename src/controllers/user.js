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
  res.send(req.body)
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